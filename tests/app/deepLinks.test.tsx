import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";

const nav = vi.hoisted(() => ({ params: {} as Record<string, unknown> }));
vi.mock("next/navigation", () => ({ useParams: () => nav.params }));

import ZanduPage from "@/app/zandu/[[...slug]]/page";
import NtuPage from "@/app/ntu/[[...slug]]/page";

const ANDROID_UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) Mobile";
const IPHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)";

const originalLocation = window.location;
const originalUA = navigator.userAgent;

function setUserAgent(ua: string) {
  Object.defineProperty(navigator, "userAgent", { configurable: true, value: ua });
}

beforeEach(() => {
  vi.useFakeTimers();
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { search: "?ref=email", href: "https://soizenfier.com/x" },
  });
});

afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
  setUserAgent(originalUA);
});

describe.each([
  ["zandu", ZanduPage, "com.soizenfier.zandu"],
  ["ntu", NtuPage, "com.soizenfier.ntu"],
])("/%s deep link", (scheme, Page, androidPackage) => {
  it("opens the app with the path and query string", () => {
    nav.params = { slug: ["event", "42"] };
    render(<Page />);
    expect(window.location.href).toBe(`${scheme}://event/42?ref=email`);
  });

  it("sends Android users to the Play Store if the app did not open", () => {
    setUserAgent(ANDROID_UA);
    nav.params = { slug: ["event", "42"] };
    render(<Page />);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(window.location.href).toBe(
      `https://play.google.com/store/apps/details?id=${androidPackage}`,
    );
  });

  it("stays in the app when the page lost focus (app opened)", () => {
    setUserAgent(ANDROID_UA);
    nav.params = { slug: ["event"] };
    render(<Page />);
    window.dispatchEvent(new Event("blur"));
    act(() => { vi.advanceTimersByTime(2000); });
    expect(window.location.href).toBe(`${scheme}://event?ref=email`);
  });

  it("has no store fallback on iOS yet", () => {
    setUserAgent(IPHONE_UA);
    nav.params = { slug: ["event"] };
    render(<Page />);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(window.location.href).toBe(`${scheme}://event?ref=email`);
  });

  it("does nothing without a path", () => {
    nav.params = {};
    render(<Page />);
    expect(window.location.href).toBe("https://soizenfier.com/x");
  });
});
