import { MetadataRoute } from "next";
import { blogSlugs } from "@/lib/blog/posts";
import { PHOTO_TYPES } from "@/lib/photo-types";
import { defaultLocale } from "@/lib/i18n/config";

const servicePathsVi = [
  "anh-the-ho-chieu",
  "anh-ho-so-chuyen-nghiep",
  "phuc-hoi-anh-cu",
  "chup-anh-tot-nghiep",
];

const servicePathsEn = [
  "id-passport-photos",
  "professional-profile-photos",
  "photo-restoration",
  "graduation-photos",
];

function entry(
  url: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"
): MetadataRoute.Sitemap[number] {
  return {
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

function viSitemap(origin: string): MetadataRoute.Sitemap {
  return [
    entry(`${origin}/`, 1.0, "daily"),
    ...servicePathsVi.map((slug) => entry(`${origin}/${slug}`, 0.8)),
    ...PHOTO_TYPES.map((type) => entry(`${origin}/anh-the-ho-chieu/${type}`, 0.7)),
    entry(`${origin}/blog`, 0.7),
    ...blogSlugs.map((slug) => entry(`${origin}/blog/${slug}`, 0.6)),
  ];
}

function enSitemap(origin: string): MetadataRoute.Sitemap {
  return [
    entry(`${origin}/`, 1.0, "daily"),
    ...servicePathsEn.map((slug) => entry(`${origin}/${slug}`, 0.8)),
    ...PHOTO_TYPES.map((type) => entry(`${origin}/id-passport-photos/${type}`, 0.7)),
    entry(`${origin}/blog`, 0.7),
    ...blogSlugs.map((slug) => entry(`${origin}/blog/${slug}`, 0.6)),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lang = process.env.NEXT_PUBLIC_SITE_LANG || defaultLocale;

  if (lang === "en") {
    const origin = `https://${process.env.NEXT_PUBLIC_EN_DOMAIN || "photoboothdanang.vn"}`;
    return enSitemap(origin);
  }

  const origin = `https://${process.env.NEXT_PUBLIC_VI_DOMAIN || "chupanhthedanang.vn"}`;
  return viSitemap(origin);
}
