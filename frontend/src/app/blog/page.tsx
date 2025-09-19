/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity";
import PageBanner from "@/components/common/PageBanner";
import Contact from "@/components/blog/ContactCard";
import RecentCard from "@/components/blog/RecentCard";
import PaginationControl from "@/components/PaginationControl";
import BlogCard from "@/components/blog/BlogCard";

export async function generateMetadata() {
  const { sanityBlogPage } = await getBlogPageData();
  return {
    title: sanityBlogPage?.seo?.title,
    description: sanityBlogPage?.seo?.description,
    keywords: sanityBlogPage?.seo?.keywords,
    openGraph: {
      title: sanityBlogPage?.seo?.title,
      description: sanityBlogPage?.seo?.description,
      images: [
        {
          url: sanityBlogPage?.hero?.bg?.asset?.url,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `https://partnerrentals.com/blog`,
    },
  };
}

/**
 * Fetches data for the blog page using GROQ query
 * @param {number} page - Current page number
 * @param {number} limit - Number of posts per page
 * @returns {Promise<Object>} The data for the blog page
 */
async function getBlogPageData(page = 1, limit = 6) {
  const skip = (page - 1) * limit;

  return sanityClient.fetch(
    `
    {
      "sanityBlogPage": *[_type == "blogPage"][0] {
        "seo": {
          "title": seo.title,
          "ldSchema": seo.ldSchema,
          "keywords": seo.keywords,
          "description": seo.description
        },
        hero {
            heading,
            description,
            "bg": {
              "asset": {
                "url": bg.asset->url
              }
            },
            isBreadcrumb,
            button {
              btnType,
              link,
              linkType,
              title
            },
            button2 {
              btnType,
              link,
              linkType,
              title
            }
        },
        "contact": {
          "enable": contact.enable,
          "phone": contact.phone,
          "email": contact.email,
          "button": {
            "btnType": contact.button.btnType,
            "link": contact.button.link,
            "linkType": contact.button.linkType,
            "title": contact.button.title
          },
          "bg": {
            "url": contact.bg.asset->url
          }
        }
      },
      "allSanityBlog": {
        "edges": *[_type == "blog"] | order(modifiedAt desc) [${skip}...${
      skip + limit
    }] {
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
            "publishedAt": publishedAt,
            "modifiedAt": modifiedAt,
            "category": category->{
              "name": name
            }
          }
        },
        "totalCount": count(*[_type == "blog"])
      },
      "recentNews": {
        "edges": *[_type == "blog"] | order(modifiedAt desc) [0...3] {
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
      },
      "categories": *[_type == "category"] {
        "name": name,
        "slug": {
          "current": slug.current
        }
      },
      "tags": *[_type == "tag"][0...10] {
        "name": name,
        "slug": {
          "current": slug.current
        }
      },
      "sanitySitesettings": *[_type == "sitesettings"][0] {
        "favicon": {
          "url": favicon.asset->url
        }
      }
    }
  `,
    {},
    { cache: "no-store" }
  );
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = (await searchParams)?.page
    ? parseInt((await searchParams)?.page)
    : 1;

  const limit = 10; // Posts per page

  const { sanityBlogPage, allSanityBlog, recentNews, categories, tags } =
    await getBlogPageData(page, limit);

  const numPages = Math.ceil(allSanityBlog.totalCount / limit);
  const hero = sanityBlogPage?.hero;
  const contact = sanityBlogPage?.contact;

  return (
    <>
      <PageBanner pageName={hero?.heading} data={hero} />
      <section className="blog-standard-section pt-70 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="row justify-content-center">
                {allSanityBlog?.edges?.map(
                  ({ node }: { node: any }, index: number) => (
                    <BlogCard
                      item={node}
                      key={index}
                      index={index}
                      isHome={false}
                    />
                  )
                )}
              </div>
              <div className="pagination mb-50 wow fadeInUp justify-content-center">
                {numPages !== 1 && (
                  <PaginationControl
                    currentPage={page}
                    pageCount={numPages}
                    basePath="/blog"
                  />
                )}
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="sidebar-widget-area">
                <div className="widget category-widget mb-40 wow fadeInUp">
                  <h4 className="widget-title">Category</h4>
                  <ul className="category-nav">
                    {categories?.map(
                      (
                        item: { name: string; slug: { current: string } },
                        index: number
                      ) => (
                        <li key={index}>
                          <Link href={`/category/${item.slug.current}`}>
                            {item?.name}
                            <span>
                              <i className="far fa-arrow-right" />
                            </span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <Contact data={contact} />
                <div className="widget recent-post-widget mb-40 wow fadeInUp">
                  <h4 className="widget-title">Recent News</h4>
                  <ul className="recent-post-list">
                    {recentNews.edges
                      ?.slice(0, 3)
                      .map(({ node }: { node: any }, index: number) => (
                        <RecentCard data={node} key={index} />
                      ))}
                  </ul>
                </div>
                <div className="widget tag-cloud-widget mb-40 wow fadeInUp">
                  <h4 className="widget-title">Popular Tags</h4>
                  {tags?.map(
                    (
                      item: { name: string; slug: { current: string } },
                      index: number
                    ) => (
                      <Link href={`/tag/${item.slug.current}`} key={index}>
                        {item?.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
