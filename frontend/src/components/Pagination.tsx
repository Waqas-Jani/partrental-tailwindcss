/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage, totalPages, baseUrl }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle page change
  const handlePageChange = (pageNumber: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`${baseUrl}?${params.toString()}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max pages to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range to show maxPagesToShow - 2 pages (excluding first and last)
      if (end - start < maxPagesToShow - 3) {
        if (currentPage < totalPages / 2) {
          end = Math.min(start + maxPagesToShow - 3, totalPages - 1);
        } else {
          start = Math.max(end - (maxPagesToShow - 3), 2);
        }
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pageNumbers.push("...");
      }

      // Add page numbers in range
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center mt-10" aria-label="Product pagination">
      <ul className="inline-flex items-center gap-2 bg-white/80 rounded-xl px-4  py-2 ">
        {/* Previous button */}
        <li>
          <button
            className={`group flex items-center px-3 py-2 rounded-full border border-gray-300 bg-gradient-to-r from-gray-50 to-white text-gray-500 hover:bg-primary/10 hover:text-primary transition disabled:opacity-40 disabled:cursor-not-allowed`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg
              className="w-5 h-5 group-hover:text-primary transition"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="ml-1 hidden md:inline text-xs font-medium">
              Prev
            </span>
          </button>
        </li>

        {/* Page numbers */}
        {getPageNumbers().map((pageNumber, index) => (
          <li key={index}>
            {pageNumber === "..." ? (
              <span className="px-3 py-2 text-gray-400 select-none text-lg font-bold">
                …
              </span>
            ) : (
              <button
                className={`relative px-4 py-2 border border-gray-200 font-semibold transition rounded-full shadow-sm
                  ${
                    pageNumber === currentPage
                      ? "bg-primary text-white shadow-primary/30 shadow-lg scale-105 z-10"
                      : "bg-white text-gray-700 hover:bg-primary/10 hover:text-primary"
                  }
                `}
                onClick={() => handlePageChange(pageNumber)}
                aria-label={`Page ${pageNumber}`}
                aria-current={pageNumber === currentPage ? "page" : undefined}
              >
                {pageNumber}
                {pageNumber === currentPage && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce" />
                )}
              </button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            className={`group flex items-center px-3 py-2 rounded-full border border-gray-300 bg-gradient-to-r from-white to-gray-50 text-gray-500 hover:bg-primary/10 hover:text-primary transition disabled:opacity-40 disabled:cursor-not-allowed`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <span className="mr-1 hidden md:inline text-xs font-medium">
              Next
            </span>
            <svg
              className="w-5 h-5 group-hover:text-primary transition"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
