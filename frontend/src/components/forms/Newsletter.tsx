/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../common/Button";
import {
  readAppDeviceId,
  getAppDeviceId,
  deleteAppDeviceId,
} from "@/utils/idempotency-key";

export default function Newsletter({ data }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting...");

    // Always pass an idempotency key: use existing or create new
    const idemKey =
      readAppDeviceId("newsletter-form") || getAppDeviceId("newsletter-form");

    try {
      const formData = {
        name: name,
        email: email,
        source_url: typeof window !== "undefined" ? window.location.href : "",
        status: "completed",
        data: {
          date: new Date().toUTCString(),
          website: window.location.origin,
          source: "newsletter",
        },
        formId: data?.formId || "690a1b79",
      };

      const response = await fetch("/api/forms-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          ...(idemKey ? { "Idempotency-Key": idemKey } : {}),
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || `HTTP ${response.status}: Submission failed`);
      }

      // Analytics tracking
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "generate_lead",
          form_type: "newsletter",
        });
      }

      toast.dismiss(toastId);
      toast.success("Request has been submitted successfully");

      // Delete idempotency key on successful completed submission
      deleteAppDeviceId("newsletter-form");

      // Reset form
      setName("");
      setEmail("");
      setLoading(false);
    } catch (error) {
      console.error("Newsletter submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong! Please try again";
      toast.dismiss(toastId);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="h4-type mb-4">{data?.heading}</p>

      <form onSubmit={onSubmit}>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-row flex-1">
            <input
              type="text"
              className="input-field"
              placeholder="Name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-row flex-1">
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="">
            {data?.button?.title && (
              <Button
                title={data?.button?.title}
                btnType={data?.button?.btnType || "primary"}
                link={data?.button.link || ""}
                linkType={data?.button.linkType || "internal"}
                disabled={loading}
                cls="w-full"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
