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
    <div className="mt-10">
      <ul className="pagination center">
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
            >
              &lt;
            </a>
          </li>
        )}

        {pageNumbers.map((page: number | string, index: number) => {
          if (page === "...") {
            return (
              <li key={`ellipsis-${index}`}>
                <span>...</span>
              </li>
            );
          }

          const isActive = page === currentPage;
          const pageHref = page === 1 ? basePath : `${basePath}?page=${page}`;

          return (
            <li key={page} className={isActive ? "active" : ""}>
              <Link
                href={slug(pageHref)}
                className={isActive ? "active" : ""}
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
