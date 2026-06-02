import HostingPortal from "@/components/HostingPortal";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  translate,
  type Locale,
} from "@/lib/i18n";

type HostingPageProps = {
  params: {
    lang: string;
  };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function HostingPage({ params }: HostingPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div>
            <p className="text-sky-600 font-semibold uppercase tracking-[0.24em] mb-3">
              {translate(dictionary, "hosting.pageLabel")}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              {translate(dictionary, "hosting.pageTitle")}
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
              {translate(dictionary, "hosting.pageDescription")}
            </p>
          </div>
        </header>

        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-10 shadow-lg shadow-slate-200/50">
            <h2 className="text-3xl font-bold mb-4">
              {translate(dictionary, "hosting.dedicatedHeading")}
            </h2>
            <p className="text-slate-600 leading-8 mb-8">
              {translate(dictionary, "hosting.dedicatedDescription")}
            </p>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  {translate(dictionary, "hosting.dedicatedFeature1Title")}
                </h3>
                <p className="mt-2 text-slate-600">
                  {translate(dictionary, "hosting.dedicatedFeature1Desc")}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  {translate(dictionary, "hosting.dedicatedFeature2Title")}
                </h3>
                <p className="mt-2 text-slate-600">
                  {translate(dictionary, "hosting.dedicatedFeature2Desc")}
                </p>
              </div>
            </div>
          </div>

          <HostingPortal dictionary={dictionary} />
        </section>
      </main>
    </div>
  );
}
