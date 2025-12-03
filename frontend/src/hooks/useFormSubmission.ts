/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormSubmissionConfig {
    endpoint: string;
    completedSheetId: number;
    abandonedSheetId: number;
    formType: string;
    trackingFields?: string[];
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
        endpoint,
        completedSheetId,
        abandonedSheetId,
        formType,
        trackingFields = ["name", "email"]
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
        // Honeypot validation - if honeypot field is filled, it's likely a bot
        if (formState.current.fieldValues.honeypot && formState.current.fieldValues.honeypot.trim() !== "") {
            logDebug("Bot detected in abandoned form - honeypot field filled, skipping submission");
            return;
        }

        const hasData = trackingFields.some(
            field => formState.current.fieldValues[field]?.trim()
        );

        if (!formState.current.started || !hasData) {
            logDebug("Abandoned form not submitted - no data or not started");
            return;
        }

        try {
            // Remove honeypot field from abandoned form data
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { honeypot, ...cleanFieldValues } = formState.current.fieldValues;

            const abandonData = {
                data: {
                    ...cleanFieldValues,
                    form_status: "abandoned",
                    page_url: window.location.href,
                    date: new Date().toUTCString(),
                    website: window.location.origin,
                },
                sheetID: abandonedSheetId,
            };

            logDebug(`Sending abandoned form data: ${JSON.stringify(abandonData)}`);

            fetch(endpoint, {
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
            if (typeof window !== "undefined" && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                    event: "abandoned_lead",
                    form_type: formType,

                });
                logDebug("GTM event pushed");
            }
        } catch (error) {
            logDebug(`Error in abandoned form: ${(error as Error)?.message}`);
        }
    }, [logDebug, endpoint, abandonedSheetId, formType, trackingFields]);

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
            const hasData = trackingFields.some(
                field => formState.current.fieldValues[field]?.trim()
            );

            logDebug(
                `BeforeUnload triggered - Data: ${JSON.stringify(formState.current.fieldValues)}`
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
            const hasData = trackingFields.some(
                field => formState.current.fieldValues[field]?.trim()
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
    const submitCompletedForm = useCallback(async (data: any) => {
        // Honeypot validation - if honeypot field is filled, it's likely a bot
        if (data.honeypot && data.honeypot.trim() !== "") {
            logDebug("Bot detected - honeypot field filled");

            // Show success toast to trick the bot
            toast.success("Request has been submitted successfully");

            // Reset form without actually submitting
            formState.current = {
                started: false,
                lastFieldChanged: null,
                fieldValues: {},
                debugMessages: "",
                abandonTimer: null,
            };
            setFormStarted(false);
            reset();

            return; // Exit early, don't submit to server
        }

        const toastId = toast.loading("Submitting...");

        // Clear any pending abandon form submissions
        if (formState.current.abandonTimer) {
            clearTimeout(formState.current.abandonTimer);
            formState.current.abandonTimer = null;
            logDebug("Cleared abandon timer during form submission");
        }

        // Remove honeypot field from actual submission data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { honeypot, ...cleanData } = data;

        const formData = {
            data: {
                ...cleanData,
                form_status: "completed",
                date: new Date().toUTCString(),
                page_url: window.location.href,
                website: window.location.origin,
            },
            sheetID: completedSheetId,
        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            await response.json();

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
                    form_type: formType,
                });
            }

            toast.success("Request has been submitted successfully");
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("Something went wrong! Please try again");
        }
    }, [endpoint, completedSheetId, reset, logDebug]);

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
