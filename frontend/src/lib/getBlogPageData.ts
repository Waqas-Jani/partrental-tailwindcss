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
        "edges": *[_type == "blog"] | order(modifiedAt desc) [${skip}...${skip + limit
        }] {
          "node": {
            "title": title,
            "slug": {
              "current": slug.current
            },
            "featuredImage": {
              "alt": featuredImage.alt,
              "asset": {
                "url": featuredImage.asset->url
              }
            },
            "publishedAt": publishedAt,
            "modifiedAt": modifiedAt,
            "category": category->{
              "name": name
            }
          }
        },
        "totalCount": count(*[_type == "blog"])
      },
      "recentNews": {
        "edges": *[_type == "blog"] | order(modifiedAt desc) [0...3] {
          "node": {
            "title": title,
            "slug": {
              "current": slug.current
            },
            "featuredImage": {
              "alt": featuredImage.alt,
              "asset": {
                "url": featuredImage.asset->url
              }
            },
            "author": author->{
              "name": name
            }
          }
        }
      },
      "categories": *[_type == "category"] {
        "name": name,
        "slug": {
          "current": slug.current
        }
      },
      "tags": *[_type == "tag"][0...10] {
        "name": name,
        "slug": {
          "current": slug.current
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
