"use server";

import { sanityClient } from "./sanity";
import { unstable_cache } from 'next/cache';
import { siteSettingsQuery } from "@/groq/siteSettings";
import { SiteSettingsResponse } from "@/types/siteSettings";
/**
 * Fetches all site settings from Sanity with Next.js caching
 * @returns {Promise<Object>} - A promise that resolves to the site settings
 */


export const getSiteSettings = unstable_cache(
    async (): Promise<SiteSettingsResponse | null> => {
        try {
            const data = await sanityClient.fetch<SiteSettingsResponse>(
                siteSettingsQuery,
                {},
                { next: { revalidate: 3600 } }
            );
            return data;
        } catch (error) {
            console.error("Error fetching site settings:", error);
            return null;
        }
    }
);




