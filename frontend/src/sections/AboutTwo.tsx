/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { PortableText } from "@portabletext/react";
import Button from "@/components/common/Button";
import Image from "next/image";

export default function AboutTwo({ data }: { data: any }) {
  return (
    <section className="pt-[100px] pb-[80px]">
      <div className="tp-container">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          <div className="">
            <div className="mb-5">
              <div className="mb-8">
                <span className="sub-title ml-12">{data.subheading}</span>
                <h2 className="h1-type mt-5">{data.heading}</h2>
              </div>
              <div className="prose">
                <PortableText value={data?.description} />
              </div>

              <div className="mt-8">
                {data.points?.map((item: any, index: number) => (
                  <div className="mb-8" key={index}>
                    <div className="text">
                      <h5>{item.heading}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                {data?.button?.title && (
                  <Button
                    title={data.button.title}
                    btnType={data?.button.btnType}
                    link={data?.button.link}
                    linkType={data?.button.linkType}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="text-right mb-[50px] w-full">
              <Image
                src={data.img1?.asset?.url}
                alt={data.img1?.alt || "About Image"}
                width={570}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
