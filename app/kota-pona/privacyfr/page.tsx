import Link from "next/link";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/lib/config";

const APP_NAME = "Kota-Pona";
const DATE_UPDATED = "17 juillet 2026";

export const metadata = {
  title: "Kota-Pona — Politique de confidentialité",
  description: "Politique de confidentialité de l'application mobile Kota-Pona.",
};

const TOC = [
  { id: "introduction",  label: "Introduction" },
  { id: "collecte",      label: "Collecte et utilisation" },
  { id: "journaux",      label: "Données du journal" },
  { id: "cookies",       label: "Les cookies" },
  { id: "fournisseurs",  label: "Les fournisseurs de services" },
  { id: "securite",      label: "Sécurité" },
  { id: "paiements",     label: "Commandes, réservations et paiements" },
  { id: "liens",         label: "Liens vers d'autres sites" },
  { id: "enfants",       label: "Confidentialité des enfants" },
  { id: "modifications", label: "Modifications" },
  { id: "contact",       label: "Nous contacter" },
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

export default function KotaPonaPrivacyFr() {
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
              ← Retour à la galerie
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 p-1">
              <Link
                href="/kota-pona/privacyen"
                className="rounded-full px-3.5 py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                EN
              </Link>
              <span className="rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white">FR</span>
            </div>
          </div>

          <span className="w-8 h-0.5 rounded-full bg-emerald-400 block mb-4" />
          <div className="flex flex-wrap items-end gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white text-balance">
              Politique de confidentialité
            </h1>
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 text-sm font-bold text-emerald-300 mb-1">
              {APP_NAME}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">En vigueur à compter du {DATE_UPDATED}</p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* ── SIDEBAR TOC ── */}
          <aside className="hidden lg:block shrink-0 w-56">
            <div className="sticky top-8 space-y-0.5">
              <p className="text-xs font-medium text-slate-500 mb-4 px-3">Sommaire</p>
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
                <p>{COMPANY_NAME} a développé l&apos;application {APP_NAME}, offerte gratuitement. Ce service est fourni par {COMPANY_NAME} sans frais et est destiné à être utilisé tel quel.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={2} title="Collecte et utilisation des informations" id="collecte" />
              <Prose>
                <p>Pour une meilleure expérience, lors de l&apos;utilisation de notre service, nous pouvons vous demander de nous fournir certaines informations personnellement identifiables.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={3} title="Données du journal" id="journaux" />
              <Prose>
                <p>Nous tenons à vous informer que chaque fois que vous utilisez notre service, en cas d&apos;erreur dans l&apos;application, nous collectons des données et des informations (via des produits tiers) sur votre téléphone appelées Log Data.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={4} title="Les cookies" id="cookies" />
              <Prose>
                <p>Les cookies sont des fichiers contenant une petite quantité de données qui sont couramment utilisés comme identifiants uniques anonymes.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={5} title="Les fournisseurs de services" id="fournisseurs" />
              <Prose>
                <p>Nous pouvons employer des sociétés tierces et des particuliers pour les raisons suivantes : pour faciliter notre service ; pour fournir le service en notre nom ; pour exécuter des services liés au service ; ou pour nous aider à analyser l&apos;utilisation de notre service. Cela inclut notamment notre fournisseur de traitement des paiements, Stripe.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={6} title="Sécurité" id="securite" />
              <Prose>
                <p>Nous apprécions votre confiance en nous fournissant vos informations personnelles, c&apos;est pourquoi nous nous efforçons d&apos;utiliser des moyens commercialement acceptables pour les protéger.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={7} title="Commandes, réservations et paiements" id="paiements" />
              <Prose>
                <p>Lorsque vous payez une commande ou une réservation de service, les fonds sont conservés en sécurité par la plateforme et ne sont versés au vendeur (et à un éventuel partenaire) qu&apos;une fois la prestation confirmée — jamais au moment du paiement lui-même.</p>
                <p>Une fois que le vendeur indique que votre commande a été livrée (ou que le service a été rendu), vous recevrez une notification vous demandant de confirmer dans l&apos;application que vous avez bien reçu votre commande ou bénéficié du service. C&apos;est cette confirmation qui déclenche le paiement du vendeur.</p>
                <p>Si vous ne répondez pas, la commande ou la réservation est automatiquement considérée comme confirmée et le vendeur est payé après un délai de 3 jours.</p>
                <p>Si vous signalez un problème au lieu de confirmer, la commande ou la réservation n&apos;est ni annulée ni payée automatiquement : elle est mise en attente et examinée par notre équipe, qui détermine ensuite si vous êtes remboursé ou si le vendeur est payé.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={8} title="Liens vers d'autres sites" id="liens" />
              <Prose>
                <p>Ce service peut contenir des liens vers d&apos;autres sites. Si vous cliquez sur un lien tiers, vous serez dirigé vers ce site.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={9} title="Confidentialité des enfants" id="enfants" />
              <Prose>
                <p>Ces Services ne s&apos;adressent à personne de moins de 13 ans.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={10} title="Modifications de cette politique de confidentialité" id="modifications" />
              <Prose>
                <p>Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Cette politique est en vigueur à compter du {DATE_UPDATED}.</p>
              </Prose>
            </section>

            <div className="h-px bg-white/5" />

            <section>
              <SectionHeading index={11} title="Nous contacter" id="contact" />
              <Prose>
                <p>Si vous avez des questions ou des suggestions concernant notre politique de confidentialité, n&apos;hésitez pas à nous contacter à{" "}
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
                ← Retour à la galerie Kota-Pona
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
            <Link href="/kota-pona" className="hover:text-slate-400 transition-colors">Galerie</Link>
            <Link href="/kota-pona/privacyen" className="hover:text-slate-400 transition-colors">Privacy (EN)</Link>
            <Link href="/kota-pona/privacyfr" className="text-emerald-400">Politique (FR)</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
