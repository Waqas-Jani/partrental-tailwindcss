export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/_next/",
        "/static/",
        "/private/",
        "/temp/",
        "/test/",
        "/dev/",
        "/staging/",
        "/cart/",
        "/shop/",
      ],
    },
    sitemap: `https://partnerrentals.com/sitemap.xml`,
  };
}
