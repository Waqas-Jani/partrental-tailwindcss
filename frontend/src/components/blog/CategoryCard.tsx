import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "../common/Icons";

type ItemProps = {
  name: string;
  slug: {
    current: string;
  };
};

export default function CategoryCard({ list }: { list: ItemProps[] }) {
  return (
    <div className="mb-10 border border-gray-200 rounded-lg p-8">
      <h4 className="text-2xl font-extrabold">Category</h4>
      <ul className="mt-5">
        {list?.map((item: ItemProps, index: number) => (
          <li
            key={index}
            className="border-b group border-gray-200 last:border-none hover:border-primary transition-all duration-300"
          >
            <Link
              href={`/category/${item.slug.current}`}
              className="font-bold text-lg flex items-center justify-between  py-5"
            >
              {item?.name}
              <span>
                <ArrowRightIcon cls="w-5 h-5 group-hover:translate-x-2 transition-all duration-300" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
