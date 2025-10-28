/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { _renderSection } from "@/components/RenderSection";
import PageBanner from "@/components/common/PageBanner";
import { getRentCategory, getRentSubCategory, getAllLocation } from "@/lib";
import ProductHeader from "@/components/product/ProductHeader";

export async function generateMetadata({ params }: any) {
  const rentParams = await params;

  const slug = rentParams.slug.join("/");

  if (rentParams.slug.length > 1) {
    const data = await getRentSubCategory(slug);
    const pageData = data?.sanityRentSubCategory;

    return {
      title: pageData?.seo?.title || pageData?.title,
      description: pageData?.seo?.description || pageData?.description,
      keywords: pageData?.seo?.keywords,
      openGraph: {
        title: pageData?.seo?.title || pageData?.title,
        description: pageData?.seo?.description || pageData?.description,
        images: [
          {
            url: pageData?.gallery[0]?.asset?.url,
            width: 1200,
            height: 630,
          },
        ],
      },

      alternates: {
        canonical: `https://partnerrentals.com/rent/${slug}`,
      },
    };
  } else {
    const data = await getRentCategory(rentParams.slug[0]);

    return {
      title: data?.sanityRentCategory?.seo?.title,
      description: data?.sanityRentCategory?.seo?.description,
      keywords: data?.sanityRentCategory?.seo?.keywords,
      openGraph: {
        title:
          data?.sanityRentCategory?.seo?.title ??
          data?.sanityRentCategory?.hero?.heading,
        description: data?.sanityRentCategory?.seo?.description,
        images: [
          {
            url: data?.sanityRentCategory?.hero?.bg?.asset?.url,
            width: 1200,
            height: 630,
          },
        ],
      },

      alternates: {
        canonical: `https://partnerrentals.com/rent/${slug}`,
      },
    };
  }
}

const RentPage = async ({ params }: any) => {
  const rentParams = await params;
  const slug = rentParams.slug.join("/");

  const locations = await getAllLocation();

  if (rentParams.slug.length > 1) {
    const data = await getRentSubCategory(slug);

    return (
      <div>
        <ProductHeader
          data={data?.sanityRentSubCategory}
          locations={locations}
        />
        <div className="pt-[60px] pb-[60px]">
          <h2 className="text-2xl container mx-auto px-5 font-bold">
            Description
          </h2>
          {data?.sanityRentSubCategory?.pageBuilder?.map(
            (item: any, index: number) =>
              _renderSection(item, index, true, locations)
          )}
        </div>
      </div>
    );
  } else {
    const data = await getRentCategory(rentParams.slug[0]);
    return (
      <div>
        <PageBanner
          pageName={data?.sanityRentCategory?.hero?.heading}
          data={data?.sanityRentCategory?.hero}
        />
        {data?.sanityRentCategory?.pageBuilder?.map(
          (item: any, index: number) =>
            _renderSection(item, index, false, locations)
        )}
      </div>
    );
  }
};

export default RentPage;
