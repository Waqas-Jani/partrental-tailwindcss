/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { _renderSection } from "@/components/RenderSection";
import PageBanner from "@/components/common/PageBanner";
import { getLocationBySlug, getAllLocation } from "@/lib";
import { getAllLandingPages, getLandingPageBySlug } from "@/lib/getLandingPage";
// import LandingPage from "@/components/landingpage";
import RecentCard from "@/components/blog/RecentCard";
import Contact from "@/components/blog/ContactCard";
import { sanityClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import FaqList from "@/sections/FaqList";

export async function generateMetadata({ params }: any) {
  const locationParams = await params;
  console.log("===locationParams===", locationParams);

  //   const landingList = await getAllLandingPages();
  const landingList: any[] = [];
  const locationList = await getAllLocation();
//   console.log("===locationList===", locationList);

  const slug = locationParams.location.join("/");
//   console.log("===slug===", slug);

locationList.some(
    (landing: any) => {
        console.log("===landing===", landing);
        console.log("===locationParams.location[0]===", locationParams.location[0] == landing.slug);
        return landing.slug === locationParams.location[0];
    }
  )

  if (
    landingList.some(
      (landing: any) => landing.slug === locationParams.location[0]
    )
  ) {
    const data = await getLandingPageBySlug(slug);
    console.log("===if data===", data);

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
  } else if (
    locationList.some(
      (location: any) => location.slug.current === locationParams.location[0]
    )
  ) {
    const data = await getLocationBySlug(
      locationParams.location[0],
      locationParams.location.length > 1 ? locationParams.location[1] : null
    );
    console.log("===if else data===", data);

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
  } else {
    const blog = await sanityClient.fetch(
      `
      *[_type == "blog" && slug.current == $slug][0] {
        title,
        seo {
          description,
          keywords
        },
        featuredImage {
          alt,
          asset -> {
            url
          }
        }
      }
    `,
      { slug: locationParams.location[0] }
    );

    console.log("===Else blog===", blog);

    if (!blog) return { title: "Blog not found" };

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
  }
}

const ServicesPage = async ({ params }: any) => {
  const locationParams = await params;
  const landingList = await getAllLandingPages();
  const locationList = await getAllLocation();

  return <div>ServicesPage</div>;

  if (
    landingList.some(
      (landing: any) => landing.slug === locationParams.location[0]
    )
  ) {
    const data = await getLandingPageBySlug(locationParams.location.join("/"));
    return null;
    // return <LandingPage data={data} />;
  } else if (
    locationList.some(
      (location: any) => location.slug.current === locationParams.location[0]
    )
  ) {
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
            <section className="service-area pt-70 pb-40">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="section-title text-center mb-55">
                      <h2>Services Area</h2>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {data.sanityLocation.locationServices.map(
                    (service: any, index: number) => (
                      <div
                        key={index}
                        className="col-lg-4 col-md-6 col-sm-12 shadow-md mb-25"
                      >
                        <div
                          className="service-item mb-25 wow fadeInUp"
                          data-wow-delay={`0.${index + 1}s`}
                        >
                          <div className="card h-100 border-0">
                            <div className="card-body">
                              <h4 className="card-title">{service.title}</h4>
                              <Link
                                href={`/${data.sanityLocation.slug?.current}/${service.slug?.current}`}
                                className="main-btn btn-yellow"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
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
  } else {
    const blog = await sanityClient.fetch(
      `
      *[_type == "blog" && slug.current == $slug][0] {
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
  }
    `,
      { slug: locationParams.location[0] }
    );

    // Fetch categories for sidebar
    const categories = await sanityClient.fetch(`
      *[_type == "category"] {
        name,
        "slug": slug.current
      }
    `);

    // Fetch tags for sidebar
    const tags = await sanityClient.fetch(`
      *[_type == "tag"][0...10] {
        name,
        "slug": slug.current
      }
    `);

    // Fetch recent blogs
    const recentBlogs = await sanityClient.fetch(
      `
      {
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
      }
    `,
      { slug: locationParams.location[0] }
    );

    // Fetch contact information
    const contact = await sanityClient.fetch(`
      *[_type == "blogPage"][0].contact
    `);

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
      } else {
        return "";
      }
    };

    return (
      <>
        <section
          className="page-banner bg_cover position-relative z-1"
          style={{
            backgroundImage: `url(${blog?.featuredImage?.asset?.url})`,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-title text-white">
                  <h2>{blog?.title}</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-details-page pt-50 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="blog-details-wrapper mb-40 wow fadeInUp">
                  <div className="blog-post-item">
                    <div className="post-content pt-50">
                      {blog?.content && (
                        <PortableText
                          value={blog?.content}
                          components={{
                            marks: {
                              color: ({ value, children }) => (
                                <span style={{ color: value.hex }}>
                                  {children}
                                </span>
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
                                    className="underline link transition-colors duration-150 ease-linear underline-offset-8 hover:text-primary"
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
                                    <img
                                      src={parseURL(value?.asset?._ref)}
                                      alt={value?.alt}
                                    />
                                  </div>
                                );
                              },
                              banner: ({ value }) => {
                                return (
                                  <div className="banner">
                                    <h1>{value.heading}</h1>
                                    {value?.subheading && (
                                      <h2>{value.subheading}</h2>
                                    )}
                                  </div>
                                );
                              },
                              faqSec: ({ value }) => {
                                return (
                                  value?.enable && <FaqList data={value} />
                                );
                              },
                            },
                          }}
                        />
                      )}

                      <br />
                      {blog?.tags?.length > 0 && (
                        <div className="post-share-tag mb-40">
                          <div className="row">
                            <div className="col-12">
                              <div className="post-tag-cloud">
                                <ul>
                                  <li className="item-heading">Tags :</li>
                                  {blog?.tags?.map(
                                    (item: any, index: number) => (
                                      <li key={index}>
                                        <Link href={`/tag/${item?.slug}`}>
                                          {item.name}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-5">
                <div className="sidebar-widget-area">
                  <div className="widget category-widget mb-40 wow fadeInUp">
                    <h4 className="widget-title">Categories</h4>
                    <ul className="category-nav">
                      {categories?.map((item: any, index: number) => (
                        <li key={index}>
                          <Link href={`/category/${item.slug}`}>
                            {item?.name}
                            <span>
                              <i className="far fa-arrow-right" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {contact && contact.enable && <Contact data={contact} />}

                  <div className="widget recent-post-widget mb-40 wow fadeInUp">
                    <h4 className="widget-title">Recent News</h4>
                    <ul className="recent-post-list">
                      {recentBlogs?.recentNews?.edges
                        ?.slice(0, 3)
                        .map((item: any, index: number) => (
                          <RecentCard data={item?.node} key={index} />
                        ))}
                    </ul>
                  </div>

                  <div className="widget tag-cloud-widget mb-40 wow fadeInUp">
                    <h4 className="widget-title">Popular Tags</h4>
                    {tags?.map((item: any, index: number) => (
                      <Link href={`/tag/${item.slug}`} key={index}>
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
  }
};

export default ServicesPage;
