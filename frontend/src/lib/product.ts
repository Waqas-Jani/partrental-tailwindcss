import { sanityClient } from "./sanity";
import { newProductsPageQuery, usedProductsPageQuery } from "@/groq/product";

export async function getNewProductsPageData() {
    try {
        const newPage = await sanityClient.fetch(newProductsPageQuery, {}, { cache: "no-store" }); // 2 minutes
        return newPage;
    }
    catch (error) {
        console.error("Error fetching New Products Page:", error);
        return null;
    }
}

export async function getUsedProductsPageData() {
    try {
        const usedPage = await sanityClient.fetch(usedProductsPageQuery, {}, { cache: "no-store" });
        return usedPage;
    }
    catch (error) {
        console.error("Error fetching Used Products Page:", error);
        return null;
    }
}   