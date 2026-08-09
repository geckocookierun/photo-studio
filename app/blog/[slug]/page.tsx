import BlogArticle from "@/components/blog-article";
import { blogPosts, blogSlugFor, blogSlugsFor, getBlogPost } from "@/lib/blog/posts";
import { getRequestLocale } from "@/lib/i18n/locale";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import { cloudinaryFolders, getImagesFromFolder } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const lang = process.env.NEXT_PUBLIC_SITE_LANG === "en" ? "en" : "vi";
  return blogSlugsFor(lang).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getRequestLocale();
  const post = getBlogPost(slug);
  if (!post) return {};

  const copy = post.content[lang] ?? post.content.vi;
  const path = `/blog/${blogSlugFor(post, lang)}`;
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
  params: { slug: string };
}) {
  const { slug } = await params;
  const lang = await getRequestLocale();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const copy = post.content[lang] ?? post.content.vi;
  const morePosts = blogPosts
    .filter((item) => item.slugs.vi !== post.slugs.vi)
    .slice(0, 4);

  return <BlogArticle lang={lang} content={copy} morePosts={morePosts} />;
}
