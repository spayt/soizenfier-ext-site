"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "@/lib/firebase";
import { type TranslationDictionary, type Locale } from "@/lib/i18n";
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
  role: string;
  subscription: SubscriptionData | null;
};

type AdminPageClientProps = {
  dictionary: TranslationDictionary;
  locale: Locale;
};

function formatDate(timestamp: { seconds: number } | null): string {
  if (!timestamp) return "—";
  return new Date(timestamp.seconds * 1000).toLocaleDateString();
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    canceled: "bg-slate-100 text-slate-600",
    past_due: "bg-amber-100 text-amber-700",
    trialing: "bg-sky-100 text-sky-700",
    incomplete: "bg-rose-100 text-rose-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

export default function AdminPageClient({
  dictionary,
  locale,
}: AdminPageClientProps) {
  const t = dictionary.adminPage;
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(firebaseFirestore, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        const role = userSnap.exists()
          ? (userSnap.data()?.role as string) || "User"
          : "User";
        setUserRole(role);

        if (role === "Administrator") {
          const usersSnap = await getDocs(
            collection(firebaseFirestore, "users"),
          );
          const subs = usersSnap.docs
            .map((d) => d.data() as UserDocument)
            .filter((u) => u.subscription != null);
          setSubscribers(subs);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">{t.loading}</p>
      </div>
    );
  }

  if (!user || userRole !== "Administrator") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="rounded-3xl bg-white p-10 shadow-lg max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">{t.accessDenied}</h1>
          <p className="text-slate-600">{t.accessDeniedMessage}</p>
          <Link
            href={`/${locale}/profile`}
            className="text-sm text-sky-600 hover:underline"
          >
            ← Back to profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">{t.title}</h1>
          <Link
            href={`/${locale}/profile`}
            className="text-sm text-sky-600 hover:underline"
          >
            ← Back to profile
          </Link>
        </header>

        <section className="rounded-3xl bg-white shadow-lg shadow-slate-200/40 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <h2 className="text-xl font-semibold">
              {t.subscribers}{" "}
              <span className="text-slate-400 font-normal text-base">
                ({subscribers.length})
              </span>
            </h2>
          </div>

          {subscribers.length === 0 ? (
            <div className="px-8 py-12 text-center text-slate-500">
              {t.noSubscribers}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">{t.email}</th>
                    <th className="px-6 py-3 text-left">{t.userId}</th>
                    <th className="px-6 py-3 text-left">{t.plan}</th>
                    <th className="px-6 py-3 text-left">{t.status}</th>
                    <th className="px-6 py-3 text-left">{t.renewsOn}</th>
                    <th className="px-6 py-3 text-left">{t.canceledOn}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscribers.map((userDoc) => {
                    const sub = userDoc.subscription!;
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {userDoc.email || userDoc.displayName || "—"}
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                          {userDoc.uid
                            ? userDoc.uid.slice(0, 12) + "…"
                            : "—"}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {sub.planName || "—"}
                          {sub.interval && (
                            <span className="ml-1 text-slate-400">
                              /{sub.interval}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">{statusBadge(sub.status)}</td>
                        <td className="px-6 py-4 text-slate-600">
                          {sub.cancel_at
                            ? "—"
                            : formatDate(sub.current_period_end)}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {formatDate(sub.canceled_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
