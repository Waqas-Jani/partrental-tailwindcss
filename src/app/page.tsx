/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import HomeSlider from "@/components/slider/HomeSlider";
import { getHomePage } from "@/lib";

const HomeAbout = dynamic(() => import("@/sections/About"));
const Services = dynamic(() => import("@/sections/Services"));
const PromotionalBanner = dynamic(() => import("@/sections/PromotionalBanner"));
const WhyChooseUs = dynamic(() => import("@/sections/WhyChoooseUs"));
const Contact = dynamic(() => import("@/sections/Contact"));
const Testimonials = dynamic(() => import("@/sections/Testimonials"));
const Blogs = dynamic(() => import("@/sections/Blogs"));
const Partners = dynamic(() => import("@/sections/Partners"));

export async function generateMetadata() {
  const data = await getHomePage();
  const homePage = data.sanityHomePage || {};

  return {
    title: homePage.seo.title,
    description: homePage.seo.description,
    keywords: homePage.seo.keywords,

    alternates: {
      canonical: "https://partnerrentals.com",
    },
  };
}
export default async function Home() {
  const data = await getHomePage();
  const homePage = data.sanityHomePage || {};
  const hero = homePage.homeHero || {};
  const pageBuilder = homePage.pageBuilder || {};
  const statistics = data.sanitySitesettings.statistic || {};

  let partnerSec,
    clientSec,
    aboutHome,
    offers,
    homeContact,
    contactBanner,
    portfolioSec,
    blogSec,
    serviceSecOne,
    teamSec,
    productSec,
    promotionalBanner;

  pageBuilder?.forEach((element: any) => {
    if (element?._type === "partnerSec") {
      partnerSec = element;
    } else if (element?._type === "clientSec") {
      clientSec = element;
    } else if (element?._type === "aboutHome") {
      aboutHome = element;
    } else if (element?._type === "offers") {
      offers = element;
    } else if (element?._type === "homeContact") {
      homeContact = element;
    } else if (element?._type === "contactBanner") {
      contactBanner = element;
    } else if (element?._type === "portfolioSec") {
      portfolioSec = element;
    } else if (element?._type === "blogSec") {
      blogSec = element;
    } else if (element?._type === "serviceSecOne") {
      serviceSecOne = element;
    } else if (element?._type === "teamSec") {
      teamSec = element;
    } else if (element?._type === "productSec") {
      productSec = element;
    } else if (element?._type === "promotionalBanner") {
      promotionalBanner = element;
    }
  });

  return (
    <>
      <HomeSlider data={hero} />
      {aboutHome && (aboutHome as any)?.enable && (
        <HomeAbout data={aboutHome as any} />
      )}
      {serviceSecOne && (serviceSecOne as any)?.enable && (
        <Services data={serviceSecOne as any} />
      )}
      {promotionalBanner && (promotionalBanner as any)?.enable && (
        <PromotionalBanner data={promotionalBanner as any} />
      )}
      {offers && (offers as any)?.enable && (
        <WhyChooseUs data={offers as any} />
      )}

      {homeContact && (homeContact as any)?.enable && (
        <Contact data={homeContact} isHome={true} />
      )}

      {clientSec && (clientSec as any)?.enable && (
        <Testimonials data={clientSec as any} />
      )}

      {blogSec && (blogSec as any)?.enable && <Blogs data={blogSec as any} />}

      {partnerSec && (partnerSec as any)?.enable && (
        <Partners data={partnerSec as any} />
      )}
    </>
  );
}
