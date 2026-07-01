"use client";

import Link from "next/link";
import { Rocket, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlanCheckoutButton from "@/components/PlanCheckoutButton";
import { localePath, translate, type Locale, type TranslationDictionary } from "@/lib/i18n";
import { websitePackages, monthlyPlans } from "@/lib/pricing";

type PricingPageClientProps = {
  locale: string;
  dictionary: TranslationDictionary;
};

const FEATURED_PACKAGE = "business";
const FEATURED_PLAN    = "premium";

const PKG_ICON_MAP = { starter: Rocket, business: TrendingUp, custom: Zap } as const;

export default function PricingPageClient({ locale, dictionary }: PricingPageClientProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-16">

        {/* ── HERO ── */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-14 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_-10%,rgba(250,204,21,0.14)_0%,transparent_65%)]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-yellow-400/5 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="w-8 h-1 rounded-full bg-yellow-400 block mb-5" />
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white text-balance">
              {translate(dictionary, "pricingPage.heading")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
              {translate(dictionary, "pricingPage.description")}
            </p>
          </div>
        </section>

        {/* ── WEBSITE PACKAGES ── */}
        <section className="reveal">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-balance">
              {dictionary.pricingPage.packages}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {websitePackages.map((pkg) => {
              const t = dictionary.pricingPage.websitePackages[pkg.id];
              const featured = pkg.id === FEATURED_PACKAGE;
              const Icon = PKG_ICON_MAP[pkg.id as keyof typeof PKG_ICON_MAP] ?? Rocket;
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

                  {Icon && (
                    <Icon className={`w-5 h-5 mb-5 shrink-0 ${featured ? "text-yellow-400" : "text-yellow-500"}`} />
                  )}

                  <h3 className={`text-xl font-bold mb-1 text-balance ${featured ? "text-white" : "text-slate-900"}`}>
                    {t?.title ?? pkg.title}
                  </h3>

                  <p className={`text-2xl font-black mb-6 ${featured ? "text-yellow-400" : "text-slate-900"}`}>
                    {t?.priceRange ?? pkg.priceRange}
                  </p>

                  <ul className="flex-1 space-y-3 mb-8">
                    {(t?.bullets ?? pkg.bullets).map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
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

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
            <span className="w-1 h-1 rounded-full bg-yellow-400 shrink-0" />
            {dictionary.pricingPage.packagesPriceNote}
          </p>
        </section>

        {/* ── MONTHLY PLANS ── */}
        <section className="reveal">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-balance">
              {translate(dictionary, "pricingPage.plans")}
            </h2>
          </div>

          <p className="mb-5 text-sm text-slate-500">
            {dictionary.pricingPage.plansBridge}
          </p>

          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-4 py-1.5 text-xs font-semibold text-yellow-800 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
            {dictionary.pricingPage.plansTrustLine}
          </div>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

                  <h4 className={`text-base font-bold mb-2 text-balance ${featured ? "text-white" : "text-slate-900"}`}>
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
                    planId={plan.id}
                    title={t?.title ?? plan.title}
                    mode="subscription"
                    amount={plan.amountCents}
                    interval="month"
                    dictionary={dictionary}
                    label={translate(dictionary, "pricingPage.getStarted")}
                    connectedClassName={
                      featured
                        ? "bg-white !text-slate-900 hover:bg-slate-100 font-bold"
                        : "bg-slate-900 !text-white hover:bg-slate-700 font-bold"
                    }
                  />
                  <p className={`text-center text-xs mt-2.5 ${featured ? "text-slate-500" : "text-slate-400"}`}>
                    {dictionary.pricingPage.noContract}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CUSTOM QUOTE CTA ── */}
        <section className="reveal rounded-[2.5rem] bg-yellow-400 px-8 md:px-14 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug text-balance">
              {dictionary.pricingPage.customQuote}
            </h2>
            <p className="mt-2 text-slate-700 text-sm md:text-base">
              {dictionary.pricingPage.customQuoteDesc}
            </p>
          </div>
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-700 font-bold !px-8 rounded-2xl shrink-0 transition-all hover:scale-[1.03]">
            <a href={`mailto:${dictionary.mail.contact}?subject=Custom%20Quote`}>
              {translate(dictionary, "home.ctaButton")}
            </a>
          </Button>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pb-8 pt-10 border-t border-slate-100 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <span className="font-semibold text-slate-700 block">
                © {new Date().getFullYear()} {dictionary.company}
              </span>
              <span className="text-xs mt-1 block">Made in Canada 🇨🇦</span>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium">
              <Link href={localePath(locale as Locale, "/services")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.services}</Link>
              <Link href={localePath(locale as Locale, "/pricing")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.pricing}</Link>
              <Link href={localePath(locale as Locale, "/about")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.about}</Link>
              <Link href={localePath(locale as Locale, "/contact")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.contactUs}</Link>
              <Link href={localePath(locale as Locale, "/realisations")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.realisations}</Link>
            </nav>
          </div>
        </footer>

      </main>
    </div>
  );
}
