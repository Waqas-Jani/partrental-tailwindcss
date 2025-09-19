/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { CircleArrowRightIcon } from "@/components/common/SocialIcons";

const BlogCard = ({ item, index, isHome = false }: any) => {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <div
      className={`bg-white overflow-hidden rounded-lg shadow-sm ${
        isHome ? "md:col-span-4" : "md:col-span-6"
      }`}
      key={index}
    >
      <Link
        href={`/${item?.slug?.current}`}
        className="mb-3 group h-full flex flex-col"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={item?.featuredImage?.asset?.url}
            alt="Post Image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content wrapper fills the rest of card */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl font-extrabold text-center px-5 py-7 group-hover:text-primary transition-all duration-300 flex-grow">
            {truncate(item?.title, 46)}
          </h3>

          {/* Push button to bottom */}
          <div className="border-t border-gray-200 mt-auto">
            <span className="main-btn bg-transparent hover:bg-primary !text-black !rounded-none hover:!text-white w-full flex items-center justify-center">
              Read More <CircleArrowRightIcon cls="w-5 h-5 ml-2" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
