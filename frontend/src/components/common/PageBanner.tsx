/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import Button from "./Button";
import { ChevronRightIcon } from "./SocialIcons";

const PageBanner = ({ pageName, data }: { pageName: string; data: any }) => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32"
      style={{ backgroundImage: `url(${data?.bg?.asset?.url})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}

      <div className="max-w-6xl relative z-10 mx-auto px-4">
        <div className="space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-base -mb-1">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRightIcon cls="w-4 h-4 text-white/60" />
            <span className="text-white font-medium">{pageName}</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {data?.heading}
          </h1>

          {/* Description */}
          {data?.description && (
            <p className="text-lg md:text-xl -mt-2 text-white/90 leading-relaxed max-w-2xl">
              {data.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
    </section>
  );
};
export default PageBanner;
