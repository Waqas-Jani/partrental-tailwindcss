/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ProductSpecifications = ({ specifications }: any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {specifications.map((spec: any, index: number) => (
        <div
          key={index}
          className="bg-[#F3F3F3] p-5 flex justify-between rounded-md"
        >
          <span className="text-base font-bold text-black">{spec.title}</span>
          <span className="text-base text-black font-medium">{spec.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecifications;
