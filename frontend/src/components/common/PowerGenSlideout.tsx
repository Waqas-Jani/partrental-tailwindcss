/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import Button from "./Button";
const SESSION_KEY = "pr_powergen_shown";

export default function PowerGenSlideout({ data }: { data: any }) {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {}

    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) return;
      const progress = doc.scrollTop / total;
      if (progress >= 0.2) {
        setOpen(true);
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: any) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-0 right-0  z-50 flex items-end justify-end p-4">
      {/* Popup */}
      <aside
        className="relative bg-white overflow-hidden rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out"
        role="dialog"
        aria-live="polite"
        aria-label="Generator rentals promo"
      >
        {/* Red accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl" />

        {/* Close button */}
        <button
          type="button"
          className="absolute group cursor-pointer top-4 right-4 w-8 h-8 border border-gray-200 rounded-md flex items-center justify-center text-gray-600 transition-colors"
          aria-label="Close promotion"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <svg
            className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Title with lightning icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black leading-tight">
              {data?.heading || "Power Generation Rentals"}
            </h3>
          </div>

          {/* Description */}
          <p className="text-black text-base leading-relaxed mb-6">
            {data?.description ||
              "Generator Rentals, Worksite Power & Emergency Power. Long-term rental discounts — call us today 1 877 740 RENT."}
          </p>

          {/* CTA Button */}
          <div className="flex">
            <Button
              onClick={() => {
                // Handle call action
                window.location.href = data?.button?.link || "tel:+18777407368";
                handleClose();
              }}
              btnType={data?.button?.btnType}
              link={data?.button?.link}
              linkType={data?.button?.linkType}
              title={data?.button?.title}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
