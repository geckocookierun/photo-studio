import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ValidLocale } from "@/lib/i18n/config";

const VI_ORIGIN = process.env.NEXT_PUBLIC_VI_DOMAIN || "https://chupanhthedanang.vn";
const EN_ORIGIN = process.env.NEXT_PUBLIC_EN_DOMAIN || "https://photoboothdanang.vn";

function getLocaleFromHost(host: string): ValidLocale {
  if (host.includes("photoboothdanang")) return "en";
  return "vi";
}

function isStaticPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    !!pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
  );
}

function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");
  return stripped || "/";
}

function withLocalePath(locale: ValidLocale, pathname: string): string {
  if (pathname === "/") return `/${locale}`;
  return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl;

  if (isStaticPath(pathname)) {
    return NextResponse.next();
  }

  const locale = getLocaleFromHost(host);
  const prefixMatch = pathname.match(/^\/(vi|en)(?=\/|$)/);

  // Legacy /vi/... or /en/... → 301 to clean public URL (and correct domain if needed)
  if (prefixMatch) {
    const urlLocale = prefixMatch[1] as ValidLocale;
    const cleanPath = stripLocalePrefix(pathname);

    if (!host.includes("localhost") && urlLocale !== locale) {
      const origin = urlLocale === "vi" ? VI_ORIGIN : EN_ORIGIN;
      return NextResponse.redirect(new URL(cleanPath, origin.replace(/\/$/, "")), 301);
    }

    const url = request.nextUrl.clone();
    url.pathname = cleanPath;
    return NextResponse.redirect(url, 301);
  }

  // Public URL without prefix → rewrite internally to /{locale}/...
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = withLocalePath(locale, pathname);

  const response = NextResponse.rewrite(rewriteUrl);
  response.headers.set("x-pathname", pathname);
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
