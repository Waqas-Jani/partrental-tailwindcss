export const blogShortQueryBySlug = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    seo {
      description,
      keywords
    },
    featuredImage {
      alt,
      asset->{ 
        url 
      }
    }
  }`;

// Full Blog info by slug
export const blogFullQueryBySlug = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    slug {
      current
    },
    excerpt,
    featuredImage {
      alt,
      asset->{
        url
      }
    },
    categories[]->{
      name,
      slug {
        current
      }
    },
    author->{
      name,
      photo {
        asset->{
          url
        }
      },
      Bio
    },
    tags[]->{
      name,
      slug {
        current
      }
    },
    publishedAt,
    content
}`;

// blog category list
export const blogCategoryListQuery = `*[_type == "category"] {
  name,
  slug {
    current
  }
}`;

// blog tag list
export const blogTagListQuery = `*[_type == "tag"][0...10]{
    name,
    slug {
      current
    }
}`;

// recent blogs
export const recentBlogsQuery = `{
    "recentNews": {
      "edges": *[_type == "blog"] | order(_createdAt desc)[0...3] {
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
          }
        }
      }
    }
  }`;


// category by slug
export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0]{
  name,
  slug {
    current
  }
}`;

// tag by slug
export const tagBySlugQuery = `*[_type == "tag" && slug.current == $slug][0]{
  name,
  slug {
    current
  }
}`;


// category by blog page
export const categoryPageQuery = `{
    "sanityBlogPage": *[_type == "blogPage"][0]{
      hero {
        heading,
        description,
        bg {
          asset->{
            url
          }
        },
        isBreadcrumb
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
        }
      }
    },
    "category": *[_type == "category" && slug.current == $slug][0]{
      name,
      slug {
        current
      }
    },
    "allSanityBlog": {
      "edges": *[_type == "blog" && references(*[_type == "category" && slug.current == $slug]._id)] | order(_createdAt desc){
        "node": {
          title,
          slug {
            current
          },
          "featuredImage": {
              "alt": featuredImage.alt,
              "asset": {
                "url": featuredImage.asset->url
              }
          },
          publishedAt,
          category->{
            name
          }
        }
      }
    },
    "recentNews": {
      "edges": *[_type == "blog"] | order(_createdAt desc)[0...3]{
        "node": {
          title,
          slug {
            current
          },
          featuredImage {
            alt,
            asset->{
              url
            }
          },
          author->{
            name
          }
        }
      }
    },
    "categories": *[_type == "category"]{
      name,
      slug {
        current
      }
    },
    "tags": *[_type == "tag"][0...10]{
      name,
      slug {
        current
      }
    }
  }`;

// tag by blog page
export const tagPageQuery = `{
    "sanityBlogPage": *[_type == "blogPage"][0]{
      hero {
        heading,
        description,
        bg {
          asset->{
            url
          }
        },
        isBreadcrumb
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
        }
      }
    },
    "tag": *[_type == "tag" && slug.current == $slug][0]{
      name,
      slug {
        current
      }
    },
    "allSanityBlog": {
      "edges": *[_type == "blog" && references(*[_type == "tag" && slug.current == $slug]._id)] | order(_createdAt desc){
        "node": {
          title,
          slug {
            current
          },
          featuredImage {
            alt,
            asset->{
              url
            }
          },
          publishedAt,
          category->{
            name
          }
        }
      }
    },
    "recentNews": {
      "edges": *[_type == "blog"] | order(_createdAt desc)[0...3]{
        "node": {
          title,
          slug {
            current
          },
          featuredImage {
            alt,
            asset->{
              url
            }
          },
          author->{
            name
          }
        }
      }
    },
    "categories": *[_type == "category"]{
      name,
      slug {
        current
      }
    },
    "tags": *[_type == "tag"][0...10]{
      name,
      slug {
        current
      }
    }
  }`;







