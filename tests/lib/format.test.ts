import { describe, it, expect } from "vitest";
import { formatMoney } from "@/lib/format";

describe("formatMoney", () => {
  it("returns a dash for a missing amount", () => {
    expect(formatMoney(null, "cad")).toBe("—");
  });

  it("keeps the cents — $49.50 must not be shown as $50", () => {
    expect(formatMoney(4950, "cad")).toMatch(/49[.,]50/);
  });

  it("formats whole amounts", () => {
    expect(formatMoney(24900, "cad")).toMatch(/249[.,]00/);
  });

  it("uses the given currency", () => {
    expect(formatMoney(1000, "eur")).toMatch(/€/);
  });

  it("defaults to USD when the currency is unknown", () => {
    expect(formatMoney(1000, null)).toMatch(/\$|USD/);
  });
});
