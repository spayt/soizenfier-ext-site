import { describe, it, expect } from "vitest";
import { monthlyPlans, websitePackages, pricingIntro } from "@/lib/pricing";
import { getDictionary } from "@/lib/i18n";
import { appMonthlyPlans } from "@/functions/src/plans";

// The price a visitor reads must be the price Stripe charges.

const syncedPlans = monthlyPlans.filter((p) => p.syncToStripe !== false);
const en = getDictionary("en").pricingPage;
const fr = getDictionary("fr").pricingPage;

const enAmount = (cents: number) => `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
const frAmount = (cents: number) => `${(cents / 100).toFixed(2).replace(/\.00$/, "").replace(".", ",")} $`;

describe("Stripe plans mirror (functions/src/plans.ts)", () => {
  it("lists the same plans, in the same order, with the same amounts as lib/pricing.ts", () => {
    expect(appMonthlyPlans.map(({ id, amountCents }) => ({ id, amountCents }))).toEqual(
      syncedPlans.map(({ id, amountCents }) => ({ id, amountCents })),
    );
  });

  it("charges every plan in CAD", () => {
    for (const plan of appMonthlyPlans) expect(plan.currency).toBe("cad");
  });
});

describe.each(monthlyPlans)("displayed price of $id", (plan) => {
  it("lib/pricing.ts price label matches amountCents", () => {
    expect(plan.price).toContain(enAmount(plan.amountCents));
  });

  it("English dictionary matches amountCents", () => {
    expect(en.monthlyPlans[plan.id].price).toContain(enAmount(plan.amountCents));
  });

  it("French dictionary matches amountCents", () => {
    expect(fr.monthlyPlans[plan.id].price).toContain(frAmount(plan.amountCents));
  });
});

describe("website packages", () => {
  it.each(websitePackages)("$id has the same price range in lib/pricing.ts and the English dictionary", (pkg) => {
    expect(en.websitePackages[pkg.id].priceRange).toBe(pkg.priceRange);
  });
});

describe("pricingIntro", () => {
  it("'starting from' website price is the starter package's lower bound", () => {
    const starter = websitePackages.find((p) => p.id === "starter")!;
    expect(starter.priceRange.startsWith(pricingIntro.startingFrom.website)).toBe(true);
  });

  it("'starting from' maintenance price is the cheapest monthly plan", () => {
    const cheapest = Math.min(...monthlyPlans.map((p) => p.amountCents));
    expect(pricingIntro.startingFrom.maintenance).toBe(`${enAmount(cheapest)}/month`);
  });
});
