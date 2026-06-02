"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

type NavLink = {
  href: string;
  label: string;
  matcher?: (pathname: string) => boolean;
};

export default function Navigation() {
  const pathname = usePathname();

  // Determine the language from pathname
  const langMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const currentLang = langMatch ? langMatch[1] : "en";

  // Extract the current path without the language prefix
  const currentPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  // Helper to create localized paths
  const langPath = (path: string) => {
    if (path === "/kimuntu" || path === "/privacy-policy") {
      // Non-localized routes
      return path;
    }
    // Localized routes
    return `/${currentLang}${path === "/" ? "" : path}`;
  };

  const navLinks: NavLink[] = [
    {
      href: langPath("/"),
      label: "Home",
      matcher: (p) => p === `/${currentLang}` || p === `/${currentLang}/`,
    },
    {
      href: langPath("/services"),
      label: "Services",
      matcher: (p) => p.startsWith(`/${currentLang}/services`),
    },
    {
      href: langPath("/projects"),
      label: "Projects",
      matcher: (p) => p.startsWith(`/${currentLang}/projects`),
    },
    {
      href: langPath("/pricing"),
      label: "Pricing",
      matcher: (p) => p.startsWith(`/${currentLang}/pricing`),
    },
    {
      href: langPath("/hosting"),
      label: "Hosting",
      matcher: (p) => p.startsWith(`/${currentLang}/hosting`),
    },
    {
      href: langPath("/contact"),
      label: "Contact",
      matcher: (p) => p.startsWith(`/${currentLang}/contact`),
    },
    {
      href: "/kimuntu",
      label: "Kimuntu Gallery",
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

          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-100 text-blue-700 border-b-2 border-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {showLanguageSwitcher && (
              <div className="ml-2 pl-2 border-l border-slate-200">
                <LanguageSwitcher
                  currentLocale={currentLang as any}
                  currentPath={currentPath}
                  dictionary={
                    {
                      language: { en: "EN", fr: "FR" },
                    } as any
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
