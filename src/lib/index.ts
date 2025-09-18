"use server";

import { sanityClient } from "./sanity";
import { unstable_cache } from 'next/cache';
import { homePageQuery } from "@/groq/homePage";
import { downloadsPageQuery } from "@/groq/downloadPage";
import { aboutPageQuery } from "@/groq/aboutPage";
import { rentPageQuery, rentCategoryQuery } from "@/groq/rentPage";
import { productQuery } from "@/groq/productPage";

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

// Product
export async function getProduct(slug: string) {
    try {
        const cleanSlug = slug.replace(/^\/+|\/+$/g, "");

        const product = await sanityClient.fetch(productQuery, {
            originalSlug: slug,
            cleanSlug: cleanSlug,
        }, { next: { revalidate: 60 } }); // 1 minutes

        return product;
    } catch (error) {
        console.error("Error fetching Product:", error);
        return null;
    }
}

export async function getLocation() {
    try {
        const locations = await sanityClient.fetch(
            ` *[_type == "location"] {
              _id,
              title,
              "slug": {
              "current": slug.current
              }
          }`
            , {}, { next: { revalidate: 60 } }); // 1 minutes
        return locations;
    } catch (error) {
        console.error("Error fetching Location:", error);
        return null;
    }
}


