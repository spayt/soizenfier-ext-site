"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type TranslationDictionary } from "@/lib/i18n";

type PlanCheckoutButtonProps = {
  locale: string;
  title: string;
  mode: "payment" | "subscription";
  amount: number;
  interval?: "month" | "year";
  dictionary: TranslationDictionary;
  label: string;
};

export default function PlanCheckoutButton({
  locale,
  title,
  mode,
  amount,
  interval,
  dictionary,
  label,
}: PlanCheckoutButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    console.log("clicked");
    if (status === "loading") {
      setStatus("idle");
      setError(null);
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          title,
          amount,
          currency: "cad",
          interval,
          locale,
          successUrl: `${window.location.origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          //   cancelUrl: window.location.href,
          cancelUrl: `${window.location.origin}/${locale}/pricing`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Unable to create checkout session.");
      }

      window.location.href = data.url;
      //   window.location.assign(data.url);
      //   window.location.replace(data.url);
    } catch (err) {
      setStatus("error");
      setError(
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : dictionary.checkoutPage.errorMessage,
      );
    }
  };

  return (
    <div className="space-y-3">
      {status === "error" && error ? (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}
      <Button type="button" onClick={handleClick} className="w-full">
        {status === "loading" ? "Starting checkout…" : label}
      </Button>
    </div>
  );
}
