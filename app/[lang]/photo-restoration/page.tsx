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
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const path = "/phuc-hoi-anh-cu";
  const pageUrl = absoluteUrl(lang, path);
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);

  return {
    title: dict.photo_restoration.title,
    description: dict.photo_restoration.description,
    openGraph: {
      title: dict.photo_restoration.title,
      description: dict.photo_restoration.description,
      url: pageUrl,
      siteName: "Nhật Studio",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: serviceCoverPhoto.find((f: CloudinaryImageType) => f.title === "recovery").url,
          width: 1200,
          height: 630,
          alt: dict.photo_restoration.title,
        },
      ],
    },
    alternates: buildPageAlternates(lang, path),
    twitter: {
      card: "summary_large_image",
      title: dict.photo_restoration.title,
      description: dict.photo_restoration.description,
      images: [serviceCoverPhoto.find((f: CloudinaryImageType) => f.title === "recovery").url],
    },
  };
}

export default async function PhotoRestoration({ params }: { params: { lang: ValidLocale } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const photoRestoration = await getImagesFromFolder(cloudinaryFolders.photoRestoration);

  return (
    <main className="min-h-screen">
      <Header lang={lang} />

      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 z-10" />
        <Image
          src="https://picsum.photos/id/1059/1920/600"
          alt={dict.photo_restoration.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {dict.photo_restoration.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            {dict.photo_restoration.description}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {dict.photo_restoration.samples.title}
            </h2>
          </div>
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {photoRestoration.map((image: CloudinaryImageType, index: number) => {
              return (
                <Card
                  key={image.id}
                  className="overflow-hidden transition-all hover:shadow-lg group rounded-lg"
                >
                  <CardContent className="p-0">
                    <CloudinaryImage
                      src={image.url}
                      alt={`${image.title} mẫu ${index + 1}`}
                      width={image.width}
                      height={image.height}
                      className=" transition-transform duration-300 rounded-lg"
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mb-16 bg-slate-50 py-12 px-4 rounded-xl">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {dict.photo_restoration.services.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dict.photo_restoration.services.items.map((service, index) => (
                <div key={index} className="text-center p-4">
                  <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-md">
                    <div className="text-amber-700">{getIconPath(index)}</div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {dict.photo_restoration.process.title}
            </h2>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 transform -translate-x-1/2"></div>

              {dict.photo_restoration.process.steps.map((step, index) => (
                <div key={index} className="relative md:grid md:grid-cols-2 md:gap-8 mb-12">
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:text-right md:pr-8">
                        <div className="hidden md:block absolute right-0 top-0 w-4 h-4 rounded-full bg-amber-500 transform translate-x-1/2"></div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                      <div className="hidden md:block"></div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block"></div>
                      <div className="md:pl-8">
                        <div className="hidden md:block absolute left-0 top-0 w-4 h-4 rounded-full bg-amber-500 transform -translate-x-1/2"></div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
      <Footer lang={lang} />
    </main>
  );
}

function getIconPath(index: number) {
  const paths = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-image"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-image-plus"
    >
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
      <line x1="16" x2="22" y1="5" y2="5" />
      <line x1="19" x2="19" y1="2" y2="8" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-palette"
    >
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-hammer"
    >
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
    </svg>,
  ];
  return <>{paths[index] ?? <></>}</>;
}
