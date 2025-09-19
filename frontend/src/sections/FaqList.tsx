/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Accordion from "@/components/common/Accordion";

export default function FaqList({ data }: any) {
  return (
    <section className="py-[70px]">
      <div className="container mx-auto px-5">
        <div className="flex justify-center">
          <div className="text-center">
            <span className="sub-title ml-12">{data?.subheading}</span>
            <h2 className="h1-type mt-5">{data?.heading}</h2>
          </div>
        </div>

        <div className="mt-10">
          <div className="">
            {data?.list && data?.list.length > 0 && (
              <Accordion items={data?.list} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
