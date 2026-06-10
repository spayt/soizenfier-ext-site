import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Globe,
  LayoutDashboard,
  Server,
  Wrench,
  FileText,
  Search,
  Zap,
  Smartphone,
  Shield,
  Headphones,
  Tag,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProcessReveal } from "@/components/ProcessReveal";
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

const SERVICE_ICONS = [Globe, LayoutDashboard, Server, Wrench, FileText, Search] as const;
const WHY_ICONS = [Zap, Smartphone, Shield, Headphones, Tag, MessageCircle] as const;

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
              <span data-hero="subtitle" className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-yellow-400 mb-5">
                {dictionary.hero.subtitle}
              </span>
              <h1 data-hero="title" className="text-5xl md:text-[3.6rem] font-black leading-[1.06] tracking-tight text-white text-balance">
                {translate(dictionary, "hero.title")}
              </h1>
              <p data-hero="desc" className="mt-6 text-base md:text-lg text-slate-400 max-w-lg leading-relaxed">
                {translate(dictionary, "hero.description")}
              </p>
              <div data-hero="ctas" className="mt-10 flex gap-3 flex-wrap">
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

            <div data-hero="mockup" className="flex items-center justify-center">
              <div className="relative w-full max-w-[420px]">
                <div className="absolute -inset-8 rounded-[2.5rem] bg-yellow-400/8 blur-3xl" />
                {/* Browser window mockup — replace with a real client screenshot when available */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800 border-b border-slate-700/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <div className="ml-2 flex-1 h-5 bg-slate-700/80 rounded-md flex items-center px-2.5">
                      <span className="text-[9px] text-slate-500">femmesdelaterre.net</span>
                    </div>
                  </div>
                  {/* Client site screenshot */}
                  <Image
                    src="/captureSiteClient.png"
                    alt="Client website built by SoiZenFier"
                    width={840}
                    height={560}
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
        <section className="-mt-8">
          <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dictionary.home.trustStats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 text-center"
              >
                <p className="font-black text-slate-900 text-sm leading-tight">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500 leading-snug">{stat.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section id="services">
          <div className="reveal flex items-center gap-4 mb-10">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-balance">
              {translate(dictionary, "services.heading")}
            </h2>
          </div>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceCards.map((card, i) => {
              const ServiceIcon = SERVICE_ICONS[i];
              return (
                <div
                  key={card.title}
                  className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-yellow-200 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <ServiceIcon className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0 group-hover:text-yellow-600 transition-colors duration-200" />
                    <h3 className="font-bold text-slate-900 text-base leading-tight text-balance">{card.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed pl-8">{card.desc}</p>
                </div>
              );
            })}
          </ScrollReveal>
        </section>

        {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
        <section
          id="why-choose-us"
          className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-12 py-14 md:py-16"
        >
          <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] bg-yellow-400/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative">
            <h2 className="reveal text-3xl md:text-4xl font-extrabold text-white mb-10 text-balance">
              {translate(dictionary, "home.whyHeading")}
            </h2>

            <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {whyItems.map((item, i) => {
                const WhyIcon = WHY_ICONS[i % WHY_ICONS.length];
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center mt-0.5">
                      <WhyIcon className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm leading-snug mb-1.5 text-balance">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────────── */}
        <section id="process">
          <div className="reveal flex items-center gap-4 mb-12">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-balance">
              {translate(dictionary, "home.processHeading")}
            </h2>
          </div>

          <ProcessReveal steps={processSteps} />
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section id="testimonials">
          <div className="reveal flex items-center gap-4 mb-10">
            <span className="w-10 h-1 rounded-full bg-yellow-400 shrink-0" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-balance">
              {translate(dictionary, "home.testimonialsHeading")}
            </h2>
          </div>
          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dictionary.home.testimonials.map((t, i) => (
              <blockquote
                key={i}
                className={`rounded-3xl p-8 flex flex-col gap-5 ${i === 0 ? "bg-slate-950 text-white" : "bg-slate-50 border border-slate-100"}`}
              >
                <div className="flex gap-0.5 text-yellow-400 text-base select-none" aria-label="5 out of 5 stars">
                  {"★★★★★"}
                </div>
                <span className="text-4xl font-black leading-none text-yellow-400 select-none">&ldquo;</span>
                <p className={`text-base leading-relaxed -mt-2 ${i === 0 ? "text-slate-300" : "text-slate-700"}`}>
                  {t.quote}
                </p>
                <footer className="mt-auto pt-2 border-t border-white/10">
                  <cite className={`not-italic font-bold text-sm block ${i === 0 ? "text-white" : "text-slate-900"}`}>
                    {t.name}
                  </cite>
                  <span className={`text-xs mt-0.5 block ${i === 0 ? "text-slate-500" : "text-slate-400"}`}>
                    {t.business}
                  </span>
                </footer>
              </blockquote>
            ))}
          </ScrollReveal>
        </section>

        {/* ── PRICING PREVIEW ──────────────────────────────────────────────── */}
        <section id="pricing-preview" className="reveal">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* left: intro card */}
            <div className="md:col-span-2 rounded-3xl bg-slate-50 border border-slate-100 p-8 flex flex-col justify-between min-h-[240px]">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug text-balance">
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
                <Globe className="w-6 h-6 text-yellow-800" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-yellow-900/80 mb-1">
                    {dictionary.home.pricingPreviewWebsiteLabel}
                  </p>
                  <p className="text-4xl font-black text-slate-900">$500+</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900 text-white p-8 flex flex-col justify-between">
                <Wrench className="w-6 h-6 text-slate-400" />
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
          className="reveal rounded-[2.5rem] bg-yellow-400 px-8 md:px-14 py-14 md:py-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight text-balance">
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
        <footer className="pb-8 pt-10 border-t border-slate-100 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <span className="font-semibold text-slate-700 block">
                © {new Date().getFullYear()}{" "}
                {translate(dictionary, "footer.company")}
              </span>
              <span className="text-xs mt-1 block">Made in Canada 🇨🇦</span>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium">
              <Link href={localePath(lang, "/services")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.services}</Link>
              <Link href={localePath(lang, "/pricing")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.pricing}</Link>
              <Link href={localePath(lang, "/about")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.about}</Link>
              <Link href={localePath(lang, "/contact")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.contactUs}</Link>
            </nav>
          </div>
        </footer>

      </main>
    </div>
  );
}
