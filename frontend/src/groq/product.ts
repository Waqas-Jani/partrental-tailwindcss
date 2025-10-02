export const newProductsPageQuery = `{
    "sanityNewProductsPage": *[_type == "newProductsPage"][0] {
      seo {
        title,
        ldSchema,
        keywords,
        description
      },
      hero {
        heading,
        description,
        bg {
          asset->{
            url
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
      }
    }
  }`;


export const usedProductsPageQuery = `{
    "sanityUsedProductsPage": *[_type == "usedProductsPage"][0] {
      seo {
        title,
        ldSchema,
        keywords,
        description
      },
      hero {
        heading,
        description,
        bg {
          asset->{
            url
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
      }
    }
  }`;
