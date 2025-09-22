/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "@/components/common/Button";
import { slug } from "@/utils/index";
import Link from "next/link";
import Image from "next/image";

const className =
  "flex flex-col items-center h-full text-center bg-white p-5 shadow-md rounded-lg relative overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-1 before:bg-primary before:transition-all before:duration-300 group-hover:before:w-full";

const CustomContainer = ({ link, children }: any) => {
  if (link?.current) {
    return (
      <Link href={slug(link.current)} className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
};

const ServiceSection = ({ data }: any) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-5">
        <div className="bg-white">
          <div className="flex flex-wrap justify-center">
            <div className="w-full">
              <div className="section-title text-center mb-5">
                {data?.subheading && (
                  <span className="sub-title ml-12">{data?.subheading}</span>
                )}
                <h2 className="h1-type">{data?.heading}</h2>
                <p className="text-lg">{data?.description}</p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-14">
            {data?.services?.map((item: any, index: any) => (
              <div key={index} className="group">
                <CustomContainer link={item.slug} key={index}>
                  <div className="icon w-[110px] h-[110px] flex items-center justify-center flex-shrink-0">
                    <Image
                      src={item?.image?.asset?.url}
                      alt={item?.image?.alt || "icon"}
                      width={250}
                      height={250}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-[22px] font-extrabold text-secondary text-center leading-tight mt-5">
                    {item?.title}
                  </h3>
                </CustomContainer>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center mt-10">
            {data?.button?.title && (
              <Button
                title={data?.button?.title}
                btnType={data?.button?.btnType}
                link={data?.button?.link}
                linkType={data?.button?.linkType}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
