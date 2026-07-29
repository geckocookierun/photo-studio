import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";

  if (host.includes("chupanhthedanang")) {
    return {
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://chupanhthedanang.vn/sitemap.xml",
      host: "https://chupanhthedanang.vn",
    };
  }

  if (host.includes("photoboothdanang")) {
    return {
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://photoboothdanang.vn/sitemap.xml",
      host: "https://photoboothdanang.vn",
    };
  }

  // Local / preview — block indexing
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
