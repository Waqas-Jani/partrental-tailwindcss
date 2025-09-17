"use server";

import { sanityClient } from "./sanity";
import { unstable_cache } from 'next/cache';
import { homePageQuery } from "@/groq/homePage";
import { downloadsPageQuery } from "@/groq/downloadPage";
import { aboutPageQuery } from "@/groq/aboutPage";

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