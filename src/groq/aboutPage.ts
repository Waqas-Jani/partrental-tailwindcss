export const aboutPageQuery = `
{
  "sanityAboutPage": *[_type == "aboutPage"][0]{
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
    pageBuilder[]{
      _type == "clientSec" => {
        _type,
        enable,
        heading,
        subheading,
        "clients": clients[]->{
          name,
          designation,
          feedback,
          "photo": {
            "alt": photo.alt,
            "url": photo.asset->url
          }
        }
      },
      
      _type == "partnerSec" => {
        _type,
        enable,
        heading,
        "partners": partners[]->{
          org,
          "imgBlack": {
            "alt": imgBlack.alt,
            "url": imgBlack.asset->url
          }
        }
      },
      
      _type == "teamSec" => {
        _type,
        enable,
        heading,
        subheading,
        "list": list[]->{
          name,
          designation,
          "photo": {
            "alt": photo.alt,
            "url": photo.asset->url
          },
          "social": social[]{
            url,
            icon
          }
        },
        button {
          btnType,
          link,
          linkType,
          title
        }
      },
      
      _type == "choose" => {
        _type,
        enable,
        heading,
        subheading,
        "skill": skill[]{
          skill,
          heading
        }
      },
      // Aboutus
      _type == "aboutus" => {
        _type,
        enable,
        heading,
        subheading,
        description,
        "points": points[]{
          description,
          heading
        },
        button {
          btnType,
          link,
          linkType,
          title
        },
        img1 {
          alt,
          asset-> {
            url
          }
        },
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
