import { getDictionary } from "@/app/dictionaries";
import { ValidLocale } from "@/lib/i18n/config";
import { cloudinaryFolders, CloudinaryImageType, getImagesFromFolder } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { CloudinaryImage } from "./CloudinaryImage";

export default async function Footer({ lang }: { lang: string }) {
  const dict = await getDictionary(lang as ValidLocale);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      {
        href: dict.home.services.items[0].link,
        key: "id_photos",
        label: dict.home.services.items[0].title,
      },
      {
        href: dict.home.services.items[1].link,
        key: "portraits",
        label: dict.home.services.items[1].title,
      },
      {
        href: dict.home.services.items[2].link,
        key: "graduation",
        label: dict.home.services.items[2].title,
      },
      {
        href: dict.home.services.items[3].link,
        key: "restoration",
        label: dict.home.services.items[3].title,
      },
    ],
    quickLinks: [
      { href: "/", key: "home", label: dict.common.navigation.home },
      {
        href: `/#${dict.common.navigation.about_us.link}`,
        key: `about_us`,
        label: dict.common.navigation.about_us.label,
      },
      {
        href: `/#${dict.common.navigation.services.link}`,
        key: `services`,
        label: dict.common.navigation.services.label,
      },
      {
        href: `/#${dict.common.navigation.testimonials.link}`,
        key: `testimonials`,
        label: dict.common.navigation.testimonials.label,
      },
      {
        href: `/#${dict.common.navigation.contact.link}`,
        key: `contact`,
        label: dict.common.navigation.contact.label,
      },
    ],
  };

  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);

  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <CloudinaryImage
              src={
                serviceCoverPhoto.find((image: CloudinaryImageType) => image.title === "logo")?.url
              }
              alt={
                serviceCoverPhoto.find((image: CloudinaryImageType) => image.title === "logo")
                  ?.title
              }
              width={150}
              height={150}
              quality={75}
              sizes="150px"
              className=" transition-transform duration-300 rounded-lg"
            />
            <h3 className="text-xl font-bold my-4">{dict.footer.about.title}</h3>
            <p className="text-gray-300 mb-4">{dict.footer.about.description}</p>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{dict.footer.services.title}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{dict.common.navigation.title}</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{dict.footer.contact.title}</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <MapPin className="text-rose-400 mt-1 flex-shrink-0" size={18} />
                <a
                  href="https://maps.google.com/?q=254/9+Hoàng+Diệu,+Đà+Nẵng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  254/9 Hoàng Diệu, Đà Nẵng, Việt Nam
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-rose-400 flex-shrink-0" size={18} />
                <a href="tel:0909939351" className="text-gray-300 hover:text-white">
                  0909939351
                </a>
                <span>{" | "}</span>
                <a href="tel:0905098084" className="text-gray-300 hover:text-white">
                  0905098084
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-rose-400 flex-shrink-0" size={18} />
                <a
                  href="mailto:nhatstudio.0909939351@gmail.com"
                  className="text-gray-300 hover:text-white"
                >
                  nhatstudio.0909939351@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>{dict.footer.copyright.replace("{year}", currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
}
