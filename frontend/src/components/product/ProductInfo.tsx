/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import QuoteRequestForm from "./QuoteRequestForm";
import { PortableText } from "@portabletext/react";

const ProductInfo = ({ product }: any) => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-3xl">{product.name}</h1>
        {product.sku && (
          <span className="mt-3 font-bold block">SKU: {product.sku}</span>
        )}
      </div>

      {product.shortDescription && (
        <div className="prose mt-3 text-black">{product.shortDescription}</div>
      )}

      {product.price && (
        <div className="flex items-center gap-2 mt-5">
          {product.onSale && product.salePrice ? (
            <h5>
              <span className="text-lg text-primary font-extrabold">
                ${product.salePrice.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-gray-600 line-through">
                ${product.price.toLocaleString()}
              </span>
            </h5>
          ) : (
            <span className="text-lg font-extrabold text-black">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
      )}
      {typeof product.leasePrice === "number" && (
        <h5 className="text-base font-bold text-gray-800 mb-4">{`Lease: $${product.leasePrice.toLocaleString()}/Month`}</h5>
      )}

      {product.categories?.length > 0 && (
        <div className="">
          <span className="text-sm font-bold text-gray-800 mb-2">Categories:</span>
          {product.categories.map((category: any, index: number) => (
            <React.Fragment key={category.slug.current}>
              <span className="text-sm text-gray-600 ml-1">{category.name}</span>
              {index < product.categories.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => setIsQuoteFormOpen(true)}
          className="bg-primary font-bold text-sm text-white px-4 py-3 rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
        >
          Request Quote
        </button>
      </div>

      {product.description && (
        <div className="">
          <h3>Description</h3>
          <div className="">
            <PortableText value={product.description} />
          </div>
        </div>
      )}

      {product.purchaseNote && (
        <div className="">
          <h3>Purchase Note</h3>
          <div className="">
            <PortableText value={product.purchaseNote} />
          </div>
        </div>
      )}

      <QuoteRequestForm
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
        productName={product.name}
      />
    </div>
  );
};

export default ProductInfo;
