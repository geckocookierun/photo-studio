"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, type ValidLocale } from "@/lib/i18n/config";
import { getDomainByLocale, localizePathname, stripLocalePrefix } from "@/lib/i18n/seo";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

const languageNames: Record<string, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export default function LanguageSwitcher({ lang }: { lang: ValidLocale }) {
  const pathname = stripLocalePrefix(usePathname() || "/");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Switch language">
          <Globe className="h-5 w-5 text-cyan-700" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => {
          const href = `${getDomainByLocale(locale)}${localizePathname(pathname, locale)}`;
          return (
            <DropdownMenuItem key={locale} asChild>
              <a
                href={href}
                hrefLang={locale === "vi" ? "vi-VN" : "en-US"}
                className={lang === locale ? "font-bold cursor-pointer" : "cursor-pointer"}
              >
                {languageNames[locale]}
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
