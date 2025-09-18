/* eslint-disable @typescript-eslint/no-explicit-any */
import { _renderSection } from "@/components/RenderSection";
import PageBanner from "@/components/common/PageBanner";
import { getRentPage } from "@/lib";
import React from "react";

export async function generateMetadata() {
  const rentPage = await getRentPage();
  const data = rentPage?.sanityRentPage || {};

  return {
    title: data?.seo.title ?? data?.hero?.heading,
    description: data?.seo?.description ?? data?.hero?.subheading,
    keywords: data?.seo?.keywords,
    openGraph: {
      title: data?.seo?.title ?? data?.hero?.heading,
      description: data?.seo?.description,
      images: [
        {
          url: data?.hero?.bg?.asset?.url,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: "https://partnerrentals.com/rent",
    },
  };
}

const RentPage = async () => {
  const rentPage = await getRentPage();
  const data = rentPage?.sanityRentPage || {};

  return (
    <div>
      <PageBanner pageName={data?.hero?.heading} data={data?.hero} />

      {data?.pageBuilder?.map((item: any, index: number) =>
        _renderSection(item, index)
      )}
    </div>
  );
};

export default RentPage;
