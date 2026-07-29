import { redirect } from "next/navigation";
import { ValidLocale } from "@/lib/i18n/config";

export default function PhotoServiceDefault({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  redirect(lang === "vi" ? "/anh-the-ho-chieu/3x4" : "/id-passport-photos/3x4");
}
