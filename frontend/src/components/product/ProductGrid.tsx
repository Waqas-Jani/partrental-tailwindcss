/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import UsedProductItem from "./UsedProductItem";
import Pagination from "../../components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

const ProductGrid = ({
  products,
  currentPage,
  totalPages,
  totalCount,
  sort = "default",
  baseUrl,
}: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Calculate showing products range
  const itemsPerPage = 20;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  // Handle sort change
  const handleSortChange = (e: any) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (newSort !== "default") {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }

    // Reset to page 1 when changing sort
    params.set("page", "1");

    router.push(`${baseUrl}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 items-center mb-4 border-b border-gray-200 pb-5">
        <div className="">
          <div className="text-sm text-gray-500 font-medium">
            Showing {startItem}-{endItem} of {totalCount} results
          </div>
        </div>
        <div className="">
          <div className="flex justify-end">
            <select
              className="outline-none text-sm px-5"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="default">Default sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center bg-gray-50 p-10 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="94"
            height="94"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17a2 2 0 1 0 2 2" />
            <path d="M17 17h-11v-11" />
            <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
            <path d="M3 3l18 18" />
          </svg>
          <h4 className="text-2xl font-extrabold mb-3 mt-3">
            No products found
          </h4>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5">
          {products.map((product: any) => (
            <div key={product._id}>
              <UsedProductItem product={product} />
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
