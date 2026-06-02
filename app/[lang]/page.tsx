import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  getProjectList,
  isLocale,
  localePath,
  locales,
  translate,
} from "@/lib/i18n";

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

type HomePageProps = {
  params: {
    lang: string;
  };
};

export default async function Home({ params }: HomePageProps) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : defaultLocale;
  const dictionary = getDictionary(lang);
  const projects = getProjectList(dictionary);

  const serviceCards = [
    dictionary.home.serviceCards.website,
    dictionary.home.serviceCards.adminDashboards,
    dictionary.home.serviceCards.hosting,
    dictionary.home.serviceCards.maintenance,
    dictionary.home.serviceCards.content,
    dictionary.home.serviceCards.seo,
  ];

  const whyItems = dictionary.home.whyCards;
  const processSteps = dictionary.home.processSteps;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12 md:gap-20">
        <section className="hero grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {translate(dictionary, "hero.title")}
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">
              {translate(dictionary, "hero.description")}
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild className="!px-6">
                <a
                  href={`mailto:${dictionary.mail.contact}?subject=Get%20a%20Quote`}
                >
                  {translate(dictionary, "hero.talkButton")}
                </a>
              </Button>
              <Button asChild variant="ghost" className="!px-6">
                <Link href={localePath(lang, "/contact")}>
                  {translate(dictionary, "hero.seeWorkButton")}
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="device-mockup p-6 bg-white rounded-2xl shadow-lg">
              <Image
                src="/soiZenFier_logo.png"
                alt={dictionary.company}
                width={320}
                height={320}
                className="logo"
              />
            </div>
          </div>
        </section>

        <section id="services">
          <h2 className="text-2xl font-bold mb-6">
            {translate(dictionary, "services.heading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <div key={card.title} className="card">
                <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-700 font-semibold">
                  {card.title.slice(0, 1)}
                </div>
                <h3 className="mt-3 font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="why-choose-us" className="rounded-3xl bg-slate-100 p-10">
          <h2 className="text-3xl font-bold mb-8">
            {translate(dictionary, "home.whyHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 transition duration-300 ease-out hover:-translate-y-1 hover:bg-yellow-50 hover:shadow-xl"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="space-y-8">
          <h2 className="text-3xl font-bold">
            {translate(dictionary, "home.processHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 text-slate-900 font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* <section id="testimonials" className="space-y-8">
          <h2 className="text-3xl font-bold">
            {translate(dictionary, "home.testimonialsHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                company: "Tech Startup",
                quote:
                  "Professional, responsive, and delivered exactly what we needed. Highly recommend.",
              },
              {
                name: "Marcus Johnson",
                company: "Local Restaurant",
                quote:
                  "Our new website is beautiful and easy to update. Best investment we made.",
              },
              {
                name: "Dr. Elena Rodriguez",
                company: "Medical Association",
                quote:
                  "The ongoing support and maintenance give us peace of mind. They truly care.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <p className="text-slate-600 italic">“{testimonial.quote}”</p>
                <div className="mt-4 font-semibold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-500">
                  {testimonial.company}
                </div>
              </div>
            ))}
          </div>
        </section>*/}

        {/*<section id="work">
          <h2 className="text-3xl font-bold mb-8">
            {translate(dictionary, "home.featuredProjectsHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={localePath(lang, `/projects/${project.slug}`)}
                className="project card group block rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-40 bg-gradient-to-tr from-sky-100 to-indigo-50 rounded-lg flex items-center justify-center text-slate-400 font-semibold">
                  [Screenshot]
                </div>
                <h4 className="mt-4 text-lg font-semibold">{project.title}</h4>
                <p className="mt-2 text-slate-600">{project.summary}</p>
                <div className="mt-4 text-sm text-sky-600 group-hover:underline">
                  {translate(dictionary, "home.featuredProjectsCta")}
                </div>
              </Link>
            ))}
          </div>
        </section>*/}

        <section
          id="pricing-preview"
          className="rounded-3xl bg-yellow-50 p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            {translate(dictionary, "home.pricingPreviewHeading")}
          </h2>
          <p className="text-slate-600 mb-8">
            {translate(dictionary, "home.pricingPreviewDescription")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600">
                {dictionary.home.pricingPreviewWebsiteLabel}
              </p>
              <p className="text-5xl font-bold text-slate-900">$2,500+</p>
            </div>
            <div>
              <p className="text-slate-600">
                {dictionary.home.pricingPreviewMaintenanceLabel}
              </p>
              <p className="text-5xl font-bold text-slate-900">
                $99+<span className="text-lg">/mo</span>
              </p>
            </div>
          </div>
          <Button asChild className="mt-8">
            <Link href={localePath(lang, "/pricing")}>
              {dictionary.home.pricingPreviewButton}
            </Link>
          </Button>
        </section>

        <section
          id="cta"
          className="rounded-3xl bg-slate-900 text-white p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            {translate(dictionary, "home.ctaHeading")}
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            {dictionary.home.ctaDescription}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              className="bg-yellow-400 text-slate-900 hover:bg-yellow-500"
            >
              <a
                href={`mailto:${dictionary.mail.contact}?subject=Get%20a%20Quote`}
              >
                {dictionary.home.ctaButton}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-black hover:bg-green-100"
            >
              <Link href={localePath(lang, "/contact")}>
                {dictionary.home.ctaSecondary}
              </Link>
            </Button>
          </div>
        </section>

        <footer className="py-8 border-t border-slate-100 text-sm text-slate-600">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              © {new Date().getFullYear()}{" "}
              {translate(dictionary, "footer.company")}
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">
                {translate(dictionary, "nav.privacy")}
              </a>
              <a href="#" className="hover:underline">
                {translate(dictionary, "nav.terms")}
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
