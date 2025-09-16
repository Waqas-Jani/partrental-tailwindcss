import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
// import Script from "next/script";
// import { GoogleTagManager } from "@next/third-parties/google";
import "@/styles/globals.css";
import LayoutWrapper from "@/layout";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { getAllLandingPages } from "@/lib/getLandingPage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PartnerRentals - TailwindCSS",
  description:
    "Your trusted partner for construction equipment rentals. Serving NY Hudson Valley & Northeast PA with quality equipment and reliable service.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const landingPages = await getAllLandingPages();

  return (
    <html lang="en">
      {/* <GoogleTagManager gtmId="GTM-TSW5M3QJ" />
      <Script
        strategy="afterInteractive"
        id="signals-script"
        dangerouslySetInnerHTML={{
          __html: `(function() {
        if (typeof window === 'undefined') return;
        if (typeof window.signals !== 'undefined') return;
        var script = document.createElement('script');
        script.src = 'https://cdn.cr-relay.com/v1/site/02195228-c20a-4cb8-8891-e391c412b4cb/signals.js';
        script.async = true;
        window.signals = Object.assign(
          [],
          ['page', 'identify', 'form'].reduce(function (acc, method){
            acc[method] = function () {
              signals.push([method, arguments]);
              return signals;
            };
          return acc;
          }, {})
        );
        document.head.appendChild(script);
      })();`,
        }}
      ></Script> */}
      <body className={`${geistSans.variable} ${manrope.variable} antialiased`}>
        <LayoutWrapper
          siteSettings={siteSettings?.siteSettings || null}
          recentBlogs={siteSettings?.latestBlogs || []}
          landingPages={landingPages || []}
        >
          {children}
        </LayoutWrapper>
        {/* {siteSettings?.slideoutPopup?.enable && (
          <PowerGenSlideout data={siteSettings?.slideoutPopup} />
        )} */}
        <Toaster />
      </body>
    </html>
  );
}
