import { ValidLocale } from "@/lib/i18n/config";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { PhotoMenu } from "@/components/photo-menu";
import { getPhotoSizeMeta } from "@/lib/seo/id-photo-copy";
import { PHOTO_TYPES } from "@/lib/photo-types";
import { cloudinaryFolders, getImagesFromFolder } from "@/lib/utils";
import { getDictionary } from "../../dictionaries";
import { Camera, ImageIcon } from "lucide-react";
import Link from "next/link";

export default async function PhotoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: ValidLocale; type: string }>;
}) {
  const { lang, type } = await params;
  const dict = await getDictionary(lang);
  const sizeMeta = getPhotoSizeMeta(lang, type);
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);
  const heroUrl = serviceCoverPhoto.find((f) => f.title === "card")?.url;
  const hub = lang === "vi" ? "/anh-the-ho-chieu" : "/id-passport-photos";

  const photoTypes = PHOTO_TYPES.map((id) => ({
    id,
    label: `${dict.id_photos.item_label} ${id}`,
    icon: <ImageIcon className="h-4 w-4" />,
  }));

  const activeType = type || photoTypes[0].id;

  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} />
      <section className="relative h-[280px] md:h-[360px] bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 z-10" />
        {heroUrl ? (
          <CloudinaryImage
            src={heroUrl}
            alt={sizeMeta.title}
            width={1920}
            height={600}
            priority
            className="object-cover absolute inset-0 w-full h-full"
          />
        ) : null}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <p className="text-white/80 text-sm mb-2">
            <Link href={hub} className="hover:text-white underline-offset-2 hover:underline">
              {dict.id_photos.heading}
            </Link>
            <span className="mx-2">/</span>
            <span>{activeType}</span>
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mb-4">
            {lang === "vi" ? `Ảnh thẻ ${activeType} Đà Nẵng` : `${activeType} ID Photos in Da Nang`}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            {sizeMeta.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 text-center">
        <div className="inline-flex items-center justify-center bg-gray-100 text-gray-800 px-6 py-3 rounded-md mb-2">
          <Camera className="h-5 w-5 mr-2" />
          <h2 className="font-display text-xl font-semibold">{dict.id_photos.heading2}</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3">{dict.id_photos.subtitle}</p>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-xl">
          <PhotoMenu photoTypes={photoTypes} activeType={activeType} dict={dict} lang={lang} />
          <div className="flex-1 p-8 bg-gray-50">{children}</div>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}
