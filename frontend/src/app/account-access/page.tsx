/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { parseImageUrl } from "@/lib/sanity";
import { getAccountAccessPage } from "@/lib";
import PageBanner from "@/components/common/PageBanner";

import { PortableText } from "@portabletext/react";

export async function generateMetadata() {
  const { sanityAccountAccess } = await getAccountAccessPage();
  return {
    title: sanityAccountAccess?.seo?.title,
    description: sanityAccountAccess?.seo?.description,
    keywords: sanityAccountAccess?.seo?.keywords,
    openGraph: {
      title: sanityAccountAccess?.seo?.title,
      description: sanityAccountAccess?.seo?.description,
      images: [
        {
          url: sanityAccountAccess?.hero?.bg?.asset?.url,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `https://partnerrentals.com/account-access`,
    },
  };
}

export default async function AccountAccess() {
  const { sanityAccountAccess } = await getAccountAccessPage();

  const hero = sanityAccountAccess?.hero;

  return (
    <>
      <PageBanner pageName={hero?.heading} data={hero} />
      <section className="container py-10 mx-auto px-5">
        <div className="prose max-w-none">
          {sanityAccountAccess?.content && (
            <PortableText
              value={sanityAccountAccess?.content}
              components={{
                marks: {
                  color: ({ value, children }) => (
                    <span style={{ color: value.hex }}>{children}</span>
                  ),
                  link: ({ value, children }) => {
                    const target = (value?.href || "").startsWith("http")
                      ? "_blank"
                      : undefined;
                    return (
                      <a
                        href={value?.href}
                        target={target}
                        rel={
                          target === "_blank" ? "noindex nofollow" : undefined
                        }
                        className="hover:underline no-underline link transition-colors duration-150 ease-linear underline-offset-8 text-primary font-bold"
                      >
                        {children}
                      </a>
                    );
                  },
                },
                types: {
                  figure: ({ value }) => {
                    return (
                      <div className="img-container">
                        <Image
                          src={parseImageUrl(value?.asset?._ref || "")}
                          alt={value?.alt || ""}
                          width={1000}
                          height={1000}
                        />
                      </div>
                    );
                  },
                  banner: ({ value }) => {
                    return (
                      <div className="banner text-center">
                        <h1 className="text-primary">{value.heading}</h1>
                        {value?.subheading && (
                          <h2 className="text-primary">{value.subheading}</h2>
                        )}
                      </div>
                    );
                  },
                },
              }}
            />
          )}
        </div>
      </section>
    </>
  );
}
