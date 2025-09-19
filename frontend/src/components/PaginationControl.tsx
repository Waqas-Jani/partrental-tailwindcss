"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { slug } from "@/utils";

const PaginationControl = ({
  currentPage,
  pageCount,
  basePath,
}: {
  currentPage: number;
  pageCount: number;
  basePath: string;
}) => {
  const router = useRouter();

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];
    let l;

    // Always include first and last page
    range.push(1);

    // Calculate range based on current page and total pages
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < pageCount && i > 1) {
        range.push(i);
      }
    }

    range.push(pageCount);

    // Add dots where pages are skipped
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  const goToPage = (page: number) => {
    if (page === 1) {
      router.push(basePath);
    } else {
      router.push(`${basePath}?page=${page}`);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <ul className="flex flex-row gap-x-2">
        {currentPage > 1 && (
          <li className="prev">
            <a
              onClick={() => goToPage(currentPage - 1)}
              href={
                currentPage === 2
                  ? basePath
                  : `${basePath}?page=${currentPage - 1}`
              }
              aria-label="Previous page"
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) =>
                e.key === "Enter" && goToPage(currentPage - 1)
              }
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
            >
              &lt;
            </a>
          </li>
        )}

        {pageNumbers.map((page: number | string, index: number) => {
          if (page === "...") {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                  ...
                </span>
              </li>
            );
          }

          const isActive = page === currentPage;
          const pageHref = page === 1 ? basePath : `${basePath}?page=${page}`;

          return (
            <li key={page}>
              <Link
                href={slug(pageHref)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-primary hover:text-white hover:border-primary"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {currentPage < pageCount && (
          <li className="next">
            <a
              onClick={() => goToPage(currentPage + 1)}
              href={`${basePath}?page=${currentPage + 1}`}
              aria-label="Next page"
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) =>
                e.key === "Enter" && goToPage(currentPage + 1)
              }
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
            >
              &gt;
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PaginationControl;
