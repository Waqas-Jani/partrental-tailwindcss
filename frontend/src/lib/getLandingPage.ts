import { sanityClient } from "./sanity";
import { landingPageBySlugQuery } from "@/groq/landingPage";

export async function getAllLandingPages() {
    const query = `*[_type == "landingPage"] {
    _id,
    "slug": slug.current,
  }`;

    try {
        const landingPages = await sanityClient.fetch(query, {}, { next: { revalidate: 60 } });
        return landingPages;
    } catch (error) {
        console.error(`Error fetching landing page:`, error);
        return null;
    }
}


export async function getLandingPageBySlug(slug: string) {
    try {
        const landingPage = await sanityClient.fetch(landingPageBySlugQuery, { slug });
        return landingPage;
    } catch (error) {
        console.error(`Error fetching landing page:`, error);
        return null;
    }
}
