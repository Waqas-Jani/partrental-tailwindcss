import React from "react";
import Link from "next/link";
type ItemProps = {
  name: string;
  slug: {
    current: string;
  };
};

export default function TagCard({ list }: { list: ItemProps[] }) {
  return (
    <div className="mb-10 border border-gray-200 rounded-lg p-8">
      <h4 className="text-2xl font-bold">Popular Tags</h4>
      <ul className="mt-5 flex flex-wrap gap-2">
        {list?.map((item: ItemProps, index: number) => (
          <Link
            href={`/tag/${item?.slug?.current}`}
            key={index}
            className="bg-[#f8f6ef] rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            {item?.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
