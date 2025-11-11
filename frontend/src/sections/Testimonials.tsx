"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface TestimonialsProps {
  data: {
    subheading: string;
    heading: string;
    clients: Array<{
      feedback: string;
      name: string;
      designation: string;
    }>;
  };
}

const Testimonials = ({ data }: TestimonialsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="testimonial-section py-10 md:py-16 bg-gray-50">
      <div className="tp-container">
        <div className="text-center mb-16">
          <span className="sub-title">{data.subheading}</span>
          <h2 className="h1-type mt-4">{data?.heading}</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {data?.clients.map((item, index) => (
                <div
                  className="embla__slide flex-[0_0_100%] min-w-0 px-4"
                  key={index}
                >
                  <div className="text-center p-8 pt-0">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                      &ldquo;{item.feedback}&rdquo;
                    </p>
                    <div className="flex justify-center items-center">
                      <div>
                        <h4 className="text-xl font-extrabold text-black mb-2">
                          {item.name}
                        </h4>
                        <p className="position text-gray-600">
                          {item.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
