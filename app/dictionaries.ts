import "server-only";
import { ValidLocale } from "@/lib/i18n/config";
import {
  absoluteUrl,
  buildPageAlternates,
  getDomainByLocale as getDomainByLocaleFromSeo,
} from "@/lib/i18n/seo";

const dictionaries = {
  vi: () => import("@/dictionaries/vi.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: ValidLocale) => {
  try {
    if (typeof dictionaries[locale] === "function") {
      return await dictionaries[locale]();
    } else {
      throw new Error(`Invalid locale: ${locale}`);
    }
  } catch (error) {
    console.error(`Dictionary load failed for locale: ${locale}`, error);
    return dictionaries.vi();
  }
};

export const getDomainByLocale = getDomainByLocaleFromSeo;

export const getCanonicalDomain = (locale: ValidLocale, path: string) => {
  return absoluteUrl(locale, path.startsWith("/") ? path : `/${path}`);
};

/** @deprecated Prefer buildPageAlternates from @/lib/i18n/seo */
export function getAlternateUrls(currentLang: ValidLocale, currentPath: string = "/") {
  return buildPageAlternates(currentLang, currentPath).languages as Record<string, string>;
}
