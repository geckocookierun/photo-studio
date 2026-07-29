import BlogArticle from "@/components/blog-article";
import { blogSlugs, getBlogPost } from "@/lib/blog/posts";
import { ValidLocale } from "@/lib/i18n/config";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import { cloudinaryFolders, getImagesFromFolder } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale; slug: string };
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const copy = post.content[lang] ?? post.content.vi;
  const path = `/blog/${slug}`;
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
      type: "article",
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

export default async function BlogPostPage({
  params,
}: {
  params: { lang: ValidLocale; slug: string };
}) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const copy = post.content[lang] ?? post.content.vi;
  return <BlogArticle lang={lang} content={copy} />;
}
