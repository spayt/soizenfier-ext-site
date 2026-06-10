import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock next/server before importing the route handler
vi.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) =>
      new Response(JSON.stringify(body), {
        status: init?.status ?? 200,
        headers: new Headers({ "Content-Type": "application/json" }),
      }),
  },
}));

import { POST } from "@/app/api/contact/route";

const validPayload = {
  name: "Alice Tremblay",
  email: "alice@example.com",
  subject: "Website Quote",
  message: "I would like to get a quote for a new website.",
};

const makeRequest = (body: unknown) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.SENDGRID_API_KEY = "test-api-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.SENDGRID_API_KEY;
  });

  // ── Validation ──────────────────────────────────────────────────────────────

  it("returns 400 when all fields are missing", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeTruthy();
  });

  it("returns 400 when name is missing", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const { name: _, ...rest } = validPayload;
    const res = await POST(makeRequest(rest));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is missing", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const { email: _, ...rest } = validPayload;
    const res = await POST(makeRequest(rest));
    expect(res.status).toBe(400);
  });

  it("returns 400 when fields are whitespace-only", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const res = await POST(
      makeRequest({ name: "  ", email: "  ", subject: "  ", message: "  " })
    );
    expect(res.status).toBe(400);
    // fetch should NOT have been called — no email sent
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it("returns 400 for an invalid JSON body", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "not-valid-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  // ── Environment ─────────────────────────────────────────────────────────────

  it("returns 500 when SENDGRID_API_KEY is not set", async () => {
    vi.stubGlobal("fetch", vi.fn());
    delete process.env.SENDGRID_API_KEY;
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(500);
    // Should not attempt to call SendGrid
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  // ── SendGrid responses ──────────────────────────────────────────────────────

  it("returns 502 when SendGrid returns a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, text: async () => "Unauthorized" })
    );
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(502);
  });

  it("returns 200 with { success: true } on a successful submission", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("calls SendGrid with the correct recipient email", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", mockFetch);
    await POST(makeRequest(validPayload));
    const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.sendgrid.com/v3/mail/send");
    const sentBody = JSON.parse(options.body as string);
    // reply-to should be the sender's email
    expect(sentBody.reply_to.email).toBe(validPayload.email);
    // subject should contain original subject
    expect(sentBody.subject).toContain(validPayload.subject);
  });
});
