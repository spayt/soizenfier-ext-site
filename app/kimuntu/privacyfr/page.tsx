import Link from "next/link";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/lib/config";

const APP_NAME = "Ntu";
const DATE_VIGUEUR = "2026-01-01";

export const metadata = {
  title: "Ntu — Politique de confidentialité",
  description: "Politique de confidentialité de l'application mobile Ntu.",
};

const TOC = [
  { id: "introduction",  label: "Introduction" },
  { id: "collecte",      label: "Collecte et utilisation" },
  { id: "tierces",       label: "Services tiers" },
  { id: "paiements",     label: "Paiements" },
  { id: "journaux",      label: "Journaux de connexion" },
  { id: "cookies",       label: "Cookies" },
  { id: "conservation",  label: "Conservation des données" },
  { id: "suppression",   label: "Suppression des données" },
  { id: "droits",        label: "Vos droits" },
  { id: "securite",      label: "Sécurité" },
  { id: "liens",         label: "Liens externes" },
  { id: "enfants",       label: "Confidentialité des enfants" },
  { id: "modifications", label: "Modifications" },
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

export default function PrivacyPolicyFr() {
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
              ← Retour à la galerie
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 p-1">
              <Link
                href="/kimuntu/privacyen"
                className="rounded-full px-3.5 py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                EN
              </Link>
              <span className="rounded-full bg-violet-500 px-3.5 py-1 text-xs font-bold text-white">FR</span>
            </div>
          </div>

          <span className="w-8 h-0.5 rounded-full bg-violet-400 block mb-4" />
          <div className="flex flex-wrap items-end gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white text-balance">
              Politique de confidentialité
            </h1>
            <span className="inline-flex items-center rounded-full bg-violet-500/15 border border-violet-500/25 px-3 py-1 text-sm font-bold text-violet-300 mb-1">
              {APP_NAME}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">Dernière mise à jour : {DATE_VIGUEUR}</p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* ── SIDEBAR TOC ── */}
          <aside className="hidden lg:block shrink-0 w-56">
            <div className="sticky top-8 space-y-0.5">
              <p className="text-xs font-medium text-slate-500 mb-4 px-3">
                Sommaire
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
                <p>{COMPANY_NAME} a développé l'application {APP_NAME} en tant qu'application gratuite. Ce service est fourni gratuitement et est destiné à être utilisé tel quel.</p>
                <p>Cette page explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez {APP_NAME}.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={2} title="Collecte et utilisation des informations" id="collecte" />
              <Prose>
                <p>Pour fournir les fonctionnalités principales, nous pouvons traiter les données suivantes :</p>
                <BulletList items={[
                  "Informations de compte (email, ID utilisateur)",
                  "Historique des contributions et paiements",
                  "Statut de paiement (à jour ou en retard)",
                  "Contributions récurrentes planifiées",
                ]} />
                <p>Ces données sont utilisées strictement pour faire fonctionner et améliorer l'application.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={3} title="Services tiers" id="tierces" />
              <Prose>
                <p>Nous utilisons des services tiers tels que Firebase (Google) pour stocker et traiter des données. Ces services peuvent collecter des informations conformément à leurs propres politiques de confidentialité.</p>
                <BulletList items={["Firebase (Google) : firebase.google.com/support/privacy"]} />
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={4} title="Paiements" id="paiements" />
              <Prose>
                <p>{APP_NAME} utilise des prestataires de paiement tiers tels que Stripe et PayPal pour traiter les paiements.</p>
                <p>Nous ne stockons aucune information de carte de crédit ou bancaire. Toutes les transactions sont traitées directement par ces prestataires conformément à leurs propres politiques.</p>
                <BulletList items={[
                  "Stripe : stripe.com/privacy",
                  "PayPal : paypal.com/privacy",
                ]} />
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={5} title="Journaux de connexion" id="journaux" />
              <Prose>
                <p>En cas d'erreur, des données techniques peuvent être collectées telles que l'adresse IP, le type d'appareil, la version du système d'exploitation et les horodatages d'utilisation.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={6} title="Cookies" id="cookies" />
              <Prose>
                <p>Cette application n'utilise pas explicitement de cookies, mais les services tiers peuvent en utiliser pour améliorer leurs services.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={7} title="Conservation des données" id="conservation" />
              <Prose>
                <p>Nous conservons vos données uniquement aussi longtemps que nécessaire pour fournir le service.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={8} title="Suppression des données" id="suppression" />
              <Prose>
                <p>Vous pouvez demander la suppression de votre compte et des données associées à tout moment en nous contactant à{" "}
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-violet-400 hover:underline">{COMPANY_EMAIL}</a>.
                </p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={9} title="Vos droits" id="droits" />
              <Prose>
                <p>Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={10} title="Sécurité" id="securite" />
              <Prose>
                <p>Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos données, mais aucun système n'est totalement sécurisé.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={11} title="Liens externes" id="liens" />
              <Prose>
                <p>L'application peut contenir des liens vers des sites externes. Nous ne sommes pas responsables de leur contenu ou de leurs pratiques de confidentialité.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={12} title="Confidentialité des enfants" id="enfants" />
              <Prose>
                <p>Cette application n'est pas destinée aux enfants de moins de 13 ans. Nous ne collectons pas sciemment leurs données.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={13} title="Modifications de cette politique" id="modifications" />
              <Prose>
                <p>Cette politique peut être mise à jour de temps à autre. Les modifications seront publiées sur cette page.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={14} title="Contact" id="contact" />
              <Prose>
                <p>Pour toute question, contactez-nous à :{" "}
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
                ← Retour à la galerie Kimuntu
              </Link>
            </div>

          </main>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} {COMPANY_NAME} · Application mobile {APP_NAME}</p>
          <div className="flex gap-5 text-xs text-slate-600">
            <Link href="/kimuntu" className="hover:text-slate-400 transition-colors">Galerie</Link>
            <Link href="/kimuntu/privacyen" className="hover:text-slate-400 transition-colors">Privacy (EN)</Link>
            <Link href="/kimuntu/privacyfr" className="text-violet-400">Politique (FR)</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
