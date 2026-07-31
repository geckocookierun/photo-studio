import { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/i18n/config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const lang = process.env.NEXT_PUBLIC_SITE_LANG || defaultLocale;

  if (lang === "en") {
    return {
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://photoboothdanang.vn/sitemap.xml",
      host: "https://photoboothdanang.vn",
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://chupanhthedanang.vn/sitemap.xml",
    host: "https://chupanhthedanang.vn",
  };
}
