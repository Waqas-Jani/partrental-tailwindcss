/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecentCard({ data }: any) {
  return (
    <Link href={`/${data?.slug.current}`} className="mb-15">
      <li className="mb-15">
        {data.featuredImage?.asset ? (
          <Image
            src={data.featuredImage?.asset?.url}
            width={200}
            height={200}
            alt="post image"
          />
        ) : (
          <div className="text-thumb" />
        )}
        <div className="">
          <h6 className="text-2xl font-bold">{data.title}</h6>
          <span className="text-gray-500">
            By{" "}
            <a href="#" className="text-blue-500">
              {data?.author?.name}
            </a>
          </span>
        </div>
      </li>
    </Link>
  );
}
