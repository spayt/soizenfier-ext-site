import { NextResponse } from "next/server";

// Set STRIPE_FUNCTION_URL to your Firebase functions base URL, for example:
// https://us-central1-YOUR_PROJECT.cloudfunctions.net
// or http://localhost:5001/YOUR_PROJECT/us-central1 when using the emulator.
type CheckoutRequestBody = {
  mode: "payment" | "subscription";
  title: string;
  amount: number;
  currency: string;
  interval?: "month" | "year";
  locale?: string;
  successUrl: string;
  cancelUrl: string;
};

export async function POST(req: Request) {
  const stripeFunctionUrl =
    process.env.NEXT_STRIPE_LIVE_FUNCTION_URL ||
    process.env.NEXT_STRIPE_EMULATOR_FUNCTION_URL;

  if (!stripeFunctionUrl) {
    return NextResponse.json(
      { error: "Missing STRIPE_FUNCTION_URL environment variable." },
      { status: 500 },
    );
  }

  const body = (await req.json()) as CheckoutRequestBody;

  const response = await fetch(
    `${stripeFunctionUrl.replace(/\/+$/, "")}/createCheckoutSession`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data?.error ?? "Stripe function error." },
      {
        status: response.status,
      },
    );
  }

  return NextResponse.json(data);
}
