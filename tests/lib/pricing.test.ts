import { describe, it, expect } from "vitest";
import { websitePackages, monthlyPlans } from "@/lib/pricing";

// ── websitePackages ───────────────────────────────────────────────────────────

describe("websitePackages", () => {
  it("has exactly 3 packages", () => {
    expect(websitePackages).toHaveLength(3);
  });

  it("contains the required package IDs", () => {
    const ids = websitePackages.map((p) => p.id);
    expect(ids).toContain("starter");
    expect(ids).toContain("business");
    expect(ids).toContain("custom");
  });

  it("every package has a non-empty title and priceRange", () => {
    for (const pkg of websitePackages) {
      expect(pkg.title.length).toBeGreaterThan(0);
      expect(pkg.priceRange.length).toBeGreaterThan(0);
    }
  });

  it("every package has at least one bullet point", () => {
    for (const pkg of websitePackages) {
      expect(pkg.bullets.length).toBeGreaterThan(0);
    }
  });

  it("package IDs are unique", () => {
    const ids = websitePackages.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ── monthlyPlans ──────────────────────────────────────────────────────────────

describe("monthlyPlans", () => {
  it("has exactly 4 plans", () => {
    expect(monthlyPlans).toHaveLength(4);
  });

  it("contains the required plan IDs", () => {
    const ids = monthlyPlans.map((p) => p.id);
    expect(ids).toContain("essential");
    expect(ids).toContain("growth");
    expect(ids).toContain("premium");
    expect(ids).toContain("managed-content");
  });

  it("all amountCents are positive integers", () => {
    for (const plan of monthlyPlans) {
      expect(plan.amountCents).toBeGreaterThan(0);
      expect(Number.isInteger(plan.amountCents)).toBe(true);
    }
  });

  it("plans are ordered by price ascending", () => {
    const amounts = monthlyPlans.map((p) => p.amountCents);
    const sorted = [...amounts].sort((a, b) => a - b);
    expect(amounts).toEqual(sorted);
  });

  it("essential plan costs less than premium", () => {
    const essential = monthlyPlans.find((p) => p.id === "essential")!;
    const premium = monthlyPlans.find((p) => p.id === "premium")!;
    expect(essential.amountCents).toBeLessThan(premium.amountCents);
  });

  it("every plan has a non-empty title and price string", () => {
    for (const plan of monthlyPlans) {
      expect(plan.title.length).toBeGreaterThan(0);
      expect(plan.price.length).toBeGreaterThan(0);
    }
  });

  it("every plan has at least one bullet", () => {
    for (const plan of monthlyPlans) {
      expect(plan.bullets.length).toBeGreaterThan(0);
    }
  });

  it("plan IDs are unique", () => {
    const ids = monthlyPlans.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
