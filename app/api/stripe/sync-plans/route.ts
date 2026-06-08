import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const stripeFunctionUrl =
    process.env.NEXT_FIREBASE_FUNCTIONS_URL ||
    process.env.NEXT_STRIPE_LIVE_FUNCTION_URL ||
    process.env.NEXT_FIREBASE_EMULATOR_FUNCTION_URL;

  if (!stripeFunctionUrl) {
    return NextResponse.json(
      { error: "Missing function URL environment variable." },
      { status: 500 },
    );
  }

  const authorization = req.headers.get("Authorization") ?? "";

  let response: Response;
  try {
    response = await fetch(
      `${stripeFunctionUrl.replace(/\/+$/, "")}/syncPlansToStripe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
        },
        body: "{}",
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not reach sync service. Please try again." },
      { status: 502 },
    );
  }

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.error ?? "Sync failed." },
      { status: response.status },
    );
  }

  return NextResponse.json(data);
}
