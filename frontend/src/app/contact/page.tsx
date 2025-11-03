/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import PageBanner from "@/components/common/PageBanner";
import { convertToDailNumber } from "@/utils";
import Form from "@/components/forms/Form";
import { getContactPage } from "@/lib";

export async function generateMetadata() {
  const { sanityContactPage } = await getContactPage();

  return {
    title: sanityContactPage?.seo?.title,
    description: sanityContactPage?.seo?.description,
    keywords: sanityContactPage?.seo?.keywords,
    openGraph: {
      title: sanityContactPage?.seo?.title,
      description: sanityContactPage?.seo?.description,
    },
    alternates: {
      canonical: "https://partnerrentals.com/contact",
    },
  };
}

const Contact = async () => {
  // Fetch data for the page
  const data = await getContactPage();
  const { sanityContactPage } = data;
  const hero = sanityContactPage?.hero;
  const contactSec = sanityContactPage?.contactSec;
  const contactForm = sanityContactPage?.contactForm;

  return (
    <>
      {/* Page Banner */}
      {hero && <PageBanner pageName={hero?.heading} data={hero as any} />}

      {/* Contact Form & Information Section */}
      {contactSec && contactSec.enable && (
        <section className="py-[90px]">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="col-lg-6">
                <div className="mb-8">
                  <span className="sub-title ml-12">
                    {contactSec.subheading}
                  </span>
                  <h2 className="h1-type mt-5">{contactSec.heading}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                  {contactSec?.list?.map((item: any, index: number) => {
                    if (item.infoType === "email") {
                      return (
                        <div className="col-span-1" key={index}>
                          <div className="relative bg-white rounded-lg p-8 shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center text-center group">
                            {/* Background envelope icon */}
                            <svg
                              className="absolute top-4 right-4 w-24 h-24 text-gray-200 opacity-60 group-hover:text-gray-700 group-hover:opacity-20 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M8 10l4 2 4-2"
                              />
                            </svg>

                            {/* Main red envelope icon */}
                            <div className="relative z-10 mb-4">
                              <div className="w-12 h-12 bg-red-600 group-hover:bg-white rounded-full flex items-center justify-center mb-4 transition-all duration-300">
                                <svg
                                  className="w-6 h-6 text-white group-hover:text-red-600 transition-colors duration-300"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                              </div>
                            </div>

                            <h5 className="text-gray-900 group-hover:text-white font-bold text-lg mb-2 transition-colors duration-300">
                              Email
                            </h5>
                            {item.text.map((txt: any, ind: number) => (
                              <a
                                key={ind}
                                href={`mailto:${txt}`}
                                className="text-gray-900 group-hover:text-white hover:text-red-600 group-hover:hover:text-gray-300 transition-colors duration-200"
                              >
                                {txt}
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    } else if (item.infoType === "phone") {
                      return (
                        <div className="col-span-1" key={index}>
                          <div className="relative bg-white rounded-lg p-8 shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center text-center group">
                            {/* Background phone icon */}
                            <svg
                              className="absolute top-4 right-4 w-24 h-24 text-gray-200 opacity-60 group-hover:text-gray-700 group-hover:opacity-20 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>

                            {/* Main red phone icon */}
                            <div className="relative z-10 mb-4">
                              <div className="w-12 h-12 bg-red-600 group-hover:bg-white rounded-full flex items-center justify-center mb-4 transition-all duration-300">
                                <svg
                                  className="w-6 h-6 text-white group-hover:text-red-600 transition-colors duration-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                                </svg>
                              </div>
                            </div>

                            <h5 className="text-gray-900 group-hover:text-white font-bold text-lg mb-2 transition-colors duration-300">
                              Phone Number
                            </h5>
                            {item.text.map((txt: any, ind: number) => (
                              <a
                                key={ind}
                                href={`tel:${convertToDailNumber(txt)}`}
                                className="text-gray-900 group-hover:text-white hover:text-red-600 group-hover:hover:text-gray-300 transition-colors duration-200"
                              >
                                {txt}
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    } else if (item.infoType === "location") {
                      return (
                        <div className="col-span-1 md:col-span-2" key={index}>
                          <div className="relative bg-white rounded-lg p-8 shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center text-center group">
                            {/* Background location icon */}
                            <svg
                              className="absolute top-4 right-4 w-24 h-24 text-gray-200 opacity-60 group-hover:text-gray-700 group-hover:opacity-20 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>

                            {/* Main red location icon */}
                            <div className="relative z-10 mb-4">
                              <div className="w-12 h-12 bg-red-600 group-hover:bg-white rounded-full flex items-center justify-center mb-4 transition-all duration-300">
                                <svg
                                  className="w-6 h-6 text-white group-hover:text-red-600 transition-colors duration-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                            </div>

                            <h5 className="text-gray-900 group-hover:text-white font-bold text-lg mb-2 transition-colors duration-300">
                              {item.heading}
                            </h5>
                            {item.text.map((txt: any, ind: number) => (
                              <p
                                key={ind}
                                className="text-gray-900 group-hover:text-white transition-colors duration-300"
                              >
                                {txt}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                {contactSec?.description && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-lg-8">
                      <p>{contactSec?.description}</p>
                    </div>
                  </div>
                )}
                {contactSec?.bg?.asset?.url && (
                  <div className="col-span-1 mt-10">
                    <Image
                      src={contactSec?.bg?.asset?.url}
                      alt="Contact Info"
                      width={800}
                      height={500}
                      className="w-full h-full object-contain"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="col-span-1">
                {contactForm && contactForm.enable && (
                  <Form data={contactForm} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Contact;
