"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Form({ data }) {
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
  const logDebug = useCallback((message) => {
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
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_abandon",
          form_type: "contact_form",
          has_name: !!formState.current.nameValue,
          has_email: !!formState.current.emailValue,
          last_field_completed: formState.current.lastFieldChanged,
        });
        logDebug("GTM event pushed");
      }
    } catch (error) {
      logDebug(`Error in abandoned form: ${error.message}`);
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
    const handleBeforeUnload = (e) => {
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
    (name, options) => {
      return {
        ...register(name, options),
        onChange: (e) => {
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
        onInput: (e) => {
          if (name === "name") {
            formState.current.nameValue = e.target.value;
            formState.current.lastFieldChanged = "name";
          } else if (name === "email") {
            formState.current.emailValue = e.target.value;
            formState.current.lastFieldChanged = "email";
          }
        },
        // Special handler for autofill detection
        onAnimationStart: (e) => {
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

  const onSubmit = async (data) => {
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
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
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
    <section className="shadow-lg rounded-lg p-10">
      <div>
        <div className="mb-10">
          <span className="sub-title ml-12">{data?.subheading}</span>
          <h2 className="h1-type mt-5">{data?.heading}</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Full Name"
                name="name"
                {...registerWithTracking("name", {
                  required: "Name is required",
                })}
              />
              {errors?.name && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div className="form_group">
              <input
                type="email"
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Email Address"
                name="email"
                {...registerWithTracking("email", {
                  required: "Email is required",
                })}
              />
              {errors?.email && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="form_group">
              <input
                type="text"
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Subject"
                name="subject"
                {...register("subject", {
                  required: "Subject is required",
                })}
              />
              {errors?.subject && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.subject?.message}
                </span>
              )}
            </div>
            <div className="form_group">
              <textarea
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Write Message"
                name="message"
                {...register("message", {
                  required: "Message is required",
                })}
              />
              {errors?.message && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.message?.message}
                </span>
              )}
            </div>
            <div className="mt-4">
              {data?.button?.title && (
                <Button
                  title={data.button.title}
                  btnType={data?.button.btnType}
                  link={data?.button.link}
                  linkType={data?.button.linkType}
                  submit={true}
                  disable={isSubmitSuccessful}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
