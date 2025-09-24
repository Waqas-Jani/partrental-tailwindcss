/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import Button from "@/components/common/Button";
import Accordion from "@/components/common/Accordion";

const WhyChooseUs = ({ data }: any) => {
  return (
    <section className="pt-[100px] pb-[80px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Image Column - Fixed dimensions */}
          <div className="w-full h-[600px] relative md:sticky md:top-8">
            <Image
              src={data.image.asset.url}
              alt={data.image.alt || data.heading}
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content Column - Flexible */}
          <div className="wow fadeInRight flex flex-col">
            <div className="text-center">
              <span className="sub-title md:ml-12">{data.subheading}</span>
              <h2 className="h1-type mt-5">{data.heading}</h2>
            </div>

            {/* Accordion for Points */}
            {data.points && data.points.length > 0 && (
              <Accordion items={data.points} />
            )}

            <div className="mt-10 flex md:justify-start justify-center">
              {data?.button?.title && (
                <Button
                  title={data.button.title}
                  btnType={data?.button.btnType}
                  link={data?.button.link}
                  linkType={data?.button.linkType}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
