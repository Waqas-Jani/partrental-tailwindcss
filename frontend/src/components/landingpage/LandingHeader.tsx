/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const LandingHeader = ({ data }: any) => {
  return (
    <header>
      <div className="relative bg-white mt-14">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="d-flex align-items-center h-16">
            <div>
              <a href="#" title="" className="flex">
                <Image
                  src={data?.logo?.asset?.url}
                  alt={data?.data?.logo2?.alt || "Logo"}
                  width={250}
                  height={150}
                  className="object-contain"
                />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
