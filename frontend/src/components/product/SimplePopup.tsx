"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { SimplePopup as SimplePopupType } from "@/types/siteSettings";
import { CircleArrowRightIcon } from "@/components/common/Icons";

const STORAGE_KEY = "simplePopup";

interface SimplePopupProps {
    config?: SimplePopupType | null;
    isOpen: boolean;
    onClose: () => void;
}

const getConfigFromStorage = (): SimplePopupType | null => {
    if (typeof window === "undefined") return null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? (JSON.parse(stored) as SimplePopupType) : null;
    } catch {
        return null;
    }
};

const SimplePopup = ({
    config: configProp,
    isOpen,
    onClose,
}: SimplePopupProps) => {
    const [config, setConfig] = useState<SimplePopupType | null>(() =>
        configProp ?? getConfigFromStorage()
    );

    const {
        registerWithTracking,
        register,
        handleSubmit,
        errors,
        isSubmitSuccessful,
        submitCompletedForm,
    } = useFormSubmission({
        formId: "",
        formName: "simple-popup-form",
        trackingFields: ["name", "email", "phone"],
        successMessage: "Thank you! We will get back to you soon.",
    });

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        const stored = configProp ?? getConfigFromStorage();
        if (stored) {
            setConfig(stored);
            if (configProp && typeof window !== "undefined") {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(configProp));
            }
        }
    }, [configProp]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            const timer = setTimeout(handleClose, 2500);
            return () => clearTimeout(timer);
        }
    }, [isSubmitSuccessful, handleClose]);



    const onSubmit = useCallback(
        async (data: Record<string, string>) => {
            try {
                await submitCompletedForm(data);
            } catch {
                toast.error("Something went wrong. Please try again.");
            }
        },
        [submitCompletedForm]
    );

    if (!isOpen || !config) return null;

    const heading = config.heading || "Get in Touch";
    const description = config.description;
    const msgFieldLabel = config.msgField || "Message";
    const submitLabel = config.buttonText || "Submit";
    const callLabel = config.button2Text || "Call Now";
    const phoneHref = config.phoneNumber
        ? `tel:${config.phoneNumber.replace(/\s/g, "")}`
        : null;

    const popupContent = (
        <div
            className="fixed inset-0 z-[55] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="simple-popup-heading"
        >
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden mx-4">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full hover:bg-gray-100 cursor-pointer"
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

                <div className="p-5">
                    {isSubmitSuccessful ? (
                        <div className="text-center py-5">
                            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-600"
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
                            <h2 className="text-xl font-bold mb-1 text-gray-900">
                                Thank You!
                            </h2>
                            <p className="text-gray-600 text-sm">
                                We&apos;ve received your message and will get back to you soon.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h2
                                id="simple-popup-heading"
                                className="text-xl font-bold mb-2 text-center text-gray-900"
                            >
                                {heading}
                            </h2>
                            {description && (
                                <p className="text-gray-600 mb-4 text-center text-sm leading-relaxed">
                                    {description}
                                </p>
                            )}

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-3"
                            >
                                <div>
                                    <label
                                        htmlFor="simple-popup-name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Name <span className="text-primary">*</span>
                                    </label>
                                    <input
                                        id="simple-popup-name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Your name"
                                        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors?.name ? "border-red-500" : "border-gray-300"
                                            }`}
                                        {...registerWithTracking("name", {
                                            required: "Name is required",
                                        })}
                                    />
                                    {errors?.name && (
                                        <p className="mt-1 text-red-600 text-sm" role="alert">
                                            {String(errors.name.message)}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="simple-popup-email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email <span className="text-primary">*</span>
                                    </label>
                                    <input
                                        id="simple-popup-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Your email"
                                        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors?.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        {...registerWithTracking("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Please enter a valid email address",
                                            },
                                        })}
                                    />
                                    {errors?.email && (
                                        <p className="mt-1 text-red-600 text-sm" role="alert">
                                            {String(errors.email.message)}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="simple-popup-phone"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Phone <span className="text-primary">*</span>
                                    </label>
                                    <input
                                        id="simple-popup-phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="Your phone number"
                                        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors?.phone ? "border-red-500" : "border-gray-300"
                                            }`}
                                        {...registerWithTracking("phone", {
                                            required: "Phone is required",
                                            pattern: {
                                                value: /^\+?[\d\s-]{10,}$/,
                                                message: "Please enter a valid phone number",
                                            },
                                        })}
                                    />
                                    {errors?.phone && (
                                        <p className="mt-1 text-red-600 text-sm" role="alert">
                                            {String(errors.phone.message)}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="simple-popup-message"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        {msgFieldLabel}
                                    </label>
                                    <textarea
                                        id="simple-popup-message"
                                        rows={3}
                                        placeholder="Your message"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                        {...register("message")}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-1">
                                    <button
                                        type="submit"
                                        disabled={isSubmitSuccessful}
                                        className="main-btn primary-btn !py-2"
                                    >
                                        {submitLabel}
                                        <CircleArrowRightIcon cls="w-5 h-5" />
                                    </button>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="flex-1 h-px bg-gray-200" />
                                        <span className="px-2 text-black font-semibold text-sm">OR</span>
                                        <div className="flex-1 h-px bg-gray-200" />
                                    </div>
                                    {phoneHref && (
                                        <a
                                            href={phoneHref}
                                            className="main-btn primary-btn !py-2 !bg-transparent !border-1 !border-gray-600 !text-gray-900 hover:!border-primary hover:!text-white hover:!bg-primary"
                                        >
                                            {callLabel}
                                        </a>
                                    )}
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    if (typeof document !== "undefined") {
        return createPortal(popupContent, document.body);
    }
    return null;
};

export default SimplePopup;
