import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { Smartphone, ArrowRight } from "lucide-react";
import {
  getDictionary,
  isLocale,
  defaultLocale,
  locales,
  localePath,
  type Locale,
} from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);
  return {
    title: `${dict.realisationsPage.heading} — ${dict.company}`,
    description: dict.realisationsPage.intro,
  };
}

export default async function RealisationsPage({ params }: Props) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);
  const kd = dict.realisationsPage.kimuntu;

  const imagesDir = path.join(process.cwd(), "public", "NtuAppImages");
  const screenshots = fs.existsSync(imagesDir)
    ? fs
        .readdirSync(imagesDir)
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
        .sort()
    : [];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-24">

        {/* ── HERO ── */}
        <section className="reveal">
          <span className="w-8 h-1 rounded-full bg-yellow-400 block mb-8" />
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 text-balance leading-[1.05] tracking-[-0.02em]">
            {dict.realisationsPage.heading}
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
            {dict.realisationsPage.intro}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
            {dict.realisationsPage.trustStat}
          </div>
        </section>

        {/* ── KIMUNTU FEATURE CARD ── */}
        <section className="reveal">
          <div className="rounded-2xl bg-slate-950 overflow-hidden relative">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_75%_at_92%_15%,rgba(139,92,246,0.18)_0%,transparent_65%)]" />
            <div className="pointer-events-none absolute -bottom-24 -left-12 w-80 h-80 rounded-full bg-violet-900/20 blur-3xl" />

            <div className="relative grid md:grid-cols-[1fr_200px] items-end">

              {/* Left: content */}
              <div className="p-8 md:p-12 flex flex-col gap-7">

                {/* App identity */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-violet-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">KimuNtu</h2>
                    <p className="text-xs font-medium text-violet-400">{kd.attribution}</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xl md:text-2xl font-bold text-white leading-snug text-balance max-w-lg">
                  {kd.tagline}
                </p>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed text-sm max-w-md">
                  {kd.description}
                </p>

                {/* Features */}
                <ul className="grid sm:grid-cols-2 gap-2">
                  {kd.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Download buttons */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.soizenfier.ntu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-slate-900 rounded-xl px-4 py-2.5 text-sm hover:bg-slate-100 transition-all hover:scale-[1.02] shadow-sm"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23.76c.35.2.74.24 1.12.14l12.73-7.36-2.79-2.79-11.06 10.01zM20.06 9.37l-2.93-1.69-3.14 3.14 3.14 3.14 2.95-1.71a2 2 0 0 0 0-2.88zM1 1.23v21.54l11.29-10.77L1 1.23zm15.03 6.82L4.3.37 15.07 11.3l.96-3.25z"/>
                    </svg>
                    <span className="text-left">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-medium">
                        {kd.downloadOn}
                      </span>
                      <span className="font-bold text-sm">Google Play</span>
                    </span>
                  </a>

                  <a
                    href="https://apps.apple.com/us/app/kimuntu/id6762160291"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-white/10 bg-white/10 text-white rounded-xl px-4 py-2.5 text-sm hover:bg-white/[0.15] transition-all hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.79 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span className="text-left">
                      <span className="block text-[9px] uppercase tracking-wider text-white/50 font-medium">
                        {kd.downloadOn}
                      </span>
                      <span className="font-bold text-sm">App Store</span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Right: hero screenshot in phone frame */}
              {screenshots[0] && (
                <div className="hidden md:flex justify-center items-end px-6 pt-8">
                  <div className="w-[155px] rounded-[2.5rem] bg-slate-800 ring-[3px] ring-slate-700 shadow-2xl shadow-black/60 overflow-hidden">
                    <div className="h-5 bg-slate-800 flex items-center justify-center">
                      <div className="w-12 h-1 rounded-full bg-slate-700" />
                    </div>
                    <img
                      src={`/NtuAppImages/${encodeURIComponent(screenshots[0])}`}
                      alt="KimuNtu app"
                      className="w-full block"
                    />
                    <div className="h-4 bg-slate-800 flex items-center justify-center">
                      <div className="w-14 h-0.5 rounded-full bg-slate-700" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── SCREENSHOTS GALLERY ── */}
        {screenshots.length > 0 && (
          <section className="reveal">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-sm font-medium text-slate-400 tabular-nums">{screenshots.length} screens</span>
              <span className="flex-1 h-px bg-slate-100" />
              <Link
                href="/kimuntu"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
              >
                {kd.viewGallery}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {screenshots.map((filename) => (
                <div key={filename} className="group">
                  <div className="relative w-full rounded-[2rem] bg-slate-900 ring-[3px] ring-slate-800 shadow-md overflow-hidden transition-all duration-300 group-hover:ring-violet-500/40 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-violet-900/15">
                    <div className="h-4 bg-slate-900 flex items-center justify-center">
                      <div className="w-8 h-1 rounded-full bg-slate-700" />
                    </div>
                    <img
                      src={`/NtuAppImages/${encodeURIComponent(filename)}`}
                      alt="KimuNtu app screen"
                      className="w-full block"
                      loading="lazy"
                    />
                    <div className="h-3 bg-slate-900 flex items-center justify-center">
                      <div className="w-10 h-0.5 rounded-full bg-slate-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="reveal rounded-2xl bg-yellow-400 px-8 md:px-12 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug text-balance">
              {dict.realisationsPage.cta.heading}
            </h2>
            <p className="mt-2 text-slate-700 text-sm md:text-base">
              {dict.realisationsPage.cta.description}
            </p>
          </div>
          <Link
            href={localePath(lang as Locale, "/contact")}
            className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-700 font-bold px-7 py-3 rounded-xl shrink-0 transition-all hover:scale-[1.03]"
          >
            {dict.realisationsPage.cta.button}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </main>
    </div>
  );
}
