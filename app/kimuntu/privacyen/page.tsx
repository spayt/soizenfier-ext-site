import Link from "next/link";

const APP_NAME = "Ntu";
const COMPANY_NAME = "SoiZenFier";
const COMPANY_EMAIL = "admin@soizenfier.com";
const DATE_VIGUEUR = "2026-01-01";

export const metadata = {
  title: "Ntu Privacy Policy - English",
  description: "Privacy policy for the Ntu mobile application in English.",
};

export default function PrivacyPolicyEn() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold">{APP_NAME} Privacy Policy</h1>
              <p className="mt-2 text-sm text-slate-600">Last updated: {DATE_VIGUEUR}</p>
            </div>
            <Link href="/kimuntu" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Back to Ntu gallery
            </Link>
          </div>
        </div>

        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <section className="space-y-4">
            <p>
              {COMPANY_NAME} developed the {APP_NAME} application as a free app. This
              service is provided at no cost and is intended for use as is.
            </p>
            <p>
              This page explains how we collect, use, and protect your information when using {APP_NAME}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information Collection and Use</h2>
            <p>To provide core functionality, we may process the following data:</p>
            <ul className="space-y-2 pl-5 text-slate-700">
              <li>• Account information (email, user ID)</li>
              <li>• Contribution and payment records</li>
              <li>• Payment status (up to date or overdue)</li>
              <li>• Scheduled recurring contributions</li>
            </ul>
            <p>This data is used strictly to operate and improve the application.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            <p>
              We use third-party services such as Firebase (Google) to store and process data.
              These services may collect information in accordance with their own privacy policies.
            </p>
            <ul className="space-y-2 pl-5 text-slate-700">
              <li>
                <strong>Firebase (Google):</strong> https://firebase.google.com/support/privacy
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Payments</h2>
            <p>
              {APP_NAME} uses third-party payment providers such as Stripe and PayPal to process payments.
            </p>
            <p>
              We do not store any credit card or banking information. All payment transactions are handled directly by these providers in accordance with their own privacy and security policies.
            </p>
            <p>More information:</p>
            <ul className="space-y-2 pl-5 text-slate-700">
              <li>• Stripe: https://stripe.com/privacy</li>
              <li>• PayPal: https://www.paypal.com/privacy</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Log Data</h2>
            <p>
              In case of an error, technical data may be collected such as IP address,
              device type, operating system version, and usage timestamps.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cookies</h2>
            <p>
              This application does not explicitly use cookies, but third-party services may use them to improve their services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Retention</h2>
            <p>We retain your data only for as long as necessary to provide the service.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Deletion</h2>
            <p>
              You may request deletion of your account and associated data at any time by contacting us at {COMPANY_EMAIL}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Security</h2>
            <p>
              We implement reasonable security measures to protect your data, but no system is fully secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">External Links</h2>
            <p>
              The app may contain links to external sites. We are not responsible for their content or privacy practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Children&apos;s Privacy</h2>
            <p>
              This application is not intended for children under 13. We do not knowingly collect their data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
            <p>
              This policy may be updated from time to time. Changes will be posted on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p>For any questions, contact us at: {COMPANY_EMAIL}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
