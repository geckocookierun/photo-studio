import type { Metadata } from "next";
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
  return raw.replace(/\/$/, "");
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

/**
 * Convert a pathname to the equivalent path for targetLocale,
 * including locale prefix and localized service slugs.
 */
export function localizePathname(pathname: string, targetLocale: ValidLocale): string {
  const path = toPathname(pathname);
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "vi" || segments[0] === "en") {
    segments.shift();
  }

  const mapped = segments.map((segment) => {
    const match = localizedSlugs.find((item) =>
      (item.url as readonly string[]).includes(segment)
    );
    if (!match) return segment;
    return targetLocale === "vi" ? match.viUrl : match.enUrl;
  });

  return mapped.length ? `/${targetLocale}/${mapped.join("/")}` : `/${targetLocale}`;
}

/** Absolute URL for a locale + any current path (slugs remapped). */
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
