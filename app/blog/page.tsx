import { getBlogIndex } from "@/lib/blog/posts";
import { getRequestLocale } from "@/lib/i18n/locale";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import { cloudinaryFolders, getImagesFromFolder } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

const pageCopy = {
  vi: {
    title: "Blog Chụp Ảnh Thẻ Đà Nẵng",
    description:
      "Bài viết thực tế về ảnh thẻ, visa, hồ sơ và mẹo chụp tại Nhật Studio Đà Nẵng.",
    readMore: "Đọc bài",
  },
  en: {
    title: "ID Photo Blog – Da Nang",
    description:
      "Practical notes on ID, visa, and profile photos from Nhat Studio in Da Nang.",
    readMore: "Read article",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLocale();
  const copy = pageCopy[lang] ?? pageCopy.vi;
  const path = `/blog`;
  const pageUrl = absoluteUrl(lang, path);
  const bannerHomepage = await getImagesFromFolder(cloudinaryFolders.bannerHomepage);

  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: pageUrl,
      siteName: "Nhật Studio",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: bannerHomepage[0]?.url
        ? [{ url: bannerHomepage[0].url, width: 1920, height: 600, alt: copy.title }]
        : undefined,
    },
    alternates: buildPageAlternates(lang, path),
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: bannerHomepage[0]?.url ? [bannerHomepage[0].url] : undefined,
    },
  };
}

export default async function BlogIndexPage() {
  const lang = await getRequestLocale();
  const copy = pageCopy[lang] ?? pageCopy.vi;
  const posts = getBlogIndex(lang);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12" lang={lang}>
      <h1 className="text-3xl font-bold mb-4 text-center">{copy.title}</h1>
      <p className="text-center text-gray-600 mb-10">{copy.description}</p>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {copy.readMore}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
