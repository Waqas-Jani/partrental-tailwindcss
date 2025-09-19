/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { CalendarIcon } from "../common/SocialIcons";

export default function PostCard({ data }: any) {
  return (
    <div className={`mb-14 ${data?.featuredImage?.asset ? "" : "bg-gray-200"}`}>
      {data?.featuredImage?.asset?.url && (
        <div className="relative w-full h-[300px]">
          <Image
            src={data?.featuredImage?.asset?.url}
            fill
            className="object-cover"
            alt={data?.featuredImage?.alt}
          />
        </div>
      )}
      <div
        className={`p-10 max-w-[700px] mx-auto shadow-xl pt-16 -mt-20 relative z-10 rounded-lg ${
          data?.featuredImage?.asset ? "bg-white" : "bg-gray-200"
        }`}
      >
        {/* <a className="bg-primary text-white px-4 py-2 rounded-lg">
          {data?.category?.name}
        </a> */}
        <h3 className="text-3xl font-extrabold hover:text-primary transition-all duration-300">
          <Link href={`/${data?.slug?.current}`}>{data?.title}</Link>
        </h3>
        <div className="mt-5">
          <span className="flex items-center gap-x-2">
            <CalendarIcon cls="w-5 h-5" />
            <a className="text-base font-medium">
              {dayjs(data?.publishedAt).format("DD, MMMM, YYYY")}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
