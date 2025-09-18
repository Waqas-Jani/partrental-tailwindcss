/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import { PortableText } from "@portabletext/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CircleArrowRightIcon } from "./SocialIcons";
import { ExitIntentPopup as ExitIntentPopupType } from "@/types/siteSettings";

interface FormData {
  email: string;
}

const ExitIntentPopup = ({
  config,
}: {
  config: ExitIntentPopupType | null;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Default values with better fallbacks
  const heading = config?.heading || "Don't miss out!";
  const description =
    config?.description || "Subscribe to get exclusive updates and offers.";
  const buttonText = config?.buttonText || "Subscribe Now";
  const successHeading = config?.successHeading || "Thank You!";
  const successMessage =
    config?.successMessage || "We've received your subscription.";
  const enabled = config?.enable !== false; // Default to true unless explicitly disabled

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  // Memoized close handler
  const handleClose = useCallback(() => {
    setShowPopup(false);
    setHasInteracted(true);
  }, []);

  // Enhanced exit intent detection
  useEffect(() => {
    if (!enabled || hasInteracted || isSubmitted) return;

    // Check session storage
    const hasSeenPopup = sessionStorage.getItem("hasSeenExitPopup");
    if (hasSeenPopup) return;

    let timeoutId = null;
    let isListenerActive = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // More precise exit intent detection
      if (e.clientY <= 10 && e.relatedTarget === null) {
        setShowPopup(true);
        sessionStorage.setItem("hasSeenExitPopup", "true");

        if (isListenerActive) {
          document.removeEventListener("mouseleave", handleMouseLeave);
          isListenerActive = false;
        }
      }
    };

    // Add scroll-based trigger as backup
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > 70) {
        setShowPopup(true);
        sessionStorage.setItem("hasSeenExitPopup", "true");
        document.removeEventListener("scroll", handleScroll);
      }
    };
    // Delay before activating listeners to avoid immediate triggers
    timeoutId = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("scroll", handleScroll, { passive: true });
      isListenerActive = true;
    }, 5000); // Increased delay for better UX

    return () => {
      clearTimeout(timeoutId);
      if (isListenerActive) {
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("scroll", handleScroll);
      }
    };
  }, [enabled, hasInteracted, isSubmitted]);

  // Enhanced form submission with better error handling
  const onSubmit = async (data: FormData) => {
    if (isLoading) return;

    setIsLoading(true);
    const toastId = toast.loading("Submitting...");

    try {
      const response = await fetch(
        "https://leads.civsav.com/template/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: data.email,
              date: new Date().toISOString(),
              website: window.location.origin,
              source: "exit_intent_popup",
            },
            sheetID: 102,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Submission failed`
        );
      }

      // Enhanced analytics tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          event_category: "exit_intent",
          event_label: "email_subscription",
          value: 1,
        });
      }

      // DataLayer tracking
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "exit_intent_conversion",
          form_type: "exit_intent",
          email_domain: data.email.split("@")[1],
        });
      }

      setIsSubmitted(true);
      reset();
      toast.success("Thank you for subscribing!");

      // Auto-close after success
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Exit intent popup submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPopup) {
        handleClose();
      }
    };

    if (showPopup) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showPopup, handleClose]);

  if (!showPopup || !enabled) return null;

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
    >
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden mx-4 transform transition-all duration-300 animate-in fade-in-0 zoom-in-95">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4  cursor-pointer right-4 z-10 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full hover:bg-gray-100"
          aria-label="Close popup"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                {successHeading}
              </h2>
              <p className="text-gray-600">{successMessage}</p>
            </div>
          ) : (
            <>
              <h2
                id="exit-intent-heading"
                className="text-3xl font-bold mb-4 text-center text-gray-900"
              >
                {heading}
              </h2>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {description}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-600 text-sm" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="main-btn w-full primary-btn mt-6 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : buttonText}
                  {!isLoading && <CircleArrowRightIcon cls="w-6 h-6" />}
                </button>

                {config?.note && (
                  <div className="text-black text-center mt-4 text-base">
                    <PortableText value={config.note} />
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
