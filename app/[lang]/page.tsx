import Banner from "@/components/banner";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Reveal from "@/components/reveal";
import ServiceCard from "@/components/service-card";
import TestimonialCard from "@/components/testimonial-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { defaultLocale, isValidLocale, ValidLocale } from "@/lib/i18n/config";
import { cloudinaryFolders, CloudinaryImageType, getImagesFromFolder } from "@/lib/utils";
import { FacebookIcon, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, buildPageAlternates } from "@/lib/i18n/seo";
import { getDictionary } from "./dictionaries";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const { lang } = await params;
  const isValidLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(isValidLang as ValidLocale);
  const pageUrl = absoluteUrl(isValidLang as ValidLocale, "/");
  const bannerHomepage = await getImagesFromFolder(cloudinaryFolders.bannerHomepage);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: pageUrl,
      siteName: "Nhật Studio",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: bannerHomepage[0]?.url,
          width: 1920,
          height: 600,
          alt: dict.metadata.title,
        },
      ],
    },
    alternates: buildPageAlternates(isValidLang as ValidLocale, "/"),
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: bannerHomepage[0]?.url ? [bannerHomepage[0].url] : undefined,
    },
  };
}

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const isValidLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(isValidLang as ValidLocale);

  // Get services from dictionary
  const services = dict.home.services.items;
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);

  return (
    <main className="min-h-screen flex flex-col">
      <Header lang={isValidLang} />
      <Banner lang={isValidLang} />

      {/* Photography Services Section */}
      <section id={dict.common.navigation.services.link} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
              {dict.home.services.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {dict.home.services.subtitle}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 80}>
                <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
                  <div className="">
                    <Link
                      href={service.link}
                      className="text-rose-500 hover:text-rose-700 font-medium flex items-center gap-2 aspect-[5/4]"
                    >
                      <CloudinaryImage
                        src={
                          serviceCoverPhoto.find(
                            (image: CloudinaryImageType) => image.title === service.imageUrl
                          )?.url
                        }
                        alt={
                          serviceCoverPhoto.find(
                            (image: CloudinaryImageType) => image.title === service.imageUrl
                          )?.title
                        }
                        width={480}
                        height={384}
                        quality={65}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className=" transition-transform duration-300 rounded-lg"
                      />
                    </Link>
                  </div>
                  <CardContent className="py-3 md:h-[140px]">
                    <Link
                      href={service.link}
                      className="hover:text-blue-400 font-medium flex items-center gap-2"
                    >
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    </Link>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={service.link}
                      className="hover:text-blue-400 font-medium flex items-center gap-2"
                    >
                      {dict.home.services.view_details}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </CardFooter>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Editing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
              {dict.home.photo_editing.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {dict.home.photo_editing.subtitle}
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {dict.home.photo_editing.services.map((service, index) => (
              <Reveal key={service.title} delay={index * 70} className="h-full">
                <ServiceCard
                  icon={getServiceIcon(index)}
                  title={service.title}
                  description={service.description}
                  url={
                    index === 0
                      ? serviceCoverPhoto.find(
                          (image: CloudinaryImageType) => image.title === "zalo_code"
                        )?.url
                      : ""
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id={dict.common.navigation.testimonials.link} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
              {dict.home.why_choose_us.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {dict.home.why_choose_us.subtitle}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.home.why_choose_us.features.map((item, index) => (
              <Reveal key={index} delay={index * 90}>
                <div className="bg-white p-8 rounded-lg shadow-md text-center transition-shadow duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-rose-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {getIconPath(index)}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fifth Section - Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
              {dict.home.testimonials.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {dict.home.testimonials.subtitle}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.home.testimonials.items.map((testimonial, index) => (
              <Reveal key={index} delay={index * 90}>
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  rating={testimonial.rating}
                  testimonial={testimonial.testimonial}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id={dict.common.navigation.contact.link} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
              {dict.home.contact.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {dict.home.contact.subtitle}
            </p>
          </Reveal>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8 items-stretch">
            <Reveal>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-4">{dict.home.contact.contact_information}</h3>
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-rose-500 mt-1 flex-shrink-0" />
                    <a
                      href="https://maps.google.com/?q=254/9+Hoàng+Diệu,+Đà+Nẵng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-300 transition-colors"
                    >
                      254/9 Hoàng Diệu, Đà Nẵng, Việt Nam
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-rose-500 flex-shrink-0" />
                    <div>
                      <a href="tel:0909939351" className="hover:text-blue-300 transition-colors">
                        0909939351
                      </a>
                      {" | "}
                      <a href="tel:0905098084" className="hover:text-blue-300 transition-colors">
                        0905098084
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-rose-500 flex-shrink-0" />
                    <a
                      href="mailto:nhatstudio.0909939351@gmail.com"
                      className="hover:text-blue-300 transition-colors"
                    >
                      nhatstudio.0909939351@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="text-rose-500 flex-shrink-0" />
                    <Link
                      href="https://zalo.me/0909939351"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center hover:text-blue-300"
                    >
                      <p>Nhật Studio Zalo</p>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FacebookIcon className="text-rose-500 flex-shrink-0" />
                    <Link
                      href="https://www.facebook.com/ChupAnhTheDaNang.NhatStudio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center hover:text-blue-300"
                    >
                      <p>Chụp Ảnh Thẻ Đà Nẵng - NHẬT Studio</p>
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mt-4">Giờ mở cửa</h3>
                  <p>Thứ Hai - Thứ Bảy: 8:00 - 19:00</p>
                  <p>Chủ Nhật: 8:00 - 17:00</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-gray-200 rounded-lg overflow-hidden flex h-full min-h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.63225401400408!2d108.21637842804198!3d16.059465841677223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219be4de295c1%3A0x32aa91831c5d6030!2zTkjhuqxUIFNUVURJTw!5e0!3m2!1svi!2s!4v1745597814112!5m2!1svi!2s"
                  className="w-full aspect-video rounded-xl min-h-[280px]"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ đến Nhật Studio"
                  aria-label="Bản đồ chỉ đường đến Nhật Studio"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id={dict.common.navigation.about_us.link} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative h-[500px]">
                <CloudinaryImage
                  src={
                    serviceCoverPhoto.find(
                      (image: CloudinaryImageType) => image.title === "nhat_avatar"
                    )?.url
                  }
                  alt={
                    serviceCoverPhoto.find(
                      (image: CloudinaryImageType) => image.title === "nhat_avatar"
                    )?.title
                  }
                  width={480}
                  height={400}
                  quality={65}
                  sizes="(max-width: 768px) 100vw, 480px"
                  className=" transition-transform duration-300 rounded-lg"
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
                  {dict.home.about.title}
                </h2>
                {dict.home.about.content.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer lang={isValidLang} />
    </main>
  );
}

// Helper function for service icons
function getServiceIcon(index: number): "edit" | "wand" | "ruler" | "cloud" {
  const icons: ("edit" | "wand" | "ruler" | "cloud")[] = ["edit", "wand", "ruler", "cloud"];
  return icons[index] ?? "edit";
}

function getIconPath(index: number) {
  const paths = [
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />,
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />,
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.5 9.5c.96-1.35 3.59-1.35 4.55 0 .96 1.35 1.04 3.549 0 4.9-.96 1.35-3.59 1.35-4.55 0-1.04-1.351-.96-3.55 0-4.9z"
      />
    </>,
  ];
  return <>{paths[index] ?? <></>}</>;
}
