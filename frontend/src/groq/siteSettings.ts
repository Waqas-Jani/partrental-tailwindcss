// lib/queries.ts

export const siteSettingsQuery = `
{
  "siteSettings": *[_type == "sitesettings"][0]{
    topBanner {
      enable,
      welcome,
      phone,
      phoneLink,
      social[] {
        icon,
        url
      }
    },
    header {
      logo {
        alt,
        asset->{
          url
        }
      },
      button {
        title,
        linkType,
        link,
        btnType
      },
      menu[] {
        parent {
          label,
          link,
          type
        },
        childMenu[] {
          type,
          link,
          label
        }
      }
    },
    footer {
      logo {
        alt,
        asset->{
          url
        }
      },
      aboutSection {
        heading,
        about
      },
      email,
      location[] {
        label,
        link,
        type
      },
      cc,
      menuHeading,
      menu[] {
        label,
        link,
        type
      },
      businessAddressSection {
        heading,
        address
      },
      businessHoursSection {
        heading,
        hours
      },
      recentNewsHeading,
      toggleMenu,
      locationMenu[] {
        parent {
          label,
          link,
          type
        },
        childMenu[] {
          type,
          link,
          label
        }
      },
      newsletter {
        enable,
        heading,
        button {
          btnType,
          link,
          linkType,
          title
        }
      },
      social[] {
        icon,
        url
      }
    },
    exitIntentPopup {
      enable,
      heading,
      description,
      buttonText,
      caption,
      successHeading,
      successMessage,
      note
    },
    simplePopup {
      heading,
      description,
      msgField,
      buttonText,
      button2Text,
      phoneNumber
    },
    slideoutPopup {
      enable,
      heading,
      description,
      button {
        btnType,
        link,
        linkType,
        title
      }
    }
  },

  "latestBlogs": *[_type == "blog"] | order(_createdAt desc)[0...2]{
    title,
    slug {
      current
    },
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
    publishedAt
  }
}
`;


