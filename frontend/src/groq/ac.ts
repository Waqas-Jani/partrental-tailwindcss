export const accountAccessQuery = `
{
  "sanityAccountAccess": *[_type == "accountAccess"][0] {
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
    content,
    button {
      btnType,
      link,
      linkType,
      title
    }
  }
}
`;
