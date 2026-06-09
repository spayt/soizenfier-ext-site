"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import SignInDialog from "./SignInDialog";
import { getDictionary, type Locale } from "@/lib/i18n";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

type NavLink = {
  href: string;
  label: string;
  matcher?: (pathname: string) => boolean;
};

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const langMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const currentLang = langMatch ? langMatch[1] : "en";
  const dictionary = getDictionary(currentLang as Locale);
  const currentPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (u) => {
      setUserConnected(Boolean(u));
    });
    return () => unsubscribe();
  }, []);

  const langPath = (path: string) => {
    if (path === "/kimuntu" || path === "/privacy-policy") return path;
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

  const isActive = (link: NavLink): boolean =>
    link.matcher
      ? link.matcher(pathname)
      : pathname === link.href || pathname.startsWith(link.href + "/");

  const showLanguageSwitcher =
    !pathname.startsWith("/kimuntu") && !pathname.startsWith("/privacy-policy");

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100/80 shadow-[0_1px_12px_rgba(15,23,42,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href={langPath("/")} className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-200">
                <Image
                  src="/soiZenFier_logo.png"
                  alt={dictionary.company}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="hidden md:block text-xs font-bold text-slate-900 group-hover:text-yellow-600 transition-colors duration-200 leading-tight">
                {dictionary.company}
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center gap-3">
              {/* Pill container */}
              <div className="flex items-center bg-slate-100/80 rounded-full p-1 gap-0.5">
                {navLinks.map((link) => {
                  const active = isActive(link);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                        active
                          ? "bg-yellow-400 text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900 hover:bg-white/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2 pl-1">
                {showLanguageSwitcher && (
                  <LanguageSwitcher
                    currentLocale={currentLang as Locale}
                    currentPath={currentPath}
                    dictionary={dictionary}
                  />
                )}

                {userConnected ? (
                  <Link
                    href={langPath("/profile")}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    aria-label="Profile"
                  >
                    <span className="text-sm">👤</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSignInOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-bold text-slate-900 hover:bg-yellow-300 transition-all duration-200 hover:scale-[1.03] shadow-sm"
                  >
                    {dictionary.profilePage.signIn}
                    <span className="text-slate-700">→</span>
                  </button>
                )}
              </div>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-bold text-base"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md pb-5 px-4">
            <div className="pt-3 space-y-0.5">
              {navLinks.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 ${
                      active
                        ? "bg-yellow-400 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {userConnected ? (
                <Link
                  href={langPath("/profile")}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <span>👤</span>
                  Profile
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => { setSignInOpen(true); setMenuOpen(false); }}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-300 transition-colors"
                >
                  {dictionary.profilePage.signIn} →
                </button>
              )}

              {showLanguageSwitcher && (
                <LanguageSwitcher
                  currentLocale={currentLang as Locale}
                  currentPath={currentPath}
                  dictionary={dictionary}
                />
              )}
            </div>
          </div>
        )}
      </nav>

      <SignInDialog open={signInOpen} onOpenChange={setSignInOpen} />
    </>
  );
}
