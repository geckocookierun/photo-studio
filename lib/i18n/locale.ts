import { defaultLocale, isValidLocale, type ValidLocale } from "@/lib/i18n/config";

/**
 * Site language is fixed per deploy via NEXT_PUBLIC_SITE_LANG (vi|en).
 * Local/dev without env → defaultLocale (vi).
 */
export async function getRequestLocale(): Promise<ValidLocale> {
  const forced = process.env.NEXT_PUBLIC_SITE_LANG;
  if (forced === "vi" || forced === "en") return forced;
  if (forced && isValidLocale(forced)) return forced;
  return defaultLocale;
}
