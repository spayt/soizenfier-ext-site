import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localePath,
  locales,
  translate,
  type Locale,
} from "@/lib/i18n";
import Link from "next/link";

type ServicesPageProps = {
  params: {
    lang: string;
  };
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
        title: "Services de Développement Web",
        description:
          "Conception web professionnelle, développement d'applications web et mobiles, hébergement géré, maintenance de sites web et suivi SEO. Forfaits adaptés aux PME.",
        openGraph: {
          title: "Services Web — SoiZenFier Technologies",
          description:
            "Conception web, hébergement géré, maintenance et optimisation SEO pour les entreprises au Canada.",
          type: "website",
          locale: "fr_CA",
        },
      }
    : {
        title: "Web Design & Development Services",
        description:
          "Professional web design, web app development, managed hosting, website maintenance, content updates, and SEO monitoring. Tailored service packages for small businesses.",
        openGraph: {
          title: "Web Development Services — SoiZenFier Technologies",
          description:
            "Custom web design, managed hosting, website maintenance, and SEO monitoring for businesses across Canada.",
          type: "website",
          locale: "en_CA",
        },
      };
}

const SERVICE_CONFIG = [
  { id: "design",        icon: "🌐" },
  { id: "dashboards",    icon: "📊" },
  { id: "hostedService", icon: "☁️" },
  { id: "maintenance",   icon: "🔧" },
  { id: "content",       icon: "✍️" },
  { id: "seo",           icon: "🔍" },
];

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-16">

        {/* ── HERO ── */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-14 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_-10%,rgba(250,204,21,0.14)_0%,transparent_70%)]" />
          <div className="relative max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-1 rounded-full bg-yellow-400" />
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-yellow-400">
                {translate(dictionary, "nav.services")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white">
              {translate(dictionary, "servicesPage.heading")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed">
              {translate(dictionary, "servicesPage.description")}
            </p>
          </div>
        </section>

        {/* ── SERVICE CARDS ── */}
        <section className="grid gap-6 md:grid-cols-2">
          {SERVICE_CONFIG.map((config) => {
            const points =
              dictionary.servicesPage.points[
                config.id as keyof typeof dictionary.servicesPage.points
              ] || [];
            return (
              <div
                key={config.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {config.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 pt-2 leading-snug">
                    {translate(dictionary, `servicesPage.${config.id}` as Parameters<typeof translate>[1])}
                  </h3>
                </div>

                <ul className="flex-1 space-y-2.5 mb-8">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-fit">
                  <a href={`mailto:${dictionary.mail.contact}?subject=${encodeURIComponent(translate(dictionary, `servicesPage.${config.id}` as Parameters<typeof translate>[1]))}`}>
                    {translate(dictionary, "servicesPage.contactService")}
                  </a>
                </Button>
              </div>
            );
          })}
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="rounded-[2.5rem] bg-yellow-400 px-8 md:px-14 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              {translate(dictionary, "home.ctaHeading")}
            </h2>
            <p className="mt-2 text-slate-700 text-sm md:text-base">
              {translate(dictionary, "home.ctaDescription")}
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <Button asChild className="bg-slate-900 text-white hover:bg-slate-700 font-bold !px-7 rounded-2xl transition-all hover:scale-[1.03]">
              <a href={`mailto:${dictionary.mail.contact}?subject=Get%20a%20Quote`}>
                {translate(dictionary, "home.ctaButton")}
              </a>
            </Button>
            <Button asChild variant="outline" className="!bg-transparent border-slate-900/25 text-slate-900 hover:!bg-yellow-300 font-semibold !px-7 rounded-2xl">
              <Link href={localePath(lang as Locale, "/contact")}>
                {translate(dictionary, "home.ctaSecondary")}
              </Link>
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
}
