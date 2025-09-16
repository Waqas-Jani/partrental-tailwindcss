/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";

import Footer from "./Footer";
import { BlogPost, SiteSettings } from "@/types/siteSettings";

interface LayoutWrapperProps {
  children: React.ReactNode;
  siteSettings: SiteSettings | null;
  recentBlogs: BlogPost[];
  landingPages: any[];
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  siteSettings,
  recentBlogs,
  landingPages,
}) => {
  const pathname = usePathname();

  const isLandingPage = landingPages.find(
    (page: any) => page?.slug === pathname.split("/")[1]
  );

  return (
    <div className="min-h-screen flex flex-col">
      {isLandingPage ? (
        <div />
      ) : (
        <Header
          header={siteSettings?.header ?? null}
          topBanner={siteSettings?.topBanner ?? null}
        />
      )}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer posts={recentBlogs} footer={siteSettings?.footer ?? undefined} />
    </div>
  );
};

export default LayoutWrapper;
