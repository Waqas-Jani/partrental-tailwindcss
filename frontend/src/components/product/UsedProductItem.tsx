/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import QuoteRequestForm from "./QuoteRequestForm";
import SanityImage from "@/components/common/SanityImage";

const UsedProductItem = ({ product }: any) => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  const handleQuoteRequest = () => {
    setIsQuoteFormOpen(true);
  };

  const handleCloseQuoteForm = () => {
    setIsQuoteFormOpen(false);
  };

  // Default placeholder image
  const placeholderImage = "/placeholder.png";

  return (
    <>
      <div className="relative bg-white rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 group hover:translate-y-[-5px] flex flex-col h-full min-h-[480px]">
        <div className="flex-1 flex flex-col">
          <Link href={`/product/${product.slug}`}>
            <div className="bg-gray-50 aspect-[4/3] w-full relative group-hover:scale-105 transition-all duration-300">
              <SanityImage
                image={product.featuredImage}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full object-cover"
              />
              {!product.featuredImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          </Link>
          {product.onSale && product.salePrice && (
            <span className="absolute top-1 right-1 bg-primary text-white px-4 py-2 rounded-md shadow-md font-bold text-sm">
              Sale
            </span>
          )}

          {product.categories && product.categories.length > 0 && (
            <div className="mb-4">
              {product.categories
                .slice(0, 1)
                .map((category: any, index: number) => (
                  <span
                    key={index}
                    className="text-[12px] bg-primary text-white px-2 py-1 rounded-sm mr-2 font-bold"
                  >
                    {category}
                  </span>
                ))}
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <Link href={`/product/${product.slug}`}>
            <h4 className="text-2xl font-bold mb-2">{product.name}</h4>
            <div className="font-bold text-lg">
              {product.onSale && product.salePrice ? (
                <>
                  <span className="">
                    ${product.salePrice.toLocaleString()}
                  </span>
                  <span className="line-through text-gray-400 ml-2">
                    ${product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="">${product.price.toLocaleString()}</span>
              )}
            </div>
            {typeof product.leasePrice === "number" && (
              <span className="font-medium text-gray-600 text-sm mb-4 block">{`Lease: $${product.leasePrice.toLocaleString()}/Month`}</span>
            )}
          </Link>
          <div className="flex flex-col gap-2 mt-auto">
            <Link
              href={`/product/${product.slug}`}
              className="bg-gray-100 font-bold text-sm text-black w-full flex items-center justify-center px-4 py-3 rounded-md hover:bg-gray-200 transition-all duration-300"
            >
              View Details
            </Link>
            <button
              className="bg-primary font-bold text-sm text-white px-4 py-3 rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
              onClick={handleQuoteRequest}
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>

      <QuoteRequestForm
        isOpen={isQuoteFormOpen}
        onClose={handleCloseQuoteForm}
        productName={product.name}
      />
    </>
  );
};

export default UsedProductItem;
