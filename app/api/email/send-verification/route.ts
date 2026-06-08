import { NextResponse } from "next/server";

function getFunctionsBaseUrl(): string | null {
  return (
    process.env.NEXT_FIREBASE_FUNCTIONS_URL ||
    process.env.NEXT_STRIPE_LIVE_FUNCTION_URL ||
    process.env.NEXT_FIREBASE_EMULATOR_FUNCTION_URL ||
    null
  );
}

export async function POST(req: Request) {
  const baseUrl = getFunctionsBaseUrl();
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const body = await req.json();
  const url = `${baseUrl.replace(/\/+$/, "")}/sendEmailVerificationCode`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach email service. Please try again." },
      { status: 502 },
    );
  }

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.error ?? "Failed to send verification code." },
      { status: response.status },
    );
  }

  return NextResponse.json(data);
}
