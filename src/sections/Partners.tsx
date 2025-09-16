"use client";
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
  heading?: string;
}

interface PartnersProps {
  data: {
    partners: Partner[];
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
    <section className="relative z-10 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="border-t border-gray-200 pt-12">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {data?.partners.map((item, index) => (
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
                        className="object-contain max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
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
