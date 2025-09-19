/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const OrSeparator = () => (
  <div className="flex items-center justify-center py-6">
    <span className="h-px w-10 bg-gray-300" />
    <span className="mx-3 text-gray-500 tracking-widest font-semibold">OR</span>
    <span className="h-px w-10 bg-gray-300" />
  </div>
);

const PromoCard = ({
  heading,
  range,
  spendLine,
  rewardLine,
}: {
  heading: string;
  range: string;
  spendLine: string;
  rewardLine: string;
}) => {
  return (
    <div className="bg-white max-w-[980px] mx-auto rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-xl  hover:-translate-y-1">
      <p className="text-xs tracking-widest text-gray-500 font-semibold uppercase">
        {heading} – {range}
      </p>
      <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-900">
        {spendLine}
      </p>
      <p className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-primary">
        {rewardLine}
      </p>
    </div>
  );
};

export const PromotionalBanner = ({ data }: { data: any }) => {
  const { title, titlePart2, offers, caption } = data;

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-gray-900">
            {title}
            <span className="text-primary">{titlePart2}</span>
          </h2>
          <div className="mt-2 h-[2px] w-24 bg-gray-300 mx-auto" />
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {/* Column layout for md+; stacked with separators on mobile */}
          {offers.length > 1 && (
            <div>
              <PromoCard {...offers[0]} />
              <div className="md:hidden">
                <OrSeparator />
              </div>
            </div>
          )}

          {offers.length > 1 && (
            <div className="hidden md:block self-center">
              <div className="flex flex-col items-center justify-center h-full">
                <OrSeparator />
              </div>
            </div>
          )}

          {offers.length > 1 && (
            <div className="md:col-start-3">
              <PromoCard {...offers[1]} />
              <div className="md:hidden">
                <OrSeparator />
              </div>
            </div>
          )}

          {(offers.length === 1 || offers.length === 3) && (
            <div className="md:col-span-3">
              <PromoCard {...offers[offers.length - 1]} />
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">{caption}</p>
      </div>
    </section>
  );
};

export default PromotionalBanner;
