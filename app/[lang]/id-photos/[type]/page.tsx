import { PHOTO_TYPES } from "@/lib/photo-types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Card, CardContent } from "@/components/ui/card";
import { defaultLocale, isValidLocale, ValidLocale } from "@/lib/i18n/config";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import { getPhotoSizeMeta } from "@/lib/seo/id-photo-copy";
import {
  cloudinaryFolders,
  CloudinaryImageType,
  getImagesFromFolder,
} from "@/lib/utils";
import { Metadata } from "next";

export async function generateStaticParams() {
  return PHOTO_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale; type: string };
}): Promise<Metadata> {
  const { lang, type } = await params;

  const isValidLang = isValidLocale(lang) ? lang : defaultLocale;
  const meta = getPhotoSizeMeta(isValidLang, type);
  const path = lang === "vi" ? `/anh-the-ho-chieu/${type}` : `/id-passport-photos/${type}`;
  const pageUrl = absoluteUrl(isValidLang as ValidLocale, path);
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);

  const cover =
    serviceCoverPhoto.find((f: CloudinaryImageType) => f.title === "card")?.url ?? undefined;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      siteName: "Nhật Studio",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: cover
        ? [
            {
              url: cover,
              width: 1200,
              height: 630,
              alt: meta.title,
            },
          ]
        : undefined,
    },
    alternates: buildPageAlternates(isValidLang as ValidLocale, path),
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: cover ? [cover] : undefined,
    },
  };
}

function getPhotoDimensions(photoType: string) {
  const dimensions = photoType.split("x").map((str) => parseFloat(str));
  const scale = 100;
  return {
    width: Math.round(dimensions[0] * scale),
    height: Math.round(dimensions[1] * scale),
  };
}

export default async function PhotoService({
  params,
}: {
  params: { lang: ValidLocale; type: string };
}) {
  const { type } = await params;

  const activeType = type as string;
  if (!activeType) return <></>;
  const backgroundCardImages = await getImagesFromFolder(
    cloudinaryFolders.idPassportPhoto[activeType as keyof typeof cloudinaryFolders.idPassportPhoto]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {backgroundCardImages.map((image: CloudinaryImageType, index: number) => {
        const dimensions = getPhotoDimensions(activeType);
        return (
          <Card
            key={image.id}
            className="overflow-hidden transition-all hover:shadow-lg group rounded-lg"
          >
            <CardContent className="p-0 relative">
              <div className={`aspect-[${dimensions.width}/${dimensions.height}] relative`}>
                <CloudinaryImage
                  src={image.url}
                  alt={`${image.title} mẫu ${index + 1}`}
                  width={Math.min(dimensions.width * 2, 480)}
                  height={Math.min(dimensions.height * 2, 640)}
                  quality={65}
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className=" transition-transform duration-300 rounded-t-lg"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
