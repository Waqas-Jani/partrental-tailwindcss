/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true, // Set to false if you want to ensure fresh data
    apiVersion: '2025-09-15', // Use current date in YYYY-MM-DD format
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
    return builder.image(source)
}