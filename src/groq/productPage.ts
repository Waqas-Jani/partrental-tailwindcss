export const productQuery = `
{
  "sanityRentSubCategory": *[_type == "rentSubcategory"][
    slug.current == $cleanSlug || 
    slug.current == $originalSlug ||
    slug.current == ("/" + $cleanSlug) ||
    slug.current == ($cleanSlug + "/") ||
    slug.current == ("/" + $cleanSlug + "/")
  ][0]{
    seo {
      title,
      ldSchema,
      keywords,
      description
    },
    "slug": {
      "current": slug.current
    },
    title,
    description,
    "gallery": gallery[]{
      "asset": {
        "url": asset->url
      }
    },
    productVariants,
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