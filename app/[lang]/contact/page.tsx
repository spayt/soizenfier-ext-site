import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
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

type ContactPageProps = {
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
        title: "Contactez-nous",
        description:
          "Prêt à démarrer votre projet web? Contactez SoiZenFier Technologies pour une consultation gratuite sur la conception de site web, les applications ou les plans de maintenance.",
        openGraph: {
          title: "Contact — SoiZenFier Technologies",
          description:
            "Discutons de votre projet web. Devis gratuit pour site web, application ou plan de maintenance.",
          type: "website",
          locale: "fr_CA",
        },
      }
    : {
        title: "Contact Us — Get a Free Web Design Quote",
        description:
          "Ready to start your web project? Contact SoiZenFier Technologies for a free consultation on website design, web apps, or monthly maintenance plans.",
        openGraph: {
          title: "Contact SoiZenFier Technologies",
          description:
            "Get a free quote for your website, web app, or maintenance plan. We respond within 24 hours.",
          type: "website",
          locale: "en_CA",
        },
      };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-16">

        {/* ── HERO ── */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white px-8 md:px-14 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_-10%,rgba(250,204,21,0.13)_0%,transparent_65%)]" />
          <div className="relative max-w-xl">
            <span className="w-8 h-1 rounded-full bg-yellow-400 block mb-5" />
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white text-balance">
              {translate(dictionary, "contactPage.title")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed">
              {translate(dictionary, "contactPage.intro")}
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="reveal grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

          {/* Contact form — takes 3/5 */}
          <div className="md:col-span-3">
            <ContactForm dictionary={dictionary} />
          </div>

          {/* Info panel — takes 2/5 */}
          <div className="md:col-span-2 flex flex-col gap-4">

            {/* Contact details */}
            <div className="rounded-3xl bg-slate-950 text-white p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-1 rounded-full bg-yellow-400 shrink-0" />
                <h2 className="text-sm font-bold text-white">
                  {translate(dictionary, "contactPage.otherWays")}
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-400 mb-0.5">Email</p>
                    <a
                      href={`mailto:${dictionary.mail.contact}`}
                      className="text-sm font-medium text-white hover:text-yellow-400 transition-colors break-all"
                    >
                      {dictionary.mail.contact}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-400 mb-0.5">Phone</p>
                    <span className="text-sm font-medium text-white">
                      {translate(dictionary, "contactPage.phone")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-400 mb-0.5">Address</p>
                    <span className="text-sm font-medium text-white">
                      {translate(dictionary, "contactPage.address")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing link */}
            <Link
              href={localePath(lang as Locale, "/pricing")}
              className="group rounded-3xl bg-yellow-400 px-7 py-6 flex items-center justify-between hover:bg-yellow-300 transition-colors"
            >
              <span className="font-bold text-slate-900 text-sm">
                {translate(dictionary, "contactPage.seePricing")}
              </span>
              <span className="text-slate-900 text-lg group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

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
