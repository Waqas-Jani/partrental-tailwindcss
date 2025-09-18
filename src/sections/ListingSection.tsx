/* eslint-disable @typescript-eslint/no-explicit-any */
import { slug } from "@/utils/index";
import Link from "next/link";
import React from "react";
import Button from "@/components/common/Button";
import Image from "next/image";

const ListingSection = ({
  data,
  noPadding,
}: {
  data: any;
  noPadding: boolean;
}) => {
  return (
    <>
      <section className="pt-[50px]">
        <div className="container mx-auto px-5">
          <div className="bg-white">
            <div className="flex justify-center">
              <div className="w-full">
                <div className="text-center mb-8">
                  {data?.subheading && (
                    <span className="sub-title mb-5">{data.subheading}</span>
                  )}
                  <h2 className="h1-type">{data.heading}</h2>
                </div>
              </div>
            </div>
            <div className="max-w-[1200px] mx-auto px-4  bg-[#F8F6EF] pt-[80px] pb-12">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-14">
                {data?.list?.map((item: any, index: number) => (
                  <div key={index} className="group">
                    <Link
                      href={slug(item.path)}
                      className="flex flex-col items-center h-full text-center bg-white p-5 rounded-lg relative overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-1 before:bg-primary before:transition-all before:duration-300 group-hover:before:w-full"
                    >
                      <div className="icon w-[110px] h-[110px] flex items-center justify-center flex-shrink-0">
                        <Image
                          src={item.icon.asset.url}
                          alt={item.icon.alt || "icon"}
                          width={250}
                          height={250}
                          className="object-contain"
                        />
                      </div>

                      <h3 className="text-[22px] font-extrabold text-secondary text-center leading-tight mt-5">
                        {item.heading}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-5">
              {data?.button?.title && (
                <Button
                  title={data.button.title}
                  btnType={data?.button.btnType}
                  link={data?.button.link}
                  linkType={data?.button.linkType}
                />
              )}
              {data?.button2?.title && (
                <Button
                  title={data.button2.title}
                  btnType={data?.button2.btnType}
                  link={data?.button2.link}
                  linkType={data?.button2.linkType}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingSection;
