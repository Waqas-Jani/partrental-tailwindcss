/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/common/Icons";

const ProductGallery = ({
  mainImage,
  images = [],
  productName,
}: {
  mainImage: any;
  images: any;
  productName: string;
}) => {
  const [mainViewportRef, mainEmbla] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [thumbViewportRef, thumbEmbla] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbTweenValues, setThumbTweenValues] = useState<number[]>([]);

  // Ensure we have valid images and include mainImage if it exists
  const validImages = images?.filter(
    (img: any) => img && img.asset && img.asset.url
  );
  const allImages =
    validImages?.length > 0
      ? validImages
      : mainImage && mainImage.asset && mainImage.asset.url && [mainImage];

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainEmbla || !thumbEmbla) return;
      mainEmbla.scrollTo(index);
    },
    [mainEmbla, thumbEmbla]
  );

  const onSelect = useCallback(() => {
    if (!mainEmbla || !thumbEmbla) return;
    setSelectedIndex(mainEmbla.selectedScrollSnap());
    thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap());
  }, [mainEmbla, thumbEmbla, setSelectedIndex]);

  useEffect(() => {
    if (!mainEmbla) return;
    onSelect();
    mainEmbla.on("select", onSelect);
    mainEmbla.on("reInit", onSelect);
  }, [mainEmbla, onSelect]);

  useEffect(() => {
    if (!thumbEmbla) return;

    const onThumbScroll = () => {
      if (!thumbEmbla) return;
      const scrollProgress = thumbEmbla.scrollProgress();

      const styles = thumbEmbla.scrollSnapList().map((scrollSnap) => {
        const diffToTarget = scrollSnap - scrollProgress;
        const tweenValue = 1 - Math.abs(diffToTarget * 14.5);
        return tweenValue;
      });
      setThumbTweenValues(styles);
    };

    onThumbScroll();
    thumbEmbla.on("scroll", onThumbScroll);
    thumbEmbla.on("reInit", onThumbScroll);
  }, [thumbEmbla]);

  const scrollPrev = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollPrev();
  }, [mainEmbla]);

  const scrollNext = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollNext();
  }, [mainEmbla]);

  if (!allImages?.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="text-gray-500 text-lg mb-2">📷</div>
          <span className="text-gray-600">No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {/* Main Gallery */}
      <div className="relative mb-4">
        <div
          className="overflow-hidden rounded-lg bg-gray-50"
          ref={mainViewportRef}
        >
          <div className="flex h-[400px] md:h-[500px]">
            {allImages.map((image: any, index: number) => (
              <div key={`main-${index}`} className="flex-[0_0_100%] min-w-0">
                <div className="aspect-square relative h-full w-full">
                  <Image
                    src={image.asset.url}
                    alt={image.alt || `${productName} - Image ${index + 1}`}
                    fill
                    className="object-contain h-full w-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {allImages.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              onClick={scrollPrev}
              disabled={!mainEmbla?.canScrollPrev()}
            >
              <ChevronLeftIcon cls="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              onClick={scrollNext}
              disabled={!mainEmbla?.canScrollNext()}
            >
              <ChevronRightIcon cls="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <div className="overflow-hidden" ref={thumbViewportRef}>
          <div className="flex space-x-2">
            {allImages.map((image: any, index: number) => (
              <div
                key={`thumb-${index}`}
                className={`flex-[0_0_15%] min-w-0 cursor-pointer transition-all duration-200 ${
                  selectedIndex === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
                onClick={() => onThumbClick(index)}
                style={{
                  transform: `scale(${thumbTweenValues[index] || 1})`,
                }}
              >
                <div className="aspect-square relative rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={image.asset.url}
                    alt={image.alt || `${productName} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 80px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
