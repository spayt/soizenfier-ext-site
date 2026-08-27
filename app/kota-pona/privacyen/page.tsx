import Link from "next/link";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/lib/config";

const APP_NAME = "Kota-Pona";
const DATE_UPDATED = "July 17, 2026";

export const metadata = {
  title: "Kota-Pona — Privacy Policy",
  description: "Privacy policy for the Kota-Pona mobile application.",
};

const TOC = [
  { id: "introduction",  label: "Introduction" },
  { id: "collection",   label: "Information Collection and Use" },
  { id: "logs",         label: "Log Data" },
  { id: "cookies",      label: "Cookies" },
  { id: "providers",    label: "Service Providers" },
  { id: "security",     label: "Security" },
  { id: "payments",     label: "Orders, Bookings and Payments" },
  { id: "links",        label: "Links to Other Sites" },
  { id: "children",     label: "Children's Privacy" },
  { id: "changes",      label: "Changes to This Policy" },
  { id: "contact",      label: "Contact Us" },
];

function SectionHeading({ index, title, id }: { index: number; title: string; id: string }) {
  return (
    <div id={id} className="flex items-baseline gap-3 mb-5 pt-2">
      <span className="shrink-0 text-[11px] font-black text-emerald-400/50 tabular-nums select-none">
        {String(index).padStart(2, "0")}
      </span>
      <h2 className="text-xl font-bold text-white leading-tight text-balance">{title}</h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 text-sm text-slate-400 leading-relaxed">{children}</div>;
}

export default function KotaPonaPrivacyEn() {
  return (
    <div className="min-h-screen bg-[#06060a] text-white">

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/5 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-emerald-600/8 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <Link
              href="/kota-pona"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-400 transition-colors"
            >
              ← Back to gallery
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 p-1">
              <span className="rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white">EN</span>
              <Link
                href="/kota-pona/privacyfr"
                className="rounded-full px-3.5 py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                FR
              </Link>
            </div>
          </div>

          <span className="w-8 h-0.5 rounded-full bg-emerald-400 block mb-4" />
          <div className="flex flex-wrap items-end gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white text-balance">
              Privacy Policy
            </h1>
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 text-sm font-bold text-emerald-300 mb-1">
              {APP_NAME}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">Effective as of {DATE_UPDATED}</p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* ── SIDEBAR TOC ── */}
          <aside className="hidden lg:block shrink-0 w-56">
            <div className="sticky top-8 space-y-0.5">
              <p className="text-xs font-medium text-slate-500 mb-4 px-3">Contents</p>
              {TOC.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/6 transition-all duration-150"
                >
                  <span className="shrink-0 text-[10px] font-black tabular-nums text-slate-700 group-hover:text-emerald-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          {/* ── SECTIONS ── */}
          <main className="flex-1 min-w-0 space-y-10">

            <section>
              <SectionHeading index={1} title="Introduction" id="introduction" />
              <Prose>
                <p>{COMPANY_NAME} built the {APP_NAME} app as a free app. This Service is provided by {COMPANY_NAME} at no cost and is intended for use as is.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={2} title="Information Collection and Use" id="collection" />
              <Prose>
                <p>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={3} title="Log Data" id="logs" />
              <Prose>
                <p>We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={4} title="Cookies" id="cookies" />
              <Prose>
                <p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={5} title="Service Providers" id="providers" />
              <Prose>
                <p>We may employ third-party companies and individuals to facilitate our Service; to provide the Service on our behalf; to perform Service-related services; or to assist us in analyzing how our Service is used. This includes our payment processing provider, Stripe.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={6} title="Security" id="security" />
              <Prose>
                <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={7} title="Orders, Bookings and Payments" id="payments" />
              <Prose>
                <p>When you pay for an order or a service booking, the funds are held securely by the platform and are only released to the seller (and to a referral partner, if any) once the order or service has been confirmed as completed — never at the moment payment is made.</p>
                <p>Once the seller marks your order as delivered (or your service as completed), the app will ask whether everything went well. It&apos;s your response that releases payment to the seller.</p>
                <p>If you don&apos;t respond, the order or booking is automatically treated as confirmed and the seller is paid after a grace period of 3 days.</p>
                <p>If you report a problem instead of confirming, the order or booking is neither cancelled nor paid out automatically: it&apos;s placed on hold and reviewed by our team, who then decide whether you are refunded or the seller is paid.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={8} title="Links to Other Sites" id="links" />
              <Prose>
                <p>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={9} title="Children's Privacy" id="children" />
              <Prose>
                <p>These Services do not address anyone under the age of 13.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={10} title="Changes to This Privacy Policy" id="changes" />
              <Prose>
                <p>We may update our Privacy Policy from time to time. This policy is effective as of {DATE_UPDATED}.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={11} title="Contact Us" id="contact" />
              <Prose>
                <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at{" "}
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-emerald-400 hover:underline">{COMPANY_EMAIL}</a>.
                </p>
              </Prose>
            </section>

            {/* Back link */}
            <div className="pt-6 border-t border-white/5">
              <Link
                href="/kota-pona"
                className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
              >
                ← Back to Kota-Pona gallery
              </Link>
            </div>

          </main>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} {COMPANY_NAME} · {APP_NAME} Mobile App</p>
          <div className="flex gap-5 text-xs text-slate-600">
            <Link href="/kota-pona" className="hover:text-slate-400 transition-colors">Gallery</Link>
            <Link href="/kota-pona/privacyen" className="text-emerald-400">Privacy (EN)</Link>
            <Link href="/kota-pona/privacyfr" className="hover:text-slate-400 transition-colors">Privacy (FR)</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
