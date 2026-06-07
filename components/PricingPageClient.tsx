"use client";

import { Button } from "@/components/ui/button";
import PlanCheckoutButton from "@/components/PlanCheckoutButton";
import { translate, type TranslationDictionary } from "@/lib/i18n";
import { websitePackages, monthlyPlans } from "@/lib/pricing";

type PricingPageClientProps = {
  locale: string;
  dictionary: TranslationDictionary;
};

const PLAN_AMOUNTS: Record<string, number> = {
  essential: 9900,
  growth: 24900,
  premium: 49900,
  "managed-content": 79900,
};

const FEATURED_PACKAGE = "business";
const FEATURED_PLAN    = "premium";

const PKG_ICONS: Record<string, string> = {
  starter:  "🚀",
  business: "📈",
  custom:   "⚡",
};

export default function PricingPageClient({ locale, dictionary }: PricingPageClientProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-20">

        {/* ── HERO ── */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-14 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_-10%,rgba(250,204,21,0.14)_0%,transparent_65%)]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-yellow-400/5 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-1 rounded-full bg-yellow-400" />
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-yellow-400">
                {translate(dictionary, "nav.pricing")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white">
              {translate(dictionary, "pricingPage.heading")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
              {translate(dictionary, "pricingPage.description")}
            </p>
          </div>
        </section>

        {/* ── WEBSITE PACKAGES ── */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {dictionary.pricingPage.packages}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {websitePackages.map((pkg) => {
              const t = dictionary.pricingPage.websitePackages[pkg.id];
              const featured = pkg.id === FEATURED_PACKAGE;
              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                    featured
                      ? "bg-slate-950 text-white shadow-2xl shadow-slate-900/30 scale-[1.02]"
                      : "bg-white border border-slate-100 shadow-sm hover:shadow-xl"
                  }`}
                >
                  {featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-slate-900 shadow-md">
                        ★ {dictionary.pricingPage.mostPopular}
                      </span>
                    </div>
                  )}

                  <div className="text-3xl mb-5">{PKG_ICONS[pkg.id] ?? "🌐"}</div>

                  <h3 className={`text-xl font-bold mb-1 ${featured ? "text-white" : "text-slate-900"}`}>
                    {t?.title ?? pkg.title}
                  </h3>

                  <p className={`text-2xl font-black mb-6 ${featured ? "text-yellow-400" : "text-slate-900"}`}>
                    {t?.priceRange ?? pkg.priceRange}
                  </p>

                  <ul className="flex-1 space-y-3 mb-8">
                    {(t?.bullets ?? pkg.bullets).map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm">
                        <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${featured ? "bg-yellow-400" : "bg-yellow-400"}`} />
                        <span className={featured ? "text-slate-300" : "text-slate-600"}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={
                      featured
                        ? "bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold w-full rounded-2xl"
                        : "w-full rounded-2xl font-semibold"
                    }
                  >
                    <a href={`mailto:${dictionary.mail.contact}?subject=${encodeURIComponent((t?.title ?? pkg.title) + " quote")}`}>
                      {translate(dictionary, "pricingPage.requestQuote")}
                    </a>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── MONTHLY PLANS ── */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {translate(dictionary, "pricingPage.plans")}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {monthlyPlans.map((plan) => {
              const t = dictionary.pricingPage.monthlyPlans[plan.id];
              const featured = plan.id === FEATURED_PLAN;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                    featured
                      ? "bg-slate-950 text-white shadow-2xl shadow-slate-900/30 ring-1 ring-yellow-400/30"
                      : "bg-white border border-slate-100 shadow-sm hover:shadow-xl"
                  }`}
                >
                  {featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-3.5 py-1 text-xs font-bold text-slate-900 shadow-md whitespace-nowrap">
                        ★ {dictionary.pricingPage.mostPopular}
                      </span>
                    </div>
                  )}

                  <h4 className={`text-base font-bold mb-2 ${featured ? "text-white" : "text-slate-900"}`}>
                    {t?.title ?? plan.title}
                  </h4>

                  <p className={`text-xl font-black mb-5 leading-tight ${featured ? "text-yellow-400" : "text-slate-900"}`}>
                    {t?.price ?? plan.price}
                  </p>

                  <ul className="flex-1 space-y-2.5 mb-6">
                    {(t?.bullets ?? plan.bullets).map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                        <span className={featured ? "text-slate-300" : "text-slate-600"}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <PlanCheckoutButton
                    locale={locale}
                    title={t?.title ?? plan.title}
                    mode="subscription"
                    amount={PLAN_AMOUNTS[plan.id] ?? 9900}
                    interval="month"
                    dictionary={dictionary}
                    label={translate(dictionary, "pricingPage.getStarted")}
                    connectedClassName={
                      featured
                        ? "bg-white !text-slate-900 hover:bg-slate-100 font-bold"
                        : "bg-slate-900 !text-white hover:bg-slate-700 font-bold"
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* ── BOTTOM NOTE ── */}
        <section className="rounded-3xl bg-slate-50 border border-slate-100 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {dictionary.pricingPage.customQuote}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {dictionary.pricingPage.customQuoteDesc}
            </p>
          </div>
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-700 !px-8 rounded-2xl font-bold shrink-0 transition-all hover:scale-[1.03]">
            <a href={`mailto:${dictionary.mail.contact}?subject=Custom%20Quote`}>
              {translate(dictionary, "home.ctaButton")}
            </a>
          </Button>
        </section>

      </main>
    </div>
  );
}
