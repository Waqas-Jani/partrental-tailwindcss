import React from "react";
import { getFaqPage } from "@/lib";
import PageBanner from "@/components/common/PageBanner";
import FaqList from "@/sections/FaqList";
import Button from "@/components/common/Button";

export async function generateMetadata() {
  const { sanityFaqPage } = await getFaqPage();
  return {
    title: sanityFaqPage?.seo?.title,
    description: sanityFaqPage?.seo?.description,
    keywords: sanityFaqPage?.seo?.keywords,
    openGraph: {
      title: sanityFaqPage?.seo?.title,
      description: sanityFaqPage?.seo?.description,
    },
    alternates: {
      canonical: "https://partnerrentals.com/faq",
    },
  };
}

export default async function Faqs() {
  const { sanityFaqPage } = await getFaqPage();

  const hero = sanityFaqPage?.hero;

  return (
    <>
      {hero && <PageBanner pageName={hero?.heading} data={hero} />}

      {sanityFaqPage?.faqSec && sanityFaqPage.faqSec.enable && (
        <FaqList data={sanityFaqPage.faqSec} />
      )}
      <div className="flex justify-center mb-10">
        {sanityFaqPage?.button?.title && (
          <Button
            title={sanityFaqPage.button.title}
            btnType={sanityFaqPage?.button.btnType}
            link={sanityFaqPage?.button.link}
            linkType={sanityFaqPage?.button.linkType}
          />
        )}
      </div>
    </>
  );
}
