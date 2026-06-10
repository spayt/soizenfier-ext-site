import Link from "next/link";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/lib/config";

const APP_NAME = "Ntu";
const DATE_VIGUEUR = "2026-01-01";

export const metadata = {
  title: "Ntu — Privacy Policy",
  description: "Privacy policy for the Ntu mobile application.",
};

const TOC = [
  { id: "introduction",  label: "Introduction" },
  { id: "collection",    label: "Information Collection & Use" },
  { id: "thirdparty",   label: "Third-Party Services" },
  { id: "payments",      label: "Payments" },
  { id: "logs",          label: "Log Data" },
  { id: "cookies",       label: "Cookies" },
  { id: "retention",     label: "Data Retention" },
  { id: "deletion",      label: "Data Deletion" },
  { id: "rights",        label: "Your Rights" },
  { id: "security",      label: "Security" },
  { id: "links",         label: "External Links" },
  { id: "children",      label: "Children's Privacy" },
  { id: "changes",       label: "Changes to This Policy" },
  { id: "contact",       label: "Contact" },
];

function SectionHeading({ index, title, id }: { index: number; title: string; id: string }) {
  return (
    <div id={id} className="flex items-baseline gap-3 mb-5 pt-2">
      <span className="shrink-0 text-[11px] font-black text-violet-400/50 tabular-nums select-none">
        {String(index).padStart(2, "0")}
      </span>
      <h2 className="text-xl font-bold text-white leading-tight text-balance">{title}</h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 text-sm text-slate-400 leading-relaxed">{children}</div>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyEn() {
  return (
    <div className="min-h-screen bg-[#06060a] text-white">

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/5 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-violet-600/8 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <Link
              href="/kimuntu"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-violet-400 transition-colors"
            >
              ← Back to gallery
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 p-1">
              <span className="rounded-full bg-violet-500 px-3.5 py-1 text-xs font-bold text-white">EN</span>
              <Link
                href="/kimuntu/privacyfr"
                className="rounded-full px-3.5 py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                FR
              </Link>
            </div>
          </div>

          <span className="w-8 h-0.5 rounded-full bg-violet-400 block mb-4" />
          <div className="flex flex-wrap items-end gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white text-balance">
              Privacy Policy
            </h1>
            <span className="inline-flex items-center rounded-full bg-violet-500/15 border border-violet-500/25 px-3 py-1 text-sm font-bold text-violet-300 mb-1">
              {APP_NAME}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">Last updated: {DATE_VIGUEUR}</p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* ── SIDEBAR TOC ── */}
          <aside className="hidden lg:block shrink-0 w-56">
            <div className="sticky top-8 space-y-0.5">
              <p className="text-xs font-medium text-slate-500 mb-4 px-3">
                Contents
              </p>
              {TOC.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-slate-500 hover:text-violet-400 hover:bg-violet-500/6 transition-all duration-150"
                >
                  <span className="shrink-0 text-[10px] font-black tabular-nums text-slate-700 group-hover:text-violet-500">
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
                <p>{COMPANY_NAME} developed the {APP_NAME} application as a free app. This service is provided at no cost and is intended for use as is.</p>
                <p>This page explains how we collect, use, and protect your information when using {APP_NAME}.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={2} title="Information Collection and Use" id="collection" />
              <Prose>
                <p>To provide core functionality, we may process the following data:</p>
                <BulletList items={[
                  "Account information (email, user ID)",
                  "Contribution and payment records",
                  "Payment status (up to date or overdue)",
                  "Scheduled recurring contributions",
                ]} />
                <p>This data is used strictly to operate and improve the application.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={3} title="Third-Party Services" id="thirdparty" />
              <Prose>
                <p>We use third-party services such as Firebase (Google) to store and process data. These services may collect information in accordance with their own privacy policies.</p>
                <BulletList items={["Firebase (Google): firebase.google.com/support/privacy"]} />
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={4} title="Payments" id="payments" />
              <Prose>
                <p>{APP_NAME} uses third-party payment providers such as Stripe and PayPal to process payments.</p>
                <p>We do not store any credit card or banking information. All payment transactions are handled directly by these providers in accordance with their own privacy and security policies.</p>
                <BulletList items={[
                  "Stripe: stripe.com/privacy",
                  "PayPal: paypal.com/privacy",
                ]} />
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={5} title="Log Data" id="logs" />
              <Prose>
                <p>In case of an error, technical data may be collected such as IP address, device type, operating system version, and usage timestamps.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={6} title="Cookies" id="cookies" />
              <Prose>
                <p>This application does not explicitly use cookies, but third-party services may use them to improve their services.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={7} title="Data Retention" id="retention" />
              <Prose>
                <p>We retain your data only for as long as necessary to provide the service.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={8} title="Data Deletion" id="deletion" />
              <Prose>
                <p>You may request deletion of your account and associated data at any time by contacting us at{" "}
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-violet-400 hover:underline">{COMPANY_EMAIL}</a>.
                </p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={9} title="Your Rights" id="rights" />
              <Prose>
                <p>You have the right to access, correct, or delete your personal data.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={10} title="Security" id="security" />
              <Prose>
                <p>We implement reasonable security measures to protect your data, but no system is fully secure.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={11} title="External Links" id="links" />
              <Prose>
                <p>The app may contain links to external sites. We are not responsible for their content or privacy practices.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={12} title="Children's Privacy" id="children" />
              <Prose>
                <p>This application is not intended for children under 13. We do not knowingly collect their data.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={13} title="Changes to This Policy" id="changes" />
              <Prose>
                <p>This policy may be updated from time to time. Changes will be posted on this page.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={14} title="Contact" id="contact" />
              <Prose>
                <p>For any questions, contact us at:{" "}
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-violet-400 hover:underline">{COMPANY_EMAIL}</a>
                </p>
              </Prose>
            </section>

            {/* Back link */}
            <div className="pt-6 border-t border-white/5">
              <Link
                href="/kimuntu"
                className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-200"
              >
                ← Back to Kimuntu gallery
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
            <Link href="/kimuntu" className="hover:text-slate-400 transition-colors">Gallery</Link>
            <Link href="/kimuntu/privacyen" className="text-violet-400">Privacy (EN)</Link>
            <Link href="/kimuntu/privacyfr" className="hover:text-slate-400 transition-colors">Privacy (FR)</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
