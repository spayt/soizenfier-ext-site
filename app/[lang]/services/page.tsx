import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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

type ServicesPageProps = {
  params: {
    lang: string;
  };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  const services = [
    {
      id: "design",
      titleKey: "servicesPage.design",
      points: [
        "Custom websites",
        "Responsive design",
        "Contact forms",
        "CMS integration",
        "Analytics",
      ],
    },
    {
      id: "dashboards",
      titleKey: "servicesPage.dashboards",
      points: [
        "Membership management",
        "Booking systems",
        "Internal tools",
        "Reporting dashboards",
      ],
    },
    {
      id: "hosting",
      titleKey: "servicesPage.hostedService",
      points: [
        "SSL certificates",
        "Daily backups",
        "Monitoring",
        "CDN",
        "Security updates",
      ],
    },
    {
      id: "maintenance",
      titleKey: "servicesPage.maintenance",
      points: [
        "Bug fixes",
        "Framework updates",
        "Security patches",
        "Monthly reports",
      ],
    },
    {
      id: "content",
      titleKey: "servicesPage.content",
      points: [
        "New pages",
        "Blog posts",
        "Event updates",
        "Image replacements",
      ],
    },
    {
      id: "seo",
      titleKey: "servicesPage.seo",
      points: [
        "Search Console setup",
        "Keyword tracking",
        "Performance reports",
        "Technical SEO checks",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sky-600 font-semibold uppercase tracking-[0.24em] mb-3">
              {translate(dictionary, "nav.services")}
            </p>
            <h1 className="text-4xl font-extrabold">
              {translate(dictionary, "servicesPage.heading")}
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl">
              {translate(dictionary, "servicesPage.description")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher
              currentLocale={lang}
              currentPath="/services"
              dictionary={dictionary}
            />
            <Button asChild variant="ghost" size="sm">
              <Link href={localePath(lang, "/projects")}>
                {translate(dictionary, "nav.ourWork")}
              </Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.id} className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-semibold">
                {translate(dictionary, s.titleKey)}
              </h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                {s.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild>
                  <a
                    href={`mailto:${dictionary.mail.contact}?subject=${encodeURIComponent(translate(dictionary, s.titleKey))}`}
                  >
                    {translate(dictionary, "servicesPage.contactService")}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
