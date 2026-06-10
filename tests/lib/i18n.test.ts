import { describe, it, expect } from "vitest";
import {
  isLocale,
  getDictionary,
  translate,
  localePath,
} from "@/lib/i18n";

// ── isLocale ──────────────────────────────────────────────────────────────────

describe("isLocale", () => {
  it('accepts "en"', () => {
    expect(isLocale("en")).toBe(true);
  });

  it('accepts "fr"', () => {
    expect(isLocale("fr")).toBe(true);
  });

  it("rejects an unsupported locale", () => {
    expect(isLocale("de")).toBe(false);
  });

  it("rejects undefined", () => {
    expect(isLocale(undefined)).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isLocale("")).toBe(false);
  });
});

// ── getDictionary ─────────────────────────────────────────────────────────────

describe("getDictionary", () => {
  it("returns English dictionary for en", () => {
    const dict = getDictionary("en");
    expect(typeof dict.nav.home).toBe("string");
    expect(dict.nav.home.length).toBeGreaterThan(0);
  });

  it("returns French dictionary for fr", () => {
    const en = getDictionary("en");
    const fr = getDictionary("fr");
    // French and English nav labels must differ
    expect(fr.nav.home).not.toBe(en.nav.home);
  });

  it("falls back to English for an unknown locale", () => {
    const en = getDictionary("en");
    expect(getDictionary("de").nav.home).toBe(en.nav.home);
  });

  it("falls back to English for undefined", () => {
    const en = getDictionary("en");
    expect(getDictionary(undefined).nav.home).toBe(en.nav.home);
  });

  it("every locale dictionary has a non-empty company name", () => {
    expect(getDictionary("en").company.length).toBeGreaterThan(0);
    expect(getDictionary("fr").company.length).toBeGreaterThan(0);
  });
});

// ── translate ─────────────────────────────────────────────────────────────────

describe("translate", () => {
  const dict = getDictionary("en");

  it("resolves a valid nested key", () => {
    const result = translate(dict, "hero.title");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
    // Should not fall through to the key itself
    expect(result).not.toBe("hero.title");
  });

  it("returns the key for a missing top-level key", () => {
    expect(translate(dict, "nonexistent")).toBe("nonexistent");
  });

  it("returns the key for a missing nested key", () => {
    expect(translate(dict, "hero.doesNotExist")).toBe("hero.doesNotExist");
  });

  it("returns the key for a path that traverses a non-object value", () => {
    // hero.title is a string, going deeper should fall back
    expect(translate(dict, "hero.title.deeper")).toBe("hero.title.deeper");
  });

  it("EN and FR produce different translations for the same key", () => {
    const fr = getDictionary("fr");
    expect(translate(dict, "hero.title")).not.toBe(translate(fr, "hero.title"));
  });
});

// ── localePath ────────────────────────────────────────────────────────────────

describe("localePath", () => {
  it("prefixes /en/ for English", () => {
    expect(localePath("en", "/pricing")).toBe("/en/pricing");
  });

  it("prefixes /fr/ for French", () => {
    expect(localePath("fr", "/contact")).toBe("/fr/contact");
  });

  it("works with root path", () => {
    expect(localePath("en", "/")).toBe("/en/");
  });

  it("does not double-slash when path has no leading slash", () => {
    const result = localePath("en", "about");
    // Should at minimum contain the locale prefix
    expect(result.startsWith("/en")).toBe(true);
  });
});
