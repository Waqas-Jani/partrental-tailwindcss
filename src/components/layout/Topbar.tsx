"use client";

import React from "react";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../common/SocialIcons";

const Topbar = () => {
  return (
    <div className="bg-blue-900 text-white py-2 text-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <PhoneIcon cls="w-4 h-4" />
            <span>(845) 555-0123</span>
          </div>
          <div className="flex items-center space-x-2">
            <MailIcon cls="w-4 h-4" />
            <span>info@partnerrentals.com</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <MapPinIcon cls="w-4 h-4" />
            <span>Serving NY Hudson Valley & Northeast PA</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-yellow-300 font-medium">
            Summer Promotions - 3 Ways to Save!
          </span>
          <div className="flex space-x-2">
            <FacebookIcon cls="w-4 h-4 hover:text-blue-300 cursor-pointer" />
            <InstagramIcon cls="w-4 h-4 hover:text-blue-300 cursor-pointer" />
            <TwitterIcon cls="w-4 h-4 hover:text-blue-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
