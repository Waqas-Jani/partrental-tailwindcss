export const faqPageQuery = `{
    "sanityFaqPage": *[_type == "faqPage"][0]{
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
      },
      faqSec {
        heading,
        subheading,
        enable,
        list[] {
          question,
          answer
        }
      },
      button {
        btnType,
        link,
        linkType,
        title
      }
    },
    "sanitySitesettings": *[_type == "siteSettings"][0]{
      favicon {
        asset->{
          url
        }
      }
    }
  }`;
