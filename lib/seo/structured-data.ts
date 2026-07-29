import type { ValidLocale } from "@/lib/i18n/config";
import { getDomainByLocale } from "@/lib/i18n/seo";

export const STUDIO = {
  name: "Nhật Studio",
  legalName: "Nhật Studio",
  phones: ["+84909939351", "+84905098084"],
  email: "nhatstudio.0909939351@gmail.com",
  streetAddress: "254/9 Hoàng Diệu",
  addressLocality: "Đà Nẵng",
  addressRegion: "Đà Nẵng",
  addressCountry: "VN",
  postalCode: "550000",
  latitude: 16.059466,
  longitude: 108.216378,
  mapUrl: "https://maps.google.com/?q=254/9+Hoàng+Diệu,+Đà+Nẵng",
  facebook: "https://www.facebook.com/ChupAnhTheDaNang.NhatStudio/",
  zalo: "https://zalo.me/0909939351",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "19:00" },
    { days: ["Sunday"], opens: "08:00", closes: "17:00" },
  ],
  priceRange: "₫₫",
} as const;

export function buildLocalBusinessJsonLd(lang: ValidLocale) {
  const url = getDomainByLocale(lang);
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PhotographyBusiness"],
    "@id": `${url}/#business`,
    name: STUDIO.name,
    image: `${url}/favicon.svg`,
    url,
    telephone: STUDIO.phones[0],
    email: STUDIO.email,
    priceRange: STUDIO.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: STUDIO.streetAddress,
      addressLocality: STUDIO.addressLocality,
      addressRegion: STUDIO.addressRegion,
      postalCode: STUDIO.postalCode,
      addressCountry: STUDIO.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STUDIO.latitude,
      longitude: STUDIO.longitude,
    },
    hasMap: STUDIO.mapUrl,
    sameAs: [STUDIO.facebook, STUDIO.zalo],
    openingHoursSpecification: STUDIO.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: {
      "@type": "City",
      name: lang === "vi" ? "Đà Nẵng" : "Da Nang",
    },
    description:
      lang === "vi"
        ? "Studio chụp ảnh thẻ, visa, hộ chiếu và ảnh hồ sơ chuyên nghiệp tại Đà Nẵng. Lấy ngay trong ngày."
        : "Professional ID, visa, passport and profile photography studio in Da Nang. Same-day service.",
  };
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  lang: ValidLocale,
  items: { name: string; path: string }[]
) {
  const origin = getDomainByLocale(lang);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
