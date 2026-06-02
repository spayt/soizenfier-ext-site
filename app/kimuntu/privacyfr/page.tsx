import Link from "next/link";

const APP_NAME = "Ntu";
const COMPANY_NAME = "SoiZenFier";
const COMPANY_EMAIL = "admin@soizenfier.com";
const DATE_VIGUEUR = "2026-01-01";

export const metadata = {
  title: "Politique de confidentialité Ntu",
  description:
    "Politique de confidentialité de l'application mobile Ntu en français.",
};

export default function PrivacyPolicyFr() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold">
                Politique de confidentialité {APP_NAME}
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Dernière mise à jour : {DATE_VIGUEUR}
              </p>
            </div>
            <Link
              href="/kimuntu"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Retour à la galerie Ntu
            </Link>
          </div>
        </div>

        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <section className="space-y-4">
            <p>
              {COMPANY_NAME} a développé l'application {APP_NAME} en tant
              qu'application gratuite. Ce service est fourni gratuitement et est
              destiné à être utilisé tel quel.
            </p>
            <p>
              Cette page explique comment nous collectons, utilisons et
              protégeons vos informations lorsque vous utilisez {APP_NAME}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Collecte et utilisation des informations
            </h2>
            <p>
              Pour fournir les fonctionnalités principales, nous pouvons traiter
              les données suivantes :
            </p>
            <ul className="space-y-2 pl-5 text-slate-700">
              <li>• Informations de compte (email, ID utilisateur)</li>
              <li>• Historique des contributions et paiements</li>
              <li>• Statut de paiement (à jour ou en retard)</li>
              <li>• Contributions récurrentes planifiées</li>
            </ul>
            <p>
              Ces données sont utilisées strictement pour faire fonctionner et
              améliorer l'application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Services tiers</h2>
            <p>
              Nous utilisons des services tiers tels que Firebase (Google) pour
              stocker et traiter des données. Ces services peuvent collecter des
              informations conformément à leurs propres politiques de
              confidentialité.
            </p>
            <ul className="space-y-2 pl-5 text-slate-700">
              <li>
                <strong>Firebase (Google) :</strong>{" "}
                https://firebase.google.com/support/privacy
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Paiements</h2>
            <p>
              {APP_NAME} utilise des prestataires de paiement tiers tels que
              Stripe et PayPal pour traiter les paiements.
            </p>
            <p>
              Nous ne stockons aucune information de carte de crédit ou
              bancaire. Toutes les transactions de paiement sont traitées
              directement par ces prestataires conformément à leurs propres
              politiques de confidentialité et de sécurité.
            </p>
            <p>Plus d'informations :</p>
            <ul className="space-y-2 pl-5 text-slate-700">
              <li>• Stripe : https://stripe.com/privacy</li>
              <li>• PayPal : https://www.paypal.com/privacy</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Journaux de connexion</h2>
            <p>
              En cas d'erreur, des données techniques peuvent être collectées
              telles que l'adresse IP, le type d'appareil, la version du système
              d'exploitation et les horodatages d'utilisation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cookies</h2>
            <p>
              Cette application n'utilise pas explicitement de cookies, mais les
              services tiers peuvent en utiliser pour améliorer leurs services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Conservation des données</h2>
            <p>
              Nous conservons vos données uniquement aussi longtemps que
              nécessaire pour fournir le service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Suppression des données</h2>
            <p>
              Vous pouvez demander la suppression de votre compte et des données
              associées à tout moment en nous contactant à {COMPANY_EMAIL}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Vos droits</h2>
            <p>
              Vous avez le droit d'accéder, de corriger ou de supprimer vos
              données personnelles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité raisonnables pour
              protéger vos données, mais aucun système n'est totalement
              sécurisé.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Liens externes</h2>
            <p>
              L'application peut contenir des liens vers des sites externes.
              Nous ne sommes pas responsables de leur contenu ou de leurs
              pratiques de confidentialité.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Confidentialité des enfants
            </h2>
            <p>
              Cette application n'est pas destinée aux enfants de moins de 13
              ans. Nous ne collectons pas sciemment leurs données.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Modifications de cette politique
            </h2>
            <p>
              Cette politique peut être mise à jour de temps à autre. Les
              modifications seront publiées sur cette page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p>Pour toute question, contactez-nous à : {COMPANY_EMAIL}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
