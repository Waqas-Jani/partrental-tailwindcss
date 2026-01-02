/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PageBanner from "@/components/common/PageBanner";
import AboutTwo from "@/sections/AboutTwo";
import TeamSection from "@/sections/TeamSection";
import { getAboutPage } from "@/lib";
import Partners from "@/sections/Partners";
import Testimonials from "@/sections/TestimonialsTwo";
import Statistics from "@/sections/Statistics";

export async function generateMetadata() {
  const { sanityAboutPage } = await getAboutPage();
  return {
    title: sanityAboutPage?.seo?.title,
    description: sanityAboutPage?.seo?.description,
    keywords: sanityAboutPage?.seo?.keywords,
    openGraph: {
      title: sanityAboutPage?.seo?.title,
      description: sanityAboutPage?.seo?.description,
    },
    alternates: {
      canonical: "https://partnerrentals.com/about",
    },
  };
}

export default async function About() {
  const { sanityAboutPage, sanitySitesettings } = await getAboutPage();

  const statistic = sanitySitesettings?.statistic;
  const hero = sanityAboutPage?.hero;

  function _renderSection(element: any, idx: number) {
    switch (element?._type) {
      case "aboutus":
        return <AboutTwo key={idx} data={element} />;
      case "teamSec":
        return <TeamSection key={idx} data={element} />;
      case "partnerSec":
        return <Partners key={idx} data={element} />;
      case "clientSec":
        return <Testimonials key={idx} data={element} />;

      // Add more cases for other sections when you have corresponding components
      default:
        return null;
    }
  }

  return (
    <>
      {hero && <PageBanner pageName={hero?.heading} data={hero as any} />}
      {sanityAboutPage?.pageBuilder?.map((element: any, idx: number) =>
        _renderSection(element, idx)
      )}
      {statistic && statistic.enable && <Statistics data={statistic} />}
    </>
  );
}
