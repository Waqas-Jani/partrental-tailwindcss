/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const LandingHeader = ({ data }: any) => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 p-1 flex items-center justify-center px-[20px] md:px-10 bg-primary text-white">
        <div>
          <a className="text-base text-bold" href="tel:8777407368">
            877-740-7368
          </a>
        </div>
      </div>
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
    </div>
  );
};

export default LandingHeader;
