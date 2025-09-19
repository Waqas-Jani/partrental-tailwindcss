/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { slug } from "@/utils/index";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { PlayIcon } from "@/components/common/SocialIcons";
import VideoPopup from "@/components/common/VideoPopup";

const Services = ({ data }: any) => {
  const [video, setVideo] = useState(false);

  return (
    <>
      <section
        className="mt-5 relative z-10"
        style={
          {
            //   marginBottom: data?.thumbnail?.asset?.url ? "-490px" : "0",
          }
        }
      >
        <div className="max-w-[1200px] mx-auto px-4  bg-[#F8F6EF] py-10 md:py-16">
          <div className="text-center mb-14">
            <span className="sub-title ml-12">{data.subheading}</span>
            <h2 className="h1-type mt-5">{data.heading}</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-14">
            {data?.list?.map((item: any, index: number) => (
              <div key={index} className="group">
                <Link
                  href={slug(item.path)}
                  className="flex flex-col items-center h-full text-center bg-white p-5 rounded-lg relative overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-1 before:bg-primary before:transition-all before:duration-300 group-hover:before:w-full"
                >
                  <div className="icon w-[110px] h-[110px] flex items-center justify-center flex-shrink-0">
                    <Image
                      src={item.icon.asset.url}
                      alt={item.icon.alt || "icon"}
                      width={250}
                      height={250}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-[22px] font-extrabold text-secondary text-center leading-tight mt-5">
                    {item.heading}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {data?.thumbnail?.asset?.url && (
        <section
          className="bg-cover pb-[170px] bg-center bg-no-repeat min-h-[920px] flex justify-center items-end -mt-[490px]"
          style={{ backgroundImage: `url(${data?.thumbnail?.asset?.url})` }}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => setVideo(true)}
          >
            {/* Animated wavy circles */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse delay-75"></div>
            <div className="absolute inset-0 rounded-full border border-white/10 animate-bounce delay-150"></div>

            {/* Main play button circle */}
            <div className="relative w-20 h-20 bg-white backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 hover:scale-110 hover:bg-white/30 transition-all duration-300 group">
              <PlayIcon cls="w-8 h-8 text-primary ml-1" />

              {/* Ripple effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500"></div>
            </div>
          </div>
        </section>
      )}
      {video && (
        <VideoPopup videoURL={data?.videoURL} onClose={() => setVideo(false)} />
      )}
    </>
  );
};

export default Services;
