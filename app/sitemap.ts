import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { blogSlugs } from "@/lib/blog/posts";

const photoTypes = ["3x4", "3.3x4.8", "3.5x5", "3.5x4.5", "3.6x4.7", "4x6", "5x5", "5x7"];

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const isLocal = host.includes("localhost");
  const protocol = isLocal ? "http" : headersList.get("x-forwarded-proto") || "https";
  const origin = `${protocol}://${host}`;

  if (host.includes("chupanhthedanang") || isLocal) {
    return [
      entry(`${origin}/vi`, 1.0, "daily"),
      ...servicePathsVi.map((slug) => entry(`${origin}/vi/${slug}`, 0.8)),
      ...photoTypes.map((type) => entry(`${origin}/vi/anh-the-ho-chieu/${type}`, 0.7)),
      entry(`${origin}/vi/blog`, 0.7),
      ...blogSlugs.map((slug) => entry(`${origin}/vi/blog/${slug}`, 0.6)),
    ];
  }

  if (host.includes("photoboothdanang")) {
    return [
      entry(`${origin}/en`, 1.0, "daily"),
      ...servicePathsEn.map((slug) => entry(`${origin}/en/${slug}`, 0.8)),
      ...photoTypes.map((type) => entry(`${origin}/en/id-passport-photos/${type}`, 0.7)),
      entry(`${origin}/en/blog`, 0.7),
      ...blogSlugs.map((slug) => entry(`${origin}/en/blog/${slug}`, 0.6)),
    ];
  }

  return [];
}
