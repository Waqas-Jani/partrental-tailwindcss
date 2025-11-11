/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AccordionTwo from "@/components/common/AccordionTwo";

export default function FaqList({ data }: any) {
  return (
    <section className="py-[70px]">
      <div className="tp-container">
        <div className="flex justify-center">
          <div className="text-center">
            <span className="sub-title">{data?.subheading}</span>
            <h2 className="h1-type mt-5">{data?.heading}</h2>
          </div>
        </div>

        <div className="mt-10">
          <div className="">
            {data?.list && data?.list.length > 0 && (
              <AccordionTwo items={data?.list} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
