/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const Features = ({ data }: any) => {
  return (
    <section
      id={data?.sectionId?.replace(/\s+/g, "") ?? ""}
      className="bg-white py-10"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {(data.heading || data.description) && (
          <div className="sm:mb-[50px] mb-5">
            <h2 className="h1-type text-center">{data.heading}</h2>
            <p className="text-base md:text-lg">{data.description}</p>
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-6 sm:gap-12 text-center sm:grid-cols-2 md:grid-cols-2 lg:gap-y-16 ${
            data.features.length === 3 ? "lg:grid-cols-3" : ""
          }`}
        >
          {data.features.map((feature: any, key: number) => (
            <div
              key={key}
              className={`${
                data.features.length === 3 && feature.icon?.asset?.url
                  ? "bg-black px-5 py-3"
                  : "bg-[#f5f5f5] px-5 py-3"
              }`}
            >
              {feature.icon?.asset?.url && (
                <div className="relative flex items-center justify-center mx-auto mb-4 sm:mb-8">
                  <Image
                    src={feature.icon.asset.url}
                    alt={feature.title}
                    className="w-20 h-20 object-contain"
                    width={80}
                    height={80}
                  />
                </div>
              )}
              <h4
                className={`font-extrabold ${
                  data.features.length === 3 && feature.icon?.asset?.url
                    ? "text-white text-lg"
                    : feature.description
                    ? "text-primary text-lg md:text-xl mb-15"
                    : "text-black text-lg md:text-xl mb-15"
                }`}
              >
                {feature.title}
              </h4>
              {feature.description && (
                <p className="mt-2 sm:mt-4 text-base font-bold text-gray-800">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
