/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../common/SocialIcons";
import ReservationForm from "./ReservationForm";
import Image from "next/image";

const ProductHeader = ({ data, locations }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false);

  const product = {
    title: data?.title,
    variants: data?.productVariants,
  };

  // Mock data - replace with actual data from props

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === data.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? data.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white pt-24 pb-12 border-b border-gray-200">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <Image
                src={data.gallery[currentImageIndex].asset.url}
                alt={data.title}
                className="w-full h-full object-cover object-center"
                width={1000}
                height={1000}
              />

              {/* Navigation Arrows */}
              {data.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-none rounded-full p-2 shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 flex items-center justify-center w-10 h-10"
                  >
                    <ChevronLeftIcon cls="h-6 w-6 text-gray-500" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-none rounded-full p-2 shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 flex items-center justify-center w-10 h-10"
                  >
                    <ChevronRightIcon cls="h-6 w-6 text-gray-500" />
                  </button>
                </>
              )}
            </div>

            {/* Image Indicators */}
            {data.gallery.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {data.gallery.map((_: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full border-none cursor-pointer transition-colors duration-200 ${
                      index === currentImageIndex ? "bg-red-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight m-0">
              {data.title}
            </h1>

            {/* Location and Rental Dates */}
            <div className="p-0">
              {/* Quantity and Reserve Section */}
              <div className="flex flex-col  sm:items-stretch">
                <div className="pt-6 border-t border-gray-200">
                  {/* Specifications */}
                  <div className="mb-6 last:mb-0">
                    <div className="gap-4 text-sm">{data.description}</div>
                    {/* Product Variants */}
                    {data.productVariants?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Variants
                        </h4>
                        <ul className="list-disc list-inside p-0 m-0">
                          {data.productVariants.map((variant: any) => (
                            <li key={variant} className="mb-1">
                              {variant}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reserve Button */}
                <div>
                  <button
                    className="bg-red-600 text-white font-semibold px-8 py-3 rounded-md text-base border-none cursor-pointer transition-all duration-200 mt-6 shadow-md hover:bg-red-700 hover:shadow-lg w-full sm:w-auto"
                    onClick={() => setIsReservationFormOpen(true)}
                  >
                    RESERVE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Product Information */}
          </div>
        </div>
      </div>

      {/* Reservation Form Modal */}
      <ReservationForm
        isOpen={isReservationFormOpen}
        onClose={() => setIsReservationFormOpen(false)}
        productTitle={data?.title || "Product"}
        product={product}
        locations={locations}
      />
    </div>
  );
};

export default ProductHeader;
