import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  defaultLocale,
  getDictionary,
  getProjectList,
  isLocale,
  localePath,
  locales,
  translate,
} from "@/lib/i18n";

type ProjectsPageProps = {
  params: {
    lang: string;
  };
};

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);
  const projects = getProjectList(dictionary);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
              {translate(dictionary, "nav.ourWork")}
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">
              {translate(dictionary, "projects.pageTitle")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              {translate(dictionary, "projects.pageDescription")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <LanguageSwitcher
              currentLocale={lang}
              currentPath="/projects"
              dictionary={dictionary}
            />
            <Link
              href={localePath(lang, "/")}
              className="inline-flex items-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              {translate(dictionary, "projects.backToHome")}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={localePath(lang, `/projects/${project.slug}`)}
              className="group block rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm text-slate-500">
                {translate(dictionary, "projects.featuredProject")}
              </p>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                {project.title}
              </h2>
              <p className="mt-3 text-slate-600">{project.summary}</p>
              <span className="mt-6 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:bg-slate-200">
                {translate(dictionary, "projects.viewDetails")}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
