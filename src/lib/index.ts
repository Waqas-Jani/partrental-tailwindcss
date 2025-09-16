"use server";

import { sanityClient } from "./sanity";
import { unstable_cache } from 'next/cache';
import { homePageQuery } from "@/groq/homePage";

/**
 * Fetches home page data from Sanity with Next.js caching
 * @returns {Promise<Object>} - A promise that resolves to the home page data
 */
export const getHomePage = unstable_cache(
    async () => {
        try {
            const homePage = await sanityClient.fetch(homePageQuery, {}, { next: { revalidate: 60 } });
            return homePage;
        } catch (error) {
            console.error("Error fetching Home Page:", error);
            return null;
        }
    }
);
