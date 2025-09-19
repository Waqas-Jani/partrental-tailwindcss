export const rentPageQuery = `
{
  "sanityRentPage": *[_type == "rentPage"][0]{
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
    "pageBuilder": pageBuilder[]{
      _type,
      _type == "imageContent" => {
        enable,
        contentType,
        heading,
        subheading,
        description,
        "image": {
          alt,
          "asset": {
            "url": image.asset->url
          }
        },
        "points": points[]{
          title,
          description
        },
        productVariants,
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
      _type == "contentSection" => {
        enable,
        heading,
        subheading,
        description,
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
      _type == "listingSec" => {
        enable,
        heading,
        "list": list[]{
          heading,
          path,
          "icon": {
            alt,
            "asset": {
              "url": icon.asset->url
            }
          }
        },
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
      _type == "clientSec" => {
        enable,
        heading,
        subheading,
        "clients": clients[]->{
          name,
          designation,
          feedback,
          "photo": {
            alt,
            "asset": {
              "url": photo.asset->url
            }
          }
        }
      },
      _type == "homeContact" => {
        enable,
        homeForm {
          _type,
          heading,
          subheading,
          button {
            btnType,
            link,
            linkType,
            title
          }
        },
        mapUrl
      },
      _type == "blogSec" => {
        enable,
        heading,
        subheading,
        button {
          btnType,
          link,
          linkType,
          title
        },
        "list": list[]->{
          "category": category[]->{
            name
          },
          publishedAt,
          "slug": {
            "current": slug.current
          },
          title,
          "hero": {
            "asset": {
              "url": hero.asset->url
            }
          }
        }
      },
      _type == "partnerSec" => {
        enable,
        heading,
        "partners": partners[]->{
          org,
          "imgBlack": {
            alt,
            "asset": {
              "url": imgBlack.asset->url
            }
          }
        }
      },
      _type == "stepsSec" => {
        enable,
        heading,
        subheading,
        "steps": steps[]{
          step,
          heading,
          description
        },
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
      _type == "splitContent" => {
        enable,
        headingLeft,
        headingRight,
        subheadingLeft,
        subheadingRight,
        descriptionLeft,
        descriptionRight,
        "pointsLeft": pointsLeft[]{
          title,
          description
        },
        "pointsRight": pointsRight[]{
          title,
          description
        },
        buttonLeft {
          btnType,
          link,
          linkType,
          title
        },
        buttonRight {
          btnType,
          link,
          linkType,
          title
        }
      }
    }
  },
  "sanitySitesettings": *[_type == "sitesettings"][0]{
    "favicon": {
      "asset": {
        "url": favicon.asset->url
      }
    }
  }
}
`;

export const rentCategoryQuery = /* groq */ `
{
  "sanityRentCategory": *[_type == "rentCategory" && slug.current == $slug][0]{
    seo {
      title,
      ldSchema,
      keywords,
      description
    },
    "slug": {
      "current": slug.current
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
    "pageBuilder": pageBuilder[]{
      _type,
      _type == "imageContent" => {
        enable,
        contentType,
        heading,
        subheading,
        description,
        "image": {
          alt,
          "asset": {
            "url": image.asset->url
          }
        },
        "points": points[]{
          title,
          description
        },
        productVariants,
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
      // ContentSection
      _type == "contentSection" => {
        enable,
        heading,
        subheading,
        description,
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
      // ListingSec
      _type == "listingSec" => {
        enable,
        heading,
        "list": list[]{
          heading,
          path,
          "icon": {
            alt,
            "url": icon.asset->url
          }
        },
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
      // ClientSec
       _type == "clientSec" => {
        enable,
        heading,
        subheading,
        clients[]->{
          name,
          designation,
          feedback,
          photo {
            alt,
            asset-> {
              url
            }
          }
        }
      },
      // HomeContact
      _type == "homeContact" => {
        enable,
        homeForm {
          _type,
          heading,
          subheading,
          button {
            btnType,
            link,
            linkType,
            title
          }
        },
        mapUrl
      },
      // BlogSec
      _type == "blogSec" => {
        enable,
        heading,
        subheading,
        button {
          btnType,
          link,
          linkType,
          title
        },
        "list": list[]->{
          "category": category[]->{
            name
          },
          publishedAt,
          "slug": {
            "current": slug.current
          },
          title,
          "hero": {
            "url": hero.asset->url
          }
        }
      },
      // PartnerSec
      _type == "partnerSec" => {
        enable,
        heading,
        "partners": partners[]->{
          org,
          "imgBlack": {
            alt,
            "url": imgBlack.asset->url
          }
        }
      }
    }
  },
  "sanitySitesettings": *[_type == "sitesettings"][0]{
    "favicon": {
      "url": favicon.asset->url
    }
  }
}
`;

