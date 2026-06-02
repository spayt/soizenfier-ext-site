import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localePath,
  locales,
  translate,
} from "@/lib/i18n";
import Link from "next/link";

type ContactPageProps = {
  params: { lang: string };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">
              {translate(dictionary, "contactPage.title")}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {translate(dictionary, "contactPage.intro")}
            </p>
          </div>
          <LanguageSwitcher
            currentLocale={lang}
            currentPath="/contact"
            dictionary={dictionary}
          />
        </header>

        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">
              {translate(dictionary, "contactPage.contactForm")}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {translate(dictionary, "contactPage.formNote")}
            </p>
            <div className="mt-4">
              <Button asChild>
                <a
                  href={`mailto:${dictionary.mail.contact}?subject=Consultation%20booking`}
                >
                  {translate(dictionary, "contactPage.emailUs")}
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">
              {translate(dictionary, "contactPage.otherWays")}
            </h2>
            <ul className="mt-3 text-slate-600 space-y-2">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${dictionary.mail.contact}`}
                  className="text-sky-600"
                >
                  {dictionary.mail.contact}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="#" className="text-sky-600">
                  {translate(dictionary, "contactPage.phone")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Link
              href={localePath(lang, "/pricing")}
              className="text-sm text-slate-700 underline"
            >
              {translate(dictionary, "contactPage.seePricing")}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
