import PricingPageClient from "@/components/PricingPageClient";
import { defaultLocale, getDictionary, isLocale, locales } from "@/lib/i18n";

type PricingPageProps = {
  params: {
    lang: string;
  };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default function PricingPage({ params }: PricingPageProps) {
  const { lang: langParam } = params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return <PricingPageClient locale={lang} dictionary={dictionary} />;
}
