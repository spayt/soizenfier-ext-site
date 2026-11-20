import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const nav = vi.hoisted(() => ({ pathname: "/en" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));
vi.mock("@/lib/firebase", () => ({ firebaseAuth: {} }));
const auth = vi.hoisted(() => ({ listener: null as ((u: unknown) => void) | null }));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (_a: unknown, cb: (u: unknown) => void) => {
    auth.listener = cb;
    return () => {};
  },
}));
vi.mock("@/components/SignInDialog", () => ({
  default: ({ open }: { open: boolean }) => (open ? <div>sign-in-dialog</div> : null),
}));

import Navigation from "@/components/Navigation";
import { getDictionary } from "@/lib/i18n";

const desktopNav = () => screen.getAllByRole("navigation")[0];

beforeEach(() => {
  nav.pathname = "/en";
});

describe("Navigation", () => {
  it("uses the language from the URL for labels and links", () => {
    nav.pathname = "/fr/pricing";
    const fr = getDictionary("fr");
    render(<Navigation />);
    const pricing = within(desktopNav()).getAllByRole("link", { name: fr.nav.pricing })[0];
    expect(pricing).toHaveAttribute("href", "/fr/pricing");
  });

  it("highlights the active page, including its sub-pages", () => {
    nav.pathname = "/en/pricing";
    const en = getDictionary("en");
    render(<Navigation />);
    const [pricing] = within(desktopNav()).getAllByRole("link", { name: en.nav.pricing });
    const [services] = within(desktopNav()).getAllByRole("link", { name: en.nav.services });
    expect(pricing.className).toContain("bg-yellow-400");
    expect(services.className).not.toContain("bg-yellow-400");
  });

  it("language switcher keeps the current page", () => {
    nav.pathname = "/en/contact";
    render(<Navigation />);
    const fr = getDictionary("en").language.fr;
    expect(screen.getAllByRole("link", { name: fr })[0]).toHaveAttribute("href", "/fr/contact");
  });

  it("opens the sign-in dialog for a signed-out visitor", async () => {
    render(<Navigation />);
    expect(screen.queryByRole("link", { name: "Profile" })).not.toBeInTheDocument();
    const [signIn] = screen.getAllByRole("button").filter((b) => /sign in/i.test(b.textContent ?? ""));
    await userEvent.click(signIn);
    expect(screen.getByText("sign-in-dialog")).toBeInTheDocument();
  });

  it("links to the profile once signed in", async () => {
    nav.pathname = "/fr";
    render(<Navigation />);
    await act(async () => { auth.listener?.({ uid: "u1" }); });
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute("href", "/fr/profile");
  });

  it("toggles the mobile menu", async () => {
    render(<Navigation />);
    const before = screen.getAllByRole("link").length;
    await userEvent.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(screen.getAllByRole("link").length).toBeGreaterThan(before);
  });
});
