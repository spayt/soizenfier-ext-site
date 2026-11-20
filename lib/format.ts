/** Formats an amount in cents (as stored by Stripe) with its currency, keeping the cents. */
export function formatMoney(amountCents: number | null, currency: string | null): string {
  if (amountCents == null) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency?.toUpperCase() ?? "USD",
  }).format(amountCents / 100);
}
