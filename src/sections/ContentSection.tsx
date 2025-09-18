/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "@/components/common/Button";
import { PortableText } from "@portabletext/react";
import { PortableTextComponent } from "@/components/PortableTextComponent";

const ContentSection = ({
  data,
  index,
  noPadding,
  locations,
}: {
  data: any;
  index: number;
  noPadding: boolean;
  locations: any;
}) => {
  return (
    <section className={`pt-[50px] ${noPadding ? "" : "pb-[50px]"}`}>
      <div className="container mx-auto px-5">
        <div className={`flex items-baseline`}>
          <div className="w-full">
            <div>
              <div className="mb-8">
                {data.subheading && (
                  <span className="sub-title mb-5">{data.subheading}</span>
                )}
                <h2 className="h1-type">{data.heading}</h2>
              </div>
              <div className="prose text-black max-w-none">
                <PortableText
                  value={data.description}
                  components={PortableTextComponent}
                />
              </div>
              <div className="mb-8">
                {data.points?.map((item: any, index: number) => (
                  <div className="mb-8" key={index}>
                    <div>
                      <h5>{item.heading}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {data?.button?.title && (
                  <Button
                    title={data.button.title}
                    btnType={data?.button.btnType}
                    link={data?.button.link}
                    linkType={data?.button.linkType}
                    locations={locations}
                    borderCls="!border-primary !text-black"
                  />
                )}
                {data?.button2?.title && (
                  <Button
                    title={data.button2.title}
                    btnType={data?.button2.btnType}
                    link={data?.button2.link}
                    linkType={data?.button2.linkType}
                    locations={locations}
                    borderCls="!border-primary !text-black"
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

export default ContentSection;
