/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LandingHero from "./Hero";
import Features from "./features";
import Testimonial from "./Testimonial";
import LandingPageForm from "./Form";
import { PortableText } from "@portabletext/react";
import { slug } from "../../utils";
import ExitIntentPopup from "@/components/common/ExitIntentPopup";
import ImageContent from "@/components/common/imageContent";
import ServiceSection from "./ServiceSec";

const LandingPage = ({ data }: any) => {
  // State to enable/disable exit intent popup
  const [exitIntentEnabled, setExitIntentEnabled] = useState(false);

  // Enable exit intent popup after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setExitIntentEnabled(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {data?.topBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 p-1 flex items-center justify-center px-[20px] md:px-10 bg-primary text-white">
          <div>
            <a
              className="text-base font-bold"
              href={`tel:${data.topBanner.replace(/-/g, "")}`}
            >
              {data?.topBanner || ""}
            </a>
          </div>
        </div>
      )}
      <div className="overflow-x-hidden max-w-[100vw]">
        <LandingHero data={data?.landingHero} form={data?.landingForm} />
        {data?.landingFeatures?.enable && (
          <Features data={data?.landingFeatures} />
        )}
        {data?.imageContent?.enable && (
          <ImageContent
            data={data.imageContent}
            index={0}
            noPadding={false}
            locations={[]}
          />
        )}
        {data?.serviceSec?.enable && <ServiceSection data={data?.serviceSec} />}
        {data?.landingTestimonial?.enable && (
          <Testimonial data={data?.landingTestimonial} />
        )}
        {data?.message && (
          <div className="w-full bg-[#f5f5f5]" style={{ padding: "50px 0" }}>
            <div className="max-w-3xl mx-auto px-4">
              <p className="text-xl sm:text-3xl text-center text-primary leading-relaxed font-bold">
                {data?.message}
              </p>
            </div>
          </div>
        )}
        {data?.landingSteps?.enable && <Features data={data?.landingSteps} />}

        {data?.landingForm?.enable && (
          <LandingPageForm data={data?.landingForm} />
        )}
        <div className="max-w-5xl mx-auto mt-10 px-10 text-left mb-8">
          <div className="">
            <div className="porse">
              <PortableText
                value={data?.note}
                components={{
                  marks: {
                    link: ({ value, children }) => {
                      const isExternal = (value?.href || "").match(
                        /^(https?:|tel:|mailto:|ftp:|file:|\/\/)/i
                      );
                      const target =
                        isExternal &&
                        !(value?.href || "").startsWith("tel:") &&
                        !(value?.href || "").startsWith("mailto:")
                          ? "_blank"
                          : undefined;

                      if (!isExternal) {
                        return (
                          <Link
                            href={slug(value?.href)}
                            className="underline transition-colors duration-150 ease-linear underline-offset-8 hover:text-primary font-semibold"
                          >
                            {children}
                          </Link>
                        );
                      } else {
                        return (
                          <a
                            href={value?.href}
                            target={target as string}
                            rel={
                              target === "_blank"
                                ? "noindex nofollow"
                                : undefined
                            }
                            className="underline transition-colors duration-150 ease-linear underline-offset-8 hover:text-primary font-semibold"
                          >
                            {children}
                          </a>
                        );
                      }
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Exit Intent Popup */}
      </div>
      {exitIntentEnabled && <ExitIntentPopup config={data?.exitIntentPopup} />}
    </>
  );
};

export default LandingPage;
