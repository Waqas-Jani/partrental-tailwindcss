export const homePageQuery = `
{
  "sanityHomePage": *[_type == "homePage"][0]{
    seo {
      title,
      ldSchema,
      keywords,
      description
    },
    homeHero {
      slider[] {
        heading,
        subheading,
        description,
        bg {
          asset-> {
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
    pageBuilder[] {
      _type,
      _type == "aboutHome" => {
        enable,
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
        button {
          btnType,
          link,
          linkType,
          title
        }
      },
      _type == "offers" => {
        enable,
        heading,
        subheading,
        description,
        points[] {
          title,
          description
        },
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
        button {
          btnType,
          link,
          linkType,
          title
        }
      },
      _type == "partnerSec" => {
        enable,
        heading,
        partners[]->{
          org,
          imgBlack {
            alt,
            asset-> {
              url
            }
          }
        }
      },
      _type == "promotionalBanner" => {
        enable,
        title,
        titlePart2,
        offers[] {
          heading,
          range,
          spendLine,
          rewardLine
        },
        caption
      },
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
      _type == "portfolioSec" => {
        enable,
        heading,
        subheading,
        list[]->{
          title,
          tag[]->{
            name
          },
          thumbnail {
            alt,
            asset-> {
              url
            }
          },
          slug {
            current
          }
        }
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
        list[]->{
          category->{
            name
          },
          publishedAt,
          modifiedAt,
          slug {
            current
          },
          title,
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
          },
        }
      },
      _type == "serviceSecOne" => {
        enable,
        heading,
        subheading,
        videoURL,
        thumbnail {
          alt,
          asset-> {
            url
          }
        },
        list[] {
          icon {
            asset-> {
              url
            }
          },
          path,
          heading
        }
      },
      _type == "teamSec" => {
        enable,
        heading,
        subheading,
        list[]->{
          name,
          designation,
         photo {
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
          social[] {
            url,
            icon
          }
        },
        button {
          title,
          linkType,
          link,
          btnType
        }
      },
      _type == "contactBanner" => {
        enable,
        heading,
        subheading,
        description,
        button {
          title,
          linkType,
          link,
          btnType
        },
        bg {
          asset-> {
            url
          }
        }
      }
    }
  },
  "sanitySitesettings": *[_type == "sitesettings"][0]{
    favicon {
      asset-> {
        url
      }
    },
    statistic {
      enable,
      heading,
      textBg {
        asset-> {
          url
        }
      },
      list[] {
        title,
        num
      }
    }
  }
}
`;
