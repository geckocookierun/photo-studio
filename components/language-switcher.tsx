import { locales, type ValidLocale } from "@/lib/i18n/config";
import { getDomainByLocale, localizePathname } from "@/lib/i18n/seo";

const languageNames: Record<string, string> = {
  en: "EN",
  vi: "VI",
};

/** Server component — plain links, no Radix/dropdown JS. */
export default function LanguageSwitcher({
  lang,
  pathname = "/",
}: {
  lang: ValidLocale;
  pathname?: string;
}) {
  return (
    <div className="flex items-center gap-1 text-sm font-medium" role="group" aria-label="Language">
      {locales.map((locale) => {
        const href = `${getDomainByLocale(locale)}${localizePathname(pathname, locale)}`;
        const active = locale === lang;
        return (
          <a
            key={locale}
            href={href}
            hrefLang={locale === "vi" ? "vi-VN" : "en-US"}
            className={
              active
                ? "px-2 py-1 rounded-md bg-rose-50 text-rose-600"
                : "px-2 py-1 rounded-md text-gray-600 hover:text-rose-500"
            }
            aria-current={active ? "true" : undefined}
          >
            {languageNames[locale]}
          </a>
        );
      })}
    </div>
  );
}
