/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "@/components/common/Button";
import { PortableText } from "@portabletext/react";
import { PortableTextComponent } from "@/components/PortableTextComponent";

const SplitContent = ({ data }: any) => {
  return (
    <section className="py-10 md:py-16 bg-slate-100">
      <div className="container mx-auto px-5">
        <div className="max-w-[1080px] w-full grid lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <div>
            <div className="mb-8">
              {data.subheadingLeft && (
                <span className="sub-title ml-12">{data.subheadingLeft}</span>
              )}
              <h2 className="h1-type">{data.headingLeft}</h2>
            </div>
            <div className="prose">
              <PortableText
                value={data.descriptionLeft}
                components={PortableTextComponent}
              />
            </div>
            <div className="mt-8">
              {data.pointsLeft?.map((item: any, index: number) => (
                <div className="mb-8" key={index}>
                  <div className="text">
                    <h5>{item.heading}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {data?.buttonLeft?.title && (
                <Button
                  title={data.buttonLeft.title}
                  btnType={data?.buttonLeft.btnType}
                  link={data?.buttonLeft.link}
                  linkType={data?.buttonLeft.linkType}
                />
              )}
            </div>
          </div>
          {/* Right Side */}
          <div>
            <div className="mb-8">
              {data.subheadingRight && (
                <span className="sub-title ml-12">{data.subheadingRight}</span>
              )}
              <h2 className="h1-type">{data.headingRight}</h2>
            </div>
            <div className="prose mt-8">
              <PortableText
                value={data.descriptionRight}
                components={PortableTextComponent}
              />
            </div>
            <div className="mt-8">
              {data.pointsRight?.map((item: any, index: number) => (
                <div className="mb-8" key={index}>
                  <div className="text">
                    <h5>{item.heading}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {data?.buttonRight?.title && (
                <Button
                  title={data.buttonRight.title}
                  btnType={data?.buttonRight.btnType}
                  link={data?.buttonRight.link}
                  linkType={data?.buttonRight.linkType}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitContent;
