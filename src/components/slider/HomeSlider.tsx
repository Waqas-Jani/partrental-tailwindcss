"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/common/SocialIcons";
import { SanityButton } from "@/types/common";
import Button from "@/components/common/Button";

interface HeroSlide {
  id: string;
  bg: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  heading: string;
  subheading: string;
  description?: string;
}

interface HomeHeroProps {
  data: {
    slider: HeroSlide[];
    button: SanityButton;
    button2: SanityButton;
  };
}
const HeroSlider = ({ data }: HomeHeroProps) => {
  const { slider, button, button2 } = data;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false }), Fade()]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="relative h-[100vh] min-h-[700px]">
      {/* Embla Carousel Container */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slider.map((slide, index) => (
            <div key={slide.id} className="embla__slide relative h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.bg.asset.url}
                  alt={slide.bg.alt || slide.heading}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 z-10"></div>

              {/* Content - Most Top Layer */}
              <div className="absolute inset-0 flex items-center z-20 tp-container">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl text-white">
                    <h2 className="text-2xl underline ring-offset-4 ring-white tracking-wide text-white mb-2 font-extrabold">
                      {slide.subheading}
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                      {slide.heading}
                    </h1>
                    {slide.description && (
                      <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90 max-w-2xl">
                        {slide.description}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {button && (
                        <Button
                          title={button?.title}
                          btnType={button?.btnType}
                          link={button?.link}
                          linkType={button?.linkType}
                          disabled={false}
                        />
                      )}

                      {button2 && (
                        <Button
                          title={button2?.title}
                          btnType={button2.btnType}
                          link={button2?.link}
                          linkType={button2?.linkType}
                          disabled={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Right Bottom */}
      <div className="absolute bottom-0 right-6 flex space-x-2 z-30">
        <button
          className="flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white h-14 w-14 cursor-pointer"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <span className="text-primary-gray">
            <ArrowLeftIcon cls="w-8 h-8" />
          </span>
        </button>
        <button
          className="flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white h-14 w-14 cursor-pointer"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <span className="text-primary-gray">
            <ArrowRightIcon cls="w-8 h-8" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
