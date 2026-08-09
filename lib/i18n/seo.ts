import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog/posts";
import type { ValidLocale } from "./config";
import { localizedSlugs } from "./paths";

const DEFAULT_VI_DOMAIN = "https://chupanhthedanang.vn";
const DEFAULT_EN_DOMAIN = "https://photoboothdanang.vn";

/** Absolute origin for a locale (no trailing slash). */
export function getDomainByLocale(locale: ValidLocale): string {
  const raw =
    locale === "vi"
      ? process.env.NEXT_PUBLIC_VI_DOMAIN || DEFAULT_VI_DOMAIN
      : process.env.NEXT_PUBLIC_EN_DOMAIN || DEFAULT_EN_DOMAIN;
  let origin = raw.trim().replace(/\/$/, "");
  // Env may be host-only or already include https://
  if (!/^https?:\/\//i.test(origin)) {
    origin = `https://${origin}`;
  }
  return origin;
}

/** Normalize full URL or path to a pathname starting with /. */
export function toPathname(urlOrPath: string): string {
  try {
    if (/^https?:\/\//i.test(urlOrPath)) {
      return new URL(urlOrPath).pathname || "/";
    }
  } catch {
    // fall through
  }
  const path = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return path.split("?")[0].split("#")[0] || "/";
}

/** Remove /vi or /en prefix from a path. */
export function stripLocalePrefix(pathname: string): string {
  const path = toPathname(pathname);
  const stripped = path.replace(/^\/(vi|en)(?=\/|$)/, "");
  return stripped || "/";
}

/**
 * Public pathname for targetLocale (no /vi or /en prefix).
 * Domain already implies language.
 */
export function localizePathname(pathname: string, targetLocale: ValidLocale): string {
  const path = stripLocalePrefix(pathname);
  const segments = path.split("/").filter(Boolean);

  const mapped = segments.map((segment, index) => {
    // /blog/{slug} — map VI ↔ EN article slugs for hreflang / language switcher
    if (index > 0 && segments[index - 1] === "blog") {
      const post = getBlogPost(segment);
      if (post) return post.slugs[targetLocale];
    }

    const match = localizedSlugs.find((item) =>
      (item.url as readonly string[]).includes(segment)
    );
    if (!match) return segment;
    return targetLocale === "vi" ? match.viUrl : match.enUrl;
  });

  return mapped.length ? `/${mapped.join("/")}` : "/";
}

/** Absolute public URL for a locale + path (slugs remapped, no locale prefix). */
export function absoluteUrl(locale: ValidLocale, pathname: string): string {
  return `${getDomainByLocale(locale)}${localizePathname(pathname, locale)}`;
}

/**
 * Canonical + hreflang (including x-default → Vietnamese market).
 */
export function buildPageAlternates(
  lang: ValidLocale,
  pathname: string
): NonNullable<Metadata["alternates"]> {
  const vi = absoluteUrl("vi", pathname);
  const en = absoluteUrl("en", pathname);

  return {
    canonical: absoluteUrl(lang, pathname),
    languages: {
      "vi-VN": vi,
      "en-US": en,
      "x-default": vi,
    },
  };
}

/** Strip HTML tags from meta description text. */
export function plainText(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
