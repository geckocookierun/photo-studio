import type React from "react";
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import { getDictionary } from "./dictionaries";
import { ValidLocale, defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { buildPageAlternates } from "@/lib/i18n/seo";
import { buildLocalBusinessJsonLd } from "@/lib/seo/structured-data";
import JsonLd from "@/components/json-ld";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-provider";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

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
    alternates: buildPageAlternates(isValidLang as ValidLocale, "/"),
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
    <html lang={isValidLang} suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className={`${sans.className} antialiased`}>
        <JsonLd data={buildLocalBusinessJsonLd(isValidLang as ValidLocale)} />
        <LanguageProvider lang={isValidLang as ValidLocale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
