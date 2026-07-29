/** Supported locales configuration */
export const defaultLocale = "vi";
export const locales = ["vi", "en"] as const;
export type ValidLocale = (typeof locales)[number];

/** Type for translation dictionary structure */
export interface Dictionary {
  navigation: {
    home: string;
    services: string;
    about: string;
    contact: string;
  };
  common: {
    book_now: string;
    learn_more: string;
  };
  // Add more translation key types as needed
}

/** Type guard to check if a string is a valid locale */
export function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale);
}

/** Get locale from pathname */
export function getLocaleFromPath(pathname: string): ValidLocale {
  const segments = pathname.split("/");
  const locale = segments[1] as ValidLocale;
  return isValidLocale(locale) ? locale : defaultLocale;
}

/** Normalize path by removing trailing slashes and empty segments */
export function normalizePath(path: string): string {
  return path.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
}

/** Get path without locale prefix */
export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/");
  return segments.slice(isValidLocale(segments[1]) ? 2 : 1).join("/") || "/";
}

/** Add locale prefix — kept for internal app routes only. Public URLs omit this. */
export function addLocalePrefix(path: string, locale: ValidLocale): string {
  const normalizedPath = normalizePath(path);
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

/** Public path without locale prefix (domain implies language). */
export function toPublicPath(path: string): string {
  const normalizedPath = normalizePath(path);
  return getPathWithoutLocale(normalizedPath);
}

export const i18n = {
  locales: ["en", "vi"],
  defaultLocale: "vi",
};
