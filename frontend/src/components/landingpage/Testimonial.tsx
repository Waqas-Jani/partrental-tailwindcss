/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Testimonial = ({ data }: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  return (
    <section
      id={data?.sectionId?.replace(/\s+/g, "") ?? ""}
      className="bg-[#1c1c1c] text-white"
      style={{
        padding: "50px 0",
      }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 landingpage-testimonials">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {data.testimonials.map((testimonial: any, key: number) => (
              <div className="embla__slide flex-[0_0_100%] min-w-0" key={key}>
                <div className="text-center my-auto">
                  <blockquote className="max-w-xl mx-auto">
                    <p className="text-xl italic">
                      &quot;{testimonial.feedback}&quot;
                    </p>
                  </blockquote>
                  <p className="mt-6 text-lg md:text-xl font-bold ">
                    {testimonial.reviwerName},&nbsp;
                    <span className="font-medium text-lg md:text-xl text-white/95">
                      {testimonial.reviewerDesignation}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
