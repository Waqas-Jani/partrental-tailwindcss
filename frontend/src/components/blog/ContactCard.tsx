/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "../common/Button";

export default function ContactCard({ data }: any) {
  return (
    <div
      className="bg-cover bg-center mb-[40px]"
      style={{
        backgroundImage: data?.bg?.asset
          ? `url(${data.bg?.asset?.url})`
          : "url(/assets/images/widget/contact-1.jpg)",
      }}
    >
      <div className="text-center">
        <div className="">{/* <i className="far fa-phone" /> */}</div>
        <div className="info">
          <h4>
            <a href={`tel:${data?.phone}`}>{data?.phone}</a>
          </h4>
          <h5>
            <a href={`mailto:${data?.email}`}>{data?.email}</a>
          </h5>
          {/* <a href="#" className="main-btn bordered-btn bordered-black">
            Contact us
          </a> */}
          {data?.button?.title && (
            <Button
              title={data.button.title}
              btnType={data?.button.btnType}
              link={data?.button.link}
              linkType={data?.button.linkType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
