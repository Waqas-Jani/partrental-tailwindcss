import { sanityClient } from "./sanity";
import { newProductsPageQuery, usedProductsPageQuery } from "@/groq/product";

export async function getNewProductsPageData() {
    try {
        const newPage = await sanityClient.fetch(newProductsPageQuery, {}, {
            next: { revalidate: 60 } // 1 minute
        });
        return newPage || { sanityNewProductsPage: null };
    }
    catch (error) {
        console.error("Error fetching New Products Page:", error);
        return null;
    }
}

export async function getUsedProductsPageData() {
    try {
        const usedPage = await sanityClient.fetch(usedProductsPageQuery, {}, {
            next: { revalidate: 60 } // 1 minute
        });
        return usedPage || { sanityUsedProductsPage: null };
    }
    catch (error) {
        console.error("Error fetching Used Products Page:", error);
        return null;
    }
}   