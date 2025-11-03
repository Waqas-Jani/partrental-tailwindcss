/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ProductCategories = ({ categories, page = "used" }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  // Initialize selected categories from URL
  useEffect(() => {
    setSelectedCats(getSelectedCategories());
  }, [searchParams]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement; // narrow type

      if (
        isOpen &&
        target instanceof HTMLElement && // ensure it's an element
        !target.closest(".shop-sidebar") &&
        !target.closest(".mobile-filters-toggle")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen]);

  // Parse selected categories from URL
  const getSelectedCategories = () => {
    const categoryParam = searchParams.get("category");
    if (!categoryParam) return [];
    return categoryParam.split(",").filter(Boolean);
  };

  // Handle category checkbox change
  const handleCategoryChange = (categorySlug: string) => {
    let newSelected: string[] = [];

    if (selectedCats.includes(categorySlug)) {
      newSelected = selectedCats.filter((slug) => slug !== categorySlug);
    } else {
      newSelected = [...selectedCats, categorySlug];
    }

    // Update local state immediately
    setSelectedCats(newSelected);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.length > 0) {
      params.set("category", newSelected.join(","));
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`/product-category/${page}?${params.toString()}`);
  };

  // Clear all selected categories
  const clearAllCategories = () => {
    setSelectedCats([]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.set("page", "1");
    router.push(`/product-category/${page}?${params.toString()}`);
  };

  // Redesigned filter UI for product categories

  // Helper: category color palette (for tag backgrounds)
  const tagColors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
    "bg-red-100 text-red-800",
    "bg-gray-100 text-gray-800",
  ];

  // Helper: get color for a tag
  const getTagColor = (idx: number) => tagColors[idx % tagColors.length];

  const renderCategoryContent = () => (
    <aside className="sidebar-widget category-widget rounded-xl lg:shadow-md bg-white p-6 mb-10">
      {/* Selected Filters */}
      {selectedCats.length > 0 && (
        <div className="selected-filters mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 text-sm tracking-wide uppercase">
              Selected Categories
            </span>
            <button
              className="text-xs text-primary hover:underline font-medium"
              onClick={clearAllCategories}
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCats.map((slug, idx) => {
              const category = categories.find(
                (c: any) => c.slug.current === slug
              );
              if (!category) return null;
              return (
                <span
                  key={slug}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagColor(
                    idx
                  )} shadow-sm`}
                >
                  {category.name}
                  <button
                    onClick={() => handleCategoryChange(slug)}
                    className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                    aria-label={`Remove ${category.name} filter`}
                    tabIndex={0}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 16 16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4l8 8m0-8L4 12"
                      />
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Title */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800 mb-0">
          Product Categories
        </h4>
        {selectedCats.length === 0 ? null : (
          <span className="hidden md:inline text-xs text-gray-600">
            {selectedCats.length} selected
          </span>
        )}
      </div>

      {/* Category Checkboxes */}
      <div className="space-y-2">
        {categories?.length > 0 && categories?.map((category: any, idx: number) => {
          const isSelected = selectedCats.includes(category.slug.current);
          return (
            <label
              key={idx}
              htmlFor={`category-${category.slug.current}`}
              className={`flex font-bold items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="relative mr-3 flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.slug.current}`}
                  checked={isSelected}
                  onChange={() => handleCategoryChange(category.slug.current)}
                  className="peer appearance-none h-5 w-5 border-2 border-gray-300 rounded-md checked:border-primary checked:bg-primary transition-colors duration-150 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  style={{ minWidth: "1.25rem" }}
                />
                <span
                  className={`
                    pointer-events-none absolute left-0 top-0 h-5 w-5 flex items-center justify-center
                    rounded-md
                    transition-colors duration-150
                    ${
                      isSelected
                        ? "bg-primary border-primary"
                        : "bg-gray-200 border-gray-300"
                    }
                  `}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3.5 8.5 7 12 12.5 5.5" />
                    </svg>
                  )}
                </span>
              </span>
              <span
                className={`flex-1 text-sm ${
                  isSelected ? "font-semibold text-primary" : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
              {typeof category.count === "number" && (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-primary/10 text-primary"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {category.count}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile filters toggle button */}
      <div className="lg:hidden mb-4">
        <div className="container">
          <div className="flex items-center">
            <button
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary font-semibold shadow hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={() => setIsOpen(true)}
              aria-expanded={isOpen}
              aria-label="Toggle filters"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
              </svg>
              <span>Filters</span>
              {selectedCats.length > 0 && (
                <span className="absolute -top-2 right-0 ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-bold shadow">
                  {selectedCats.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          isOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`sidebar-overlay fixed inset-0 bg-black/50 transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        {/* Sidebar */}
        <div
          className={`shop-sidebar fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <span className="text-lg font-bold text-gray-800">Filters</span>
            <button
              className="sidebar-close text-gray-400 hover:text-red-500"
              onClick={() => setIsOpen(false)}
              aria-label="Close filters"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
            {renderCategoryContent()}
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="shop-sidebar">{renderCategoryContent()}</div>
      </div>
    </>
  );
};

export default ProductCategories;
