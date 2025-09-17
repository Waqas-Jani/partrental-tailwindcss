/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/components/common/PageBanner";
import Button from "@/components/common/Button";
import { getDownloadsPage } from "@/lib";

export async function generateMetadata() {
  const { sanityDownloadsPage: data } = await getDownloadsPage();
  return {
    title: data?.seo?.title,
    description: data?.seo?.description,
    keywords: data?.seo?.keywords,
    openGraph: {
      title: data?.seo?.title,
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
      canonical: "https://partnerrentals.com/downloads",
    },
  };
}

const DownloadCard = ({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) => {
  return (
    <div className="bg-white rounded-[10px] shadow-[0_5px_30px_rgba(0,0,0,0.05)] mb-[30px] transition-all duration-300 ease-in-out overflow-hidden h-full flex flex-col hover:transform hover:-translate-y-[5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)]">
      <div className="relative w-full pt-[125%] overflow-hidden rounded-t-[10px]">
        <Image
          src={image}
          alt={title}
          fill
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <Link 
        href={link} 
        className="block bg-[#e31e24] text-white text-center py-[15px] font-semibold uppercase tracking-[1px] transition-all duration-300 ease-in-out mt-auto hover:bg-black hover:text-white"
      >
        {title}
      </Link>
    </div>
  );
};

const DownloadsPage = async () => {
  const { sanityDownloadsPage: data } = await getDownloadsPage();

  return (
    <>
      <PageBanner pageName={data?.hero?.heading} data={data?.hero} />

      <section className="bg-[#f8f9fa] pt-[120px] pb-[90px]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="text-center mb-[55px] wow fadeInUp">
              <h2 className="h1-type">{data?.downloadSec?.title}</h2>
              <p className="text-secondary mt-5 font-medium">
                {data?.downloadSec?.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {data?.downloadSec?.downloads?.map((item: any, index: number) => (
              <div
                key={index}
                className="wow fadeInUp"
                data-wow-delay={`0.${index + 1}s`}
              >
                <DownloadCard
                  title={item?.title}
                  image={item?.image?.asset?.url}
                  link={item?.file?.asset?.url}
                />
              </div>
            ))}
          </div>

          <div className="mt-[50px]">
            <div className="w-full lg:max-w-[770px] mx-auto">
              <div className="p-10 bg-white rounded-[10px] shadow-[0_5px_30px_rgba(0,0,0,0.05)] text-center wow fadeInUp mt-[50px]">
                <h4 className="text-2xl font-extrabold">
                  {data?.downloadCtaSec?.title}
                </h4>
                <p className="mt-5 font-medium">
                  {data?.downloadCtaSec?.description}
                </p>

                <div className="flex justify-center">
                  <Button
                    btnType={data?.downloadCtaSec?.button?.btnType}
                    link={data?.downloadCtaSec?.button?.link}
                    linkType={data?.downloadCtaSec?.button?.linkType}
                    title={data?.downloadCtaSec?.button?.title}
                    cls="mt-[15px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DownloadsPage;
