import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const auth = vi.hoisted(() => ({
  firebaseAuth: { currentUser: null as unknown },
  listener: null as ((user: unknown) => void) | null,
}));

vi.mock("@/lib/firebase", () => ({ firebaseAuth: auth.firebaseAuth }));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (_auth: unknown, cb: (user: unknown) => void) => {
    auth.listener = cb;
    return () => { auth.listener = null; };
  },
}));
const ensureUserDocument = vi.hoisted(() => vi.fn());
vi.mock("@/lib/user", () => ({ ensureUserDocument }));
vi.mock("@/components/SignInDialog", () => ({
  default: ({ open }: { open: boolean }) => (open ? <div>sign-in-dialog</div> : null),
}));

import PlanCheckoutButton from "@/components/PlanCheckoutButton";
import { getDictionary } from "@/lib/i18n";

// Mirrors the Firebase SDK User: getIdToken is a prototype method.
class FakeUser {
  get uid() { return "u1"; }
  async getIdToken() { return "id-token-123"; }
}

const dictionary = getDictionary("en");

function renderButton() {
  return render(
    <PlanCheckoutButton
      locale="fr"
      planId="essential"
      title="Essential Care"
      mode="subscription"
      amount={4950}
      interval="month"
      dictionary={dictionary}
      label="Get started"
    />,
  );
}

async function signIn() {
  const user = new FakeUser();
  auth.firebaseAuth.currentUser = user;
  await act(async () => { auth.listener?.(user); });
  return user;
}

const originalLocation = window.location;

beforeEach(() => {
  auth.firebaseAuth.currentUser = null;
  ensureUserDocument.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { origin: "https://soizenfier.com", href: "https://soizenfier.com/fr/pricing" },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
});

describe("PlanCheckoutButton", () => {
  it("asks a signed-out visitor to sign in instead of starting checkout", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderButton();

    const button = screen.getByRole("button", { name: dictionary.checkoutPage.signInToContinue });
    await userEvent.click(button);

    expect(screen.getByText("sign-in-dialog")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("creates the user document when someone signs in", async () => {
    renderButton();
    const user = await signIn();
    expect(ensureUserDocument).toHaveBeenCalledWith(user);
    expect(screen.getByRole("button", { name: "Get started" })).toBeInTheDocument();
  });

  it("starts checkout with the plan and the user's token, then redirects to Stripe", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ url: "https://checkout.stripe.com/c/abc" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    renderButton();
    await signIn();

    await userEvent.click(screen.getByRole("button", { name: "Get started" }));

    await waitFor(() => expect(window.location.href).toBe("https://checkout.stripe.com/c/abc"));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/stripe/checkout");
    expect(init.headers.Authorization).toBe("Bearer id-token-123");
    expect(JSON.parse(init.body)).toMatchObject({
      mode: "subscription",
      planId: "essential",
      currency: "cad",
      locale: "fr",
      successUrl: "https://soizenfier.com/fr/profile?checkout=success",
      cancelUrl: "https://soizenfier.com/fr/pricing",
    });
  });

  it("shows the server error and stays on the page when checkout fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: "A valid planId is required for subscriptions." }), { status: 400 }),
      ),
    );
    renderButton();
    await signIn();

    await userEvent.click(screen.getByRole("button", { name: "Get started" }));

    expect(await screen.findByText("A valid planId is required for subscriptions.")).toBeInTheDocument();
    expect(window.location.href).toBe("https://soizenfier.com/fr/pricing");
  });

  it("shows an error when the response has no checkout URL", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 200 })));
    renderButton();
    await signIn();
    await userEvent.click(screen.getByRole("button", { name: "Get started" }));
    expect(await screen.findByText("Unable to create checkout session.")).toBeInTheDocument();
  });
});
