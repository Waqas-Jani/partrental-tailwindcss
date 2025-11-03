/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getBlogPageData } from "@/lib/getBlogPageData";
import PageBanner from "@/components/common/PageBanner";
import Contact from "@/components/blog/ContactCard";
import RecentCard from "@/components/blog/RecentCard";
import PaginationControl from "@/components/PaginationControl";
import BlogCard from "@/components/blog/BlogCard";
import CategoryCard from "@/components/blog/CategoryCard";
import TagCard from "@/components/blog/TagCard";

type PageProps = {
  searchParams: Promise<{ page: string }>;
};

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

export default async function Blog({ searchParams }: PageProps) {
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
      {hero && <PageBanner pageName={hero?.heading} data={hero as any} />}
      <section className="py-10 md:py-16">
        <div className="lg:container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
              <div className="mb-10">
                {numPages !== 1 && (
                  <PaginationControl
                    currentPage={page}
                    pageCount={numPages}
                    basePath="/blog"
                  />
                )}
              </div>
            </div>
            <div className="md:col-span-4">
              {/* Category */}
              <CategoryCard list={categories} />
              {/* Contact */}
              <Contact data={contact} />
              {/* Recent News */}
              <div className="mb-10 border border-gray-200 rounded-lg p-8">
                <h4 className="text-2xl font-bold">Recent News</h4>
                <ul className="mt-5">
                  {recentNews.edges
                    ?.slice(0, 3)
                    .map(({ node }: { node: any }, index: number) => (
                      <RecentCard data={node} key={index} />
                    ))}
                </ul>
              </div>
              {/* Popular Tags */}
              <TagCard list={tags} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
