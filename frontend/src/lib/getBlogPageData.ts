import { sanityClient } from "./sanity";

/**
 * Fetches data for the blog page using GROQ query
 * @param {number} page - Current page number
 * @param {number} limit - Number of posts per page
 * @returns {Promise<Object>} The data for the blog page
 */
export async function getBlogPageData(page = 1, limit = 6) {
    const skip = (page - 1) * limit;

    return sanityClient.fetch(
        `
  {
    "sanityBlogPage": *[_type == "blogPage"][0] {
      seo {
        title,
        ldSchema,
        keywords,
        description
      },
      hero {
        heading,
        description,
        "bg": {
          "asset": {
            "url": bg.asset->url
          }
        },
        isBreadcrumb,
        button {
          btnType,
          link,
          linkType,
          title
        },
        button2 {
          btnType,
          link,
          linkType,
          title
        }
      },
      contact {
        enable,
        phone,
        email,
        button {
          btnType,
          link,
          linkType,
          title
        },
        "bg": {
          "url": contact.bg.asset->url
        }
      }
    },
  
    "allSanityBlog": {
      "edges": *[_type == "blog"] | order(modifiedAt desc)[${skip}...${skip + limit}] {
        "node": {
          title,
          slug {
            current
          },
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
          publishedAt,
          modifiedAt,
          category->{
            name
          }
        }
      },
      "totalCount": count(*[_type == "blog"])
    },
  
    "recentNews": {
      "edges": *[_type == "blog"] | order(modifiedAt desc)[0...3] {
        "node": {
          title,
          slug {
            current
          },
          "featuredImage": {
            "alt": featuredImage.alt,
            "crop": featuredImage.crop,
            "hotspot": featuredImage.hotspot,
            "asset": {
              "_id": featuredImage.asset->_id,
              "url": featuredImage.asset->url,
              "metadata": {
                "dimensions": featuredImage.asset->metadata.dimensions
              }
            }
          },
          author->{
            name
          }
        }
      }
    },
  
    "categories": *[_type == "category"] {
      name,
      slug {
        current
      }
    },
  
    "tags": *[_type == "tag"][0...10] {
      name,
      slug {
        current
      }
    },
  
    "sanitySitesettings": *[_type == "sitesettings"][0] {
      "favicon": {
        "url": favicon.asset->url
      }
    }
  }
  `,
        {},
        { cache: "no-store" }
    );
}

