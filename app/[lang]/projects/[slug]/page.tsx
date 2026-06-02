import Link from "next/link";
import { notFound } from "next/navigation";
import {
  defaultLocale,
  getDictionary,
  getProjectDetail,
  getProjectParams,
  isLocale,
  isProjectSlug,
  localePath,
  locales,
  translate,
} from "@/lib/i18n";

type ProjectPageProps = {
  params: {
    lang: string;
    slug: string;
  };
};

export const generateStaticParams = () =>
  locales.flatMap((lang) =>
    getProjectParams().map((project) => ({
      lang,
      slug: project.slug,
    })),
  );

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang: langParam, slug } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);

  if (!isProjectSlug(slug)) {
    notFound();
  }

  const project = getProjectDetail(slug, dictionary);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
            {translate(dictionary, "projects.detailsHeading")}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">{project.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{project.description}</p>
        </div>

        <section className="mt-10 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900">
            {translate(dictionary, "projects.delivered")}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <p className="font-semibold text-slate-900">{feature}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-3xl bg-slate-100 p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-900">
            {translate(dictionary, "projects.readyTitle")}
          </h3>
          <p className="mt-3 max-w-2xl text-slate-600">
            {translate(dictionary, "projects.readyDescription")}
          </p>
          <Link
            href={`mailto:${dictionary.mail.contact}`}
            className="mt-6 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            {translate(dictionary, "projects.contactTeam")}
          </Link>
        </section>
      </main>
    </div>
  );
}
