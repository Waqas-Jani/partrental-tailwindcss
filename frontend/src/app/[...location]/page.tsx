/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { _renderSection } from "@/components/RenderSection";
import PageBanner from "@/components/common/PageBanner";
import { getLocationBySlug, getAllLocation, getBlogBySlug } from "@/lib";
import { getAllLandingPages, getLandingPageBySlug } from "@/lib/getLandingPage";
import RecentCard from "@/components/blog/RecentCard";
import Contact from "@/components/blog/ContactCard";
import { sanityClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import FaqList from "@/sections/FaqList";
import { CircleArrowRightIcon } from "@/components/common/SocialIcons";

interface MetadataProps {
  params: Promise<{ location: string[] }>;
}
interface ServicesPageProps {
  params: Promise<{ location: string[] }>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const locationParams = await params;
  const slug = locationParams.location.join("/");

  try {
    const [landingList, locationList] = await Promise.all([
      getAllLandingPages(),
      getAllLocation(),
    ]);

    // Check for landing page
    const isLandingPage = landingList.some(
      (landing: any) => landing.slug === locationParams.location[0]
    );

    if (isLandingPage) {
      const data = await getLandingPageBySlug(slug);

      return {
        title: data.seo?.title || data.title,
        description: data.seo?.description,
        keywords: data.seo?.keywords,
        openGraph: {
          title: data.seo?.title || data.title,
          description: data.seo?.description,
          images: [
            {
              url: data.landingHero?.bg?.asset?.url,
              width: 1200,
              height: 630,
            },
          ],
        },
        alternates: {
          canonical: `https://partnerrentals.com/${slug}`,
        },
      };
    }

    // Check for location page
    const isLocationPage = locationList.some(
      (location: any) => location.slug === locationParams.location[0]
    );

    if (isLocationPage) {
      const data = await getLocationBySlug(
        locationParams.location[0],
        locationParams.location.length > 1 ? locationParams.location[1] : null
      );

      return {
        title: data.sanityLocation?.seo?.title || data.sanityLocation?.title,
        description: data.sanityLocation?.seo?.description,
        keywords: data.sanityLocation?.seo?.keywords,
        openGraph: {
          title: data.sanityLocation?.seo?.title || data.sanityLocation?.title,
          description: data.sanityLocation?.seo?.description,
          images: [
            {
              url: data.sanityLocation?.hero?.bg?.asset?.url,
              width: 1200,
              height: 630,
            },
          ],
        },
        alternates: {
          canonical: `https://partnerrentals.com/${slug}`,
        },
      };
    }

    // Check for blog post
    const blog = await getBlogBySlug(locationParams.location[0]);
    console.log("===blog===", blog);
    if (!blog) {
      return { title: "Page not found" };
    }

    return {
      title: blog.title,
      description: blog.seo?.description || "",
      keywords: blog.seo?.keywords || "",
      openGraph: {
        title: blog.title,
        description: blog.seo?.description || "",
        images: [
          {
            url: blog.featuredImage?.asset?.url,
            width: 1200,
            height: 630,
          },
        ],
      },
      alternates: {
        canonical: `https://partnerrentals.com/${locationParams.location[0]}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error" };
  }
}

const ServicesPage = async ({ params }: ServicesPageProps) => {
  const locationParams = await params;

  try {
    const [landingList, locationList] = await Promise.all([
      getAllLandingPages(),
      getAllLocation(),
    ]);

    // Check for landing page
    const isLandingPage = landingList.some(
      (landing: any) => landing.slug === locationParams.location[0]
    );

    if (isLandingPage) {
      // TODO: Implement LandingPage component
      return <div>Landing Page - Coming Soon</div>;
    }

    // Check for location page
    const isLocationPage = locationList.some(
      (location: any) => location.slug === locationParams.location[0]
    );

    if (isLocationPage) {
      const data = await getLocationBySlug(
        locationParams.location[0],
        locationParams.location.length > 1 ? locationParams.location[1] : null
      );

      return (
        <div>
          <PageBanner
            pageName={data?.sanityLocation?.hero?.heading}
            data={data?.sanityLocation?.hero}
          />
          {data?.sanityLocation?.pageBuilder?.map((item: any, index: number) =>
            _renderSection(item, index)
          )}

          {/* Service Area Section - Only shown on location pages */}
          {data?.sanityLocation?.locationServices &&
            data.sanityLocation.locationServices.length > 0 && (
              <section className="py-5 md:py-16">
                <div className="container mx-auto px-5">
                  <div className="text-center mb-12">
                    <h2 className="h1-type">Services Area</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.sanityLocation?.locationServices?.map(
                      (service: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                          <h4 className="text-xl md:text-2xl font-bold text-secondary mb-4">
                            {service.title}
                          </h4>
                          <div className="flex">
                            <Link
                              href={`/${data.sanityLocation.slug?.current}/${service.slug?.current}`}
                              className="main-btn primary-btn"
                            >
                              View Details
                              <CircleArrowRightIcon />
                            </Link>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>
            )}
        </div>
      );
    }

    // Handle blog post - fetch all data in parallel
    const [blog, categories, tags, recentBlogs, contact] = await Promise.all([
      sanityClient.fetch(
        `*[_type == "blog" && slug.current == $slug][0] {
          title,
          "slug": slug.current,
          excerpt,
          featuredImage {
            alt,
            asset -> {
              url
            }
          },
          "categories": categories[]->{
            name,
            "slug": slug.current
          },
          "author": author->{
            name,
            photo {
              asset->{
                url
              }
            },
            Bio
          },
          "tags": tags[]->{
            name,
            "slug": slug.current
          },
          publishedAt,
          modifiedAt,
          content
        }`,
        { slug: locationParams.location[0] }
      ),
      sanityClient.fetch(`
        *[_type == "category"] {
          name,
          "slug": slug.current
        }
      `),
      sanityClient.fetch(`
        *[_type == "tag"][0...10] {
          name,
          "slug": slug.current
        }
      `),
      sanityClient.fetch(
        `{
          "recentNews": {
            "edges": *[_type == "blog"] | order(_createdAt desc) [0...3] {
              "node": {
                "title": title,
                "slug": {
                  "current": slug.current
                },
                "featuredImage": {
                  "alt": featuredImage.alt,
                  "asset": {
                    "url": featuredImage.asset->url
                  }
                },
                "author": author->{
                  "name": name
                }
              }
            }
          }
        }`
      ),
      sanityClient.fetch(`*[_type == "blogPage"][0].contact`),
    ]);

    if (!blog) {
      notFound();
    }

    // Helper function to parse URL
    const parseURL = (ref: any) => {
      if (ref) {
        const split = ref.split("-");
        if (split.length === 4) {
          return `https://cdn.sanity.io/images/ff86wg9s/production/${split[1]}-${split[2]}.${split[3]}`;
        }
        return "";
      }
      return "";
    };

    return (
      <>
        {/* Hero Banner */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-24"
          style={{
            backgroundImage: `url(${blog?.featuredImage?.asset?.url})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {blog?.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
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
                            const target = (value?.href || "").startsWith(
                              "http"
                            )
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
      </>
    );
  } catch (error) {
    console.error("Error loading page:", error);
    notFound();
  }
};

export default ServicesPage;
