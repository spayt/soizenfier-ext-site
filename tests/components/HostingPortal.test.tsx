import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/firebase", () => ({ firebaseAuth: { name: "auth" } }));
const auth = vi.hoisted(() => ({
  listener: null as ((u: unknown) => Promise<void>) | null,
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: class GoogleAuthProvider {},
}));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (_a: unknown, cb: (u: unknown) => Promise<void>) => {
    auth.listener = cb;
    return () => {};
  },
  signInWithPopup: auth.signInWithPopup,
  signOut: auth.signOut,
  GoogleAuthProvider: auth.GoogleAuthProvider,
}));
const ensureUserDocument = vi.hoisted(() => vi.fn());
vi.mock("@/lib/user", () => ({ ensureUserDocument }));

import HostingPortal from "@/components/HostingPortal";
import { getDictionary } from "@/lib/i18n";

const dictionary = getDictionary("en");
const t = dictionary.hosting;

class FakeUser {
  get uid() { return "u1"; }
  get email() { return "bob@example.com"; }
  get displayName() { return null; }
}

beforeEach(() => {
  auth.signInWithPopup.mockReset();
  auth.signOut.mockReset().mockResolvedValue(undefined);
  ensureUserDocument.mockReset().mockResolvedValue(undefined);
});

afterEach(() => { vi.restoreAllMocks(); });

describe("HostingPortal", () => {
  it("shows a loading state until auth resolves", () => {
    render(<HostingPortal dictionary={dictionary} />);
    expect(screen.getByText(t.loading)).toBeInTheDocument();
  });

  it("signs in with Google when signed out", async () => {
    auth.signInWithPopup.mockResolvedValue({});
    render(<HostingPortal dictionary={dictionary} />);
    await act(async () => { await auth.listener?.(null); });
    await userEvent.click(screen.getByRole("button", { name: t.signIn }));
    expect(auth.signInWithPopup.mock.calls[0][1]).toBeInstanceOf(auth.GoogleAuthProvider);
  });

  it("shows an error when Google sign-in fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    auth.signInWithPopup.mockRejectedValue(Object.assign(new Error("x"), { code: "auth/unauthorized-domain" }));
    render(<HostingPortal dictionary={dictionary} />);
    await act(async () => { await auth.listener?.(null); });
    await userEvent.click(screen.getByRole("button", { name: t.signIn }));
    expect(await screen.findByText(/Google sign-in is not available on this address/)).toBeInTheDocument();
  });

  it("shows the connected user, creates their record and lets them sign out", async () => {
    render(<HostingPortal dictionary={dictionary} />);
    const user = new FakeUser();
    await act(async () => { await auth.listener?.(user); });
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(ensureUserDocument).toHaveBeenCalledWith(user);
    await userEvent.click(screen.getByRole("button", { name: t.signOut }));
    expect(auth.signOut).toHaveBeenCalled();
  });
});
