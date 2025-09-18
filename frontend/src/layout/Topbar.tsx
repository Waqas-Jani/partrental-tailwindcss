"use client";

import React from "react";
import RenderSocial from "@/components/common/RenderSocial";
import { PhoneIcon } from "@/components/common/SocialIcons";
import { TopBanner } from "@/types/siteSettings";

const Topbar = ({ data }: { data: TopBanner }) => {
  return (
    <div className="bg-black text-gray-300 py-2 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex lg:flex-row flex-col justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="hidden md:block text-base leading-7 font-bold text-gray-300">
              <span>{data?.welcome}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-base leading-7 font-bold ">
              <a
                href={`tel:${data?.phone.replace(/\s/g, "")}`}
                className="text flex items-center border-r-3 border-gray-300 pr-4"
              >
                <PhoneIcon cls="w-5 h-5 mr-1" /> Call Us: {data?.phone}
              </a>
            </div>
            <div className="flex space-x-2">
              {data.social?.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RenderSocial icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
