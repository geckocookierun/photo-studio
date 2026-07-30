import type React from "react";
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import { getDictionary } from "./dictionaries";
import { buildPageAlternates } from "@/lib/i18n/seo";
import { getRequestLocale } from "@/lib/i18n/locale";
import { buildLocalBusinessJsonLd } from "@/lib/seo/structured-data";
import JsonLd from "@/components/json-ld";
import "./globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLocale();
  const dict = await getDictionary(lang);

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
    alternates: buildPageAlternates(lang, "/"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getRequestLocale();

  return (
    <html lang={lang} suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className={`${sans.className} antialiased`}>
        <JsonLd data={buildLocalBusinessJsonLd(lang)} />
        {children}
      </body>
    </html>
  );
}
