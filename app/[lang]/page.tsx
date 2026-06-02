import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  getProjectList,
  isLocale,
  localePath,
  locales,
  translate,
  type Locale,
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/soiZenFier_logo.png"
            alt={dictionary.company}
            width={72}
            height={72}
            className="logo"
            priority
          />
          <div>
            <h3 className="text-lg font-semibold">{dictionary.company}</h3>
            <div className="text-sm text-slate-500">
              {translate(dictionary, "hero.subtitle")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher
            currentLocale={lang}
            currentPath=""
            dictionary={dictionary}
          />
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <Link href={localePath(lang, "/")} className="hover:underline">
              Home
            </Link>
            <Link
              href={localePath(lang, "/services")}
              className="hover:underline"
            >
              {translate(dictionary, "nav.services")}
            </Link>
            <Link
              href={localePath(lang, "/projects")}
              className="hover:underline"
            >
              {translate(dictionary, "nav.ourWork")}
            </Link>
            <Link
              href={localePath(lang, "/pricing")}
              className="hover:underline"
            >
              Pricing
            </Link>
            <Link href={localePath(lang, "/about")} className="hover:underline">
              About
            </Link>
            <Button asChild size="sm">
              <a href={`mailto:${dictionary.mail.contact}`}>
                {translate(dictionary, "nav.contactUs")}
              </a>
            </Button>
          </nav>
        </div>
      </header>

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
            {[
              "Website Design & Development",
              "Admin Dashboards",
              "Managed Hosting",
              "Website Maintenance",
              "Content Updates",
              "SEO Monitoring",
            ].map((s) => (
              <div key={s} className="card">
                <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-700 font-semibold">
                  {s.split(" ").slice(0, 1)[0][0]}
                </div>
                <h3 className="mt-3 font-semibold">{s}</h3>
                <p className="mt-2 text-sm text-slate-600">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="why-choose-us" className="rounded-3xl bg-slate-100 p-10">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Fast Loading Websites",
                desc: "Optimized performance and quick page speeds.",
              },
              {
                title: "Mobile-First Design",
                desc: "Responsive layouts that work on all devices.",
              },
              {
                title: "Secure Hosting",
                desc: "SSL, backups, and security monitoring included.",
              },
              {
                title: "Ongoing Support",
                desc: "Regular maintenance and updates for peace of mind.",
              },
              {
                title: "Transparent Pricing",
                desc: "Clear pricing packages with no hidden fees.",
              },
              {
                title: "Direct Communication",
                desc: "Work directly with the founder, no middlemen.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="space-y-8">
          <h2 className="text-3xl font-bold">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                num: "1",
                title: "Discovery",
                desc: "Understanding your goals and requirements.",
              },
              {
                num: "2",
                title: "Design",
                desc: "Creating beautiful, user-focused layouts.",
              },
              {
                num: "3",
                title: "Development",
                desc: "Building with modern, maintainable code.",
              },
              {
                num: "4",
                title: "Launch",
                desc: "Deploying your site with care and support.",
              },
              {
                num: "5",
                title: "Support & Growth",
                desc: "Ongoing updates and scaling assistance.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 text-slate-900 font-bold text-lg">
                  {step.num}
                </div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="hosting"
          className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-8"
        >
          <div className="rounded-3xl bg-white p-10 shadow-lg shadow-slate-200/50">
            <p className="text-sky-600 font-semibold uppercase tracking-[0.24em] mb-3">
              {translate(dictionary, "hosting.heading")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              {translate(dictionary, "hosting.title")}
            </h2>
            <p className="mt-6 text-slate-600 leading-8">
              {translate(dictionary, "hosting.description")}
            </p>
            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-6">
                <h3 className="font-semibold">
                  {translate(dictionary, "hosting.infoTitle")}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {translate(dictionary, "hosting.infoDescription")}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-600">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p>{translate(dictionary, "hosting.infoFeature1")}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p>{translate(dictionary, "hosting.infoFeature2")}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p>{translate(dictionary, "hosting.infoFeature3")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-8 shadow-lg shadow-slate-200/40">
            <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200/50">
              <span className="text-sm uppercase tracking-[0.24em] text-sky-600">
                {translate(dictionary, "hosting.planLabel")}
              </span>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {translate(dictionary, "hosting.planPrice")}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {translate(dictionary, "hosting.planCycle")}
                  </p>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  {translate(dictionary, "hosting.paymentCta")}
                </div>
              </div>
              <p className="mt-6 text-slate-600 leading-7">
                {translate(dictionary, "hosting.planDescription")}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>• {translate(dictionary, "hosting.planFeature1")}</li>
                <li>• {translate(dictionary, "hosting.planFeature2")}</li>
                <li>• {translate(dictionary, "hosting.planFeature3")}</li>
              </ul>
              <Button asChild className="mt-8 inline-flex">
                <a
                  href={`mailto:${dictionary.mail.contact}?subject=Hosting%20Plan`}
                >
                  {translate(dictionary, "hosting.button")}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section id="testimonials" className="space-y-8">
          <h2 className="text-3xl font-bold">Client Testimonials</h2>
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
                <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4 font-semibold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-500">
                  {testimonial.company}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="work">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
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
                  View case study →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="pricing-preview"
          className="rounded-3xl bg-yellow-50 p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600">Website Projects</p>
              <p className="text-5xl font-bold text-slate-900">$2,500+</p>
            </div>
            <div>
              <p className="text-slate-600">Maintenance Plans</p>
              <p className="text-5xl font-bold text-slate-900">
                $99+<span className="text-lg">/mo</span>
              </p>
            </div>
          </div>
          <Button asChild className="mt-8">
            <Link href={localePath(lang, "/pricing")}>View All Plans</Link>
          </Button>
        </section>

        <section
          id="cta"
          className="rounded-3xl bg-slate-900 text-white p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Launch Your Next Website?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Let's work together to create a site that drives growth and engages
            your audience.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              className="bg-yellow-400 text-slate-900 hover:bg-yellow-500"
            >
              <a
                href={`mailto:${dictionary.mail.contact}?subject=Get%20a%20Quote`}
              >
                Get a Quote
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-slate-800"
            >
              <Link href={localePath(lang, "/contact")}>
                Schedule Consultation
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
