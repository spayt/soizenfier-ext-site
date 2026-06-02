import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  translate,
} from "@/lib/i18n";
import { websitePackages, monthlyPlans } from "@/lib/pricing";

type PricingPageProps = {
  params: {
    lang: string;
  };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function PricingPage({ params }: PricingPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div>
            <p className="text-sky-600 font-semibold uppercase tracking-[0.24em] mb-3">
              Pricing
            </p>
            <h1 className="text-4xl font-extrabold">
              {translate(dictionary, "pricingPage.heading")}
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl">
              {translate(dictionary, "pricingPage.description")}
            </p>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-3">
          {websitePackages.map((pkg) => {
            const pkgTranslation =
              dictionary.pricingPage.websitePackages[pkg.id];
            return (
              <div
                key={pkg.id}
                className="rounded-3xl bg-white p-8 shadow transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold">
                  {pkgTranslation?.title ?? pkg.title}
                </h3>
                <p className="mt-2 text-slate-600 font-medium">
                  {pkgTranslation?.priceRange ?? pkg.priceRange}
                </p>
                <ul className="mt-4 space-y-2 text-slate-600">
                  {(pkgTranslation?.bullets ?? pkg.bullets).map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <a
                      href={`mailto:${dictionary.mail.contact}?subject=${encodeURIComponent((pkgTranslation?.title ?? pkg.title) + " quote")}`}
                    >
                      {translate(dictionary, "pricingPage.requestQuote")}
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            {translate(dictionary, "pricingPage.plans")}
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {monthlyPlans.map((plan) => {
              const planTranslation =
                dictionary.pricingPage.monthlyPlans[plan.id];
              return (
                <div
                  key={plan.id}
                  className="rounded-3xl bg-white p-6 shadow transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                >
                  <h4 className="text-lg font-semibold">
                    {planTranslation?.title ?? plan.title}
                  </h4>
                  <p className="mt-2 text-slate-700 font-medium">
                    {planTranslation?.price ?? plan.price}
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-600">
                    {(planTranslation?.bullets ?? plan.bullets).map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button asChild>
                      <a
                        href={`mailto:${dictionary.mail.contact}?subject=${encodeURIComponent((planTranslation?.title ?? plan.title) + " plan")}`}
                      >
                        {translate(dictionary, "pricingPage.getStarted")}
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
