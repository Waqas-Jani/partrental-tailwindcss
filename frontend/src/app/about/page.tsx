/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import Image from "next/image";
import PageBanner from "@/components/common/PageBanner";
// import Button from "@/components/common/Button";
import { getAboutPage } from "@/lib";
import AboutTwo from "@/sections/AboutTwo";

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

  let clientSec;
  let teamSec;
  let partnerSec;
  let choose;
  let aboutus;
  const statistic = sanitySitesettings?.statistic;
  const hero = sanityAboutPage?.hero;

  sanityAboutPage?.pageBuilder?.forEach((element: any) => {
    if (element?._type === "clientSec") {
      clientSec = element;
    } else if (element?._type === "teamSec") {
      teamSec = element;
    } else if (element?._type === "partnerSec") {
      partnerSec = element;
    } else if (element?._type === "choose") {
      choose = element;
    } else if (element?._type === "aboutus") {
      aboutus = element;
    }
  });

  //   console.log('==aboutus', sanityAboutPage);

  return (
    <>
      <PageBanner pageName={hero?.heading} data={hero} />
      {aboutus && (aboutus as any)?.enable && (
        <AboutTwo data={aboutus as any} />
      )}
    </>
  );
}
