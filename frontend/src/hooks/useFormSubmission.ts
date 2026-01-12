/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  readAppDeviceId,
  getAppDeviceId,
  deleteAppDeviceId,
} from "@/utils/idempotency-key";

interface FormSubmissionConfig {
  formId: string; // ID for the form in the CRM system
  formName: string; // Unique name for idempotency key (e.g., "contact-form")
  trackingFields?: string[];
  successMessage?: string; // Custom success message for toast
  additionalFields?: Record<string, any>; // Additional static fields to include in both completed and abandoned submissions
}

interface FormState {
  started: boolean;
  lastFieldChanged: string | null;
  fieldValues: Record<string, string>;
  debugMessages: string;
  abandonTimer: NodeJS.Timeout | null;
}

export const useFormSubmission = (config: FormSubmissionConfig) => {
  const {
    formId,
    formName,
    trackingFields = ["name", "email"],
    successMessage = "Request has been submitted successfully",
    additionalFields = {},
  } = config;

  // Form state ref to track data without re-renders
  const formState = useRef<FormState>({
    started: false,
    lastFieldChanged: null,
    fieldValues: {},
    debugMessages: "",
    abandonTimer: null,
  });

  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = useForm({
    mode: "onBlur",
  });

  // Debug logging function
  const logDebug = useCallback((message: any) => {
    const timestamp = new Date().toISOString();
    formState.current.debugMessages += `\n${timestamp}: ${message}`;
    console.log(`DEBUG: ${message}`);
  }, []);

  // Submit abandoned form function
  const submitAbandonedForm = useCallback(() => {
    const hasData = trackingFields.some((field) =>
      formState.current.fieldValues[field]?.trim()
    );

    if (!formState.current.started || !hasData) {
      logDebug("Abandoned form not submitted - no data or not started");
      return;
    }

    try {
      const idemKey = readAppDeviceId(formName) || getAppDeviceId(formName);

      // Extract name, email, phone for top level (if they exist)
      const topLevelFields: Record<string, string> = {};
      if (formState.current.fieldValues.name) {
        topLevelFields.name = formState.current.fieldValues.name;
      }
      if (formState.current.fieldValues.email) {
        topLevelFields.email = formState.current.fieldValues.email;
      }
      if (formState.current.fieldValues.phone) {
        topLevelFields.phone = formState.current.fieldValues.phone;
      }

      // Get all other fields (excluding name, email, phone)
      const otherFields = Object.keys(formState.current.fieldValues)
        .filter((key) => !["name", "email", "phone"].includes(key))
        .reduce((acc, key) => {
          acc[key] = formState.current.fieldValues[key];
          return acc;
        }, {} as Record<string, string>);

      const abandonData = {
        ...additionalFields,
        ...topLevelFields,
        source_url: typeof window !== "undefined" ? window.location.href : "",
        status: "abandoned",
        data: {
          ...otherFields,
          date: new Date().toUTCString(),
        },
        formId,
      };

      logDebug(`Sending abandoned form data: ${JSON.stringify(abandonData)}`);

      fetch("/api/forms-api", {
        method: "POST",
        body: JSON.stringify(abandonData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          ...(idemKey ? { "idempotency-key": idemKey } : {}),
        },
        keepalive: true,
      }).catch((err) => {
        logDebug(`Fetch error: ${err.message}`);
      });

      // Track the abandoned form in analytics
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "form_abandon",
          form_type: formName,
          ...trackingFields.reduce((acc, field) => {
            acc[`has_${field}`] = !!formState.current.fieldValues[field];
            return acc;
          }, {} as Record<string, boolean>),
          last_field_completed: formState.current.lastFieldChanged,
        });
        logDebug("GTM event pushed");
      }
    } catch (error) {
      logDebug(`Error in abandoned form: ${(error as Error)?.message}`);
    }
  }, [logDebug, formId, formName, trackingFields, additionalFields]);

  // Form tracking effect
  useEffect(() => {
    const scheduleAbandonedFormSubmission = () => {
      if (formState.current.abandonTimer) {
        clearTimeout(formState.current.abandonTimer);
        logDebug("Cleared existing abandon timer");
      }

      logDebug("Scheduling abandoned form submission in 3 seconds");
      formState.current.abandonTimer = setTimeout(() => {
        formState.current.abandonTimer = null;
        logDebug("Executing delayed abandoned form submission");
        submitAbandonedForm();
      }, 3000);
    };

    const cancelScheduledSubmission = () => {
      if (formState.current.abandonTimer) {
        clearTimeout(formState.current.abandonTimer);
        formState.current.abandonTimer = null;
        logDebug("Canceled scheduled abandon form submission");
      }
    };

    const handleBeforeUnload = (e: any) => {
      const hasData = trackingFields.some((field) =>
        formState.current.fieldValues[field]?.trim()
      );

      logDebug(
        `BeforeUnload triggered - Data: ${JSON.stringify(
          formState.current.fieldValues
        )}`
      );

      if (formState.current.started && !isSubmitSuccessful && hasData) {
        logDebug("Submitting abandoned form immediately (beforeunload)");
        submitAbandonedForm();
        e.preventDefault();
        e.returnValue = "Are you sure you want to leave?";
        return "Are you sure you want to leave?";
      }
    };

    const handleVisibilityChange = () => {
      const hasData = trackingFields.some((field) =>
        formState.current.fieldValues[field]?.trim()
      );

      if (document.visibilityState === "hidden") {
        logDebug(`Visibility changed to: hidden`);

        if (formState.current.started && !isSubmitSuccessful && hasData) {
          logDebug("Scheduling abandoned form submission (visibility:hidden)");
          scheduleAbandonedFormSubmission();
        }
      } else if (document.visibilityState === "visible") {
        logDebug(`Visibility changed to: visible`);
        cancelScheduledSubmission();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelScheduledSubmission();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSubmitSuccessful, logDebug, submitAbandonedForm, trackingFields]);

  // Track when form is started
  useEffect(() => {
    if (isDirty && !formStarted) {
      setFormStarted(true);
      formState.current.started = true;
      logDebug("Form started via isDirty");
    }
  }, [isDirty, formStarted, logDebug]);

  // Enhanced register function to track field values
  const registerWithTracking = useCallback(
    (name: string, options?: any) => {
      return {
        ...register(name, options),
        onChange: (e: any) => {
          formState.current.fieldValues[name] = e.target.value;
          formState.current.lastFieldChanged = name;

          if (!formState.current.started) {
            formState.current.started = true;
            setFormStarted(true);
            logDebug(`Form started with ${name} field`);
          }
        },
        onInput: (e: any) => {
          formState.current.fieldValues[name] = e.target.value;
          formState.current.lastFieldChanged = name;
        },
        onAnimationStart: (e: any) => {
          if (e.animationName === "onAutoFillStart") {
            setTimeout(() => {
              formState.current.fieldValues[name] = e.target.value;
              formState.current.lastFieldChanged = name;
            }, 100);
          }
        },
      };
    },
    [register, logDebug]
  );

  // Submit completed form
  const submitCompletedForm = useCallback(
    async (data: any) => {
      const toastId = toast.loading("Submitting...");

      // Clear any pending abandon form submissions
      if (formState.current.abandonTimer) {
        clearTimeout(formState.current.abandonTimer);
        formState.current.abandonTimer = null;
        logDebug("Cleared abandon timer during form submission");
      }

      // Always pass an idempotency key: use existing or create new
      const idemKey = readAppDeviceId(formName) || getAppDeviceId(formName);

      // Log all incoming form data to verify all fields are captured
      logDebug(
        `Received form data with fields: ${Object.keys(data).join(", ")}`
      );
      logDebug(`Form data values: ${JSON.stringify(data)}`);

      // Extract name, email, phone for top level (if they exist)
      const topLevelFields: Record<string, any> = {};
      if (data.name !== undefined && data.name !== null && data.name !== "") {
        topLevelFields.name = data.name;
      }
      if (
        data.email !== undefined &&
        data.email !== null &&
        data.email !== ""
      ) {
        topLevelFields.email = data.email;
      }
      if (
        data.phone !== undefined &&
        data.phone !== null &&
        data.phone !== ""
      ) {
        topLevelFields.phone = data.phone;
      }

      // Get all other fields (excluding name, email, phone)
      const otherFields = Object.keys(data)
        .filter((key) => !["name", "email", "phone", "_hp"].includes(key))
        .reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {} as Record<string, any>);

      logDebug(`Top level fields: ${Object.keys(topLevelFields).join(", ")}`);
      logDebug(
        `Other fields in data object: ${Object.keys(otherFields).join(", ")}`
      );

      const formData = {
        ...additionalFields,
        ...topLevelFields,
        source_url: typeof window !== "undefined" ? window.location.href : "",
        status: "completed",
        data: {
          ...otherFields,
          date: new Date().toUTCString(),
        },
        formId,
      };

      logDebug(
        `Final form data structure: ${JSON.stringify(formData, null, 2)}`
      );

      try {
        const response = await fetch("/api/forms-api", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...(idemKey ? { "idempotency-key": idemKey } : {}),
          },
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(text || "Form submission failed");
        }

        // Reset everything
        formState.current = {
          started: false,
          lastFieldChanged: null,
          fieldValues: {},
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

        toast.success(successMessage);

        // Delete idempotency key on successful completed submission
        deleteAppDeviceId(formName);
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Something went wrong! Please try again");
        toast.dismiss(toastId);
      }
    },
    [formId, formName, reset, logDebug, successMessage, additionalFields]
  );

  // Add autofill detection CSS
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

  return {
    register,
    registerWithTracking,
    handleSubmit,
    reset,
    errors,
    isSubmitSuccessful,
    isDirty,
    submitCompletedForm,
    submitAbandonedForm,
  };
};
