import { getDictionary } from "@/app/dictionaries";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import Footer from "@/components/footer";
import Header from "@/components/header";
import JsonLd from "@/components/json-ld";
import Reveal from "@/components/reveal";
import { ValidLocale } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/locale";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import { PHOTO_TYPES } from "@/lib/photo-types";
import { idPhotoFaqs } from "@/lib/seo/id-photo-copy";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/structured-data";
import { cloudinaryFolders, getImagesFromFolder } from "@/lib/utils";
import { Camera, ImageIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

function hubPath(lang: ValidLocale) {
  return lang === "vi" ? "/anh-the-ho-chieu" : "/id-passport-photos";
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLocale();
  const dict = await getDictionary(lang);
  const path = hubPath(lang);
  const pageUrl = absoluteUrl(lang, path);
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);
  const cover = serviceCoverPhoto.find((f) => f.title === "card")?.url;

  return {
    title: dict.id_photos.title,
    description: dict.id_photos.description,
    openGraph: {
      title: dict.id_photos.title,
      description: dict.id_photos.description,
      url: pageUrl,
      siteName: "Nhật Studio",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: cover
        ? [{ url: cover, width: 1200, height: 630, alt: dict.id_photos.title }]
        : undefined,
    },
    alternates: buildPageAlternates(lang, path),
    twitter: {
      card: "summary_large_image",
      title: dict.id_photos.title,
      description: dict.id_photos.description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function IdPhotosHub() {
  const lang = await getRequestLocale();
  const dict = await getDictionary(lang);
  const base = hubPath(lang);
  const faqs = idPhotoFaqs[lang];
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);
  const heroUrl = serviceCoverPhoto.find((f) => f.title === "card")?.url;

  const copy =
    lang === "vi"
      ? {
          choose: "Chọn kích thước ảnh thẻ",
          hint: "Bấm vào size bạn cần — xem mẫu và đặt chụp lấy ngay tại studio.",
          view: "Xem mẫu",
          faqTitle: "Câu hỏi thường gặp",
          relatedTitle: "Xem thêm",
          related: [
            { href: "/blog", label: "Blog ảnh thẻ" },
            { href: "/blog/gia-chup-anh-the-da-nang", label: "Giá chụp ảnh thẻ" },
            { href: "/blog/kich-thuoc-anh-the-pho-bien", label: "Các kích thước phổ biến" },
            { href: "/blog/chup-anh-the-lay-ngay", label: "Ảnh lấy ngay" },
            { href: "/anh-ho-so-chuyen-nghiep", label: "Ảnh hồ sơ chuyên nghiệp" },
            { href: "/#lien-he", label: "Liên hệ / chỉ đường" },
          ],
          home: "Trang chủ",
        }
      : {
          choose: "Choose an ID photo size",
          hint: "Pick the size you need — browse samples and get same-day photos at the studio.",
          view: "View samples",
          faqTitle: "Frequently asked questions",
          relatedTitle: "Related",
          related: [
            { href: "/blog", label: "ID photo blog" },
            { href: "/blog/id-photo-prices-da-nang", label: "ID photo prices" },
            { href: "/blog/common-id-photo-sizes", label: "Common sizes" },
            { href: "/blog/same-day-id-photos-da-nang", label: "Same-day photos" },
            { href: "/professional-profile-photos", label: "Professional profile photos" },
            { href: "/#contact", label: "Contact / directions" },
          ],
          home: "Home",
        };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          buildFaqJsonLd([...faqs]),
          buildBreadcrumbJsonLd(lang, [
            { name: copy.home, path: "/" },
            { name: dict.id_photos.heading, path: base },
          ]),
        ]}
      />
      <Header lang={lang} />

      <section className="relative h-[280px] md:h-[360px] bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 z-10" />
        {heroUrl ? (
          <CloudinaryImage
            src={heroUrl}
            alt={dict.id_photos.title}
            width={1280}
            height={420}
            quality={65}
            priority
            sizes="100vw"
            className="object-cover absolute inset-0 w-full h-full"
          />
        ) : null}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mb-4">
            {dict.id_photos.heading}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            {dict.id_photos.subtitle}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Reveal className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gray-100 text-gray-800 px-6 py-3 rounded-md mb-4">
            <Camera className="h-5 w-5 mr-2" />
            <h2 className="font-display text-xl font-semibold">{copy.choose}</h2>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">{copy.hint}</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {PHOTO_TYPES.map((type, index) => (
            <Reveal key={type} delay={index * 50}>
              <Link
                href={`${base}/${type}`}
                className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all hover:border-rose-300 hover:bg-white hover:shadow-md"
              >
                <span className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <ImageIcon className="h-5 w-5" />
                </span>
                <span className="font-semibold text-gray-900 text-lg">{type}</span>
                <span className="text-sm text-rose-500 font-medium">{copy.view}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
              {copy.faqTitle}
            </h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 40}>
                <details className="group rounded-xl border border-gray-200 bg-white p-5 open:shadow-sm">
                  <summary className="cursor-pointer font-semibold text-gray-900 list-none flex justify-between gap-4">
                    {faq.question}
                    <span className="text-rose-500 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h2 className="font-display text-xl font-semibold mb-4 text-center">{copy.relatedTitle}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {copy.related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:border-rose-300 hover:text-rose-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
