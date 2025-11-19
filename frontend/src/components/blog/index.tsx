/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import FaqList from "@/sections/FaqList";
import RecentCard from "@/components/blog/RecentCard";
import Contact from "@/components/blog/ContactCard";
import CategoryCard from "@/components/blog/CategoryCard";
import TagCard from "@/components/blog/TagCard";
import Button from "@/components/common/Button";

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
    <section>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32"
        style={{ backgroundImage: `url(${blog?.featuredImage?.asset?.url})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {blog?.title}
            </h1>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-16">
        <div className="tp-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white p-8 prose max-w-none">
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
                        table: ({ value }) => (
                          <div className="border border-gray-200 rounded-lg overflow-hidden my-8">
                            <table className="w-full !mt-0 !mb-0">
                              {value?.rows && value.rows.length > 0 && (
                                <>
                                  <thead className="bg-primary">
                                    <tr>
                                      {value.rows[0]?.cells?.map(
                                        (cell: any, index: number) => (
                                          <th
                                            key={index}
                                            className="!px-6 py-3 text-left text-sm font-extrabold text-white uppercase tracking-wider"
                                          >
                                            {cell}
                                          </th>
                                        )
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {value.rows
                                      .slice(1)
                                      ?.map((row: any, rowIndex: number) => (
                                        <tr
                                          key={rowIndex}
                                          className={`hover:bg-gray-50 ${
                                            rowIndex % 2 === 0
                                              ? "bg-gray-50"
                                              : ""
                                          }`}
                                        >
                                          {row?.cells?.map(
                                            (cell: any, cellIndex: number) => (
                                              <td
                                                key={cellIndex}
                                                className="!px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                              >
                                                {cell}
                                              </td>
                                            )
                                          )}
                                        </tr>
                                      ))}
                                  </tbody>
                                </>
                              )}
                            </table>
                          </div>
                        ),
                        faqSec: ({ value }) =>
                          value?.enable && <FaqList data={value} />,
                        button2: ({ value }) => (
                          <div className="flex mt-5">
                            <Button
                              title={value.title}
                              btnType={value.btnType}
                              link={value.link}
                              linkType={value.linkType}
                              cls="py-2 hover:bg-secondary no-underline hover:text-primary border border-solid border-black"
                            />
                          </div>
                        ),
                      },
                    }}
                  />
                )}

                {/* Tags */}
                {blog?.tags?.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-gray-600 text-lg font-extrabold">
                        Tags:
                      </span>
                      {blog?.tags?.map((item: any, index: number) => (
                        <Link
                          key={index}
                          href={`/tag/${item?.slug.current}`}
                          className="inline-flex no-underline items-center px-3 py-1 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-full text-sm font-medium transition-colors duration-200"
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
              {categories && <CategoryCard list={categories} />}

              {/* Contact */}
              {contact && contact.enable && <Contact data={contact} />}

              {/* Recent Posts */}
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
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
              {tags && <TagCard list={tags} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
