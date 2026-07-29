import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getDictionary } from "./dictionaries";
import { ValidLocale, defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { buildPageAlternates } from "@/lib/i18n/seo";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-provider";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  const isValidLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(isValidLang as ValidLocale);

  return {
    title: {
      template: "%s | Nhật Studio",
      default: dict.metadata.title,
    },
    description: dict.metadata.description,
    generator: "Nhật Studio",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    alternates: buildPageAlternates(isValidLang as ValidLocale, `/${isValidLang}`),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const { lang } = await params;
  const isValidLang = isValidLocale(lang) ? lang : defaultLocale;

  return (
    <html lang={isValidLang} suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider lang={isValidLang as ValidLocale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
