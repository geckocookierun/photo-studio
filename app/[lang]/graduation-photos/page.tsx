import { getDictionary } from "@/app/[lang]/dictionaries";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { ValidLocale } from "@/lib/i18n/config";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import {
  cloudinaryFolders,
  CloudinaryImageType,
  getImagesFromFolder,
} from "@/lib/utils";
import { Camera, CameraIcon } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const path = "/chup-anh-tot-nghiep";
  const pageUrl = absoluteUrl(lang, path);
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);

  return {
    title: dict.graduation_photos.intro.title,
    description: dict.graduation_photos.intro.description,
    openGraph: {
      title: dict.graduation_photos.intro.title,
      description: dict.graduation_photos.intro.description,
      url: pageUrl,
      siteName: "Nhật Studio",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: serviceCoverPhoto.find((f: CloudinaryImageType) => f.title === "graduation").url,
          width: 1200,
          height: 630,
          alt: dict.graduation_photos.intro.title,
        },
      ],
    },
    alternates: buildPageAlternates(lang, path),
    twitter: {
      card: "summary_large_image",
      title: dict.graduation_photos.intro.title,
      description: dict.graduation_photos.intro.description,
      images: [serviceCoverPhoto.find((f: CloudinaryImageType) => f.title === "graduation").url],
    },
  };
}

export default async function GraduationPhotos({ params }: { params: { lang: ValidLocale } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const professionalProfilePhoto = await getImagesFromFolder(cloudinaryFolders.graduationPhotos);
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);
  const heroUrl = serviceCoverPhoto.find((f: CloudinaryImageType) => f.title === "graduation")?.url;

  return (
    <main className="min-h-screen">
      <Header lang={lang} />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] bg-slate-800" aria-label="Hero banner">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 z-10" />
        {heroUrl ? (
          <CloudinaryImage
            src={heroUrl}
            alt={dict.graduation_photos.hero.title}
            width={1920}
            height={600}
            priority
            className="object-cover absolute inset-0 w-full h-full"
          />
        ) : null}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mb-4">
            {dict.graduation_photos.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            {dict.graduation_photos.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto lg:px-4" aria-label="Giới thiệu dịch vụ">
        <div className="relative bg-gray-100 py-16">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-center mb-4">
              <CameraIcon className="h-10 w-10 mr-4 text-gray-700" />
              <h1 className="text-3xl font-bold text-gray-900">
                {dict.graduation_photos.intro.title}
              </h1>
            </div>
            <p className="text-center max-w-2xl mx-auto text-gray-600">
              {dict.graduation_photos.intro.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4" aria-label="Bộ sưu tập ảnh mẫu">
        <div className="mb-16 mt-10">
          <div className="grid grid-cols-1 md:block md:columns-3 gap-3">
            {professionalProfilePhoto.map((image: CloudinaryImageType, index: number) => (
              <div key={image.id} className="break-inside-avoid mb-4">
                <CloudinaryImage
                  src={image.url}
                  alt={`${image.title} mẫu ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  className=" transition-transform duration-300 rounded-lg"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        <section className="py-20 bg-muted">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {dict.graduation_photos.services.title}
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                {dict.graduation_photos.services.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dict.graduation_photos.services.items.map((service, index) => (
                <Card
                  key={index}
                  className="text-center p-8 bg-lime-100 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">{service.title}</h3>
                    <p className="font-sans text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
