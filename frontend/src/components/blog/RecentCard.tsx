/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import SanityImage from "@/components/common/SanityImage";

export default function RecentCard({ data }: any) {
  return (
    <div>
      <Link
        href={`/${data?.slug.current}`}
        className="flex flex-row gap-x-4 mb-8 group"
      >
        {data?.featuredImage?.asset ? (
          <SanityImage
            image={data?.featuredImage}
            width={100}
            height={100}
            className="rounded-lg object-cover h-[100px] w-[100px]"
          />
        ) : (
          <div className="bg-gray-200 rounded-lg object-cover h-[100px] w-[100px]" />
        )}
        <div>
          <p className="text-xl mb-2 font-bold group-hover:text-primary transition-all duration-300">
            {data.title}
          </p>
          {data?.author?.name && (
            <span className="text-secondary text-sm font-extrabold">
              By{" "}
              <span className="group-hover:text-primary transition-all duration-300">
                {data?.author?.name}
              </span>
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
