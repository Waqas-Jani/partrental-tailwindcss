/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Button from "@/components/common/Button";
import { useFormSubmission } from "@/hooks/useFormSubmission";

export default function Form({ data }: any) {
  // Use the form submission hook with configuration
  const {
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    endpoint: "https://leads.civsav.com/template/contact",
    completedSheetId: 85,
    abandonedSheetId: 89,
    formType: "contact_form",
    trackingFields: ["name", "email", "subject", "message", "honeypot"],
  });

  return (
    <section className="shadow-lg rounded-lg p-10">
      <div>
        <div className="mb-10">
          <span className="sub-title ml-12">{data?.subheading}</span>
          <h2 className="h1-type mt-5">{data?.heading}</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit(submitCompletedForm)}>
            <div className="mb-4">
              <input
                type="text"
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Full Name"
                {...registerWithTracking("name", {
                  required: "Name is required",
                })}
              />
              {errors?.name && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.name?.message?.toString()}
                </span>
              )}
            </div>
            <div className="form_group">
              <input
                type="email"
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Email Address"
                {...registerWithTracking("email", {
                  required: "Email is required",
                })}
              />
              {errors?.email && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.email?.message?.toString()}
                </span>
              )}
            </div>
            <div className="form_group">
              <input
                type="text"
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Subject"
                {...registerWithTracking("subject", {
                  required: "Subject is required",
                })}
              />
              {errors?.subject && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.subject?.message?.toString()}
                </span>
              )}
            </div>
            <div className="form_group">
              <textarea
                className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
                placeholder="Write Message"
                {...registerWithTracking("message", {
                  required: "Message is required",
                })}
              />
              {errors?.message && (
                <span className="text-red-500" style={{ marginTop: -15 }}>
                  {errors.message?.message?.toString()}
                </span>
              )}
            </div>
            {/* Honeypot field (hidden from real users) */}
            <input
              type="text"
              {...registerWithTracking("honeypot")}
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                opacity: 0,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
            <div className="mt-4">
              {data?.button?.title && (
                <Button
                  title={data.button.title}
                  btnType={data?.button.btnType}
                  link={data?.button.link}
                  linkType={data?.button.linkType}
                  disabled={isSubmitSuccessful}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
