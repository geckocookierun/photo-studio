import Footer from "@/components/footer";
import Header from "@/components/header";
import { getRequestLocale } from "@/lib/i18n/locale";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const lang = await getRequestLocale();

  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
    </div>
  );
}
