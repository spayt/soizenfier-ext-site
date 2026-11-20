import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) =>
      new Response(JSON.stringify(body), {
        status: init?.status ?? 200,
        headers: new Headers({ "Content-Type": "application/json" }),
      }),
  },
}));

import { POST as checkout } from "@/app/api/stripe/checkout/route";
import { POST as portal } from "@/app/api/stripe/portal/route";
import { POST as sync } from "@/app/api/stripe/sync/route";
import { POST as syncPlans } from "@/app/api/stripe/sync-plans/route";
import { POST as sendVerification } from "@/app/api/email/send-verification/route";
import { POST as verifyCode } from "@/app/api/email/verify-code/route";

type Route = {
  name: string;
  handler: (req: Request) => Promise<Response>;
  functionName: string;
  forwardsBody: boolean;
  forwardsAuth: boolean;
};

const routes: Route[] = [
  { name: "stripe/checkout", handler: checkout, functionName: "createCheckoutSession", forwardsBody: true, forwardsAuth: true },
  { name: "stripe/portal", handler: portal, functionName: "createCustomerPortalSession", forwardsBody: true, forwardsAuth: true },
  { name: "stripe/sync", handler: sync, functionName: "syncUserSubscriptions", forwardsBody: false, forwardsAuth: true },
  { name: "stripe/sync-plans", handler: syncPlans, functionName: "syncPlansToStripe", forwardsBody: false, forwardsAuth: true },
  { name: "email/send-verification", handler: sendVerification, functionName: "sendEmailVerificationCode", forwardsBody: true, forwardsAuth: false },
  { name: "email/verify-code", handler: verifyCode, functionName: "verifyEmailVerificationCode", forwardsBody: true, forwardsAuth: false },
];

const ENV_KEYS = [
  "NEXT_FIREBASE_FUNCTIONS_URL",
  "NEXT_STRIPE_LIVE_FUNCTION_URL",
  "NEXT_FIREBASE_EMULATOR_FUNCTION_URL",
];

const requestBody = { planId: "essential", email: "bob@example.com", returnUrl: "https://x.test" };

const makeRequest = (headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/x", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(requestBody),
  });

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

beforeEach(() => {
  for (const key of ENV_KEYS) delete process.env[key];
});

afterEach(() => {
  vi.unstubAllGlobals();
  for (const key of ENV_KEYS) delete process.env[key];
});

describe.each(routes)("POST /api/$name", (route) => {
  it("returns 500 without calling anything when no function URL is configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await route.handler(makeRequest());
    expect(res.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("calls the right function, stripping trailing slashes from the base URL", async () => {
    process.env.NEXT_STRIPE_LIVE_FUNCTION_URL = "https://us-central1-demo.cloudfunctions.net//";
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: 1 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await route.handler(makeRequest({ Authorization: "Bearer tok" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: 1 });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`https://us-central1-demo.cloudfunctions.net/${route.functionName}`);
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual(route.forwardsBody ? requestBody : {});
    if (route.forwardsAuth) {
      expect(init.headers.Authorization).toBe("Bearer tok");
    } else {
      expect(init.headers.Authorization).toBeUndefined();
    }
  });

  it("falls back to the emulator URL", async () => {
    process.env.NEXT_FIREBASE_EMULATOR_FUNCTION_URL = "http://localhost:5001/demo/us-central1";
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}));
    vi.stubGlobal("fetch", fetchMock);
    await route.handler(makeRequest());
    expect(fetchMock.mock.calls[0][0]).toBe(
      `http://localhost:5001/demo/us-central1/${route.functionName}`,
    );
  });

  it("passes through the function's JSON error and status", async () => {
    process.env.NEXT_STRIPE_LIVE_FUNCTION_URL = "https://fn.test";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ error: "Nope" }, 403)));
    const res = await route.handler(makeRequest());
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "Nope" });
  });

  it("surfaces a plain-text error from the function instead of crashing", async () => {
    process.env.NEXT_STRIPE_LIVE_FUNCTION_URL = "https://fn.test";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("A valid planId is required for subscriptions.", { status: 400 })),
    );
    const res = await route.handler(makeRequest());
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "A valid planId is required for subscriptions." });
  });

  it("returns 502 when the function cannot be reached", async () => {
    process.env.NEXT_STRIPE_LIVE_FUNCTION_URL = "https://fn.test";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    const res = await route.handler(makeRequest());
    expect(res.status).toBe(502);
    expect((await res.json()).error).toBeTruthy();
  });
});

describe("NEXT_FIREBASE_FUNCTIONS_URL precedence", () => {
  it.each(routes)(
    "$name prefers NEXT_FIREBASE_FUNCTIONS_URL over the live URL",
    async (route) => {
      process.env.NEXT_FIREBASE_FUNCTIONS_URL = "https://primary.test";
      process.env.NEXT_STRIPE_LIVE_FUNCTION_URL = "https://secondary.test";
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}));
      vi.stubGlobal("fetch", fetchMock);
      await route.handler(makeRequest());
      expect(fetchMock.mock.calls[0][0]).toBe(`https://primary.test/${route.functionName}`);
    },
  );
});
