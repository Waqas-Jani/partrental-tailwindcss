/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import LandingPageForm from "./Form";

const LandingHero = ({ data, form }: any) => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={data?.bg?.asset?.url}
          alt={data?.heading || "Hero Image"}
          loading="eager"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      {/* Optional Background Overlay */}
      <div
        className="w-full h-full absolute inset-0"
        style={{
          backgroundColor: data?.bgOpacity?.rgb
            ? `rgba(${data.bgOpacity?.rgb.r}, ${data.bgOpacity?.rgb.g}, ${data.bgOpacity?.rgb.b}, ${data.bgOpacity?.rgb.a})`
            : "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:leading-[80px]">
                  {data?.heading}
                </h1>
                <p className="text-white text-lg md:text-xl leading-relaxed mb-8 text-bold">
                  {data?.description}
                </p>
                {data?.button?.title && (
                  <div className="flex">
                    <Button
                      title={data?.button?.title}
                      btnType={data?.button?.btnType || "primary"}
                      link={data?.button?.link}
                      linkType={data?.button?.linkType}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Form */}
            {data?.enableForm && (
              <div className="w-full lg:w-1/2 lg:pl-8">
                <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto lg:mx-0">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Get a Free Quote
                    </h2>
                  </div>
                  <LandingPageForm data={form} isHero={true} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
