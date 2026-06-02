"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, type Locale } from "@/lib/i18n";

type NavLink = {
  href: string;
  label: string;
  matcher?: (pathname: string) => boolean;
};

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine the language from pathname
  const langMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const currentLang = langMatch ? langMatch[1] : "en";
  const dictionary = getDictionary(currentLang as Locale);

  // Extract the current path without the language prefix
  const currentPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  // Helper to create localized paths
  const langPath = (path: string) => {
    if (path === "/kimuntu" || path === "/privacy-policy") {
      return path;
    }
    return `/${currentLang}${path === "/" ? "" : path}`;
  };

  const navLinks: NavLink[] = [
    {
      href: langPath("/"),
      label: dictionary.nav.home,
      matcher: (p) => p === `/${currentLang}` || p === `/${currentLang}/`,
    },
    {
      href: langPath("/services"),
      label: dictionary.nav.services,
      matcher: (p) => p.startsWith(`/${currentLang}/services`),
    },
    // {
    //   href: langPath("/projects"),
    //   label: dictionary.nav.ourWork,
    //   matcher: (p) => p.startsWith(`/${currentLang}/projects`),
    // },
    {
      href: langPath("/about"),
      label: dictionary.nav.about,
      matcher: (p) => p.startsWith(`/${currentLang}/about`),
    },
    {
      href: langPath("/pricing"),
      label: dictionary.nav.pricing,
      matcher: (p) => p.startsWith(`/${currentLang}/pricing`),
    },
    {
      href: langPath("/hosting"),
      label: dictionary.nav.hosting,
      matcher: (p) => p.startsWith(`/${currentLang}/hosting`),
    },
    {
      href: langPath("/contact"),
      label: dictionary.nav.contactUs,
      matcher: (p) => p.startsWith(`/${currentLang}/contact`),
    },
    {
      href: "/kimuntu",
      label: dictionary.nav.kimuntu,
      matcher: (p) => p === "/kimuntu",
    },
  ];

  const isActive = (link: NavLink): boolean => {
    if (link.matcher) {
      return link.matcher(pathname);
    }
    return pathname === link.href || pathname.startsWith(link.href + "/");
  };

  // Hide language switcher on non-localized pages
  const showLanguageSwitcher =
    !pathname.startsWith("/kimuntu") && !pathname.startsWith("/privacy-policy");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={langPath("/")}
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Image
              src="/soiZenFier_logo.png"
              alt="SoiZenFier"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="hidden sm:inline">SoiZenFier</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "bg-yellow-100 text-yellow-700 border-b-2 border-yellow-500"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {showLanguageSwitcher && (
              <div className="hidden sm:block ml-2 pl-2 border-l border-slate-200">
                <LanguageSwitcher
                  currentLocale={currentLang as Locale}
                  currentPath={currentPath}
                  dictionary={dictionary}
                />
              </div>
            )}

            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden pb-4">
            <div className="space-y-1 px-2 pt-2">
              {navLinks.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "bg-yellow-100 text-yellow-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            {showLanguageSwitcher && (
              <div className="mt-3 px-3">
                <LanguageSwitcher
                  currentLocale={currentLang as Locale}
                  currentPath={currentPath}
                  dictionary={dictionary}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
