export const blogQueryBySlug = `*[_type == "blog" && slug.current == $slug][0]{
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
