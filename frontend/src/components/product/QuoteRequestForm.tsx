/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useFormSubmission } from "@/hooks/useFormSubmission";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  formId?: string;
};

const QuoteRequestForm = ({
  isOpen,
  onClose,
  productName,
  formId = "690e32f5",
}: Props) => {
  const {
    register,
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    formId,
    formName: "quote-request-form",
    trackingFields: ["name", "email", "phone"],
    successMessage: "Quote request has been submitted successfully",
    additionalFields: {
      product_name: productName,
    },
  });

  // Handle successful submission - close popup after delay
  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, onClose]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: any) => {
    await submitCompletedForm(data);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              {...registerWithTracking("name", {
                required: "Name is required",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors?.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors?.name && (
              <span className="text-xs text-red-500 mt-1 block">
                {String(errors.name?.message)}
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
              {...registerWithTracking("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors?.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your email"
              autoComplete="email"
            />
            {errors?.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {String(errors.email?.message)}
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
              {...registerWithTracking("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[\d\s-]{10,}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors?.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your phone number"
              autoComplete="tel"
            />
            {errors?.phone && (
              <span className="text-xs text-red-500 mt-1 block">
                {String(errors.phone?.message)}
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
              {...register("message")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Additional details or questions"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitSuccessful}
          >
            {isSubmitSuccessful ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Submitted!
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
