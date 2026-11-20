import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, cleanup } from "@testing-library/react";
import type { ReactElement } from "react";

// Smoke test: every page renders in both languages, with real dictionaries,
// and no translation key leaks to the screen.

vi.mock("@/lib/firebase", () => ({ firebaseAuth: {}, firebaseFirestore: {} }));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: () => () => {},
  signOut: vi.fn(),
  signInWithPopup: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),
  GoogleAuthProvider: class {},
}));
vi.mock("firebase/firestore", () => ({
  doc: vi.fn(), getDoc: vi.fn(), getDocs: vi.fn(), setDoc: vi.fn(),
  updateDoc: vi.fn(), onSnapshot: () => () => {}, collection: vi.fn(), serverTimestamp: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  notFound: () => { throw new Error("NEXT_NOT_FOUND"); },
  redirect: (url: string) => { throw new Error(`NEXT_REDIRECT:${url}`); },
  useParams: () => ({}),
  usePathname: () => "/en",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

type PageModule = {
  default: (props: { params: Promise<Record<string, string>> }) => ReactElement | Promise<ReactElement>;
  generateMetadata?: (props: { params: Promise<Record<string, string>> }) => Promise<{ title?: unknown; description?: unknown }>;
  generateStaticParams?: () => Record<string, string>[];
};

const localizedPages: Record<string, () => Promise<PageModule>> = {
  "/": () => import("@/app/[lang]/page"),
  "/about": () => import("@/app/[lang]/about/page"),
  "/admin": () => import("@/app/[lang]/admin/page"),
  "/checkout/success": () => import("@/app/[lang]/checkout/success/page"),
  "/contact": () => import("@/app/[lang]/contact/page"),
  "/hosting": () => import("@/app/[lang]/hosting/page"),
  "/pricing": () => import("@/app/[lang]/pricing/page"),
  "/profile": () => import("@/app/[lang]/profile/page"),
  "/projects": () => import("@/app/[lang]/projects/page"),
  "/realisations": () => import("@/app/[lang]/realisations/page"),
  "/services": () => import("@/app/[lang]/services/page"),
};

const staticPages: Record<string, () => Promise<PageModule>> = {
  "/kimuntu": () => import("@/app/kimuntu/page"),
  "/kimuntu/privacyen": () => import("@/app/kimuntu/privacyen/page"),
  "/kimuntu/privacyfr": () => import("@/app/kimuntu/privacyfr/page"),
  "/kota-pona": () => import("@/app/kota-pona/page"),
  "/kota-pona/privacyen": () => import("@/app/kota-pona/privacyen/page"),
  "/kota-pona/privacyfr": () => import("@/app/kota-pona/privacyfr/page"),
  "/privacy-policy": () => import("@/app/privacy-policy/page"),
};

// Dictionary keys look like "section.camelCase"; none should be rendered raw.
const RAW_KEY = /\b(hero|nav|footer|projects|pricingPage|profilePage|adminPage|checkoutPage|home|services|about|contact)\.[a-z][A-Za-z]+\b/;

async function renderPage(mod: PageModule, params: Record<string, string>) {
  const element = await mod.default({ params: Promise.resolve(params) });
  const { container } = render(element);
  const text = container.textContent ?? "";
  cleanup();
  return text;
}

beforeAll(() => {
  // jsdom has no IntersectionObserver (used by scroll animations).
  globalThis.IntersectionObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  } as unknown as typeof IntersectionObserver;
});

describe.each(["en", "fr"])("localized pages (%s)", (lang) => {
  it.each(Object.keys(localizedPages))("%s renders without leaking translation keys", async (path) => {
    const mod = await localizedPages[path]();
    const text = await renderPage(mod, { lang });
    expect(text.length).toBeGreaterThan(0);
    expect(text).not.toMatch(RAW_KEY);
  });

  it.each(Object.keys(localizedPages))("%s metadata has a title", async (path) => {
    const mod = await localizedPages[path]();
    if (!mod.generateMetadata) return;
    const metadata = await mod.generateMetadata({ params: Promise.resolve({ lang }) });
    expect(metadata.title).toBeTruthy();
  });
});

describe("project detail pages", () => {
  it.each(["en", "fr"])("every project renders in %s", async (lang) => {
    const mod = await import("@/app/[lang]/projects/[slug]/page");
    const params = (mod.generateStaticParams as () => { lang: string; slug: string }[])()
      .filter((p) => p.lang === lang);
    expect(params.length).toBeGreaterThan(0);
    for (const p of params) {
      const text = await renderPage(mod as unknown as PageModule, p);
      expect(text).not.toMatch(RAW_KEY);
    }
  });

  it("returns 404 for an unknown project", async () => {
    const mod = await import("@/app/[lang]/projects/[slug]/page");
    await expect(
      (mod as unknown as PageModule).default({ params: Promise.resolve({ lang: "en", slug: "nope" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});

describe("unknown locale", () => {
  it("falls back to English", async () => {
    const mod = await localizedPages["/pricing"]();
    const [de, en] = [await renderPage(mod, { lang: "de" }), await renderPage(mod, { lang: "en" })];
    expect(de).toBe(en);
  });
});

describe("standalone pages", () => {
  it.each(Object.keys(staticPages))("%s renders", async (path) => {
    const mod = await staticPages[path]();
    const text = await renderPage(mod, {});
    expect(text.length).toBeGreaterThan(0);
  });

  it("the root page redirects to the default locale", async () => {
    const mod = await import("@/app/page");
    expect(() => (mod.default as () => void)()).toThrow("NEXT_REDIRECT:/en");
  });
});
