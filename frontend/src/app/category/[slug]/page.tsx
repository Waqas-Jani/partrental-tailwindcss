/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PageBanner from "@/components/common/PageBanner";
import Contact from "@/components/blog/ContactCard";
import PostCard from "@/components/blog/PostCard";
import RecentCard from "@/components/blog/RecentCard";
import { getCategoryBySlug, getCategoryByBlogPage } from "@/lib";
import CategoryCard from "@/components/blog/CategoryCard";
import TagCard from "@/components/blog/TagCard";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return {
    title: `${category?.name || "Category"} - Partner Rentals`,
    description: `Browse our articles in the ${
      category?.name || "selected"
    } category`,
    openGraph: {
      title: `${category?.name || "Category"} - Partner Rentals`,
      description: `Browse our articles in the ${
        category?.name || "selected"
      } category`,
    },
    alternates: {
      canonical: `https://partnerrentals.com/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const {
    sanityBlogPage,
    category,
    allSanityBlog,
    recentNews,
    categories,
    tags,
  } = await getCategoryByBlogPage(slug);

  const hero = sanityBlogPage?.hero;
  const contact = sanityBlogPage?.contact;

  return (
    <>
      <PageBanner pageName={"Category"} data={hero} heading={category?.name} />
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="blog-standard-wrapper">
                {allSanityBlog?.edges?.map(({ node }: any, index: number) => (
                  <PostCard data={node} key={index} />
                ))}
                {allSanityBlog?.edges?.length === 0 && (
                  <div className="text-center">
                    <h3>No posts found in this category</h3>
                    <p>
                      Check back later for new content or browse other
                      categories.
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
