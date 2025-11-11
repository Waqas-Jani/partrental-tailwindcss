"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Partner {
  imgBlack: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

interface PartnersProps {
  data: {
    partners: Partner[];
    heading?: string;
  };
}

const Partners = ({ data }: PartnersProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <section className="relative z-10 py-10 md:py-16 bg-gray-50">
      <div className="tp-container">
        <p className="text-center h1-type mb-5">{data?.heading}</p>
        <div className="border-t border-gray-200 pt-10 md:pt-12">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {data?.partners.map((item: any, index: number) => (
                <div className="flex-[0_0_20%] min-w-0 px-2" key={index}>
                  <div className="flex items-center justify-center h-24 w-full max-w-62">
                    <div className="flex items-center justify-center cursor-pointer">
                      <Image
                        src={item.imgBlack?.asset?.url}
                        alt={
                          item.imgBlack?.alt || item.heading || "partner logo"
                        }
                        width={200}
                        height={100}
                        className="object-contain max-h-20 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
