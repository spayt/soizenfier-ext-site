import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  translate,
} from "@/lib/i18n";

type AboutPageProps = {
  params: { lang: string };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

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
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-1 rounded-full bg-yellow-400" />
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-yellow-400">
                {translate(dictionary, "nav.about")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white">
              {translate(dictionary, "aboutPage.title")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed">
              {translate(dictionary, "aboutPage.intro")}
            </p>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">

          {/* ── WHO WE ARE ── */}
          <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center text-xl mb-5">
              🏢
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {translate(dictionary, "aboutPage.whoWeAre")}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {translate(dictionary, "aboutPage.whoWeAreDesc")}
            </p>
          </div>

          {/* ── MISSION ── */}
          <div className="rounded-3xl bg-slate-950 text-white p-8 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-xl mb-5">
              🎯
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              {translate(dictionary, "aboutPage.mission")}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {translate(dictionary, "aboutPage.missionDesc")}
            </p>
          </div>

        </div>

        {/* ── TECHNOLOGIES ── */}
        <section className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-1 rounded-full bg-yellow-400" />
            <h2 className="text-xl font-bold text-slate-900">
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
        <section>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-1 rounded-full bg-yellow-400" />
            <h2 className="text-xl font-bold text-slate-900">
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
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{step.title}</h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="rounded-3xl bg-yellow-400 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-lg md:text-xl font-black text-slate-900 text-center sm:text-left">
            {translate(dictionary, "aboutPage.getInTouch")} →
          </p>
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-700 font-bold !px-8 rounded-2xl shrink-0 transition-all hover:scale-[1.03]">
            <a href={`mailto:${dictionary.mail.contact}?subject=Let's%20work%20together`}>
              {translate(dictionary, "aboutPage.getInTouch")}
            </a>
          </Button>
        </section>

      </main>
    </div>
  );
}
