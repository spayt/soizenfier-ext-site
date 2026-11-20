import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/firebase", () => ({ firebaseAuth: {}, firebaseFirestore: {} }));

const auth = vi.hoisted(() => ({ listener: null as ((u: unknown) => Promise<void>) | null }));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (_a: unknown, cb: (u: unknown) => Promise<void>) => {
    auth.listener = cb;
    return () => {};
  },
}));

// Snapshots mirror the SDK: exists()/data() are methods.
class FakeSnapshot {
  constructor(private readonly value: Record<string, unknown> | undefined) {}
  exists() { return this.value !== undefined; }
  data() { return this.value; }
}

const fs = vi.hoisted(() => ({
  doc: vi.fn((_db: unknown, ...path: string[]) => ({ path: path.join("/") })),
  collection: vi.fn((_db: unknown, path: string) => ({ path })),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
}));
vi.mock("firebase/firestore", () => fs);

import AdminPageClient from "@/components/AdminPageClient";
import { getDictionary } from "@/lib/i18n";

const dictionary = getDictionary("en");
const t = dictionary.adminPage;

const sub = (id: string, status: string, amount: number) => ({
  id, status, amount,
  planName: "Essential Care",
  price_id: "price_1",
  currency: "cad",
  interval: "month",
  current_period_end: { seconds: 1_762_592_000 },
  cancel_at: null,
  canceled_at: null,
  websitePackage: null,
  domain: null,
});

const users = [
  { uid: "a", email: "alice@example.com", displayName: "Alice", role: "User", createdAt: null, stripeCustomerId: "cus_a",
    subscriptions: { sub_a: sub("sub_a", "active", 4950) } },
  { uid: "b", email: "bruno@example.com", displayName: "Bruno", role: "User", createdAt: null, stripeCustomerId: "cus_b",
    subscriptions: { sub_b1: sub("sub_b1", "active", 12450), sub_b2: sub("sub_b2", "canceled", 24950) } },
  { uid: "c", email: "nosub@example.com", displayName: "No Sub", role: "User", createdAt: null, stripeCustomerId: null,
    subscriptions: null },
];

async function renderAs(role: string | undefined) {
  fs.getDoc.mockResolvedValue(new FakeSnapshot(role ? { role } : undefined));
  fs.getDocs.mockResolvedValue({ docs: users.map((u) => new FakeSnapshot(u)) });
  render(<AdminPageClient dictionary={dictionary} locale="en" />);
  await act(async () => { await auth.listener?.({ uid: "me" }); });
}

beforeEach(() => {
  for (const fn of Object.values(fs)) fn.mockClear();
  fs.updateDoc.mockResolvedValue(undefined);
});

describe("AdminPageClient", () => {
  it.each([["User"], [undefined]])("denies access to role %s without listing users", async (role) => {
    await renderAs(role);
    expect(screen.getByText(t.accessDenied)).toBeInTheDocument();
    expect(fs.getDocs).not.toHaveBeenCalled();
  });

  it("lists only users that have subscriptions", async () => {
    await renderAs("Administrator");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bruno")).toBeInTheDocument();
    expect(screen.queryByText("No Sub")).not.toBeInTheDocument();
  });

  it("computes MRR from active subscriptions only, keeping the cents", async () => {
    await renderAs("Administrator");
    const mrrCard = screen.getByText("MRR").parentElement!;
    // 49.50 + 124.50 = 174.00 (the canceled 249.50 is excluded)
    expect(mrrCard.textContent).toMatch(/174[.,]00/);
    const activeCard = screen.getByText("Active subscriptions").parentElement!;
    expect(activeCard.textContent).toContain("2");
  });

  it("filters by name/email search", async () => {
    await renderAs("Administrator");
    await userEvent.type(screen.getByPlaceholderText("Search by name or email…"), "ALICE");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bruno")).not.toBeInTheDocument();
    expect(screen.getByText(/\(1 of 2\)/)).toBeInTheDocument();
  });

  it("filters by subscription status", async () => {
    await renderAs("Administrator");
    await userEvent.selectOptions(screen.getByDisplayValue("All statuses"), "canceled");
    expect(screen.getByText("Bruno")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  it("shows an empty-search message", async () => {
    await renderAs("Administrator");
    await userEvent.type(screen.getByPlaceholderText("Search by name or email…"), "zzz");
    expect(screen.getByText("No results match your search.")).toBeInTheDocument();
  });

  it("saves a subscription's domain and package as nested fields of the user document", async () => {
    await renderAs("Administrator");
    await userEvent.click(screen.getByText("Alice"));

    const card = screen.getByPlaceholderText("example.com").closest("div.rounded-2xl") as HTMLElement;
    await userEvent.type(within(card).getByPlaceholderText("example.com"), "  alice.ca ");
    await userEvent.click(within(card).getByRole("button", { name: "Save" }));
    expect(fs.updateDoc).toHaveBeenCalledWith({ path: "users/a" }, { "subscriptions.sub_a.domain": "alice.ca" });

    await userEvent.selectOptions(within(card).getByDisplayValue("— Not assigned —"), "business");
    expect(fs.updateDoc).toHaveBeenLastCalledWith(
      { path: "users/a" },
      { "subscriptions.sub_a.websitePackage": "business" },
    );
    expect(within(card).getByText(/\$2,000 – \$4,000 CAD/)).toBeInTheDocument();
  });
});
