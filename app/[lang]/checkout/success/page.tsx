import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localePath,
  locales,
  translate,
} from "@/lib/i18n";

type CheckoutSuccessPageProps = {
  params: Promise<{ lang: string }>;
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function CheckoutSuccessPage({
  params,
}: CheckoutSuccessPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <h1 className="text-4xl font-extrabold mb-4">
            {translate(dictionary, "checkoutPage.successTitle")}
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {translate(dictionary, "checkoutPage.successMessage")}
          </p>
          <Button asChild>
            <Link href={localePath(lang, "/pricing")}>
              {translate(dictionary, "checkoutPage.backToPricing")}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
