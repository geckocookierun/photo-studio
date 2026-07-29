import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function withPathnameHeader(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

function permanentRedirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

export function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl;

  // Static assets / system routes — no locale redirect
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return withPathnameHeader(request);
  }

  // Same rules for users and crawlers (avoids indexing wrong-language URLs)
  if (host.includes("photoboothdanang.vn")) {
    if (pathname.startsWith("/vi")) {
      return permanentRedirect(request, pathname.replace(/^\/vi/, "/en"));
    }
    if (pathname === "/") {
      return permanentRedirect(request, "/en");
    }
  }

  if (host.includes("chupanhthedanang.vn")) {
    if (pathname.startsWith("/en")) {
      return permanentRedirect(request, pathname.replace(/^\/en/, "/vi"));
    }
    if (pathname === "/") {
      return permanentRedirect(request, "/vi");
    }
  }

  if (host.includes("localhost")) {
    if (pathname.startsWith("/en")) {
      return permanentRedirect(request, pathname.replace(/^\/en/, "/vi"));
    }
    if (pathname === "/") {
      return permanentRedirect(request, "/vi");
    }
  }

  return withPathnameHeader(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
