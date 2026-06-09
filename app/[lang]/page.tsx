import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  getProjectList,
  isLocale,
  localePath,
  locales,
  translate,
} from "@/lib/i18n";

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
        title: "Conception et Développement Web pour PME — SoiZenFier Technologies",
        description:
          "Sites web sur mesure, applications web et mobiles pour les entreprises au Canada. Rapides, optimisés SEO et maintenus professionnellement. À partir de 500 $ CAD.",
        openGraph: {
          title: "SoiZenFier Technologies — Agence Web Canadienne",
          description:
            "Sites web, applications web et mobiles sur mesure pour les PME. Maintenance, hébergement et suivi SEO inclus.",
          type: "website",
          locale: "fr_CA",
        },
      }
    : {
        title: "Web Design & Development for Small Businesses — SoiZenFier Technologies",
        description:
          "Custom websites, web apps, and mobile apps for small businesses in Canada. Fast, SEO-optimized, and professionally maintained. Free quote — starting at $500 CAD.",
        openGraph: {
          title: "SoiZenFier Technologies — Canadian Web Development Agency",
          description:
            "Custom websites, web apps, and mobile apps. Managed hosting, maintenance, and SEO monitoring for businesses across Canada.",
          type: "website",
          locale: "en_CA",
        },
      };
}

type HomePageProps = {
  params: {
    lang: string;
  };
};

const SERVICE_ICONS = ["🌐", "📊", "☁️", "🔧", "✍️", "🔍"];

export default async function Home({ params }: HomePageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);
  getProjectList(dictionary);

  const serviceCards = [
    dictionary.home.serviceCards.website,
    dictionary.home.serviceCards.adminDashboards,
    dictionary.home.serviceCards.hosting,
    dictionary.home.serviceCards.maintenance,
    dictionary.home.serviceCards.content,
    dictionary.home.serviceCards.seo,
  ];

  const whyItems = dictionary.home.whyCards;
  const processSteps = dictionary.home.processSteps;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-20 md:gap-28">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-14 py-20 md:py-28">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_75%_-5%,rgba(250,204,21,0.15)_0%,transparent_65%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-yellow-400/5 blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-yellow-400 mb-5">
                {dictionary.hero.subtitle}
              </span>
              <h1 className="text-5xl md:text-[3.6rem] font-black leading-[1.06] tracking-tight text-white">
                {translate(dictionary, "hero.title")}
              </h1>
              <p className="mt-6 text-base md:text-lg text-slate-400 max-w-lg leading-relaxed">
                {translate(dictionary, "hero.description")}
              </p>
              <div className="mt-10 flex gap-3 flex-wrap">
                <Button
                  asChild
                  className="bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold !px-8 !py-3 text-base rounded-2xl shadow-lg shadow-yellow-400/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-yellow-400/40"
                >
                  <a href={`mailto:${dictionary.mail.contact}?subject=Get%20a%20Quote`}>
                    {translate(dictionary, "hero.talkButton")}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="!bg-transparent border-slate-700 !text-white hover:!bg-slate-800 !px-8 !py-3 text-base rounded-2xl transition-all duration-200"
                >
                  <Link href={localePath(lang, "/contact")}>
                    {translate(dictionary, "hero.seeWorkButton")}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[2.5rem] bg-yellow-400/8 blur-3xl" />
                <div className="relative p-4 bg-slate-900 rounded-3xl border border-slate-800 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                  <Image
                    src="/soizenfier_bamana_logo.svg"
                    alt={dictionary.company}
                    width={420}
                    height={420}
                    className="logo w-full max-w-[420px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section id="services">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              {translate(dictionary, "services.heading")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceCards.map((card, i) => (
              <div
                key={card.title}
                className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-200">
                  {SERVICE_ICONS[i]}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
        <section
          id="why-choose-us"
          className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-12 py-14 md:py-16"
        >
          <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] bg-yellow-400/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                {translate(dictionary, "home.whyHeading")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyItems.map((item) => (
                <div
                  key={item.title}
                  className="group bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-lg bg-yellow-400/15 flex items-center justify-center mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────────── */}
        <section id="process">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              {translate(dictionary, "home.processHeading")}
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
            {/* connecting track */}
            <div className="hidden md:block absolute top-[1.375rem] left-[calc(10%+24px)] right-[calc(10%+24px)] h-px bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30" />

            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative z-10 flex flex-col items-center text-center px-2"
              >
                <div className="w-11 h-11 rounded-full bg-yellow-400 text-slate-900 font-black text-lg flex items-center justify-center shadow-md shadow-yellow-400/40 mb-4 ring-4 ring-white">
                  {index + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING PREVIEW ──────────────────────────────────────────────── */}
        <section id="pricing-preview">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* left: intro card */}
            <div className="md:col-span-2 rounded-3xl bg-slate-50 border border-slate-100 p-8 flex flex-col justify-between min-h-[240px]">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                  {translate(dictionary, "home.pricingPreviewHeading")}
                </h2>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {translate(dictionary, "home.pricingPreviewDescription")}
                </p>
              </div>
              <Button
                asChild
                className="mt-8 w-fit bg-slate-900 text-white hover:bg-slate-700 !px-7 rounded-2xl font-semibold transition-all hover:scale-[1.02]"
              >
                <Link href={localePath(lang, "/pricing")}>
                  {dictionary.home.pricingPreviewButton} →
                </Link>
              </Button>
            </div>

            {/* right: price tiles */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-3xl bg-yellow-400 p-8 flex flex-col justify-between">
                <span className="text-3xl">🌐</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-yellow-900/60 mb-1">
                    {dictionary.home.pricingPreviewWebsiteLabel}
                  </p>
                  <p className="text-4xl font-black text-slate-900">$500+</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900 text-white p-8 flex flex-col justify-between">
                <span className="text-3xl">🔧</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                    {dictionary.home.pricingPreviewMaintenanceLabel}
                  </p>
                  <p className="text-4xl font-black text-white">
                    $99+
                    <span className="text-lg font-normal text-slate-400"> /mo</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          id="cta"
          className="rounded-[2.5rem] bg-yellow-400 px-8 md:px-14 py-14 md:py-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {translate(dictionary, "home.ctaHeading")}
          </h2>
          <p className="text-slate-700 mb-10 max-w-xl mx-auto leading-relaxed">
            {dictionary.home.ctaDescription}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              className="bg-slate-900 text-white hover:bg-slate-700 font-bold !px-9 !py-3 text-base rounded-2xl shadow-xl shadow-slate-900/25 transition-all hover:scale-[1.03]"
            >
              <a href={`mailto:${dictionary.mail.contact}?subject=Get%20a%20Quote`}>
                {dictionary.home.ctaButton}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-900/25 text-slate-900 hover:bg-yellow-300 font-semibold !px-9 !py-3 text-base rounded-2xl transition-all"
            >
              <Link href={localePath(lang, "/contact")}>
                {dictionary.home.ctaSecondary}
              </Link>
            </Button>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="pb-6 pt-8 border-t border-slate-100 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-medium text-slate-700">
              © {new Date().getFullYear()}{" "}
              {translate(dictionary, "footer.company")}
            </span>
          </div>
        </footer>

      </main>
    </div>
  );
}
