import { getDictionary } from "@/app/[lang]/dictionaries";
import { ValidLocale } from "@/lib/i18n/config";
import { cloudinaryFolders, CloudinaryImageType, getImagesFromFolder } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";
import { CloudinaryImage } from "./CloudinaryImage";
import DeferredChatButtons from "./deferred-chat-buttons";
import LanguageSwitcher from "./language-switcher";
import MobileNavClient from "./mobile-nav-client";

export default async function Header({ lang }: { lang: string }) {
  const dict = await getDictionary(lang as ValidLocale);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  const navItems = [
    {
      href: `/#${dict.common.navigation.services.link}`,
      label: dict.common.navigation.services.label,
    },
    {
      href: `/#${dict.common.navigation.about_us.link}`,
      label: dict.common.navigation.about_us.label,
    },
    {
      href: `/#${dict.common.navigation.testimonials.link}`,
      label: dict.common.navigation.testimonials.label,
    },
    {
      href: `/#${dict.common.navigation.contact.link}`,
      label: dict.common.navigation.contact.label,
    },
  ];

  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);
  const logo = serviceCoverPhoto.find((image: CloudinaryImageType) => image.title === "logo");

  return (
    <>
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation">
          <div className="flex justify-between items-center py-3">
            <Link href="/" className="flex items-center space-x-2">
              <CloudinaryImage
                src={logo?.url}
                alt={logo?.title || "Nhật Studio"}
                width={150}
                height={50}
                quality={75}
                sizes="150px"
                className="transition-transform duration-300 rounded-lg"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-rose-500"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <LanguageSwitcher lang={lang as ValidLocale} pathname={pathname} />
              <Link
                href="https://www.facebook.com/messages/t/116514626424223"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md"
              >
                {dict.common.book_now}
              </Link>
              <MobileNavClient
                navItems={navItems}
                logoUrl={logo?.url}
                logoAlt={logo?.title || "Nhật Studio"}
              />
            </div>
          </div>
        </nav>
      </header>
      <DeferredChatButtons />
    </>
  );
}
