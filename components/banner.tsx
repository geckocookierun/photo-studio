import { getDictionary } from "@/app/[lang]/dictionaries";
import { ValidLocale } from "@/lib/i18n/config";
import { cloudinaryFolders, CloudinaryImageType, cn, getImagesFromFolder } from "@/lib/utils";
import { Phone } from "lucide-react";
import Link from "next/link";
import { CloudinaryImage } from "./CloudinaryImage";

export default async function Banner({ lang }: { lang: string }) {
  const dict = await getDictionary(lang as ValidLocale);
  const backgroundCardImages = await getImagesFromFolder(cloudinaryFolders.backgroundCardImages);
  const bannerHomepage = await getImagesFromFolder(cloudinaryFolders.bannerHomepage);

  return (
    <section
      aria-label={dict.home.banner.aria_label}
      className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900/90 to-slate-900/60"
    >
      {/* Background with gradient overlay */}
      <div className="md:relative w-full hidden md:block z-10">
        <div className="absolute inset-0 " />
        <CloudinaryImage
          src={bannerHomepage[0]?.url}
          alt={bannerHomepage[0]?.title || dict.home.banner.title}
          width={1920}
          height={600}
          priority
          quality={90}
          className="object-cover"
          fetchPriority="high"
        />
      </div>

      {/* Content container */}
      <div className="md:absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text content */}
            <div className="hidden md:block text-center md:text-left md:max-w-xl">
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-black/90 mb-4 tracking-tight animate-fade-up">
                {dict.home.banner.title}
              </h1>
              <p
                className="text-xl md:text-2xl text-black/90 mb-8 italic animate-fade-up"
                style={{ animationDelay: "120ms" }}
              >
                {dict.home.banner.description}
              </p>
              <Link
                href="tel:0909939351"
                aria-label={dict.home.banner.cta_aria_label}
                className="hidden md:flex bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md items-center space-x-2 w-fit mx-auto md:mx-0 animate-fade-up"
                style={{ animationDelay: "220ms" }}
              >
                <span>{dict.common.book_now}</span>
                <Phone size={16} />
              </Link>
            </div>

            {/* Photo cards */}
            <div
              className={cn(
                "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 py-4 md:py-0",
                "w-full max-w-md md:max-w-xl "
              )}
              role="grid"
            >
              {backgroundCardImages.map((photo: CloudinaryImageType, index: number) => (
                <div
                  key={photo.id}
                  className={cn(
                    "relative overflow-hidden rounded-lg shadow-lg",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                    "aspect-[3/4] animate-fade-up"
                  )}
                  style={{ animationDelay: `${150 + index * 80}ms` }}
                  role="gridcell"
                >
                  <CloudinaryImage
                    src={photo.url}
                    alt={photo.title}
                    width={300}
                    height={400}
                    priority={true}
                    className="object-cover"
                    fetchPriority="high"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
