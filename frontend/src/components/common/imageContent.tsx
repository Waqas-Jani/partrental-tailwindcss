/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "@/components/common/Button";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { PortableTextComponent } from "@/components/PortableTextComponent";

const ImageContent = ({
  data,
  index,
  noPadding,
  locations,
}: {
  data: any;
  index: number;
  noPadding?: boolean;
  locations?: any;
}) => {
  const product =
    data.contentType === "product"
      ? {
          title: data.heading,
          variants: data.productVariants,
        }
      : null;
  return (
    <section className={`pt-[50px] ${noPadding ? "" : "pb-[50px]"}`}>
      <div className="container mx-auto px-5">
        <div
          className={`flex flex-col lg:flex-row items-center gap-5 lg:gap-0 ${
            index % 2 === 0 ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="w-full lg:w-1/2">
            <div className="mt-0">
              <Image
                src={data.image.asset.url}
                alt="About Image"
                className="w-full h-full"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div
              className={`${index % 2 === 0 ? "lg:pr-[50px]" : "lg:pl-[50px]"}`}
            >
              <div className="mb-[35px]">
                {data.subheading && (
                  <span className="sub-title ml-12 mb-5">
                    {data.subheading}
                  </span>
                )}
                <h2 className="h1-type">{data.heading}</h2>
              </div>
              <div className="prose text-black">
                <PortableText
                  value={data.description}
                  components={PortableTextComponent}
                />
              </div>
              <div className="">
                {data.points?.map((item: any, index: number) => (
                  <div className="mb-[30px]" key={index}>
                    <div className="text">
                      <h5>{item.heading}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ul className="pt-[15px] pb-[15px]">
                {data.contentType === "product" &&
                  data.productVariants?.map((variant: any, index: number) => (
                    <li className="list-item ml-10" key={index}>
                      {variant}
                    </li>
                  ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                {data?.button?.title && (
                  <Button
                    title={data.button.title}
                    btnType={data?.button.btnType}
                    link={data?.button.link}
                    linkType={data?.button.linkType}
                    product={product}
                    locations={locations}
                  />
                )}
                {data?.button2?.title && (
                  <Button
                    title={data.button2.title}
                    btnType={data?.button2.btnType}
                    link={data?.button2.link}
                    linkType={data?.button2.linkType}
                    product={product}
                    locations={locations}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageContent;
