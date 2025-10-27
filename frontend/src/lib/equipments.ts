import { sanityClient } from "@/lib/sanity";

/**
 * Fetches all site settings from Sanity
 * @returns {Promise<Object>} - A promise that resolves to the site settings
 */
export async function getEquipments({
    page = 1,
    limit = 20,
    sort = "default",
    search = "",
    category = "",
    isUsed = false,
} = {}) {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build filter conditions
    const filterConditions: string[] = [];

    // Always filter by product type
    filterConditions.push('_type == "product"');

    // Filter by condition if requesting used equipment
    if (isUsed) {
        filterConditions.push('condition != "new"');
    } else {
        filterConditions.push('condition == "new"');
    }

    // Filter by specific category or categories if provided
    if (category) {
        // Check if it's a comma-separated list of categories
        const categories = category.split(",").filter(Boolean);

        if (categories.length === 1) {
            // Single category
            filterConditions.push(`"${categories[0]}" in categories[]->slug.current`);
        } else if (categories.length > 1) {
            // Multiple categories - use OR condition
            const categoryConditions = categories
                .map((cat) => `"${cat}" in categories[]->slug.current`)
                .join(" || ");

            filterConditions.push(`(${categoryConditions})`);
        }
    }

    // Filter by search term if provided
    if (search) {
        filterConditions.push(
            `(name match "${search}*" || shortDescription match "${search}*")`
        );
    }

    // Combine all filter conditions
    const filterString =
        filterConditions.length > 0 ? `${filterConditions.join(" && ")}` : "";

    // Determine sort order
    let orderBy = "name asc"; // Default sorting

    if (sort === "price-asc") {
        orderBy = "price asc";
    } else if (sort === "price-desc") {
        orderBy = "price desc";
    } else if (sort === "name-asc") {
        orderBy = "name asc";
    } else if (sort === "name-desc") {
        orderBy = "name desc";
    }

    // Build the query - prioritize products with featuredImage
    const query = `{
    "products": *[${filterString}] | order(defined(featuredImage) desc, ${orderBy}) [${offset}...${offset + limit
        }] {
      _id,
      name,
      "slug": slug.current,
      price,
      leasePrice,
      salePrice,
      onSale,
      featuredImage {
        alt,
            crop,
            hotspot,
            asset->{
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            }
      },
      "categories": categories[]->name
    },
    "totalCount": count(*[${filterString}])
  }`;

    try {
        const result = await sanityClient.fetch(query);

        return {
            products: result.products || [],
            totalCount: result.totalCount || 0,
        };
    } catch (error) {
        console.error("Error fetching equipment data:", error);
        return {
            products: [],
            totalCount: 0,
        };
    }
}


/**
 * Fetches all site settings from Sanity
 * @returns {Promise<Object>} - A promise that resolves to the site settings
 */
export async function getEquipmentCategory() {
    try {
        const equipmentCategory = await sanityClient.fetch(
            ` *[_type == "productCategory"] {
            _id,
            name,
            "slug": {
            "current": slug.current
            },
        }`
        );
        return equipmentCategory;
    } catch (error) {
        console.error("Error fetching Equipment Category:", error);
        return null;
    }
}

// Get Equipment by Slug
export async function getEquipmentBySlug(slug: string) {
    const equipment = await sanityClient.fetch(
        `*[_type == "product" && slug.current == $slug][0] {
        "seo": {
            "title": seo.title,
            "ldSchema": seo.ldSchema,
            "keywords": seo.keywords,
            "description": seo.description
        },
        name,
        slug {
            current
        },
        sku,
        featured,
        price,
        leasePrice,
        salePrice,
        onSale,
        featuredImage {
            alt,
            crop,
            hotspot,
            asset->{
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            }
        },
        galleryImages []{
           alt,
            crop,
            hotspot,
            asset->{
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            }
        },
        description,
        shortDescription,
        purchaseNote,
        additionalInfo []{
            title,
            value
        },
        categories []->{
            name,
            slug {
                current
            }
        },
        tags []->{
            name,
            slug {
                current
            }
        }
    }`,
        { slug }
    );
    return equipment;
}