/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import ExitIntentPopup from "@/components/common/ExitIntentPopup";
import { BlogPost, SiteSettings } from "@/types/siteSettings";
import LandingHeader from "@/components/landingpage/LandingHeader";

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
        <LandingHeader data={siteSettings?.header} />
      ) : (
        <Header
          header={siteSettings?.header ?? null}
          topBanner={siteSettings?.topBanner ?? null}
        />
      )}

      {/* Main Content */}
      <main>{children}</main>
      {!isLandingPage && (
        <ExitIntentPopup config={siteSettings?.exitIntentPopup ?? null} />
      )}

      {/* Footer */}
      {!isLandingPage && (
        <Footer
          posts={recentBlogs}
          footer={siteSettings?.footer ?? undefined}
        />
      )}
    </div>
  );
};

export default LayoutWrapper;
