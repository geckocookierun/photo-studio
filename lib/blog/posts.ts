import type { ValidLocale } from "@/lib/i18n/config";

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
};

export type BlogLink = {
  href: string;
  label: string;
};

export type BlogLocaleContent = {
  title: string;
  description: string;
  intro?: string;
  sections: BlogSection[];
  closing?: string;
  /** Internal links shown under the article */
  related?: BlogLink[];
};

export type BlogPost = {
  slugs: { vi: string; en: string };
  content: Record<ValidLocale, BlogLocaleContent>;
};

export const blogPosts: BlogPost[] = [
  {
    slugs: { vi: "chup-anh-the-gia-re", en: "affordable-id-photos-da-nang" },
    content: {
      vi: {
        title: "Chụp ảnh thẻ giá rẻ tại Đà Nẵng — lấy ngay trong ngày",
        description:
          "Gợi ý chọn studio chụp ảnh thẻ giá hợp lý ở Đà Nẵng mà vẫn đúng kích thước, nền và bản in rõ — lấy ngay tại Nhật Studio Hoàng Diệu.",
        intro:
          "Nhiều người cần ảnh thẻ gấp cho hồ sơ, thẻ sinh viên hay nộp online. Giá rẻ vẫn ổn nếu studio làm đúng kích thước và in rõ — đừng đổi chất lượng lấy vài nghìn đồng.",
        sections: [
          {
            heading: "Giá rẻ nhưng vẫn cần đúng chuẩn",
            paragraphs: [
              "Ảnh thẻ dùng cho giấy tờ nên nền, kích thước và độ nét quan trọng hơn filter đẹp. Ở Nhật Studio chúng tôi vẫn chỉnh sáng nhẹ, giữ khuôn mặt tự nhiên để cán bộ đối chiếu được.",
            ],
            list: [
              "Kích thước phổ biến: 3x4, 4x6, 5x5",
              "Nền trắng hoặc xanh theo yêu cầu giấy tờ",
              "In rõ, không lem mực",
            ],
          },
          {
            heading: "Bao lâu thì có ảnh?",
            paragraphs: [
              "Thường chỉ mất khoảng 5–10 phút từ lúc chụp đến lúc nhận ảnh in hoặc file. Nếu bạn đang gần Hoàng Diệu (Hải Châu), ghé luôn cho nhanh; cuối tuần đông hơn một chút.",
            ],
          },
          {
            heading: "Khi nào nên ưu tiên studio gần nhà?",
            paragraphs: [
              "Nếu chỉ cần vài tấm 3x4 cho việc học hoặc xin việc, chọn chỗ gần để đỡ chờ. Còn ảnh visa/hộ chiếu thì hỏi rõ yêu cầu nước đó trước — mỗi nơi hơi khác nhau về kích thước và nền.",
            ],
          },
        ],
        closing:
          "Cần ảnh thẻ gấp ở Đà Nẵng? Gọi 0909939351 hoặc ghé 254/9 Hoàng Diệu để chụp lấy ngay.",
      },
      en: {
        title: "Affordable ID photos in Da Nang — same-day pickup",
        description:
          "How to get affordable ID photos in Da Nang with correct size, clean background, and sharp prints — same-day at Nhat Studio, Hoang Dieu.",
        intro:
          "Plenty of people need ID photos for paperwork, student cards, or online forms. Cheap is fine — as long as the size, background, and print quality are correct.",
        sections: [
          {
            heading: "Low price, still regulation-ready",
            paragraphs: [
              "ID photos are for official use, so size and clarity matter more than heavy filters. At Nhat Studio we keep light retouching natural so the face still matches in person.",
            ],
            list: [
              "Common sizes: 3x4, 4x6, 5x5",
              "White or blue background as required",
              "Sharp prints that don’t smear",
            ],
          },
          {
            heading: "How long does it take?",
            paragraphs: [
              "Most visits wrap up in about 5–10 minutes, print or digital file included. We’re near Hoang Dieu in Hai Chau — weekends run a bit busier.",
            ],
          },
          {
            heading: "When a nearby studio is enough",
            paragraphs: [
              "For a few 3x4 prints for school or job apps, a quick local stop is perfect. For visa or passport photos, check that country’s rules first — size and background can differ.",
            ],
          },
        ],
        closing:
          "Need ID photos today in Da Nang? Call 0909939351 or visit 254/9 Hoang Dieu.",
      },
    },
  },
  {
    slugs: { vi: "chup-anh-the-lay-ngay", en: "same-day-id-photos-da-nang" },
    content: {
      vi: {
        title: `Ảnh thẻ lấy ngay Đà Nẵng ${new Date().getFullYear()}`,
        description:
          "Hướng dẫn chụp ảnh thẻ lấy ngay tại Đà Nẵng: nên mặc gì, mất bao lâu, khi nào nên đặt trước và mẹo để khỏi chụp lại.",
        intro:
          "Ảnh thẻ lấy ngay hợp với người bận hoặc đang nộp hồ sơ cận hạn. Dưới đây là những gì bạn nên biết trước khi tới studio.",
        sections: [
          {
            heading: "Quy trình thực tế khi tới chụp",
            ordered: true,
            list: [
              "Nói rõ loại ảnh cần (3x4, visa, hộ chiếu…)",
              "Chụp vài kiểu, chọn tấm ưng ý",
              "Chỉnh sáng nhẹ nếu cần",
              "In hoặc gửi file trong vài phút",
            ],
          },
          {
            heading: "Mặc gì cho đỡ phải chụp lại",
            paragraphs: [
              "Áo cổ tròn hoặc sơ mi tối giản thường ổn. Tránh họa tiết lớn và kính tối màu. Tóc nên gọn, không che mắt — nhiều giấy tờ yêu cầu nhìn rõ hai tai hoặc toàn khuôn mặt.",
            ],
          },
          {
            heading: "Có cần đặt lịch không?",
            paragraphs: [
              "Ngày thường thường tới là chụp được. Nếu đi nhóm hoặc cần nhiều kích thước khác nhau, nhắn trước giúp chúng tôi chuẩn bị giấy in cho nhanh.",
            ],
          },
        ],
        closing:
          "Muốn lấy ảnh trong buổi sáng? Inbox hoặc gọi 0909939351 — Nhật Studio, Đà Nẵng.",
      },
      en: {
        title: `Same-day ID photos in Da Nang ${new Date().getFullYear()}`,
        description:
          "Same-day ID photos in Da Nang: how long it takes, what to wear, when to book ahead, and tips to avoid a reshoot at the studio.",
        intro:
          "Same-day ID photos suit busy schedules and last-minute paperwork. Here’s what helps before you walk in.",
        sections: [
          {
            heading: "What the visit usually looks like",
            ordered: true,
            list: [
              "Tell us the photo type (3x4, visa, passport…)",
              "Take a few frames and pick one",
              "Light retouching if needed",
              "Print or send the file within minutes",
            ],
          },
          {
            heading: "What to wear so you don’t reshoot",
            paragraphs: [
              "Simple crew necks or shirts work well. Skip loud patterns and dark-tinted glasses. Keep hair off the eyes — many forms need a clear view of the face.",
            ],
          },
          {
            heading: "Do you need an appointment?",
            paragraphs: [
              "Weekdays are usually walk-in friendly. For groups or several different sizes, message ahead so we can prep paper stock.",
            ],
          },
        ],
        closing:
          "Need photos this morning? Call 0909939351 — Nhat Studio, Da Nang.",
      },
    },
  },
  {
    slugs: { vi: "chup-anh-the-visa-ho-chieu", en: "visa-passport-photos-tips" },
    content: {
      vi: {
        title: "Ảnh thẻ visa & hộ chiếu tại Đà Nẵng cần chú ý gì?",
        description:
          "Phân biệt ảnh 3x4, ảnh visa và ảnh hộ chiếu tại Đà Nẵng — kích thước, nền và lỗi hay khiến hồ sơ bị trả lại. Tư vấn tại Nhật Studio.",
        intro:
          "Ảnh visa/hộ chiếu dễ bị sai hơn ảnh thẻ nội địa vì mỗi nước có quy định riêng. Đừng mặc định mang ảnh 3x4 cũ đi nộp.",
        sections: [
          {
            heading: "Ảnh thường và ảnh xuất cảnh khác nhau chỗ nào?",
            list: [
              "3x4: hồ sơ, lý lịch, nhiều giấy tờ trong nước",
              "Visa: kích thước tùy nước (hay gặp 3.5x4.5)",
              "Hộ chiếu: nền trắng, khuôn mặt chiếm phần lớn khung hình",
            ],
          },
          {
            heading: "Những lỗi hay làm hồ sơ bị trả",
            paragraphs: [
              "Nền không đều, mặt nghiêng quá, chỉnh da trắng đến mức đổi đặc điểm, hoặc in bị vàng. Studio nên giữ ánh sáng trung tính và không “làm đẹp” quá tay.",
            ],
          },
          {
            heading: "Nên mang theo gì khi tới chụp",
            paragraphs: [
              "Nếu có hướng dẫn từ đại sứ quán hoặc form online, chụp màn hình hoặc gửi link cho studio. Việc này giúp chọn đúng kích thước ngay lần đầu.",
            ],
          },
        ],
        closing:
          "Cần ảnh visa/hộ chiếu đúng chuẩn ở Đà Nẵng? Ghé Nhật Studio — 254/9 Hoàng Diệu, hotline 0909939351.",
      },
      en: {
        title: "Visa & passport photos in Da Nang: what to check",
        description:
          "Visa and passport photos vs regular ID prints in Da Nang: size, background, and common mistakes that delay applications. Tips from Nhat Studio.",
        intro:
          "Visa and passport photos get rejected more often than regular local ID photos because rules vary by country. Don’t assume an old 3x4 print is enough.",
        sections: [
          {
            heading: "Regular ID vs travel photos",
            list: [
              "3x4: common for local forms and CVs",
              "Visa: size depends on the country (3.5x4.5 is common)",
              "Passport: white background, face filling most of the frame",
            ],
          },
          {
            heading: "Mistakes that delay applications",
            paragraphs: [
              "Uneven backgrounds, a tilted head, heavy whitening that changes features, or yellowed prints. A good studio keeps neutral light and light retouching only.",
            ],
          },
          {
            heading: "What to bring",
            paragraphs: [
              "If the embassy or online form lists photo rules, screenshot them or send the link. That way we hit the right size on the first try.",
            ],
          },
        ],
        closing:
          "Need compliant visa/passport photos in Da Nang? Visit Nhat Studio — 254/9 Hoang Dieu, 0909939351.",
      },
    },
  },
  {
    slugs: { vi: "mac-gi-khi-chup-anh-the", en: "what-to-wear-for-id-photos" },
    content: {
      vi: {
        title: "Mặc gì khi chụp ảnh thẻ để nhìn tự nhiên và đúng quy định",
        description:
          "Mặc gì khi chụp ảnh thẻ ở Đà Nẵng: gợi ý áo, tóc, kính và phụ kiện để khuôn mặt rõ, đúng quy định và ít phải chụp lại.",
        intro:
          "Ảnh thẻ không cần “diện” cầu kỳ. Mục tiêu là khuôn mặt rõ, trang phục không gây nhiễu, và đúng yêu cầu giấy tờ bạn đang nộp.",
        sections: [
          {
            heading: "Màu áo nên chọn",
            paragraphs: [
              "Với nền trắng, áo màu trung tính hoặc tối vừa thường ổn. Với nền xanh, tránh áo xanh sát màu nền kẻo vai bị “mất” khi cắt.",
            ],
            list: [
              "Ưu tiên: đen, navy, xám, be",
              "Hạn chế: họa tiết lớn, chữ to trước ngực",
              "Áo có cổ giúp đường vai gọn hơn trên ảnh",
            ],
          },
          {
            heading: "Kính, trang sức, tóc",
            paragraphs: [
              "Kính trong suốt thường được chấp nhận nếu không lóa. Bỏ kính râm. Khuyên tai nhỏ ổn; tránh phụ kiện che mặt. Tóc mái dài nên kéo gọn để lộ mắt.",
            ],
          },
          {
            heading: "Makeup và chỉnh sửa",
            paragraphs: [
              "Makeup nhẹ giúp da đều dưới đèn studio. Đừng yêu cầu làm trắng da quá mức — ảnh giấy tờ cần nhận diện được bạn ngoài đời.",
            ],
          },
        ],
        closing:
          "Không chắc nên mặc gì? Nhắn ảnh outfit cho Nhật Studio trước khi tới — chúng tôi góp ý nhanh.",
      },
      en: {
        title: "What to wear for an ID photo (simple rules that work)",
        description:
          "What to wear for ID photos in Da Nang: clothing, hair, glasses, and accessories that keep your face clear and reduce reshoots at the studio.",
        intro:
          "ID photos don’t need a fancy outfit. You want a clear face, quiet clothing, and whatever the form actually asks for.",
        sections: [
          {
            heading: "Shirt colors that behave",
            paragraphs: [
              "On a white background, mid or darker neutrals usually look clean. On a blue background, skip blue shirts that blend into the backdrop.",
            ],
            list: [
              "Safe picks: black, navy, gray, beige",
              "Skip: big patterns and large chest logos",
              "A collar often frames the shoulders better",
            ],
          },
          {
            heading: "Glasses, jewelry, hair",
            paragraphs: [
              "Clear glasses are usually fine if there’s no glare. Leave sunglasses at home. Small earrings are okay; nothing that covers the face. Pull bangs back so both eyes show.",
            ],
          },
          {
            heading: "Makeup and retouching",
            paragraphs: [
              "Light makeup helps under studio lights. Don’t ask for heavy whitening — official photos still need to look like you.",
            ],
          },
        ],
        closing:
          "Unsure about an outfit? Send Nhat Studio a quick photo before you visit and we’ll advise.",
      },
    },
  },
  {
    slugs: { vi: "kich-thuoc-anh-the-pho-bien", en: "common-id-photo-sizes" },
    content: {
      vi: {
        title: "Các kích thước ảnh thẻ phổ biến ở Việt Nam (và dùng khi nào)",
        description:
          "Giải thích kích thước ảnh thẻ phổ biến ở Việt Nam: 3x4, 4x6, 3.5x4.5, 5x5, 5x7 — dùng khi nào cho hồ sơ, visa hay in lưu. Nhật Studio Đà Nẵng.",
        intro:
          "Nhiều người tới studio chỉ nói “chụp ảnh thẻ” mà chưa rõ kích thước. Hỏi đúng loại giấy tờ sẽ đỡ mất thời gian và tiền in thừa.",
        sections: [
          {
            heading: "Các size hay gặp",
            list: [
              "3x4 cm: hồ sơ, lý lịch, nhiều thủ tục hành chính",
              "4x6 cm: một số đơn xin việc / giấy tờ yêu cầu ảnh lớn hơn",
              "3.5x4.5 cm: thường gặp với một số visa",
              "5x5 cm: một số giấy tờ hoặc ảnh thẻ vuông",
              "5x7 cm: ít dùng cho hồ sơ, đôi khi in để giữ",
            ],
          },
          {
            heading: "Nên chụp một lần lấy nhiều size?",
            paragraphs: [
              "Được. Cùng một file gốc có thể crop và in nhiều kích thước. Nên nói trước bạn cần những size nào để chúng tôi chừa khoảng đầu-vai đủ rộng.",
            ],
          },
          {
            heading: "File mềm có thay ảnh in không?",
            paragraphs: [
              "Nộp online thì file JPG rõ nét là đủ. Nộp trực tiếp thường vẫn cần ảnh in theo đúng cm. Đừng phóng to ảnh mờ từ điện thoại rồi đem đi nộp.",
            ],
          },
        ],
        closing:
          "Không nhớ size trên giấy tờ? Chụp form mang tới Nhật Studio — chúng tôi đo và in đúng.",
      },
      en: {
        title: "Common ID photo sizes in Vietnam (and when to use them)",
        description:
          "Common ID photo sizes in Vietnam explained: 3x4, 4x6, 3.5x4.5, 5x5, and 5x7 — when to use each for forms, visas, and keepsake prints in Da Nang.",
        intro:
          "A lot of people just say “ID photo” without naming a size. Matching the paperwork first saves time and extra reprints.",
        sections: [
          {
            heading: "Sizes you’ll hear most",
            list: [
              "3x4 cm: local forms, CVs, many admin documents",
              "4x6 cm: some job or paperwork requests for a larger print",
              "3.5x4.5 cm: common for certain visas",
              "5x5 cm: square IDs or specific forms",
              "5x7 cm: rarely for forms; sometimes kept as a print",
            ],
          },
          {
            heading: "Can one shoot cover several sizes?",
            paragraphs: [
              "Yes. One good capture can be cropped and printed in multiple sizes. Tell us what you need so we leave enough headroom.",
            ],
          },
          {
            heading: "Digital file vs printed photo",
            paragraphs: [
              "Online forms usually want a sharp JPG. In-person submission often still needs a print in exact centimeters. Don’t enlarge a soft phone crop and submit that.",
            ],
          },
        ],
        closing:
          "Forgot the size on the form? Bring it to Nhat Studio — we’ll measure and print correctly.",
      },
    },
  },
  {
    slugs: { vi: "nen-trang-hay-nen-xanh-anh-the", en: "white-or-blue-id-background" },
    content: {
      vi: {
        title: "Ảnh thẻ nền trắng hay nền xanh? Chọn thế nào cho đúng",
        description:
          "Ảnh thẻ nền trắng hay xanh ở Đà Nẵng? Khi nào chọn đúng màu theo giấy tờ và những lỗi nền dễ khiến ảnh bị từ chối khi nộp hồ sơ.",
        intro:
          "Hai màu nền phổ biến nhất là trắng và xanh. Không có màu nào “đẹp hơn” cho mọi giấy tờ — chỉ có màu đúng yêu cầu.",
        sections: [
          {
            heading: "Nền trắng thường dùng khi nào",
            paragraphs: [
              "Hộ chiếu, nhiều loại visa và một số giấy tờ hành chính yêu cầu nền trắng sạch, không đổ bóng nặng. Áo đừng quá sát màu trắng kẻo vai bị lẫn.",
            ],
          },
          {
            heading: "Nền xanh hợp với loại giấy tờ nào",
            paragraphs: [
              "Một số thẻ sinh viên, hồ sơ xin việc hoặc yêu cầu nội bộ vẫn dùng nền xanh. Xanh giúp tách tóc tối và da sáng rõ hơn trên bản in nhỏ.",
            ],
          },
          {
            heading: "Lỗi nền hay gặp",
            list: [
              "Nền loang hoặc có bóng mạnh sau vai",
              "Cắt ghép nền lệch màu quanh tóc",
              "Chỉnh màu hậu kỳ làm da và nền không khớp ánh sáng",
            ],
          },
        ],
        closing:
          "Không chắc giấy tờ cần nền gì? Hỏi chỗ nộp hồ sơ trước, hoặc mang mẫu tới studio để làm đúng một lần.",
      },
      en: {
        title: "White or blue background for ID photos?",
        description:
          "White or blue ID photo background in Da Nang? Learn which color forms usually need and the background mistakes that get photos rejected.",
        intro:
          "White and blue are the usual backdrops. Neither is “better” for every form — only the one your paperwork asks for.",
        sections: [
          {
            heading: "When white is the safe default",
            paragraphs: [
              "Passports, many visas, and some admin forms want a clean white background without heavy shoulder shadows. Avoid a shirt that’s almost the same white.",
            ],
          },
          {
            heading: "When blue still shows up",
            paragraphs: [
              "Some student IDs, job packets, or internal forms still use blue. Blue can separate dark hair cleanly on a small print.",
            ],
          },
          {
            heading: "Background mistakes to avoid",
            list: [
              "Uneven backdrop or strong shadows behind the shoulders",
              "Harsh cutouts around the hairline",
              "Heavy color grading that makes skin and backdrop look mismatched",
            ],
          },
        ],
        closing:
          "Not sure which background you need? Check the form first, or bring a sample to the studio.",
      },
    },
  },
  {
    slugs: { vi: "chup-anh-the-tre-em", en: "kids-id-photos" },
    content: {
      vi: {
        title: "Chụp ảnh thẻ cho trẻ em: mẹo để xong nhanh, ít khóc",
        description:
          "Mẹo chụp ảnh thẻ trẻ em tại Đà Nẵng: chọn giờ, phụ huynh hỗ trợ ra sao, yêu cầu chung về nền và khuôn mặt để buổi chụp nhanh, ít khóc.",
        intro:
          "Ảnh thẻ trẻ em khó hơn ảnh người lớn vì các bé khó ngồi yên. Chuẩn bị một chút ở nhà sẽ giúp buổi chụp ngắn và dễ chịu hơn.",
        sections: [
          {
            heading: "Nên tới lúc nào?",
            paragraphs: [
              "Tránh giờ bé buồn ngủ hoặc đói. Buổi sáng sau khi ăn nhẹ thường dễ hơn. Nếu bé đang bệnh hoặc cáu, nên dời lịch — ảnh giấy tờ cần mắt mở rõ.",
            ],
          },
          {
            heading: "Phụ huynh có thể giúp gì",
            list: [
              "Đứng ngoài khung hình, gọi tên để bé nhìn đúng hướng",
              "Mang theo món đồ chơi nhỏ để giữ chú ý vài giây",
              "Không ép cười quá mức — biểu cảm trung tính vẫn đạt",
            ],
          },
          {
            heading: "Lưu ý về quy định",
            paragraphs: [
              "Một số giấy tờ không cho người lớn xuất hiện trong ảnh, kể cả tay đỡ phía sau. Hãy nói rõ loại giấy tờ để studio canh khung đúng.",
            ],
          },
        ],
        closing:
          "Cần ảnh thẻ cho bé ở Đà Nẵng? Nhắn tuổi bé cho Nhật Studio để chúng tôi sắp lịch vắng hơn nếu cần.",
      },
      en: {
        title: "Kids’ ID photos: how to finish fast with fewer tears",
        description:
          "Kids’ ID photos in Da Nang: best time of day, how parents can help, common size/background rules, and tips for a calmer same-day studio visit.",
        intro:
          "Kids’ ID photos take more patience than adult ones. A little prep at home usually means a shorter, calmer studio visit.",
        sections: [
          {
            heading: "Best time to come",
            paragraphs: [
              "Avoid nap time and hunger. Mid-morning after a snack often works. If your child is sick or already upset, reschedule — official photos need open, clear eyes.",
            ],
          },
          {
            heading: "How parents can help",
            list: [
              "Stand just outside the frame and call their name for eye line",
              "Bring a small toy to hold attention for a few seconds",
              "Don’t force a big smile — a calm expression is fine",
            ],
          },
          {
            heading: "Rule reminders",
            paragraphs: [
              "Some documents forbid an adult in the frame, even a supporting hand. Tell us the document type so we frame correctly.",
            ],
          },
        ],
        closing:
          "Need a child’s ID photo in Da Nang? Tell Nhat Studio the age and we can suggest a quieter slot.",
      },
    },
  },
  {
    slugs: { vi: "chup-anh-ho-so-xin-viec", en: "job-profile-vs-id-photos" },
    content: {
      vi: {
        title: "Ảnh hồ sơ xin việc: khác ảnh thẻ giấy tờ chỗ nào?",
        description:
          "Ảnh hồ sơ xin việc khác ảnh thẻ giấy tờ thế nào? Gợi ý trang phục, ánh sáng và khi nên chụp studio thay selfie để ấn tượng chuyên nghiệp hơn.",
        intro:
          "Ảnh hồ sơ không cứng như ảnh hộ chiếu, nhưng cũng không phải ảnh sống ảo. Nhà tuyển dụng cần thấy bạn chuyên nghiệp và dễ nhận ra.",
        sections: [
          {
            heading: "Khác ảnh thẻ hành chính",
            paragraphs: [
              "Ảnh giấy tờ thường yêu cầu nền cố định và ít biểu cảm. Ảnh hồ sơ xin việc có thể mềm hơn một chút: cười nhẹ, áo vest hoặc sơ mi, vẫn giữ nền sạch.",
            ],
          },
          {
            heading: "Nên tránh gì",
            list: [
              "Selfie góc từ dưới lên, ánh sáng vàng mạnh",
              "Crop quá sát làm mất vai",
              "Filter đổi tông da rõ rệt",
            ],
          },
          {
            heading: "Khi nào nên ra studio",
            paragraphs: [
              "Nếu bạn nộp CV cho vị trí văn phòng, khách sạn, giáo dục hoặc làm việc với khách nước ngoài, một buổi chụp ngắn ở studio thường đáng hơn tự chụp tại nhà.",
            ],
          },
        ],
        closing:
          "Nhật Studio có gói ảnh hồ sơ chuyên nghiệp tại Đà Nẵng — hỏi nhanh qua 0909939351.",
        related: [
          { href: "/anh-ho-so-chuyen-nghiep", label: "Ảnh hồ sơ chuyên nghiệp" },
          { href: "/anh-the-ho-chieu", label: "Ảnh thẻ giấy tờ" },
          { href: "/blog/mac-gi-khi-chup-anh-the", label: "Mặc gì khi chụp" },
        ],
      },
      en: {
        title: "Job profile photos vs official ID photos",
        description:
          "Job profile photos vs official ID photos: clothing, lighting, and when a Da Nang studio headshot beats a selfie for applications and LinkedIn.",
        intro:
          "A profile photo isn’t as strict as a passport shot, but it’s not a social selfie either. Hiring teams want you to look professional and recognizable.",
        sections: [
          {
            heading: "How it differs from admin ID photos",
            paragraphs: [
              "Official ID photos usually lock the background and expression. Job profile photos can be a bit warmer: a slight smile, shirt or blazer, still on a clean backdrop.",
            ],
          },
          {
            heading: "What to skip",
            list: [
              "Low-angle selfies with heavy yellow light",
              "Ultra-tight crops that remove the shoulders",
              "Filters that clearly change your skin tone",
            ],
          },
          {
            heading: "When a studio is worth it",
            paragraphs: [
              "For office, hospitality, education, or client-facing roles, a short studio session usually beats a living-room selfie — especially if you work with international teams.",
            ],
          },
        ],
        closing:
          "Nhat Studio offers professional profile sessions in Da Nang — ask via 0909939351.",
        related: [
          { href: "/professional-profile-photos", label: "Professional profile photos" },
          { href: "/id-passport-photos", label: "ID / passport photos" },
          { href: "/blog/what-to-wear-for-id-photos", label: "What to wear" },
        ],
      },
    },
  },
  {
    slugs: { vi: "gia-chup-anh-the-da-nang", en: "id-photo-prices-da-nang" },
    content: {
      vi: {
        title: "Giá chụp ảnh thẻ Đà Nẵng khoảng bao nhiêu?",
        description:
          "Giá chụp ảnh thẻ ở Đà Nẵng phụ thuộc size, số bản in và chỉnh sửa. Gợi ý thực tế trước khi tới studio — Nhật Studio Hoàng Diệu.",
        intro:
          "Hay bị hỏi nhất là “bao nhiêu một tấm?”. Trả lời ngắn thì được, nhưng giá ảnh thẻ thường đi theo gói: size nào, in mấy bản, có cần file không. Dưới đây là cách mình hay giải thích cho khách mới tới.",
        sections: [
          {
            heading: "Sao không có một con số cố định?",
            paragraphs: [
              "Vì khách ít khi chỉ lấy đúng một kích thước. Có người cần 3x4 hồ sơ, thêm vài 4x6, có người lại cần visa nền khác. In thêm cũng tính riêng. Nên hỏi trước size trên giấy tờ sẽ báo đúng hơn là đoán lung tung.",
            ],
          },
          {
            heading: "Những thứ hay làm lệch giá",
            list: [
              "In nhiều bản / nhiều size trong một lần",
              "Cần file mềm gửi mail hoặc Zalo",
              "Ảnh trẻ em (thường mất thời gian hơn một chút)",
              "Cuối tuần đông, đôi khi phải chờ — không tăng giá vì chờ, chỉ lâu hơn",
            ],
          },
          {
            heading: "Mẹo đỡ tốn tiền oan",
            paragraphs: [
              "Mang sẵn form hoặc ảnh mẫu size nếu có. Đừng chụp “tạm” rồi về nhà mới phát hiện sai kích thước — in lại mất công hơn hỏi kỹ lúc đầu. Ở studio mình vẫn hay đo giúp nếu bạn mang giấy tờ theo.",
            ],
          },
        ],
        closing:
          "Muốn hỏi giá nhanh theo đúng loại ảnh bạn cần? Gọi/Zalo 0909939351 hoặc ghé 254/9 Hoàng Diệu — báo size là mình báo gói luôn.",
        related: [
          { href: "/anh-the-ho-chieu", label: "Chụp ảnh thẻ Đà Nẵng" },
          { href: "/anh-the-ho-chieu/3x4", label: "Ảnh 3x4" },
          { href: "/blog/kich-thuoc-anh-the-pho-bien", label: "Các size phổ biến" },
          { href: "/blog/chup-anh-the-lay-ngay", label: "Ảnh lấy ngay" },
        ],
      },
      en: {
        title: "How much do ID photos cost in Da Nang?",
        description:
          "ID photo prices in Da Nang depend on size, prints, and files. Practical notes before you visit — Nhat Studio on Hoang Dieu.",
        intro:
          "People ask “how much for one photo?” all the time. There’s a short answer, but ID pricing usually follows a package: which size, how many prints, soft file or not. Here’s how we explain it when someone walks in.",
        sections: [
          {
            heading: "Why there isn’t one fixed number",
            paragraphs: [
              "Because most people don’t need just one size. Some want 3x4 for paperwork plus a few 4x6 prints; others need a visa background. Extra prints are separate. Tell us the size on your form and we can quote properly instead of guessing.",
            ],
          },
          {
            heading: "What usually changes the price",
            list: [
              "Multiple sizes or many print copies",
              "Soft file by email or chat",
              "Kids’ photos (often a bit more patience/time)",
              "Busy weekends mean waiting — we don’t charge extra for the wait, it just takes longer",
            ],
          },
          {
            heading: "How not to waste money",
            paragraphs: [
              "Bring the form or a sample size if you have one. Don’t shoot “temporary” photos and discover the wrong size at home — reprinting costs more than asking first. We’ll measure from your paperwork if you bring it.",
            ],
          },
        ],
        closing:
          "Want a quick quote for your exact size? Call/Zalo 0909939351 or visit 254/9 Hoang Dieu — tell us the size and we’ll price the package.",
        related: [
          { href: "/id-passport-photos", label: "ID photos in Da Nang" },
          { href: "/id-passport-photos/3x4", label: "3x4 photos" },
          { href: "/blog/common-id-photo-sizes", label: "Common sizes" },
          { href: "/blog/same-day-id-photos-da-nang", label: "Same-day photos" },
        ],
      },
    },
  },
  {
    slugs: { vi: "nhat-studio-hoang-dieu-da-nang", en: "nhat-studio-hoang-dieu-da-nang" },
    content: {
      vi: {
        title: "Tìm Nhật Studio trên Hoàng Diệu, Đà Nẵng thế nào cho nhanh?",
        description:
          "Địa chỉ 254/9 Hoàng Diệu (Hải Châu): đường đi, gửi xe, và mẹo tới chụp ảnh thẻ khỏi vòng vèo — Nhật Studio Đà Nẵng.",
        intro:
          "Số nhà có đường nhánh nên nhiều khách gọi hỏi “đứng đâu mới thấy?”. Viết lại cho rõ, kẻo chạy ngang Hoàng Diệu rồi lướt mất cửa.",
        sections: [
          {
            heading: "Địa chỉ cụ thể",
            paragraphs: [
              "Nhật Studio ở 254/9 Hoàng Diệu, Hải Châu, Đà Nẵng. Là hẻm/nhánh nhỏ trong khu Hoàng Diệu — không phải mặt tiền lớn kiểu biển hiệu nhảy ra giữa đường. Nếu lần đầu, nên mở map hoặc gọi trước 0909939351 để mình chỉ đúng đoạn.",
            ],
          },
          {
            heading: "Tới bằng xe máy / ô tô",
            paragraphs: [
              "Xe máy gửi gần đó khá tiện. Ô tô thì tùy giờ; cuối tuần khu vực đông hơn, nên chừa thêm vài phút tìm chỗ. Không cần đến sớm cả tiếng — ảnh thẻ thường nhanh, chỉ đừng kẹt giờ đóng cửa.",
            ],
          },
          {
            heading: "Nên mang gì cho đỡ phải đi lại",
            list: [
              "Giấy tờ hoặc form ghi size (nếu có)",
              "Áo dự phòng nếu sợ nhăn / không đúng kiểu",
              "Số điện thoại để nhận file nếu cần",
            ],
          },
        ],
        closing:
          "Lạc đường cứ gọi thẳng 0909939351. Đang trên Hoàng Diệu thì nói mình đang gần đâu, chỉ một phát là vào được.",
        related: [
          { href: "/anh-the-ho-chieu", label: "Chụp ảnh thẻ" },
          { href: "/#lien-he", label: "Liên hệ / bản đồ" },
          { href: "/blog/chup-anh-the-lay-ngay", label: "Lấy ngay trong ngày" },
          { href: "/phuc-hoi-anh-cu", label: "Phục hồi ảnh cũ" },
        ],
      },
      en: {
        title: "How to find Nhat Studio on Hoang Dieu, Da Nang",
        description:
          "Finding 254/9 Hoang Dieu (Hai Chau): directions, parking notes, and what to bring for a quick ID photo visit.",
        intro:
          "The address sits on a small branch off Hoang Dieu, so people often call asking where to turn. Here’s the short version so you don’t drive past it.",
        sections: [
          {
            heading: "Exact spot",
            paragraphs: [
              "We’re at 254/9 Hoang Dieu, Hai Chau, Da Nang — a small lane off Hoang Dieu, not a huge storefront on the main road. First time here? Open maps or call 0909939351 and we’ll point you in.",
            ],
          },
          {
            heading: "Bike / car",
            paragraphs: [
              "Motorbike parking nearby is usually easy. Cars depend on the hour; weekends get busier, so leave a few extra minutes. You don’t need to arrive an hour early — ID photos are quick — just don’t cut it against closing time.",
            ],
          },
          {
            heading: "Bring this so you don’t make a second trip",
            list: [
              "The form or paperwork with the size (if you have it)",
              "A backup shirt if you’re worried about wrinkles",
              "A phone number for soft-file delivery",
            ],
          },
        ],
        closing:
          "Lost? Call 0909939351. If you’re already on Hoang Dieu, tell us the nearest landmark and we’ll guide you in.",
        related: [
          { href: "/id-passport-photos", label: "ID photos" },
          { href: "/#contact", label: "Contact / map" },
          { href: "/blog/same-day-id-photos-da-nang", label: "Same-day visit" },
          { href: "/photo-restoration", label: "Photo restoration" },
        ],
      },
    },
  },
  {
    slugs: { vi: "anh-the-online-hay-den-studio", en: "online-id-photo-or-studio" },
    content: {
      vi: {
        title: "Cắt ảnh thẻ online hay đến studio? Nên chọn cái nào",
        description:
          "Khi nào cắt ảnh thẻ online ổn, khi nào nên đến studio Đà Nẵng để khỏi sai nền, size và bản in — góc nhìn từ Nhật Studio.",
        intro:
          "App cắt ảnh thẻ tiện thật, nhất là lúc nửa đêm cần nộp hồ sơ online. Nhưng cũng có người mang file tự cắt tới in rồi bị lệch size hoặc nền không đạt. Phân biệt giúp cho đỡ mất thời gian.",
        sections: [
          {
            heading: "Online ổn khi nào",
            paragraphs: [
              "Bạn đã có ảnh rõ, chụp đủ sáng, và chỗ nộp chỉ cần file đúng kích thước theo pixel. Tự crop cũng được nếu bạn chắc quy định. Còn in giấy tờ hành chính hay visa, đừng tin mắt thường trên điện thoại quá.",
            ],
          },
          {
            heading: "Nên tới studio khi nào",
            list: [
              "Cần in ngay trong ngày",
              "Ảnh cũ bị tối, bóng đổ, nền lởm chởm",
              "Visa / hộ chiếu — dễ bị trả hơn ảnh nội địa",
              "Chụp trẻ em (khó ngồi yên, hay phải chụp lại)",
            ],
          },
          {
            heading: "Thực tế ở studio mình",
            paragraphs: [
              "Nhiều khách tưởng mang selfie là in được luôn. Có hôm được, có hôm phải chụp lại vì nền nhà hoặc góc mặt. Tới chỗ có đèn và phông sẵn thường xong một lần. Nếu chỉ cần tư vấn size, hỏi trước cũng được, không nhất thiết chụp.",
            ],
          },
        ],
        closing:
          "Không chắc file nhà có đạt không? Mang máy tới 254/9 Hoàng Diệu — xem giúp, đạt thì in, không đạt thì chụp lại cho nhanh.",
        related: [
          { href: "/anh-the-ho-chieu", label: "Chụp ảnh thẻ tại studio" },
          { href: "/blog/chup-anh-the-visa-ho-chieu", label: "Ảnh visa & hộ chiếu" },
          { href: "/blog/nen-trang-hay-nen-xanh-anh-the", label: "Nền trắng hay xanh" },
          { href: "/anh-the-ho-chieu/3.5x4.5", label: "Size 3.5x4.5" },
        ],
      },
      en: {
        title: "Crop ID photos online or visit a studio?",
        description:
          "When an online ID-photo crop is fine, and when you should visit a Da Nang studio for background, size, and print accuracy — from Nhat Studio.",
        intro:
          "ID crop apps are handy, especially late at night before an online form. They’re also why people show up with a file that prints the wrong size or fails a background check. Here’s the practical split.",
        sections: [
          {
            heading: "Online is fine when…",
            paragraphs: [
              "You already have a sharp, well-lit photo and the office only needs a correct pixel size. Cropping yourself works if you know the rules. For hard-copy admin photos or visas, don’t trust a phone screen alone.",
            ],
          },
          {
            heading: "Come to the studio when…",
            list: [
              "You need prints the same day",
              "The old photo is dark, shadowy, or messy in the background",
              "Visa / passport — stricter than local ID cards",
              "You’re photographing a child (harder to keep still)",
            ],
          },
          {
            heading: "What we see day to day",
            paragraphs: [
              "Plenty of people think a selfie will print fine. Sometimes yes. Sometimes the home background or face angle means a reshoot. Studio light and a proper backdrop usually finish it in one go. If you only need size advice, ask first — you don’t have to shoot.",
            ],
          },
        ],
        closing:
          "Not sure your home file will pass? Bring the phone to 254/9 Hoang Dieu — we’ll check, print if it’s good, or reshoot quickly if it isn’t.",
        related: [
          { href: "/id-passport-photos", label: "Studio ID photos" },
          { href: "/blog/visa-passport-photos-tips", label: "Visa & passport tips" },
          { href: "/blog/white-or-blue-id-background", label: "White or blue background" },
          { href: "/id-passport-photos/3.5x4.5", label: "3.5x4.5 size" },
        ],
      },
    },
  },
];

export function blogSlugFor(post: BlogPost, lang: ValidLocale): string {
  return post.slugs[lang];
}

export function blogSlugsFor(lang: ValidLocale): string[] {
  return blogPosts.map((post) => post.slugs[lang]);
}

/** @deprecated Prefer blogSlugsFor(lang) — VI slugs only */
export const blogSlugs = blogPosts.map((post) => post.slugs.vi);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(
    (post) => post.slugs.vi === slug || post.slugs.en === slug
  );
}

export function getBlogIndex(lang: ValidLocale) {
  return blogPosts.map((post) => ({
    slug: post.slugs[lang],
    title: post.content[lang].title,
    description: post.content[lang].description,
  }));
}
