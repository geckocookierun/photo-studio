import { NextRequest, NextResponse } from "next/server";
import { getBlogPost } from "@/lib/blog/posts";
import { localizedSlugs } from "@/lib/i18n/paths";

/** Internal app folder that must not stay as a public URL. */
const INTERNAL_ID_PHOTOS = "id-photos";

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") || "";
  const forwarded = request.headers.get("x-forwarded-host") || "";
  const host = (forwarded || hostHeader || request.nextUrl.hostname)
    .split(",")[0]
    ?.trim()
    .split(":")[0]
    ?.toLowerCase() || "";
  const url = request.nextUrl.clone();

  // Prefer apex host (canonical already points here).
  if (host.startsWith("www.")) {
    const apex = host.slice(4);
    const redirectUrl = new URL(
      `${url.pathname}${url.search}`,
      `https://${apex}`
    );
    return NextResponse.redirect(redirectUrl, 308);
  }

  const lang = process.env.NEXT_PUBLIC_SITE_LANG === "en" ? "en" : "vi";
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const first = segments[0];

  if (first === INTERNAL_ID_PHOTOS) {
    segments[0] = lang === "vi" ? "anh-the-ho-chieu" : "id-passport-photos";
    url.pathname = `/${segments.join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  // Blog: redirect wrong-locale article slug to the locale slug for this domain
  if (first === "blog" && segments[1]) {
    const post = getBlogPost(segments[1]);
    if (post) {
      const correct = post.slugs[lang];
      if (segments[1] !== correct) {
        segments[1] = correct;
        url.pathname = `/${segments.join("/")}`;
        return NextResponse.redirect(url, 308);
      }
    }
  }

  const match = localizedSlugs.find((item) =>
    (item.url as readonly string[]).includes(first)
  );
  if (!match) {
    return NextResponse.next();
  }

  const correct = lang === "vi" ? match.viUrl : match.enUrl;
  if (first === correct) {
    return NextResponse.next();
  }

  segments[0] = correct;
  url.pathname = `/${segments.join("/")}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and static files.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
