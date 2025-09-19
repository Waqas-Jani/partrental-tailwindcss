/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { _renderSection } from "@/components/RenderSection";
import PageBanner from "@/components/common/PageBanner";
import { getServicePage } from "@/lib";

export async function generateMetadata() {
  const data = await getServicePage();

  return {
    title: data.sanityServicesPage.seo.title,
    description: data.sanityServicesPage.seo.description,
    keywords: data.sanityServicesPage.seo.keywords,
    openGraph: {
      title: data.sanityServicesPage.seo.title,
      description: data.sanityServicesPage.seo.description,
      images: [
        {
          url: data.sanityServicesPage?.hero?.bg?.asset?.url,
          width: 1200,
          height: 630,
        },
      ],
    },

    alternates: {
      canonical: "https://partnerrentals.com/services",
    },
  };
}

const ServicesPage = async () => {
  const data = await getServicePage();

  return (
    <div>
      <PageBanner
        pageName={data?.sanityServicesPage?.hero?.heading}
        data={data?.sanityServicesPage?.hero}
      />
      {data?.sanityServicesPage?.pageBuilder?.map((item: any, index: number) =>
        _renderSection(item, index)
      )}
    </div>
  );
};

export default ServicesPage;
