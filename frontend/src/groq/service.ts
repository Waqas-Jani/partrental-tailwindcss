export const servicePageQuery = `{
    "sanityServicesPage": *[_type == "servicesPage"][0]{
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
      pageBuilder[]{
        _type,
        // ImageContent
        _type == "imageContent" => {
          enable,
          contentType,
          heading,
          subheading,
          description,
          image {
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
          points[]{
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
          list[]{
            heading,
            path,
            icon {
              alt,
              asset->{
                url
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
              asset->{
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
          list[]->{
            category[]->{
              name
            },
            publishedAt,
            slug {
              current
            },
            title,
            hero {
              asset->{
                url
              }
            }
          }
        },
        // PartnerSec
        _type == "partnerSec" => {
          enable,
          heading,
          partners[]->{
            org,
            imgBlack {
              alt,
              asset->{
                url
              }
            }
          }
        },
        // StepsSec
        _type == "stepsSec" => {
          enable,
          heading,
          subheading,
          steps[]{
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
        // SplitContent
        _type == "splitContent" => {
          enable,
          headingLeft,
          headingRight,
          subheadingLeft,
          subheadingRight,
          descriptionLeft,
          descriptionRight,
          pointsLeft[]{
            title,
            description
          },
          pointsRight[]{
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
      favicon {
        asset->{
          url
        }
      }
    }
  }`;
