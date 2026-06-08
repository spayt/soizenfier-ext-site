"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { firebaseAuth } from "@/lib/firebase";
import { type TranslationDictionary } from "@/lib/i18n";
import { ensureUserDocument } from "@/lib/user";
import SignInDialog from "@/components/SignInDialog";

type PlanCheckoutButtonProps = {
  locale: string;
  planId?: string;
  title: string;
  mode: "payment" | "subscription";
  amount: number;
  interval?: "month" | "year";
  dictionary: TranslationDictionary;
  label: string;
  connectedClassName?: string;
};

export default function PlanCheckoutButton({
  locale,
  planId,
  title,
  mode,
  amount,
  interval,
  dictionary,
  label,
  connectedClassName,
}: PlanCheckoutButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await ensureUserDocument(currentUser);
        } catch (err) {
          console.error("Unable to create user record", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCheckout = async () => {
    setStatus("loading");
    setError(null);
    try {
      const currentUser = firebaseAuth.currentUser;
      if (!currentUser) throw new Error("You must sign in before checking out.");

      const token = await currentUser.getIdToken();
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode,
          planId,
          title,
          amount,
          currency: "cad",
          interval,
          locale,
          successUrl: `${window.location.origin}/${locale}/profile?checkout=success`,
          cancelUrl: `${window.location.origin}/${locale}/pricing`,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Unable to create checkout session.");
      }
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : dictionary.checkoutPage.errorMessage,
      );
    }
  };

  const handleClick = async () => {
    if (!user) {
      setDialogOpen(true);
      return;
    }
    await handleCheckout();
  };

  return (
    <>
      <div className="space-y-3">
        {status === "error" && error ? (
          <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-800">
            {error}
          </div>
        ) : null}
        <Button type="button" onClick={handleClick} className={`w-full ${user && connectedClassName ? connectedClassName : ""}`}>
          {status === "loading"
            ? "Starting checkout…"
            : user
              ? label
              : dictionary.checkoutPage.signInToContinue}
        </Button>
      </div>

      <SignInDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
