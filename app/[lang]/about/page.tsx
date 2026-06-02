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

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <div>
            <h1 className="text-4xl font-extrabold">
              {translate(dictionary, "aboutPage.title")}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {translate(dictionary, "aboutPage.intro")}
            </p>
          </div>
        </header>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">
              {translate(dictionary, "aboutPage.whoWeAre")}
            </h2>
            <p className="mt-3 text-slate-600">
              {translate(dictionary, "aboutPage.whoWeAreDesc")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {translate(dictionary, "aboutPage.technologies")}
            </h2>
            <p className="mt-3 text-slate-600">
              {translate(dictionary, "aboutPage.technologiesDesc")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {translate(dictionary, "aboutPage.process")}
            </h2>
            <ol className="mt-3 list-decimal list-inside text-slate-600">
              <li>Discovery</li>
              <li>Design</li>
              <li>Development</li>
              <li>Launch</li>
              <li>Support & Growth</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {translate(dictionary, "aboutPage.mission")}
            </h2>
            <p className="mt-3 text-slate-600">
              {translate(dictionary, "aboutPage.missionDesc")}
            </p>
          </div>

          <div>
            <Button asChild>
              <a
                href={`mailto:${dictionary.mail.contact}?subject=Let's%20work%20together`}
              >
                {translate(dictionary, "aboutPage.getInTouch")}
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
