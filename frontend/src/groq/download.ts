export const downloadsPageQuery = `
{
  "sanityDownloadsPage": *[_type == "downloadPage"][0]{
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
    downloadSec {
      title,
      description,
      downloads[]->{
        title,
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
        file {
          asset-> {
            url
          }
        }
      }
    },
    downloadCtaSec {
      title,
      description,
      button {
        btnType,
        link,
        linkType,
        title
      }
    }
  },
  "sanitySitesettings": *[_type == "sitesettings"][0]{
    favicon {
      asset {
        url
      }
    }
  }
}
`;
