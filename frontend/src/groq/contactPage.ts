export const contactPageQuery = `{
    "sanityContactPage": *[_type == "contactPage"][0]{
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
      contactForm {
        enable,
        heading,
        subheading,
        button {
          title,
          linkType,
          link,
          btnType
        }
      },
      contactSec {
        enable,
        heading,
        subheading,
        description,
        bg {
          asset->{
            url
          }
        },
        list[] {
          infoType,
          heading,
          text
        }
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
