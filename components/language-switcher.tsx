"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-provider";
import { locales, type ValidLocale } from "@/lib/i18n/config";
import { getDomainByLocale, localizePathname } from "@/lib/i18n/seo";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const languageNames: Record<string, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLanguage();

  const switchLanguage = (newLocale: ValidLocale) => {
    const path = localizePathname(pathname, newLocale);
    const origin = getDomainByLocale(newLocale);

    if (origin.startsWith("http") && typeof window !== "undefined") {
      try {
        const targetHost = new URL(origin).host;
        if (targetHost !== window.location.host) {
          window.location.assign(`${origin}${path}`);
          return;
        }
      } catch {
        // fall through
      }
    }
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="text-cyan-700" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className={currentLocale === locale ? "font-bold cursor-pointer" : "cursor-pointer"}
            onClick={() => switchLanguage(locale)}
          >
            {languageNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
