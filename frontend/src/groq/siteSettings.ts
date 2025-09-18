// lib/queries.ts

export const siteSettingsQuery = `
{
  "siteSettings": *[_type == "sitesettings"][0]{
    topBanner {
      enable,
      welcome,
      phone,
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
      about,
      email,
      location[] {
        label,
        link,
        type
      },
      cc,
      menu[] {
        label,
        link,
        type
      },
      businessAddress,
      businessHours,
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
  "latestBlogs": *[_type == "blog"] | order(_createdAt desc)[0...2] {
    title,
    slug {
      current
    },
    featuredImage {
      alt,
      asset->{
        url
      }
    },
    publishedAt,
    modifiedAt
  }
}
`;

