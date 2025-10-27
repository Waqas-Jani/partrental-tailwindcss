/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "../components/common/Button";
import { PortableText } from "@portabletext/react";

import SanityImage from "@/components/common/SanityImage";

const About = ({ data }: { data: any }) => {
  return (
    <section className="mt-10">
      <div className="lg:max-w-[1100px] mx-auto px-5 sm:px-[100px] lg:px-4">
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          <div className="lg:w-[45%]">
            <div className="w-full h-full">
              <SanityImage
                image={data.image}
                className="w-full h-full object-cover"
                width={500}
                height={650}
              />
            </div>
          </div>
          <div className="lg:w-[55%]">
            <div className="w-full h-full lg:pl-[60px] pt-[70px] pb-[40px] pt-[70px">
              <div className="mb-8 text-center md:text-left">
                <span className="sub-title md:ml-12">{data.subheading}</span>
                <h2 className="h1-type mt-5">{data.heading}</h2>
                <div className="text-lg text-secondary mt-8">
                  <PortableText value={data.description} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {data?.button?.title && (
                  <Button
                    title={data.button.title}
                    btnType={data?.button.btnType}
                    link={data?.button.link}
                    linkType={data?.button.linkType}
                  />
                )}
                {data?.button2?.title && (
                  <Button
                    title={data.button2.title}
                    btnType={data?.button2.btnType}
                    link={data?.button2.link}
                    linkType={data?.button2.linkType}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
