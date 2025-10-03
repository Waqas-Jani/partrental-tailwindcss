/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityClient } from "../lib/sanity";

// Base URL for your site
const baseUrl = "https://partnerrentals.com";

// Static routes that don't change
const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/faq",
    "/services",
    "/downloads",
    "/account-access",
    "/rent",
    "/product-category/new",
    "/product-category/used",
];

// Fetch all dynamic content from Sanity
async function getDynamicRoutes() {
    try {
        // Fetch all blog posts
        const blogPosts = await sanityClient.fetch(`
      *[_type == "blog"] {
        "slug": slug.current,
        _updatedAt,
        publishedAt
      }
    `);

        // Fetch all blog categories
        const blogCategories = await sanityClient.fetch(`
      *[_type == "category"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        // Fetch all blog tags
        const blogTags = await sanityClient.fetch(`
      *[_type == "tag"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        // Fetch all products
        const products = await sanityClient.fetch(`
      *[_type == "product"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        // Note: Product categories and tags are not used for individual routes
        // They are used for filtering on /product-category/new and /product-category/used pages

        // Fetch all services
        const services = await sanityClient.fetch(`
      *[_type == "service"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        // Fetch all locations
        const locations = await sanityClient.fetch(`
      *[_type == "location"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        // Fetch all rent categories
        const rentCategories = await sanityClient.fetch(`
      *[_type == "rentCategory"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        // Fetch all rent subcategories
        const rentSubcategories = await sanityClient.fetch(`
      *[_type == "rentSubcategory"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        // Fetch all landing pages
        const landingPages = await sanityClient.fetch(`
      *[_type == "landingPage"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

        return {
            blogPosts,
            blogCategories,
            blogTags,
            products,
            services,
            locations,
            rentCategories,
            rentSubcategories,
            landingPages,
        };
    } catch (error) {
        console.error("Error fetching dynamic routes:", error);
        return {
            blogPosts: [],
            blogCategories: [],
            blogTags: [],
            products: [],
            services: [],
            locations: [],
            rentCategories: [],
            rentSubcategories: [],
            landingPages: [],
        };
    }
}

// Generate sitemap entries
function generateSitemapEntries() {
    return [
        // Static routes
        ...staticRoutes.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            priority: route === "" ? 1.0 : 0.8,
        })),
    ];
}

// Generate dynamic sitemap entries
async function generateDynamicSitemapEntries() {
    const dynamicContent = await getDynamicRoutes();
    const entries: any[] = [];

    // Add blog posts (handled by [...location] catch-all route)
    dynamicContent.blogPosts.forEach((blogPost: any) => {
        if (blogPost.slug) {
            entries.push({
                url: `${baseUrl}/${blogPost.slug}`,
                lastModified: new Date(blogPost.publishedAt || blogPost._updatedAt),
                priority: 0.6,
            });
        }
    });

    // Add blog categories
    dynamicContent.blogCategories.forEach((category: any) => {
        if (category.slug) {
            entries.push({
                url: `${baseUrl}/category/${category.slug}`,
                lastModified: new Date(category._updatedAt),
                priority: 0.5,
            });
        }
    });

    // Add blog tags
    dynamicContent.blogTags.forEach((tag: any) => {
        if (tag.slug) {
            entries.push({
                url: `${baseUrl}/tag/${tag.slug}`,
                lastModified: new Date(tag._updatedAt),
                priority: 0.4,
            });
        }
    });

    // Add products
    dynamicContent.products.forEach((product: any) => {
        if (product.slug) {
            entries.push({
                url: `${baseUrl}/product/${product.slug}`,
                lastModified: new Date(product._updatedAt),
                priority: 0.7,
            });
        }
    });

    // Note: Product categories are handled by /product-category/new and /product-category/used pages
    // Individual product category routes (/product-category/[slug]) do not exist in the app structure

    // Add services
    dynamicContent.services.forEach((service: any) => {
        if (service.slug) {
            entries.push({
                url: `${baseUrl}/services/${service.slug}`,
                lastModified: new Date(service._updatedAt),
                priority: 0.7,
            });
        }
    });

    // Add locations
    dynamicContent.locations.forEach((location: any) => {
        if (location.slug) {
            entries.push({
                url: `${baseUrl}/${location.slug}`,
                lastModified: new Date(location._updatedAt),
                priority: 0.6,
            });
        }
    });

    // Add rent categories
    dynamicContent.rentCategories.forEach((category: any) => {
        if (category.slug) {
            entries.push({
                url: `${baseUrl}/rent/${category.slug}`,
                lastModified: new Date(category._updatedAt),
                priority: 0.7,
            });
        }
    });

    // Add rent subcategories (these are individual products/equipment)
    dynamicContent.rentSubcategories.forEach((subcategory: any) => {
        if (subcategory.slug) {
            entries.push({
                url: `${baseUrl}/rent/${subcategory.slug}`,
                lastModified: new Date(subcategory._updatedAt),
                priority: 0.6,
            });
        }
    });

    // Add location services (nested under locations)
    // Note: Location services are handled by the location pages themselves
    // and accessed via /[location-slug]/[service-slug] pattern

    // Add landing pages
    dynamicContent.landingPages.forEach((landingPage: any) => {
        if (landingPage.slug) {
            entries.push({
                url: `${baseUrl}/${landingPage.slug}`,
                lastModified: new Date(landingPage._updatedAt),
                priority: 0.8,
            });
        }
    });

    return entries;
}

export default async function sitemap() {
    const staticEntries = generateSitemapEntries();
    const dynamicEntries = await generateDynamicSitemapEntries();

    return [...staticEntries, ...dynamicEntries];
}
