/* eslint-disable @typescript-eslint/no-explicit-any */
// import dayjs from "dayjs";
import React from "react";
// import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";

const Blogs = ({ data }: any) => {
  return (
    <section className="pt-[70px] pb-[50px] bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-[60px]">
          <span className="sub-title">{data.subheading}</span>
          <h2 className="h1-type mt-5">{data.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-20">
          {data?.list?.map((item: any, index: number) => (
            <BlogCard key={index} item={item} index={index} isHome={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
