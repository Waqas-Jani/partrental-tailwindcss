export const landingPageBySlugQuery = `
*[_type == "landingPage" && slug.current == $slug][0] {
  seo {
    title,
    description,
    keywords
  },
  phoneBanner {
    phoneNumber,
    phoneLink
  },
  landingHero {
    heading,
    description,
    button {
      title,
      linkType,
      link,
      btnType
    },
    bg {
      asset->{
        url
      }
    },
    bgOpacity {
      rgb {
        r,
        g,
        b,
        a
      }
    },
    enableForm
  },
  landingFeatures {
    enable,
    heading,
    description,
    features[] {
      icon {
        asset->{
          url
        }
      },
      title,
      description
    }
  },
  imageContent {
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
    "points": points[] {
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
  serviceSec {
    enable,
    heading,
    subheading,
    description,
    services[] {
      image {
        asset->{
          url
        }
      },
      title,
      slug {
        current
      }
    },
    button {
      btnType,
      link,
      linkType,
      title
    }
  },
  landingTestimonial {
    enable,
    sectionId,
    testimonials[] {
      feedback,
      reviwerName,
      reviewerDesignation
    }
  },
  message,
  landingSteps {
    enable,
    heading,
    description,
    features[] {
      icon {
        asset->{
          url
        }
      },
      title,
      description
    }
  },
  landingForm {
    enable,
    sectionId,
    heading,
    enable_name,
    enable_company,
    enable_phone,
    enable_revenue
  },
  note,
  exitIntentPopup {
    enable,
    heading,
    description,
    buttonText,
    caption,
    successHeading,
    successMessage,
    note
  }
}
`;
