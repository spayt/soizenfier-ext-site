import PricingPageClient from "@/components/PricingPageClient";
import { defaultLocale, getDictionary, isLocale, locales } from "@/lib/i18n";

type PricingPageProps = {
  params: Promise<{ lang: string }>;
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function PricingPage({ params }: PricingPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return <PricingPageClient locale={lang} dictionary={dictionary} />;
}
