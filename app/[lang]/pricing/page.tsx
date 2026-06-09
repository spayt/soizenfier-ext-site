import type { Metadata } from "next";
import PricingPageClient from "@/components/PricingPageClient";
import { defaultLocale, getDictionary, isLocale, locales } from "@/lib/i18n";

type PricingPageProps = {
  params: Promise<{ lang: string }>;
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: langParam } = await params;
  const isFr = isLocale(langParam) && langParam === "fr";

  return isFr
    ? {
        title: "Tarifs Conception Web & Plans de Maintenance",
        description:
          "Tarifs transparents pour la création de sites web à partir de 500 $ CAD. Plans de maintenance mensuelle à partir de 99 $/mois. Aucun frais caché.",
        openGraph: {
          title: "Tarifs Web — SoiZenFier Technologies",
          description:
            "Forfaits de conception web et plans de maintenance mensuelle pour les PME. Tarifs clairs, sans surprises.",
          type: "website",
          locale: "fr_CA",
        },
      }
    : {
        title: "Web Design Pricing & Monthly Maintenance Plans",
        description:
          "Transparent website pricing starting at $500 CAD. Monthly maintenance plans from $99/month. Clear packages with no hidden fees for small businesses.",
        openGraph: {
          title: "Website Pricing — SoiZenFier Technologies",
          description:
            "Website design packages from $500 CAD. Monthly maintenance and hosting plans from $99/month. No hidden fees.",
          type: "website",
          locale: "en_CA",
        },
      };
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return <PricingPageClient locale={lang} dictionary={dictionary} />;
}
