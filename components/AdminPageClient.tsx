"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "@/lib/firebase";
import { type TranslationDictionary, type Locale } from "@/lib/i18n";
import { websitePackages } from "@/lib/pricing";
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
  websitePackage: string | null;
  domain: string | null;
};

type UserDocument = {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: string;
  createdAt: { seconds: number } | null;
  stripeCustomerId: string | null;
  subscriptions: Record<string, SubscriptionData> | null;
};

type AdminPageClientProps = {
  dictionary: TranslationDictionary;
  locale: Locale;
};

function formatDate(ts: { seconds: number } | null): string {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
}

function formatMoney(amount: number | null, currency: string | null): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency?.toUpperCase() ?? "USD",
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, { dot: string; text: string; bg: string }> = {
    active:     { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    trialing:   { dot: "bg-sky-400",     text: "text-sky-400",     bg: "bg-sky-400/10 border-sky-400/20" },
    past_due:   { dot: "bg-amber-400",   text: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20" },
    canceled:   { dot: "bg-slate-500",   text: "text-slate-400",   bg: "bg-slate-500/10 border-slate-500/20" },
    incomplete: { dot: "bg-rose-400",    text: "text-rose-400",    bg: "bg-rose-400/10 border-rose-400/20" },
  };
  const s = map[status] ?? map.incomplete;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
}

// ── Per-subscription editable card ───────────────────────────────────────────
function SubCard({ userId, sub }: { userId: string; sub: SubscriptionData }) {
  const [pkg, setPkg] = useState(sub.websitePackage ?? "");
  const [domainDraft, setDomainDraft] = useState(sub.domain ?? "");
  const [savedDomain, setSavedDomain] = useState(sub.domain ?? "");
  const [savingDomain, setSavingDomain] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePackageChange = async (value: string) => {
    setPkg(value);
    await updateDoc(doc(firebaseFirestore, "users", userId), {
      [`subscriptions.${sub.id}.websitePackage`]: value || null,
    });
  };

  const handleDomainSave = async () => {
    setSavingDomain(true);
    const trimmed = domainDraft.trim();
    await updateDoc(doc(firebaseFirestore, "users", userId), {
      [`subscriptions.${sub.id}.domain`]: trimmed || null,
    });
    setSavedDomain(trimmed);
    setSavingDomain(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectedPkg = websitePackages.find((p) => p.id === pkg);

  return (
    <div className="rounded-2xl bg-white/3 border border-white/6 px-4 py-4 flex flex-col gap-3">
      {/* Plan info */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white">{sub.planName || "—"}</p>
          {sub.interval && (
            <p className="text-[10px] text-slate-500 capitalize">/{sub.interval}</p>
          )}
        </div>
        <StatusDot status={sub.status} />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">Price</span>
        <span className="font-bold text-white">
          {formatMoney(sub.amount, sub.currency)}
          {sub.interval && <span className="text-slate-500 font-normal"> /{sub.interval}</span>}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{sub.cancel_at ? "Cancels" : "Renews"}</span>
        <span className="text-slate-300">{formatDate(sub.cancel_at ?? sub.current_period_end)}</span>
      </div>

      {/* Package + domain tied to this subscription */}
      <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-white/6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Website Package
          </label>
          <select
            value={pkg}
            onChange={(e) => handlePackageChange(e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white appearance-none focus:outline-none focus:border-yellow-400/50 transition-colors"
          >
            <option value="">— Not assigned —</option>
            {websitePackages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          {selectedPkg && (
            <p className="text-[10px] text-slate-600">{selectedPkg.priceRange}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Website Domain
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={domainDraft}
              onChange={(e) => setDomainDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleDomainSave(); }}
              placeholder="example.com"
              className="flex-1 min-w-0 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
            />
            <button
              type="button"
              onClick={handleDomainSave}
              disabled={savingDomain || domainDraft.trim() === savedDomain}
              className="shrink-0 rounded-xl bg-yellow-400 px-3 py-2 text-xs font-bold text-slate-900 hover:bg-yellow-300 disabled:opacity-40 transition-all"
            >
              {saved ? "✓" : savingDomain ? "…" : "Save"}
            </button>
          </div>
          {savedDomain && (
            <a
              href={`https://${savedDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-yellow-400/70 hover:text-yellow-400 transition-colors"
            >
              ↗ {savedDomain}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Chevron icon ──────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ── Per-user card (collapsed by default) ──────────────────────────────────────
function UserCard({ user }: { user: UserDocument }) {
  const [open, setOpen] = useState(false);

  const subs = Object.values(user.subscriptions ?? {}).sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return (b.current_period_end?.seconds ?? 0) - (a.current_period_end?.seconds ?? 0);
  });

  const activeSubs = subs.filter((s) => s.status === "active" || s.status === "trialing");
  const totalAmount = activeSubs.reduce((sum, s) => sum + (s.amount ?? 0), 0);
  const currency = activeSubs[0]?.currency ?? "cad";

  return (
    <div className="rounded-3xl bg-slate-900 border border-white/8 overflow-hidden">
      {/* ── Summary row (always visible) ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-7 py-5 text-left hover:bg-white/3 transition-colors"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center text-slate-900 font-black text-sm shrink-0">
          {(user.displayName ?? user.email ?? "?")[0].toUpperCase()}
        </div>

        {/* Name + email */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">
            {user.displayName || user.email || "Unknown user"}
          </p>
          {user.displayName && (
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          )}
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-[10px] text-slate-600 uppercase tracking-wider">Subscriptions</p>
            <p className="text-sm font-bold text-white">{subs.length}</p>
          </div>
          {totalAmount > 0 && (
            <div className="text-right">
              <p className="text-[10px] text-slate-600 uppercase tracking-wider">Active total</p>
              <p className="text-sm font-bold text-yellow-400">
                {formatMoney(totalAmount, currency)}
                <span className="text-[10px] text-slate-500 font-normal">/mo</span>
              </p>
            </div>
          )}
          {user.role === "Administrator" && (
            <span className="rounded-full bg-yellow-400/15 border border-yellow-400/25 px-2.5 py-0.5 text-xs font-bold text-yellow-400">
              Admin
            </span>
          )}
        </div>

        <Chevron open={open} />
      </button>

      {/* ── Expanded: subscription cards ── */}
      {open && (
        <div className="border-t border-white/6 px-7 py-5 space-y-3">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-600">
            Subscriptions
          </p>
          {subs.length === 0 ? (
            <p className="text-xs text-slate-600 italic">No subscriptions</p>
          ) : (
            subs.map((sub) => <SubCard key={sub.id} userId={user.uid} sub={sub} />)
          )}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminPageClient({ dictionary, locale }: AdminPageClientProps) {
  const t = dictionary.adminPage;
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  const handleSyncPlans = async () => {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      const res = await fetch("/api/stripe/sync-plans", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Sync failed.");
      setSyncMsg(`Synced ${Object.keys(data.plans ?? {}).length} plan(s) to Stripe.`);
    } catch (err) {
      setSyncMsg(err instanceof Error ? err.message : "Sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const snap = await getDoc(doc(firebaseFirestore, "users", currentUser.uid));
        const role = snap.exists() ? (snap.data()?.role as string) || "User" : "User";
        setUserRole(role);
        if (role === "Administrator") {
          const usersSnap = await getDocs(collection(firebaseFirestore, "users"));
          const subs = usersSnap.docs
            .map((d) => d.data() as UserDocument)
            .filter((u) => u.subscriptions && Object.keys(u.subscriptions).length > 0);
          setSubscribers(subs);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ── Stats + filtering ──
  const allSubs = subscribers.flatMap((u) => Object.values(u.subscriptions ?? {}));
  const activeSubs = allSubs.filter((s) => s.status === "active");
  const mrr = activeSubs.reduce((sum, s) => sum + (s.amount ?? 0), 0) / 100;

  const filtered = subscribers.filter((u) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q ||
      (u.displayName ?? "").toLowerCase().includes(q) ||
      (u.email ?? "").toLowerCase().includes(q);
    const matchesStatus = !statusFilter ||
      Object.values(u.subscriptions ?? {}).some((s) => s.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

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

  if (!user || userRole !== "Administrator") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="relative rounded-3xl bg-slate-900 border border-white/8 p-10 max-w-md w-full text-center space-y-5 overflow-hidden">
          <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-2xl">🔒</div>
          <h1 className="text-xl font-black text-white">{t.accessDenied}</h1>
          <p className="text-slate-400 text-sm">{t.accessDeniedMessage}</p>
          <Link href={`/${locale}/profile`} className="inline-flex items-center gap-1 text-xs text-yellow-400 hover:underline">
            ← Back to profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_0%,rgba(250,204,21,0.08)_0%,transparent_65%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 rounded-full bg-yellow-400" />
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-yellow-400">Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSyncPlans}
                disabled={syncing}
                className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold text-yellow-400 hover:bg-yellow-400/20 disabled:opacity-50 transition-colors"
              >
                {syncing ? (
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {syncing ? "Syncing…" : "Sync Plans to Stripe"}
              </button>
              <Link
                href={`/${locale}/profile`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors"
              >
                ← Profile
              </Link>
            </div>
          </div>
          {syncMsg && (
            <p className={`text-xs mb-4 ${syncMsg.includes("Synced") ? "text-green-400" : "text-rose-400"}`}>
              {syncMsg}
            </p>
          )}
          <h1 className="text-4xl font-black tracking-tight text-white">{t.title}</h1>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Total customers", value: subscribers.length },
              { label: "Active subscriptions", value: activeSubs.length },
              {
                label: "MRR",
                value: new Intl.NumberFormat(undefined, {
                  style: "currency", currency: "CAD", maximumFractionDigits: 0,
                }).format(mrr),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl bg-slate-900 border border-white/8 px-6 py-4 min-w-32"
              >
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-2xl font-black text-yellow-400 mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CUSTOMER LIST ── */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-5">

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full rounded-2xl bg-slate-900 border border-white/8 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-400/40 transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl bg-slate-900 border border-white/8 px-4 py-2.5 text-sm text-white appearance-none focus:outline-none focus:border-yellow-400/40 transition-colors"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="trialing">Trialing</option>
            <option value="past_due">Past due</option>
            <option value="incomplete">Incomplete</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="w-8 h-0.5 rounded-full bg-yellow-400 shrink-0" />
          <h2 className="text-xs font-bold tracking-[0.22em] uppercase text-slate-500">
            {t.subscribers} ({filtered.length}{filtered.length !== subscribers.length ? ` of ${subscribers.length}` : ""})
          </h2>
          <span className="flex-1 h-px bg-white/5" />
        </div>

        {subscribers.length === 0 ? (
          <div className="rounded-3xl bg-slate-900 border border-white/8 p-16 text-center">
            <p className="text-slate-500 text-sm">{t.noSubscribers}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl bg-slate-900 border border-white/8 p-16 text-center">
            <p className="text-slate-500 text-sm">No results match your search.</p>
          </div>
        ) : (
          filtered.map((u) => <UserCard key={u.uid} user={u} />)
        )}
      </main>
    </div>
  );
}
