/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Contact = ({ data, isHome = false }: any) => {
  const homeForm = data.homeForm;
  const contactInfoSec = data?.contactInfoSec;

  // Add formState ref to track form data without re-renders
  const formState = useRef({
    started: false,
    lastFieldChanged: null,
    nameValue: "",
    emailValue: "",
    debugMessages: "",
    abandonTimer: null,
  });

  // Add formStarted state
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = useForm({
    mode: "onBlur",
  });

  // Add debug logging function
  const logDebug = useCallback((message: any) => {
    const timestamp = new Date().toISOString();
    formState.current.debugMessages += `\n${timestamp}: ${message}`;
    console.log(`DEBUG: ${message}`);
  }, []);

  // Add submit abandoned form function
  const submitAbandonedForm = useCallback(() => {
    // Only submit if we have at least name or email
    if (
      !formState.current.started ||
      (!formState.current.nameValue && !formState.current.emailValue)
    ) {
      logDebug("Abandoned form not submitted - no data or not started");
      return;
    }

    try {
      // Create object with only name and email
      const abandonData = {
        data: {
          name: formState.current.nameValue,
          email: formState.current.emailValue,
          form_status: "abandoned",
          page_url: window.location.href,
          date: new Date().toUTCString(),
          website: window.location.origin,
        },
        sheetID: 89,
      };

      logDebug(`Sending abandoned form data: ${JSON.stringify(abandonData)}`);

      // Use fetch with keepalive
      fetch("https://leads.civsav.com/template/contact", {
        method: "POST",
        body: JSON.stringify(abandonData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        keepalive: true,
      }).catch((err) => {
        logDebug(`Fetch error: ${err.message}`);
      });

      // Track the abandoned form in analytics
      if (
        typeof window !== "undefined" &&
        window.dataLayer &&
        window.dataLayer.push
      ) {
        window.dataLayer.push({
          event: "form_abandon",
          form_type: "home_contact_form",
          has_name: !!formState.current.nameValue,
          has_email: !!formState.current.emailValue,
          last_field_completed: formState.current.lastFieldChanged,
        });
        logDebug("GTM event pushed");
      }
    } catch (error) {
      logDebug(`Error in abandoned form: ${error?.message}`);
    }
  }, [logDebug]);

  // Add form tracking effect
  useEffect(() => {
    // Function to schedule abandoned form submission with delay
    const scheduleAbandonedFormSubmission = () => {
      // Clear any existing timer
      if (formState.current.abandonTimer) {
        clearTimeout(formState.current.abandonTimer);
        logDebug("Cleared existing abandon timer");
      }

      // Set a new timer (3 seconds delay)
      logDebug("Scheduling abandoned form submission in 3 seconds");
      formState.current.abandonTimer = setTimeout(() => {
        formState.current.abandonTimer = null;
        logDebug("Executing delayed abandoned form submission");
        submitAbandonedForm();
        formState.current.abandonTimer = null;
      }, 3000); // 3 second delay
    };

    // Function to cancel scheduled submission
    const cancelScheduledSubmission = () => {
      if (formState.current.abandonTimer) {
        clearTimeout(formState.current.abandonTimer);
        formState.current.abandonTimer = null;
        logDebug("Canceled scheduled abandon form submission");
      }
    };

    // Event handler for beforeunload
    const handleBeforeUnload = (e: any) => {
      logDebug(
        `BeforeUnload triggered - Name: ${formState.current.nameValue}, Email: ${formState.current.emailValue}`
      );

      if (
        formState.current.started &&
        !isSubmitSuccessful &&
        (formState.current.nameValue || formState.current.emailValue)
      ) {
        logDebug("Submitting abandoned form immediately (beforeunload)");
        // Submit immediately since the page is closing
        submitAbandonedForm();

        // Standard way to show confirmation dialog (required by some browsers)
        e.preventDefault();
        e.returnValue = "Are you sure you want to leave?";
        return "Are you sure you want to leave?";
      }
    };

    // Event handler for visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched away from tab - schedule submission with delay
        logDebug(`Visibility changed to: hidden`);

        if (
          formState.current.started &&
          !isSubmitSuccessful &&
          (formState.current.nameValue || formState.current.emailValue)
        ) {
          logDebug("Scheduling abandoned form submission (visibility:hidden)");
          scheduleAbandonedFormSubmission();
        }
      } else if (document.visibilityState === "visible") {
        // User returned to tab - cancel scheduled submission
        logDebug(`Visibility changed to: visible`);
        cancelScheduledSubmission();
      }
    };

    // Set up event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Return cleanup function
    return () => {
      cancelScheduledSubmission();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSubmitSuccessful, logDebug, submitAbandonedForm]);

  // Track when form is started - only update once
  useEffect(() => {
    if (isDirty && !formStarted) {
      setFormStarted(true);
      formState.current.started = true;
      logDebug("Form started via isDirty");
    }
  }, [isDirty, formStarted, logDebug]);

  // Enhanced register function to track field values
  const registerWithTracking = useCallback(
    (name: any, options: any) => {
      return {
        ...register(name, options),
        onChange: (e: any) => {
          // Track form data for abandonment
          if (name === "name") {
            formState.current.nameValue = e.target.value;
            formState.current.lastFieldChanged = "name";
          } else if (name === "email") {
            formState.current.emailValue = e.target.value;
            formState.current.lastFieldChanged = "email";
          }

          // Mark form as started if not already
          if (!formState.current.started) {
            formState.current.started = true;
            setFormStarted(true);
            logDebug(`Form started with ${name} field`);
          }
        },
        // Also add onInput to catch autofill
        onInput: (e: any) => {
          if (name === "name") {
            formState.current.nameValue = e.target.value;
            formState.current.lastFieldChanged = "name";
          } else if (name === "email") {
            formState.current.emailValue = e.target.value;
            formState.current.lastFieldChanged = "email";
          }
        },
        // Special handler for autofill detection
        onAnimationStart: (e: any) => {
          if (e.animationName === "onAutoFillStart") {
            setTimeout(() => {
              if (name === "name") {
                formState.current.nameValue = e.target.value;
                formState.current.lastFieldChanged = "name";
              } else if (name === "email") {
                formState.current.emailValue = e.target.value;
                formState.current.lastFieldChanged = "email";
              }
            }, 100);
          }
        },
      };
    },
    [register, logDebug]
  );

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Submitting...");

    // Clear any pending abandon form submissions
    if (formState.current.abandonTimer) {
      clearTimeout(formState.current.abandonTimer);
      formState.current.abandonTimer = null;
      logDebug("Cleared abandon timer during form submission");
    }

    const d = {
      data: {
        ...data,
        form_status: "completed",
        date: new Date().toUTCString(),
        page_url: window.location.href,
        website: window.location.origin,
      },
      sheetID: 85,
    };

    try {
      const response = await fetch(
        "https://leads.civsav.com/template/contact",
        {
          method: "POST",
          body: JSON.stringify(d),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      await response.json();

      // Reset everything
      formState.current = {
        started: false,
        lastFieldChanged: null,
        nameValue: "",
        emailValue: "",
        debugMessages: "",
        abandonTimer: null,
      };
      setFormStarted(false);
      reset();

      toast.dismiss(toastId);
      // DataLayer tracking
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "generate_lead",
        });
      }

      toast.success("Request has been submitted successfully");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong! Please try again");
    }
  };

  // Add custom CSS for autofill detection
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes onAutoFillStart { from {} to {} }
      input:-webkit-autofill {
        animation-name: onAutoFillStart;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      if (styleEl.parentNode) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <section
      className="contact-section pt-130 pb-80"
      style={{
        backgroundColor: "#f8f6ef",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="contact-four_content-box wow fadeInLeft mb-50">
              <div className="section-title mb-60">
                <span className="sub-title">{homeForm.subheading}</span>
                <h2>{homeForm.heading}</h2>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Full Name"
                      name="name"
                      {...registerWithTracking("name", {
                        required: "Name is required",
                      })}
                    />
                    {errors?.name && (
                      <span className="error-msg" style={{ marginTop: -15 }}>
                        {errors.name?.message}
                      </span>
                    )}
                  </div>
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Email Address"
                      name="email"
                      {...registerWithTracking("email", {
                        required: "Email is required",
                      })}
                    />
                    {errors?.email && (
                      <span className="error-msg" style={{ marginTop: -15 }}>
                        {errors.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="form_group">
                    <textarea
                      className="form_control"
                      placeholder="Write Message"
                      name="message"
                      {...register("message", {
                        required: "Message is required",
                      })}
                    />
                    {errors?.message && (
                      <span className="error-msg" style={{ marginTop: -15 }}>
                        {errors.message?.message}
                      </span>
                    )}
                  </div>
                  <div className="form_group">
                    {homeForm?.button?.title && (
                      <Button
                        text={homeForm?.button.title}
                        btnType={homeForm?.button.btnType}
                        link={homeForm?.button.link}
                        linkType={homeForm?.button.linkType}
                        submit={true}
                        disable={isSubmitSuccessful}
                        className="main-btn btn-yellow"
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="map-box_one ml-lg-70 wow fadeInRight">
              <div className="map-box mb-50">
                <iframe
                  src={data?.mapUrl}
                  style={{ marginTop: isHome ? "-60px" : "0px" }}
                  title="google-map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
