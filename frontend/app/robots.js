const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
