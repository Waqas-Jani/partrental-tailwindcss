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
  "slug": slug.current
}`;

// blog tag list
export const blogTagListQuery = `*[_type == "tag"][0...10]{
    name,
    "slug": slug.current
}`;

// recent blogs
export const recentBlogsQuery = `{
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
          }
        }
      }
    }
  }`;






