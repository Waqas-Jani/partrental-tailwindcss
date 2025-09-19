export const locationQuery = `*[_type == "location"] {
    _id,
    title,
    "slug": slug.current
}`;


// Query for locationService (when service param is passed)
export const locationServiceQuery = `{
    sanityLocation: *[_type == "locationService" && slug.current == $service][0]{
      seo {
        title,
        ldSchema,
        keywords,
        description
      },
      title,
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
      pageBuilder[] {
        _type,
        _type == "imageContent" => {
          enable,
          heading,
          subheading,
          description,
          image {
            alt,
            asset->{
              url
            }
          },
          points[] {
            title,
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
          list[] {
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
        _type == "stepsSec" => {
          enable,
          heading,
          subheading,
          steps[] {
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
          pointsLeft[] {
            title,
            description
          },
          pointsRight[] {
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
    sanitySitesettings: *[_type == "sitesettings"][0]{
      favicon {
        asset->{
          url
        }
      }
    }
  }`;


// Query for location (when slug param is used)
export const locationQueryBySlug = `{
    sanityLocation: *[_type == "location" && slug.current == $slug][0]{
      seo {
        title,
        ldSchema,
        keywords,
        description
      },
      title,
      slug {
        current
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
      pageBuilder[] {
        _type,
        // ... same sections as above ...
      },
      locationServices[]->{
        title,
        slug {
          current
        }
      }
    },
    sanitySitesettings: *[_type == "sitesettings"][0]{
      favicon {
        asset->{
          url
        }
      }
    }
  }`;
