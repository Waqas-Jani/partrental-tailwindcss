"use server";

import { sanityClient } from "./sanity";
import { unstable_cache } from 'next/cache';
import { homePageQuery } from "@/groq/home";
import { downloadsPageQuery } from "@/groq/download";
import { aboutPageQuery } from "@/groq/about";
import { rentPageQuery, rentCategoryQuery } from "@/groq/rent";
import { rentSubCategoryQuery } from "@/groq/product";
import { contactPageQuery } from "@/groq/contact";
import { locationQuery, locationQueryBySlug, locationServiceQuery } from "@/groq/location";
import { blogQueryBySlug } from "@/groq/blog";
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

// Blog by slug
export async function getBlogBySlug(slug: string) {
    try {
        const blog = await sanityClient.fetch(blogQueryBySlug, { slug }, { next: { revalidate: 60 } }); // 1 minutes
        return blog;
    } catch (error) {
        console.error("Error fetching Blog by Slug:", error);
        return null;
    }
}



