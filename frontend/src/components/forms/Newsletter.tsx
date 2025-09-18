/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../common/Button";

export default function Newsletter({ data }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting...");
    const d = {
      data: {
        name: name,
        email: email,
        date: new Date().toUTCString(),
        website: window.location.origin,
      },
      sheetID: 5,
    };

    fetch("https://leads.civsav.com/template/contact", {
      method: "POST",
      body: JSON.stringify(d),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        // if (typeof window !== "undefined" && window.dataLayer) {
        //   window.dataLayer.push({
        //     event: "generate_lead",
        //   });
        // }
        toast.dismiss(toastId);
        toast.success("Request has been submitted successfully");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong! Please try again");
        setLoading(false);
      });
  };

  return (
    <div className="mt-5">
      <p className="h4-type mb-4">{data?.heading}</p>

      <form onSubmit={onSubmit}>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-row flex-1">
            <input
              type="text"
              className="input-field"
              placeholder="Name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-row flex-1">
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="">
            {data?.button?.title && (
              <Button
                title={data?.button?.title}
                btnType={data?.button?.btnType || "primary"}
                link={data?.button.link || ""}
                linkType={data?.button.linkType || "internal"}
                disabled={loading}
                cls="w-full"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
