"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 overflow-hidden">
      {/* Decorative SVG background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
      >
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 opacity-20"
          width="1200"
          height="600"
          fill="none"
          viewBox="0 0 1200 600"
        >
          <ellipse
            cx="600"
            cy="200"
            rx="500"
            ry="120"
            fill="#3b82f6"
            fillOpacity="0.08"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="400"
            ry="80"
            fill="#0ea5e9"
            fillOpacity="0.06"
          />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-xl mx-auto px-6">
        <div className="bg-white/90 rounded-3xl shadow-2xl px-8 py-12 flex flex-col items-center">
          <div className="flex items-center justify-center mb-6">
            <span className="text-[6rem] md:text-[7rem] font-extrabold text-primary drop-shadow-lg tracking-widest select-none">
              404
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-500 mb-6 text-center">
            Sorry, we couldn&apos;t find what you were looking for.
            <br />
            The page may have been moved, deleted, or never existed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
          <div className="mt-8 flex justify-center gap-4 text-4xl md:text-5xl">
            <span role="img" aria-label="Construction">
              🚧
            </span>
            <span role="img" aria-label="Magnifying glass">
              🔍
            </span>
            <span role="img" aria-label="Confused face">
              😕
            </span>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          If you believe this is an error, please{" "}
          <Link
            href="/contact"
            className="text-primary underline hover:text-red-700 transition"
          >
            Contact us
          </Link>
          .
        </div>
      </div>
    </section>
  );
}
