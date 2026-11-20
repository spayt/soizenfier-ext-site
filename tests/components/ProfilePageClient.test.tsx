import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const auth = vi.hoisted(() => ({
  firebaseAuth: { currentUser: null as unknown },
  listener: null as ((u: unknown) => void) | null,
  signOut: vi.fn(),
}));
vi.mock("@/lib/firebase", () => ({ firebaseAuth: auth.firebaseAuth, firebaseFirestore: {} }));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (_a: unknown, cb: (u: unknown) => void) => {
    auth.listener = cb;
    return () => {};
  },
  signOut: auth.signOut,
}));

class FakeSnapshot {
  constructor(private readonly value: Record<string, unknown> | undefined) {}
  exists() { return this.value !== undefined; }
  data() { return this.value; }
}
const fs = vi.hoisted(() => ({
  userDoc: undefined as Record<string, unknown> | undefined,
  doc: vi.fn((_db: unknown, ...path: string[]) => ({ path: path.join("/") })),
  onSnapshot: vi.fn(),
}));
vi.mock("firebase/firestore", () => ({
  doc: fs.doc,
  onSnapshot: (_ref: unknown, cb: (s: FakeSnapshot) => void) => {
    fs.onSnapshot();
    cb(new FakeSnapshot(fs.userDoc));
    return () => {};
  },
}));
const ensureUserDocument = vi.hoisted(() => vi.fn());
vi.mock("@/lib/user", () => ({ ensureUserDocument }));
vi.mock("@/components/SignInDialog", () => ({
  default: ({ open }: { open: boolean }) => (open ? <div>sign-in-dialog</div> : null),
}));

import ProfilePageClient from "@/components/ProfilePageClient";
import { getDictionary } from "@/lib/i18n";

const dictionary = getDictionary("en");
const t = dictionary.profilePage;

// Mirrors the Firebase SDK User (getters + prototype methods).
class FakeUser {
  get uid() { return "u1"; }
  get email() { return "bob@example.com"; }
  get displayName() { return "Bob Martin"; }
  async getIdToken() { return "tok"; }
}

const activeSub = {
  id: "sub_1", planName: "Essential Care", status: "active", price_id: "price_1",
  amount: 4950, currency: "cad", interval: "month",
  current_period_end: { seconds: 1_762_592_000 }, cancel_at: null, canceled_at: null,
  websitePackage: null, domain: null,
};

const originalLocation = window.location;

function setLocation(search = "") {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: {
      origin: "https://soizenfier.com",
      pathname: "/en/profile",
      search,
      href: `https://soizenfier.com/en/profile${search}`,
    },
  });
}

async function renderSignedIn(userDoc: Record<string, unknown> | undefined) {
  fs.userDoc = userDoc;
  render(<ProfilePageClient dictionary={dictionary} locale="en" />);
  const user = new FakeUser();
  auth.firebaseAuth.currentUser = user;
  await act(async () => { auth.listener?.(user); });
}

beforeEach(() => {
  setLocation();
  vi.spyOn(window.history, "replaceState").mockImplementation(() => {});
  ensureUserDocument.mockReset().mockResolvedValue(undefined);
  auth.signOut.mockReset().mockResolvedValue(undefined);
  auth.firebaseAuth.currentUser = null;
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
});

describe("ProfilePageClient", () => {
  it("asks a signed-out visitor to sign in", async () => {
    render(<ProfilePageClient dictionary={dictionary} locale="en" />);
    await act(async () => { auth.listener?.(null); });
    expect(screen.getByText(t.signInRequired)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: t.signIn }));
    expect(screen.getByText("sign-in-dialog")).toBeInTheDocument();
  });

  it("shows the active plan with its exact price", async () => {
    await renderSignedIn({ uid: "u1", role: "User", subscriptions: { sub_1: activeSub } });
    expect(ensureUserDocument).toHaveBeenCalled();
    expect(screen.getByText("Essential Care")).toBeInTheDocument();
    expect(screen.getByText(/49[.,]50/)).toBeInTheDocument();
  });

  it("shows the no-plan state without subscriptions", async () => {
    await renderSignedIn({ uid: "u1", role: "User", subscriptions: null });
    expect(screen.getByText(t.noPlan)).toBeInTheDocument();
  });

  it("hides billing buttons when the user has no Stripe customer", async () => {
    await renderSignedIn({ uid: "u1", role: "User", subscriptions: { sub_1: activeSub } });
    expect(screen.queryByRole("button", { name: t.manageSubscription })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Sync" })).not.toBeInTheDocument();
  });

  it("shows billing buttons for a test-mode Stripe customer", async () => {
    await renderSignedIn({ uid: "u1", role: "User", stripeTestCustomerId: "cus_test", subscriptions: { sub_1: activeSub } });
    expect(screen.getByRole("button", { name: t.manageSubscription })).toBeInTheDocument();
  });

  it("opens the Stripe billing portal with the user's token", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ url: "https://billing.stripe.com/p/1" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    await renderSignedIn({ uid: "u1", role: "User", stripeCustomerId: "cus_live", subscriptions: { sub_1: activeSub } });

    await userEvent.click(screen.getByRole("button", { name: t.manageSubscription }));

    await waitFor(() => expect(window.location.href).toBe("https://billing.stripe.com/p/1"));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/stripe/portal");
    expect(init.headers.Authorization).toBe("Bearer tok");
    expect(JSON.parse(init.body)).toEqual({ returnUrl: "https://soizenfier.com/en/profile" });
  });

  it("shows the portal error and re-enables the button", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: "No Stripe customer found for this user." }), { status: 400 }),
    ));
    await renderSignedIn({ uid: "u1", role: "User", stripeCustomerId: "cus_live", subscriptions: { sub_1: activeSub } });
    await userEvent.click(screen.getByRole("button", { name: t.manageSubscription }));
    expect(await screen.findByText("No Stripe customer found for this user.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: t.manageSubscription })).toBeEnabled();
  });

  it("syncs subscriptions from Stripe", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ synced: 1 }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await renderSignedIn({ uid: "u1", role: "User", stripeTestCustomerId: "cus_test", subscriptions: { sub_1: activeSub } });
    await userEvent.click(screen.getByRole("button", { name: "Sync" }));
    expect(await screen.findByText("Synced ✓")).toBeInTheDocument();
    expect(fetchMock.mock.calls[0][0]).toBe("/api/stripe/sync");
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer tok");
  });

  it("signs out", async () => {
    await renderSignedIn({ uid: "u1", role: "User", subscriptions: null });
    await userEvent.click(screen.getByRole("button", { name: new RegExp(t.signOut) }));
    expect(auth.signOut).toHaveBeenCalled();
  });

  it("removes ?checkout=success from the URL after returning from Stripe", async () => {
    setLocation("?checkout=success");
    render(<ProfilePageClient dictionary={dictionary} locale="en" />);
    expect(window.history.replaceState).toHaveBeenCalledWith({}, "", "/en/profile");
  });
});
