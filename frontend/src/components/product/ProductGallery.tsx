/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/common/Icons";
import SanityImage from "@/components/common/SanityImage";
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
        align: "center",
        axis: "x",
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [thumbTweenValues, setThumbTweenValues] = useState<number[]>([]);

    // Ensure we have valid images and include mainImage if it exists
    const validImages = images?.filter(
        (img: any) => img && img.asset && img.asset.url
    );
    const featuredImage = mainImage && mainImage.asset && mainImage.asset.url ? [mainImage] : []
    const allImages = [...featuredImage, ...validImages];

    // Calculate actual image count for index mapping
    const actualImageCount = allImages.length;

    const onThumbClick = useCallback(
        (index: number) => {
            if (!mainEmbla) return;
            // Map the thumbnail index to the actual image index (modulo)
            const actualIndex = index % actualImageCount;
            mainEmbla.scrollTo(actualIndex);
        },
        [mainEmbla, actualImageCount]
    );

    const onSelect = useCallback(() => {
        if (!mainEmbla || !thumbEmbla) return;
        const selected = mainEmbla.selectedScrollSnap();
        setSelectedIndex(selected);
        // Scroll thumbnail carousel to show the selected thumbnail
        // Use the selected index directly (Embla will handle the scroll)
        thumbEmbla.scrollTo(selected, true); // true for smooth scroll
    }, [mainEmbla, thumbEmbla]);

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
                                    <SanityImage
                                        image={image}
                                        width={1000}
                                        height={1000}
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
                {allImages?.length > 1 && (
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
            {allImages?.length > 1 && (
                <div
                    className="overflow-hidden"
                    ref={thumbViewportRef}
                >
                    <div className="flex space-x-2">
                        {allImages.map((image: any, index: number) => {
                            const actualIndex = index % actualImageCount;
                            const isSelected = selectedIndex === actualIndex;
                            return (
                                <div
                                    key={`thumb-${index}`}
                                    className={`flex-[0_0_100px] min-w-[100px] cursor-pointer transition-all duration-200 ${
                                        isSelected
                                            ? "ring-2 ring-primary ring-offset-2"
                                            : "opacity-60 hover:opacity-100"
                                    }`}
                                    onClick={() => onThumbClick(index)}
                                    style={{
                                        transform: `scale(1)`,
                                    }}
                                >
                                    <div className="aspect-square relative rounded-md overflow-hidden bg-gray-100">
                                        <Image
                                            src={image?.asset?.url}
                                            alt={image.alt || `${productName} - Thumbnail ${actualIndex + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 20vw, 100px"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
