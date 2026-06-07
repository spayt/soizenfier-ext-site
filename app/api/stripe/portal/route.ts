import { NextResponse } from "next/server";

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

  const body = await req.json();
  const authorization = req.headers.get("Authorization") ?? "";

  const response = await fetch(
    `${stripeFunctionUrl.replace(/\/+$/, "")}/createCustomerPortalSession`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data?.error ?? "Portal session error." },
      { status: response.status },
    );
  }

  return NextResponse.json(data);
}
