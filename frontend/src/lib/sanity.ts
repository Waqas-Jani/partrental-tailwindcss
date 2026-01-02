/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Sanity client configuration
export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true, // Set to false if you want to ensure fresh data
    apiVersion: '2025-09-15', // Use current date in YYYY-MM-DD format
})

// Image URL builder
const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
    return builder.image(source)
}

/**
 * Helper function to parse an image reference URL
 * @param {string} ref - The Sanity image reference
 * @returns {string} - The full image URL
 */
export const parseImageUrl = (ref: string) => {
    if (!ref) return "";

    const split = ref.split("-");
    if (split.length === 4) {
        return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${split[1]}-${split[2]}.${split[3]}`;
    }
    return "";
};