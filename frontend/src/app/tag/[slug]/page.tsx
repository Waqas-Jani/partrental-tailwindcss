/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PageBanner from "@/components/common/PageBanner";
import Contact from "@/components/blog/ContactCard";
import PostCard from "@/components/blog/PostCard";
import RecentCard from "@/components/blog/RecentCard";
import CategoryCard from "@/components/blog/CategoryCard";
import TagCard from "@/components/blog/TagCard";
import { getTagBySlug, getTagByBlogPage } from "@/lib";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  return {
    title: tag?.seo?.title || `${tag?.name || "Tag"} - Partner Rentals`,
    description: tag?.seo?.description || `Browse our articles in the ${tag?.name || "selected"} tag`,
    keywords: tag?.seo?.keywords || [],
    openGraph: {
      title: tag?.seo?.title || `${tag?.name || "Tag"} - Partner Rentals`,
      description: tag?.seo?.description || `Browse our articles in the ${tag?.name || "selected"} tag`,
      keywords: tag?.seo?.keywords || [],
    },
    alternates: {
      canonical: `https://partnerrentals.com/tag/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const { sanityBlogPage, tag, allSanityBlog, recentNews, categories, tags } =
    await getTagByBlogPage(slug);

  const hero = sanityBlogPage?.hero;
  const contact = sanityBlogPage?.contact;

  return (
    <>
      {hero && <PageBanner pageName={"Tag"} data={hero} heading={tag?.name} />}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="space-y-14">
                {allSanityBlog?.edges?.map(({ node }: any, index: number) => (
                  <PostCard data={node} key={index} />
                ))}
                {allSanityBlog?.edges?.length === 0 && (
                  <div className="text-center">
                    <h3>No posts found in this tag</h3>
                    <p>
                      Check back later for new content or browse other tags.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-4">
              <CategoryCard list={categories} />
              {/* Contact */}
              <Contact data={contact} />
              {/* Recent News */}
              <div className="mb-10">
                <h4 className="text-2xl font-bold">Recent News</h4>
                <ul className="mt-5">
                  {recentNews.edges
                    ?.slice(0, 3)
                    .map(({ node }: any, index: number) => (
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
