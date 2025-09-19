/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import FaqList from "@/sections/FaqList";
import RecentCard from "@/components/blog/RecentCard";
import Contact from "@/components/blog/ContactCard";

export default function BlogContent({ data }: { data: any }) {
  const { blog, categories, tags, recentBlogs, contact } = data;
  // Helper function to parse URL
  const parseURL = (ref: any) => {
    if (ref) {
      const split = ref.split("-");
      if (split.length === 4) {
        return `https://cdn.sanity.io/images/sfisgfi1/production/${split[1]}-${split[2]}.${split[3]}`;
      }
      return "";
    }
    return "";
  };

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg p-8">
              {blog?.content && (
                <PortableText
                  value={blog?.content}
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
                              target === "_blank"
                                ? "noindex nofollow"
                                : undefined
                            }
                            className="underline transition-colors duration-150 ease-linear underline-offset-8 hover:text-red-600"
                          >
                            {children}
                          </a>
                        );
                      },
                    },
                    types: {
                      figure: ({ value }) => (
                        <div className="my-8 relative">
                          <Image
                            src={parseURL(value?.asset?._ref)}
                            alt={value?.alt || "Blog image"}
                            width={800}
                            height={600}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      ),
                      banner: ({ value }) => (
                        <div className="bg-gray-100 p-6 rounded-lg my-8">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {value.heading}
                          </h2>
                          {value?.subheading && (
                            <h3 className="text-lg text-gray-600 mt-2">
                              {value.subheading}
                            </h3>
                          )}
                        </div>
                      ),
                      faqSec: ({ value }) =>
                        value?.enable && <FaqList data={value} />,
                    },
                  }}
                />
              )}

              {/* Tags */}
              {blog?.tags?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-600 font-medium">Tags:</span>
                    {blog?.tags?.map((item: any, index: number) => (
                      <Link
                        key={index}
                        href={`/tag/${item?.slug}`}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-full text-sm font-medium transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories?.map((item: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/category/${item.slug}`}
                      className="flex items-center justify-between text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      <span>{item?.name}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            {contact && contact.enable && <Contact data={contact} />}

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent News
              </h3>
              <div className="space-y-4">
                {recentBlogs?.recentNews?.edges
                  ?.slice(0, 3)
                  .map((item: any, index: number) => (
                    <RecentCard data={item?.node} key={index} />
                  ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags?.map((item: any, index: number) => (
                  <Link
                    key={index}
                    href={`/tag/${item.slug}`}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    {item?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
