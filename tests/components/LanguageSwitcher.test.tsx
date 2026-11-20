import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n";

describe("LanguageSwitcher", () => {
  it("links every locale to the same page", () => {
    const dictionary = getDictionary("fr");
    render(<LanguageSwitcher currentLocale="fr" currentPath="/pricing" dictionary={dictionary} />);

    expect(screen.getByRole("link", { name: dictionary.language.en })).toHaveAttribute("href", "/en/pricing");
    expect(screen.getByRole("link", { name: dictionary.language.fr })).toHaveAttribute("href", "/fr/pricing");
  });

  it("highlights the current locale", () => {
    const dictionary = getDictionary("en");
    render(<LanguageSwitcher currentLocale="en" currentPath="" dictionary={dictionary} />);
    expect(screen.getByRole("link", { name: dictionary.language.en }).className).toContain("font-semibold");
    expect(screen.getByRole("link", { name: dictionary.language.fr }).className).not.toContain("font-semibold");
  });
});
