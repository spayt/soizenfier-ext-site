"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "@/lib/firebase";
import { ensureUserDocument } from "@/lib/user";
import { type TranslationDictionary, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import SignInDialog from "@/components/SignInDialog";
import Link from "next/link";

type SubscriptionData = {
  id: string;
  planName: string | null;
  status: string;
  price_id: string | null;
  amount: number | null;
  currency: string | null;
  interval: string | null;
  current_period_end: { seconds: number } | null;
  cancel_at: { seconds: number } | null;
  canceled_at: { seconds: number } | null;
};

type UserDocument = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  createdAt: { seconds: number } | null;
  stripeCustomerId: string | null;
  subscription: SubscriptionData | null;
};

type ProfilePageClientProps = {
  dictionary: TranslationDictionary;
  locale: Locale;
};

function formatDate(timestamp: { seconds: number } | null): string {
  if (!timestamp) return "—";
  return new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getInitials(name: string | null, email: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return (email?.[0] ?? "?").toUpperCase();
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; dot: string; label: string }> = {
    active:     { bg: "bg-emerald-400/15 text-emerald-400 border-emerald-400/20", dot: "bg-emerald-400", label: "Active" },
    trialing:   { bg: "bg-sky-400/15 text-sky-400 border-sky-400/20",             dot: "bg-sky-400",     label: "Trialing" },
    past_due:   { bg: "bg-amber-400/15 text-amber-400 border-amber-400/20",       dot: "bg-amber-400",   label: "Past Due" },
    canceled:   { bg: "bg-slate-400/15 text-slate-400 border-slate-400/20",       dot: "bg-slate-400",   label: "Canceled" },
    incomplete: { bg: "bg-rose-400/15 text-rose-400 border-rose-400/20",          dot: "bg-rose-400",    label: "Incomplete" },
  };
  const s = map[status] ?? map.incomplete;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${s.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export default function ProfilePageClient({ dictionary, locale }: ProfilePageClientProps) {
  const t = dictionary.profilePage;
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [fromCheckout, setFromCheckout] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      setFromCheckout(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    let unsubUserDoc: (() => void) | null = null;
    const unsubAuth = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      unsubUserDoc?.();
      unsubUserDoc = null;
      if (!currentUser) {
        setUserDoc(null);
        setLoading(false);
        return;
      }
      ensureUserDocument(currentUser).catch(console.error);
      const userRef = doc(firebaseFirestore, "users", currentUser.uid);
      unsubUserDoc = onSnapshot(userRef, (snap) => {
        if (!snap.exists()) { setLoading(false); return; }
        setUserDoc(snap.data() as UserDocument);
        setLoading(false);
      });
    });
    return () => { unsubAuth(); unsubUserDoc?.(); };
  }, []);

  const handleSignOut = async () => {
    await signOut(firebaseAuth);
    setUserDoc(null);
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    setError(null);
    try {
      const currentUser = firebaseAuth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const token = await currentUser.getIdToken();
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ returnUrl: `${window.location.origin}/${locale}/profile` }),
      });
      const data = await response.json();
      if (!response.ok || !data?.url) throw new Error(data?.error || "Unable to open portal.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="relative rounded-3xl bg-slate-900 border border-white/8 p-10 shadow-2xl max-w-md w-full text-center space-y-6 overflow-hidden">
          <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto text-2xl">
            👤
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{t.title}</h1>
            <p className="text-slate-400 mt-2 text-sm">{t.signInRequired}</p>
          </div>
          <button
            type="button"
            onClick={() => setSignInOpen(true)}
            className="w-full rounded-2xl bg-yellow-400 py-3 text-sm font-bold text-slate-900 hover:bg-yellow-300 transition-all duration-200 hover:scale-[1.02]"
          >
            {t.signIn}
          </button>
        </div>
        <SignInDialog open={signInOpen} onOpenChange={setSignInOpen} />
      </div>
    );
  }

  const subscription = userDoc?.subscription ?? null;
  const hasSubscription = subscription && subscription.status !== "canceled";
  const awaitingSubscription = fromCheckout && !hasSubscription;
  const isAdministrator = userDoc?.role === "Administrator";
  const initials = getInitials(user.displayName, user.email);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── HERO BANNER ── */}
      <div className="relative bg-slate-950 border-b border-white/6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_0%,rgba(250,204,21,0.10)_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-400/5 blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-slate-900 font-black text-xl shadow-lg shadow-yellow-400/20 shrink-0">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-black text-white">
                    {user.displayName || user.email?.split("@")[0] || t.title}
                  </h1>
                  {isAdministrator && (
                    <span className="inline-flex items-center rounded-full bg-yellow-400 px-2.5 py-0.5 text-xs font-bold text-slate-900">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mt-0.5">{user.email}</p>
                {userDoc?.createdAt && (
                  <p className="text-slate-500 text-xs mt-1">{t.memberSince} {formatDate(userDoc.createdAt)}</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              {t.signOut}
              <span className="text-slate-500">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">

        {/* Success banner */}
        {fromCheckout && (
          <div className="rounded-2xl bg-emerald-400/10 border border-emerald-400/20 p-4 flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-bold text-emerald-400">Payment successful — thank you!</p>
              <p className="text-xs text-emerald-400/70 mt-0.5">Your subscription is being activated. This page updates automatically.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-rose-400/10 border border-rose-400/20 p-4 text-sm text-rose-400">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-5 gap-6">

          {/* ── LEFT COLUMN: Account + Hosting ── */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Account info */}
            <div className="rounded-3xl bg-slate-900 border border-white/8 p-7 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 rounded-full bg-yellow-400" />
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest">{t.accountInfo}</h2>
              </div>

              <dl className="space-y-4">
                {[
                  { label: t.name,  value: user.displayName || "—" },
                  { label: t.email, value: user.email || "—" },
                  { label: t.role,  value: userDoc?.role || "User" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs text-slate-500 font-medium mb-0.5">{label}</dt>
                    <dd className="text-sm text-white font-medium">{value}</dd>
                  </div>
                ))}
              </dl>

              {isAdministrator && (
                <Link
                  href={`/${locale}/admin`}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 text-xs font-bold text-yellow-400 hover:bg-yellow-400/20 transition-colors w-fit"
                >
                  Admin Dashboard →
                </Link>
              )}
            </div>

            {/* Hosting */}
            <div className="rounded-3xl bg-slate-900 border border-white/8 p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 rounded-full bg-yellow-400" />
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest">{t.hostingInfo}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                <span className="text-sm font-semibold text-emerald-400">{t.hostingActive}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{t.hostingDescription}</p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Plan ── */}
          <div className="md:col-span-3">
            {hasSubscription ? (
              <div className="relative rounded-3xl bg-slate-900 border border-white/8 p-8 flex flex-col gap-6 overflow-hidden h-full">
                <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-yellow-400/8 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-8 h-0.5 rounded-full bg-yellow-400" />
                      <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest">{t.currentPlan}</h2>
                    </div>
                    <p className="text-3xl font-black text-yellow-400 mt-4">
                      {subscription.planName || "—"}
                    </p>
                    {subscription.interval && (
                      <p className="text-xs text-slate-500 mt-1 capitalize">Billed {subscription.interval}ly</p>
                    )}
                  </div>
                  <StatusPill status={subscription.status} />
                </div>

                {subscription.amount != null && (
                  <div className="relative rounded-2xl bg-white/4 border border-white/8 px-5 py-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Price</span>
                    <span className="text-lg font-black text-white">
                      {new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency: subscription.currency?.toUpperCase() ?? "USD",
                      }).format(subscription.amount / 100)}
                      {subscription.interval && (
                        <span className="text-xs font-normal text-slate-500"> / {subscription.interval}</span>
                      )}
                    </span>
                  </div>
                )}

                <div className="relative space-y-3">
                  {(subscription.cancel_at
                    ? [{ label: t.planCancels, value: formatDate(subscription.cancel_at) }]
                    : subscription.current_period_end
                    ? [{ label: t.planRenews, value: formatDate(subscription.current_period_end) }]
                    : []
                  ).map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm border-t border-white/6 pt-3">
                      <span className="text-slate-500">{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="relative flex flex-wrap gap-3 mt-auto pt-2">
                  {userDoc?.stripeCustomerId && (
                    <button
                      type="button"
                      onClick={handleManageSubscription}
                      disabled={portalLoading}
                      className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-2.5 text-sm font-bold text-slate-900 hover:bg-yellow-300 transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
                    >
                      {portalLoading ? t.loadingPortal : t.manageSubscription}
                    </button>
                  )}
                  <Link
                    href={`/${locale}/pricing`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                  >
                    {t.changePlan}
                  </Link>
                </div>
              </div>
            ) : awaitingSubscription ? (
              <div className="rounded-3xl bg-slate-900 border border-yellow-400/20 p-8 flex flex-col items-center justify-center gap-5 min-h-48 text-center">
                <div className="w-10 h-10 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
                <p className="text-sm text-slate-400">Setting up your subscription…</p>
              </div>
            ) : (
              <div className="relative rounded-3xl bg-slate-900 border border-white/8 p-8 flex flex-col items-center justify-center gap-6 min-h-64 text-center overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(250,204,21,0.07)_0%,transparent_70%)]" />
                <div className="relative w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-2xl">
                  ✦
                </div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white">{t.noPlan}</h3>
                  <p className="text-xs text-slate-500 mt-1">Choose a plan to unlock all features.</p>
                </div>
                <Link
                  href={`/${locale}/pricing`}
                  className="relative inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-8 py-3 text-sm font-bold text-slate-900 hover:bg-yellow-300 transition-all duration-200 hover:scale-[1.03]"
                >
                  {t.changePlan} →
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
