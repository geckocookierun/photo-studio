import { headers } from "next/headers";
import { defaultLocale, isValidLocale, type ValidLocale } from "@/lib/i18n/config";

/**
 * Resolve site language without middleware / [lang] URL segment.
 * - NEXT_PUBLIC_SITE_LANG=vi|en → fixed (dual static / CF Pages builds)
 * - else detect from Host (single Vercel project, 2 domains)
 */
export async function getRequestLocale(): Promise<ValidLocale> {
  const forced = process.env.NEXT_PUBLIC_SITE_LANG;
  if (forced && isValidLocale(forced)) return forced;

  try {
    const host = (await headers()).get("host") || "";
    if (host.includes("photoboothdanang")) return "en";
    if (host.includes("chupanhthedanang")) return "vi";
  } catch {
    // headers() unavailable during pure static generation
  }

  return defaultLocale;
}
