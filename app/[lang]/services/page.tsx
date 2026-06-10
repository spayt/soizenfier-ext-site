import type { Metadata } from "next";
import {
  Globe,
  LayoutDashboard,
  Server,
  Wrench,
  FileText,
  Search,
} from "lucide-react";
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
  { id: "design",        Icon: Globe },
  { id: "dashboards",    Icon: LayoutDashboard },
  { id: "hostedService", Icon: Server },
  { id: "maintenance",   Icon: Wrench },
  { id: "content",       Icon: FileText },
  { id: "seo",           Icon: Search },
] as const;

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
            <span className="w-8 h-1 rounded-full bg-yellow-400 block mb-5" />
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white text-balance">
              {translate(dictionary, "servicesPage.heading")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed">
              {translate(dictionary, "servicesPage.description")}
            </p>
          </div>
        </section>

        {/* ── SERVICE CARDS ── */}
        <section className="reveal grid gap-6 md:grid-cols-2">
          {SERVICE_CONFIG.map((config) => {
            const { Icon } = config;
            const points =
              dictionary.servicesPage.points[
                config.id as keyof typeof dictionary.servicesPage.points
              ] || [];
            return (
              <div
                key={config.id}
                className="group flex flex-col rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-lg hover:border-yellow-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <Icon className="w-5 h-5 text-yellow-500 shrink-0 group-hover:text-yellow-600 transition-colors duration-200" />
                  <h3 className="text-xl font-bold text-slate-900 leading-snug text-balance">
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
        <section className="reveal rounded-[2.5rem] bg-yellow-400 px-8 md:px-14 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug text-balance">
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
              <Link href={localePath(lang as Locale, "/services")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.services}</Link>
              <Link href={localePath(lang as Locale, "/pricing")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.pricing}</Link>
              <Link href={localePath(lang as Locale, "/about")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.about}</Link>
              <Link href={localePath(lang as Locale, "/contact")} className="hover:text-slate-900 transition-colors duration-150">{dictionary.nav.contactUs}</Link>
            </nav>
          </div>
        </footer>

      </main>
    </div>
  );
}
