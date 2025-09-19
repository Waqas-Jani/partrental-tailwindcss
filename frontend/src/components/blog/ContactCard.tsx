/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "../common/Button";
import { PhoneIcon } from "../common/SocialIcons";

export default function ContactCard({ data }: any) {
  return (
    <div
      className="bg-cover bg-center mb-10 border border-gray-200 rounded-lg p-8"
      style={{
        backgroundImage: data?.bg?.asset
          ? `url(${data.bg?.asset?.url})`
          : "url(/assets/images/widget/contact-1.jpg)",
      }}
    >
      <div className="text-center bg-primary rounded-lg px-5 py-10">
        <div className="flex justify-center items-center mb-5">
          <div className="bg-black/15 rounded-full p-2 text-white">
            <div className="bg-gray-900/20 rounded-full p-3 text-white">
              <PhoneIcon cls="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="text-white flex flex-col items-center">
          <p className="text-2xl font-bold mb-1">
            <a href={`tel:${data?.phone}`}>{data?.phone}</a>
          </p>
          <p className="text-lg font-bold underline underline-offset-4">
            <a href={`mailto:${data?.email}`}>{data?.email}</a>
          </p>

          {data?.button?.title && (
            <Button
              title={data.button.title}
              btnType={data?.button.btnType}
              link={data?.button.link}
              linkType={data?.button.linkType}
              cls="!py-2 mt-5 hover:!bg-secondary hover:!text-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}
