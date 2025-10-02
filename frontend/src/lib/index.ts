"use server";

import { sanityClient } from "./sanity";
import { unstable_cache } from 'next/cache';
import { homePageQuery } from "@/groq/home";
import { downloadsPageQuery } from "@/groq/download";
import { aboutPageQuery } from "@/groq/about";
import { rentPageQuery, rentCategoryQuery, rentSubCategoryQuery } from "@/groq/rent";
import { contactPageQuery } from "@/groq/contact";
import { locationQuery, locationQueryBySlug, locationServiceQuery } from "@/groq/location";
import { blogFullQueryBySlug, blogShortQueryBySlug, blogCategoryListQuery, blogTagListQuery, recentBlogsQuery, categoryBySlugQuery, categoryPageQuery, tagBySlugQuery, tagPageQuery } from "@/groq/blog";
import { servicePageQuery } from "@/groq/service";
import { faqPageQuery } from "@/groq/faq";
/**
 * Fetches home page data from Sanity with Next.js caching
 * @returns {Promise<Object>} - A promise that resolves to the home page data
 */
export const getHomePage = unstable_cache(
    async () => {
        try {
            const homePage = await sanityClient.fetch(homePageQuery, {}, { next: { revalidate: 120 } }); // 2 minutes
            return homePage;
        } catch (error) {
            console.error("Error fetching Home Page:", error);
            return null;
        }
    }
);

export const getDownloadsPage = unstable_cache(
    async () => {
        try {
            const downloadsPage = await sanityClient.fetch(downloadsPageQuery, {}, { next: { revalidate: 120 } }); // 2 minutes
            return downloadsPage;
        } catch (error) {
            console.error("Error fetching Downloads Page:", error);
            return null;
        }
    }
);

export const getAboutPage = unstable_cache(
    async () => {
        try {
            const aboutPage = await sanityClient.fetch(aboutPageQuery, {}, { next: { revalidate: 3600 } }); // 1 hour
            return aboutPage;
        } catch (error) {
            console.error("Error fetching About Page:", error);
            return null;
        }
    }
);

// Rent Page
export const getRentPage = unstable_cache(
    async () => {
        try {
            const rentPage = await sanityClient.fetch(rentPageQuery, {}, { next: { revalidate: 1800 } }); // 30 minutes
            return rentPage;
        } catch (error) {
            console.error("Error fetching Rent Page:", error);
            return null;
        }
    }
);

// Rent Category
export const getRentCategory = async (slug: string) => {

    try {
        const rentCategory = await sanityClient.fetch(rentCategoryQuery, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return rentCategory;
    } catch (error) {
        console.error("Error fetching Rent Category:", error);
        return null;
    }
}

// Rent Sub Category
export async function getRentSubCategory(slug: string) {
    try {
        const cleanSlug = slug.replace(/^\/+|\/+$/g, "");

        const rentSubCategory = await sanityClient.fetch(rentSubCategoryQuery, {
            originalSlug: slug,
            cleanSlug: cleanSlug,
        }, { next: { revalidate: 60 } }); // 1 minutes

        return rentSubCategory;
    } catch (error) {
        console.error("Error fetching Product:", error);
        return null;
    }
}

// Location
export async function getAllLocation() {
    try {
        const locations = await sanityClient.fetch(locationQuery, {}, { next: { revalidate: 60 } }); // 1 minutes
        return locations;
    } catch (error) {
        console.error("Error fetching Location:", error);
        return null;
    }
}

// Contact Page
export const getContactPage = unstable_cache(
    async () => {
        try {
            const contactPage = await sanityClient.fetch(contactPageQuery, {}, { next: { revalidate: 1800 } }); // 30 minutes
            return contactPage;
        } catch (error) {
            console.error("Error fetching Contact Page:", error);
            return null;
        }
    }
);

export async function getLocationBySlug(slug: string, service: string | null) {

    try {
        if (service) {
            const location = await sanityClient.fetch(locationServiceQuery, { slug, service }, { next: { revalidate: 60 } }); // 1 minutes
            return location;
        } else {
            const location = await sanityClient.fetch(locationQueryBySlug, { slug }, { next: { revalidate: 60 } }); // 1 minutes
            return location;
        }
    } catch (error) {
        console.error("Error fetching Location by Slug:", error);
        return null;
    }
}

// Blog short info by slug
export async function getBlogBySlug(slug: string) {
    try {
        const blog = await sanityClient.fetch(blogShortQueryBySlug, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return blog;
    } catch (error) {
        console.error("Error fetching Blog by Slug:", error);
        return null;
    }
}

// Blog full info by slug
export async function getBlogFullBySlug(slug: string) {
    try {
        const blog = await sanityClient.fetch(blogFullQueryBySlug, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return blog;
    } catch (error) {
        console.error("Error fetching Blog by Slug:", error);
        return null;
    }
}

// Blog category list
export async function getBlogCategoryList() {
    try {
        const blogCategoryList = await sanityClient.fetch(blogCategoryListQuery, {}, { next: { revalidate: 60 } }); // 1 minutes
        return blogCategoryList;
    } catch (error) {
        console.error("Error fetching Blog Category List:", error);
        return null;
    }
}

// Blog tag list
export async function getBlogTagList() {
    try {
        const blogTagList = await sanityClient.fetch(blogTagListQuery, {}, { next: { revalidate: 60 } }); // 1 minutes
        return blogTagList;
    } catch (error) {
        console.error("Error fetching Blog Tag List:", error);
        return null;
    }
}

// Recent blogs
export async function getRecentBlogs() {
    try {
        const recentBlogs = await sanityClient.fetch(recentBlogsQuery, {}, { next: { revalidate: 60 } }); // 1 minutes
        return recentBlogs;
    } catch (error) {
        console.error("Error fetching Recent Blogs:", error);
        return null;
    }
}

// categroy by slug
export async function getCategoryBySlug(slug: string) {
    try {
        const category = await sanityClient.fetch(categoryBySlugQuery, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return category;
    } catch (error) {
        console.error("Error fetching Category by Slug:", error);
        return null;
    }
}

// tag by slug
export async function getTagBySlug(slug: string) {
    try {
        const tag = await sanityClient.fetch(tagBySlugQuery, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return tag;
    } catch (error) {
        console.error("Error fetching Tag by Slug:", error);
        return null;
    }
}

// category by blog page
export async function getCategoryByBlogPage(slug: string) {
    try {
        const category = await sanityClient.fetch(categoryPageQuery, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return category;
    } catch (error) {
        console.error("Error fetching Category by Blog Page:", error);
        return null;
    }
}

// tag by blog page
export async function getTagByBlogPage(slug: string) {
    try {
        const tag = await sanityClient.fetch(tagPageQuery, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return tag;
    } catch (error) {
        console.error("Error fetching Tag by Blog Page:", error);
        return null;
    }
}

// service page
export const getServicePage = unstable_cache(
    async () => {
        try {
            const servicePage = await sanityClient.fetch(servicePageQuery, {}, { next: { revalidate: 120 } }); // 2 minutes
            return servicePage;
        }
        catch (error) {
            console.error("Error fetching Service Page:", error);
            return null;
        }
    }
);

// faq page
export const getFaqPage = unstable_cache(
    async () => {
        try {
            const faqPage = await sanityClient.fetch(faqPageQuery, {}, { next: { revalidate: 120 } }); // 2 minutes
            return faqPage;
        }
        catch (error) {
            console.error("Error fetching Faq Page:", error);
            return null;
        }
    }
);