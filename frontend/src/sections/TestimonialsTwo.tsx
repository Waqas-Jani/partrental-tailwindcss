/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface TestimonialsProps {
  data: {
    subheading: string;
    heading: string;
    clients: Array<{
      feedback: string;
      name: string;
      designation: string;
      photo?: {
        alt: string;
        url: string;
      };
    }>;
  };
}

const TestimonialsTwo = ({ data }: TestimonialsProps) => {
  // --- AUTOPLAY PLUGIN ---
  const autoplayPluginRef = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [autoplayPluginRef.current]
  );

  const [selectedPage, setSelectedPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // default desktop

  // --- RESPONSIVE ITEMS PER PAGE ---
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1); // mobile
      else if (window.innerWidth < 1024) setItemsPerPage(2); // tablet
      else setItemsPerPage(3); // desktop
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalItems = data?.clients?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // --- AUTOPLAY RESET HELPER ---
  const resetAutoplay = useCallback(() => {
    const plugin = autoplayPluginRef.current as any;
    try {
      if (plugin?.reset) plugin.reset();
      else if (plugin?.play) plugin.play();
    } catch {
      /* silent fail */
    }
  }, []);

  // --- SCROLL HELPERS ---
  const scrollToPage = useCallback(
    (pageIndex: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(pageIndex * itemsPerPage);
      resetAutoplay();
    },
    [emblaApi, itemsPerPage, resetAutoplay]
  );

  const scrollPrevPage = useCallback(() => {
    if (!emblaApi) return;
    const currentSlide = emblaApi.selectedScrollSnap();
    const currentPage = Math.floor(currentSlide / itemsPerPage);
    const newPage = currentPage > 0 ? currentPage - 1 : totalPages - 1; // wrap when loop
    scrollToPage(newPage);
  }, [emblaApi, itemsPerPage, scrollToPage, totalPages]);

  const scrollNextPage = useCallback(() => {
    if (!emblaApi) return;
    const currentSlide = emblaApi.selectedScrollSnap();
    const currentPage = Math.floor(currentSlide / itemsPerPage);
    const newPage = (currentPage + 1) % totalPages; // wrap around
    scrollToPage(newPage);
  }, [emblaApi, itemsPerPage, scrollToPage, totalPages]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const slide = emblaApi.selectedScrollSnap();
    setSelectedPage(Math.floor(slide / itemsPerPage));
  }, [emblaApi, itemsPerPage]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // --- SVG ICONS ---
  const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg
      className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  return (
    <section className="testimonial-section py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* BG Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="sub-title">{data.subheading}</span>
          <h2 className="h1-type mt-4">{data?.heading}</h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="embla overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-6">
              {data?.clients.map((item, index) => (
                <div
                  key={index}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="group h-full">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8 h-full flex flex-col relative overflow-hidden border border-gray-100">
                      <div className="absolute top-6 right-6 text-primary/10 text-6xl font-serif leading-none">
                        &ldquo;
                      </div>

                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>

                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 flex-1 relative z-10">
                        <span className="text-primary text-2xl font-serif leading-none mr-2">
                          &ldquo;
                        </span>
                        {item.feedback}
                        <span className="text-primary text-2xl font-serif leading-none ml-1">
                          &rdquo;
                        </span>
                      </blockquote>

                      <div className="flex items-center pt-6 border-t border-gray-100">
                        <div className="w-12 h-12 mr-4 shadow-lg rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                          {item.photo?.url ? (
                            <Image
                              src={item.photo.url}
                              alt={item.photo.alt || item.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-lg">
                              {item.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 font-medium">
                            {item.designation}
                          </p>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 space-x-4">
              <button
                onClick={scrollPrevPage}
                className="group flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Previous testimonials"
              >
                <ChevronLeftIcon />
              </button>

              <div className="flex space-x-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === selectedPage
                        ? "bg-primary scale-125 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                    }`}
                    onClick={() => scrollToPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={scrollNextPage}
                className="group flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Next testimonials"
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsTwo;
