import React from "react";
import BlogContent from "@/components/blog";
import {
  getBlogBySlug,
  getBlogFullBySlug,
  getBlogCategoryList,
  getBlogTagList,
  getRecentBlogs,
} from "@/lib";
import { sanityClient } from "@/lib/sanity";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
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
      canonical: `https://www.scottequip.com/blog/${slug}`,
    },
  };
}

const BlogDetail = async ({ params }: PageProps) => {
  const { slug } = await params;
  // Handle blog post - fetch all data in parallel
  const [blog, categories, tags, recentBlogs, contact] = await Promise.all([
    getBlogFullBySlug(slug),
    getBlogCategoryList(),
    getBlogTagList(),
    getRecentBlogs(),
    sanityClient.fetch(`*[_type == "blogPage"][0].contact`),
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <BlogContent data={{ blog, categories, tags, recentBlogs, contact }} />
  );
};

export default BlogDetail;
