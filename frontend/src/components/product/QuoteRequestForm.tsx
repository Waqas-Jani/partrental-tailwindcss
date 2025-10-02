/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

type LastFieldChanged = "name" | "email" | null;

type FormState = {
  started: boolean;
  lastFieldChanged: LastFieldChanged;
  nameValue: string;
  emailValue: string;
  debugMessages: string;
  abandonTimer: ReturnType<typeof setTimeout> | null;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[] | undefined;
  }
}

const QuoteRequestForm = ({ isOpen, onClose, productName }: Props) => {
  // Add formState ref to track form data without re-renders
  const formState = useRef<FormState>({
    started: false,
    lastFieldChanged: null,
    nameValue: "",
    emailValue: "",
    debugMessages: "",
    abandonTimer: null,
  });

  // Add formStarted state
  const [formStarted, setFormStarted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add debug logging function
  const logDebug = useCallback((message: string) => {
    const timestamp = new Date().toISOString();
    formState.current.debugMessages += `\n${timestamp}: ${message}`;
    // eslint-disable-next-line no-console
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
          product_name: productName,
          page_url: window.location.href,
          date: new Date().toUTCString(),
          website: window.location.origin,
        },
        sheetID: 90,
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
          form_type: "quote_request_form",
          has_name: !!formState.current.nameValue,
          has_email: !!formState.current.emailValue,
          last_field_completed: formState.current.lastFieldChanged,
        });
        logDebug("GTM event pushed");
      }
    } catch (error: any) {
      logDebug(`Error in abandoned form: ${error?.message as string}`);
    }
  }, [logDebug, productName]);

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
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      logDebug(
        `BeforeUnload triggered - Name: ${formState.current.nameValue}, Email: ${formState.current.emailValue}`
      );

      if (
        formState.current.started &&
        !showSuccess &&
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
      return undefined;
    };

    // Event handler for visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched away from tab - schedule submission with delay
        logDebug(`Visibility changed to: hidden`);

        if (
          formState.current.started &&
          !showSuccess &&
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
  }, [showSuccess, logDebug, submitAbandonedForm]);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting...");

    // Clear any pending abandon form submissions
    if (formState.current.abandonTimer) {
      clearTimeout(formState.current.abandonTimer);
      formState.current.abandonTimer = null;
      logDebug("Cleared abandon timer during form submission");
    }

    try {
      const d = {
        data: {
          ...formData,
          form_status: "completed",
          product_name: productName,
          page_url: window.location.href,
          date: new Date().toUTCString(),
          website: window.location.origin,
        },
        sheetID: 91,
      };

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
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      toast.dismiss(toastId);
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "generate_lead",
        });
      }
      toast.success("Quote request has been submitted successfully");
      setShowSuccess(true);

      // Close popup after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting form:", error);
      toast.dismiss(toastId);
      toast.error("Something went wrong! Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as { name: string; value: string };
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Track form data for abandonment
    if (name === "name") {
      formState.current.nameValue = value;
      formState.current.lastFieldChanged = "name";
    } else if (name === "email") {
      formState.current.emailValue = value;
      formState.current.lastFieldChanged = "email";
    }

    // Mark form as started if not already
    if (!formState.current.started) {
      formState.current.started = true;
      setFormStarted(true);
      logDebug(`Form started with ${name} field`);
    }

    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleClose = () => {
    // Check if form was started and has data before closing
    if (
      formState.current.started &&
      !showSuccess &&
      (formState.current.nameValue || formState.current.emailValue)
    ) {
      logDebug("Submitting abandoned form on popup close");
      submitAbandonedForm();
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-8 animate-fadeIn">
        <button
          className="absolute cursor-pointer top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors text-2xl"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-1 text-gray-900">
            Request a Quote
          </h3>
          {productName && (
            <p className="text-sm text-gray-500 mb-2">
              Product:{" "}
              <span className="font-semibold text-gray-800">{productName}</span>
            </p>
          )}
          <p className="text-gray-500 text-sm">
            Fill out the form below and we’ll get back to you soon.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.name}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your email"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your phone number"
              autoComplete="tel"
            />
            {errors.phone && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.phone}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Additional details or questions"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                <svg
                  className="inline w-5 h-5 mr-2 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Submit Quote Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestForm;
