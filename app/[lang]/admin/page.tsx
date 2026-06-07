import { defaultLocale, getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import AdminPageClient from "@/components/AdminPageClient";

type AdminPageProps = {
  params: {
    lang: string;
  };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function AdminPage({ params }: AdminPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return <AdminPageClient dictionary={dictionary} locale={lang as Locale} />;
}
