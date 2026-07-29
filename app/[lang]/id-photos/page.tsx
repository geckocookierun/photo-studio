import { getDictionary } from "@/app/[lang]/dictionaries";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Reveal from "@/components/reveal";
import { defaultLocale, isValidLocale, ValidLocale } from "@/lib/i18n/config";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import { PHOTO_TYPES } from "@/lib/photo-types";
import { cloudinaryFolders, getImagesFromFolder } from "@/lib/utils";
import { Camera, ImageIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

function hubPath(lang: ValidLocale) {
  return lang === "vi" ? "/anh-the-ho-chieu" : "/id-passport-photos";
}

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const { lang } = await params;
  const isValidLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(isValidLang);
  const path = hubPath(isValidLang);
  const pageUrl = absoluteUrl(isValidLang, path);
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
    alternates: buildPageAlternates(isValidLang, path),
    twitter: {
      card: "summary_large_image",
      title: dict.id_photos.title,
      description: dict.id_photos.description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function IdPhotosHub({
  params,
}: {
  params: { lang: ValidLocale };
}) {
  const { lang } = await params;
  const isValidLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(isValidLang);
  const base = hubPath(isValidLang);
  const copy =
    isValidLang === "vi"
      ? {
          choose: "Chọn kích thước ảnh thẻ",
          hint: "Bấm vào size bạn cần — xem mẫu và đặt chụp lấy ngay tại studio.",
          view: "Xem mẫu",
        }
      : {
          choose: "Choose an ID photo size",
          hint: "Pick the size you need — browse samples and get same-day photos at the studio.",
          view: "View samples",
        };

  return (
    <div className="min-h-screen bg-white">
      <Header lang={isValidLang} />

      <section className="relative h-[280px] md:h-[360px]">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 z-10" />
        <Image
          src="https://picsum.photos/id/1005/1920/600"
          alt={dict.id_photos.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
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

      <Footer lang={isValidLang} />
    </div>
  );
}
