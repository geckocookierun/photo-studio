import type { ValidLocale } from "@/lib/i18n/config";
import type { PhotoTypeId } from "@/lib/photo-types";

type SizeCopy = { title: string; description: string };

const sizeMetaVi: Record<PhotoTypeId, SizeCopy> = {
  "3x4": {
    title: "Chụp ảnh thẻ 3x4 Đà Nẵng | Lấy ngay - Nhật Studio",
    description:
      "Chụp ảnh thẻ 3x4 chuẩn hồ sơ, lý lịch tại Đà Nẵng. Chỉnh sửa nhẹ, in lấy ngay tại Nhật Studio Hoàng Diệu.",
  },
  "3.3x4.8": {
    title: "Ảnh thẻ 3.3x4.8 Đà Nẵng | Nhật Studio",
    description: "Chụp và in ảnh thẻ 3.3x4.8 đúng kích thước tại Nhật Studio Đà Nẵng, nhận trong ngày.",
  },
  "3.5x4.5": {
    title: "Ảnh thẻ 3.5x4.5 / visa Đà Nẵng | Nhật Studio",
    description:
      "Ảnh 3.5x4.5 thường dùng cho visa. Chụp đúng chuẩn tại Nhật Studio Đà Nẵng, hỗ trợ file mềm.",
  },
  "3.5x5": {
    title: "Ảnh thẻ 3.5x5 Đà Nẵng | Nhật Studio",
    description: "Chụp ảnh thẻ 3.5x5 tại Đà Nẵng — nền trắng/xanh theo yêu cầu, lấy ngay.",
  },
  "3.6x4.7": {
    title: "Ảnh thẻ 3.6x4.7 Đà Nẵng | Nhật Studio",
    description: "Dịch vụ chụp ảnh 3.6x4.7 đúng size tại Nhật Studio, Hải Châu, Đà Nẵng.",
  },
  "4x6": {
    title: "Chụp ảnh 4x6 Đà Nẵng | Nhật Studio",
    description: "Ảnh 4x6 cho hồ sơ và giấy tờ tại Đà Nẵng. In rõ nét, nhận nhanh tại Nhật Studio.",
  },
  "5x5": {
    title: "Ảnh thẻ 5x5 Đà Nẵng | Nhật Studio",
    description: "Chụp ảnh thẻ vuông 5x5 tại Đà Nẵng, chỉnh sáng tự nhiên, lấy ngay.",
  },
  "5x7": {
    title: "Ảnh 5x7 Đà Nẵng | Nhật Studio",
    description: "In ảnh 5x7 tại Nhật Studio Đà Nẵng — phù hợp lưu giữ hoặc yêu cầu giấy tờ đặc thù.",
  },
};

const sizeMetaEn: Record<PhotoTypeId, SizeCopy> = {
  "3x4": {
    title: "3x4 ID Photos in Da Nang | Same-day - Nhat Studio",
    description:
      "Standard 3x4 ID photos in Da Nang. Light retouching and same-day prints at Nhat Studio, Hoang Dieu.",
  },
  "3.3x4.8": {
    title: "3.3x4.8 ID Photos in Da Nang | Nhat Studio",
    description: "Exact-size 3.3x4.8 ID photos with same-day pickup at Nhat Studio, Da Nang.",
  },
  "3.5x4.5": {
    title: "3.5x4.5 Visa Photos in Da Nang | Nhat Studio",
    description: "3.5x4.5 photos commonly used for visas. Compliant shoots and soft-file delivery in Da Nang.",
  },
  "3.5x5": {
    title: "3.5x5 ID Photos in Da Nang | Nhat Studio",
    description: "3.5x5 ID photos in Da Nang — white or blue background, same-day service.",
  },
  "3.6x4.7": {
    title: "3.6x4.7 ID Photos in Da Nang | Nhat Studio",
    description: "Precise 3.6x4.7 ID photo service at Nhat Studio in Hai Chau, Da Nang.",
  },
  "4x6": {
    title: "4x6 Photos in Da Nang | Nhat Studio",
    description: "4x6 prints for forms and paperwork in Da Nang. Sharp prints, fast turnaround.",
  },
  "5x5": {
    title: "5x5 ID Photos in Da Nang | Nhat Studio",
    description: "Square 5x5 ID photos in Da Nang with natural lighting and same-day pickup.",
  },
  "5x7": {
    title: "5x7 Photos in Da Nang | Nhat Studio",
    description: "5x7 prints at Nhat Studio, Da Nang — for keepsakes or specific document needs.",
  },
};

export function getPhotoSizeMeta(lang: ValidLocale, type: string): SizeCopy {
  const table = lang === "vi" ? sizeMetaVi : sizeMetaEn;
  return (
    table[type as PhotoTypeId] ?? {
      title:
        lang === "vi"
          ? `Chụp ảnh thẻ ${type} Đà Nẵng | Nhật Studio`
          : `${type} ID Photos in Da Nang | Nhat Studio`,
      description:
        lang === "vi"
          ? `Chụp ảnh thẻ ${type} đúng chuẩn tại Nhật Studio Đà Nẵng.`
          : `Professional ${type} ID photos at Nhat Studio in Da Nang.`,
    }
  );
}

export const idPhotoFaqs = {
  vi: [
    {
      question: "Chụp ảnh thẻ ở Nhật Studio mất bao lâu?",
      answer: "Thường 5–10 phút từ lúc chụp đến khi nhận ảnh in hoặc file. Cuối tuần có thể đông hơn một chút.",
    },
    {
      question: "Có chụp ảnh visa và hộ chiếu không?",
      answer:
        "Có. Mang theo yêu cầu của đại sứ quán hoặc form online để chúng tôi chọn đúng kích thước và nền.",
    },
    {
      question: "Giá ảnh thẻ khoảng bao nhiêu?",
      answer: "Ảnh thẻ lấy ngay từ khoảng 20.000đ tùy số lượng và kích thước. Gọi 0909939351 để hỏi nhanh.",
    },
    {
      question: "Studio ở đâu tại Đà Nẵng?",
      answer: "254/9 Hoàng Diệu, Hải Châu, Đà Nẵng. Mở cửa T2–T7 8:00–19:00, CN 8:00–17:00.",
    },
  ],
  en: [
    {
      question: "How long do ID photos take at Nhat Studio?",
      answer: "Usually 5–10 minutes from shoot to print or file. Weekends can be a bit busier.",
    },
    {
      question: "Do you shoot visa and passport photos?",
      answer: "Yes. Bring the embassy or online form requirements so we match size and background correctly.",
    },
    {
      question: "How much do ID photos cost?",
      answer: "Same-day ID photos start around 20,000 VND depending on quantity and size. Call 0909939351.",
    },
    {
      question: "Where is the studio in Da Nang?",
      answer: "254/9 Hoang Dieu, Hai Chau, Da Nang. Open Mon–Sat 8:00–19:00, Sun 8:00–17:00.",
    },
  ],
} as const;
