import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Target } from "lucide-react";
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

type AboutPageProps = {
  params: { lang: string };
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
        title: "À Propos — Agence de Développement Web",
        description:
          "SoiZenFier Technologies est une agence web canadienne spécialisée dans la création de sites web, d'applications web et d'outils numériques sur mesure pour les entreprises.",
        openGraph: {
          title: "À Propos — SoiZenFier Technologies",
          description:
            "Agence web canadienne : sites web, applications web et mobiles sur mesure avec des technologies modernes.",
          type: "website",
          locale: "fr_CA",
        },
      }
    : {
        title: "About Us — Web Development Agency",
        description:
          "SoiZenFier Technologies is a Canadian web development agency specializing in custom websites, web apps, and digital tools built with modern technologies.",
        openGraph: {
          title: "About SoiZenFier Technologies",
          description:
            "Canadian web development agency building custom websites, web apps, and mobile applications for modern businesses.",
          type: "website",
          locale: "en_CA",
        },
      };
}

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Firebase", "Node.js", "CMS Headless", "Serverless",
];

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);
  const processSteps = dictionary.home.processSteps;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-16">

        {/* ── HERO ── */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-14 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(250,204,21,0.13)_0%,transparent_65%)]" />
          <div className="relative max-w-2xl">
            <span className="w-8 h-1 rounded-full bg-yellow-400 block mb-5" />
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white text-balance">
              {translate(dictionary, "aboutPage.title")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed">
              {translate(dictionary, "aboutPage.intro")}
            </p>
          </div>
        </section>

        <div className="reveal grid gap-6 md:grid-cols-2">

          {/* ── WHO WE ARE ── */}
          <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-yellow-500 shrink-0" />
              <h2 className="text-xl font-bold text-slate-900 text-balance">
                {translate(dictionary, "aboutPage.whoWeAre")}
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {translate(dictionary, "aboutPage.whoWeAreDesc")}
            </p>
          </div>

          {/* ── MISSION ── */}
          <div className="rounded-3xl bg-slate-950 text-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-yellow-400 shrink-0" />
              <h2 className="text-xl font-bold text-white text-balance">
                {translate(dictionary, "aboutPage.mission")}
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {translate(dictionary, "aboutPage.missionDesc")}
            </p>
          </div>

        </div>

        {/* ── TECHNOLOGIES ── */}
        <section className="reveal rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-1 rounded-full bg-yellow-400" />
            <h2 className="text-xl font-bold text-slate-900 text-balance">
              {translate(dictionary, "aboutPage.technologies")}
            </h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {translate(dictionary, "aboutPage.technologiesDesc")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="reveal">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-1 rounded-full bg-yellow-400" />
            <h2 className="text-xl font-bold text-slate-900 text-balance">
              {translate(dictionary, "aboutPage.process")}
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
            <div className="hidden md:block absolute top-[1.375rem] left-[calc(10%+24px)] right-[calc(10%+24px)] h-px bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30" />
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center px-2">
                <div className="w-11 h-11 rounded-full bg-yellow-400 text-slate-900 font-black text-lg flex items-center justify-center shadow-md shadow-yellow-400/40 mb-4 ring-4 ring-white">
                  {index + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug text-balance">{step.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="reveal rounded-[2.5rem] bg-yellow-400 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-lg md:text-xl font-black text-slate-900 text-center sm:text-left text-balance">
            {translate(dictionary, "home.ctaHeading")}
          </p>
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-700 font-bold !px-8 rounded-2xl shrink-0 transition-all hover:scale-[1.03]">
            <a href={`mailto:${dictionary.mail.contact}?subject=Let's%20work%20together`}>
              {translate(dictionary, "aboutPage.getInTouch")}
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
