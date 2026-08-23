"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { LanguageToggle } from "@/components/layout/language-toggle";

const NAV_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
] as const;

const MENU_TRANSITION_MS = 280;

function navLinkClass(active: boolean, size: "desktop" | "mobile") {
  const base
    = size === "mobile"
      ? "font-display text-3xl tracking-wide"
      : "text-sm font-semibold uppercase tracking-wider";

  return `${base} transition ${
    active
      ? "text-tavern-gold"
      : "text-tavern-muted hover:text-tavern-gold"
  }`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function openMenu() {
    setMenuMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuOpen(true));
    });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    if (menuOpen)
      closeMenu();
    else
      openMenu();
  }

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!menuMounted || menuOpen)
      return;

    const timer = window.setTimeout(() => {
      setMenuMounted(false);
    }, MENU_TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [menuMounted, menuOpen]);

  useEffect(() => {
    if (!menuOpen)
      return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header className="relative z-40 border-b border-tavern-border bg-tavern-panel">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center px-4 sm:px-6 md:grid-cols-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 justify-self-start text-tavern-parchment transition hover:text-tavern-gold"
        >
          <Image
            src="/assets/brand/logo-mark.svg"
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0"
            priority
          />
          <span className="font-display text-sm font-semibold tracking-wide sm:text-base">
            <span className="md:hidden">Routine</span>
            <span className="hidden md:inline">Routine Dungeon</span>
          </span>
        </Link>

        <nav
          className="hidden items-center justify-self-center gap-8 md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={navLinkClass(pathname === href, "desktop")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end md:block">
          <LanguageToggle />
        </div>

        <button
          type="button"
          className="justify-self-end rounded-md border border-tavern-border p-2 text-tavern-parchment transition hover:border-tavern-gold/50 hover:text-tavern-gold md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {menuOpen
            ? (
                <CloseIcon />
              )
            : (
                <BurgerIcon />
              )}
        </button>
      </div>

      {menuMounted && (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          aria-hidden={!menuOpen}
          className={`fixed inset-0 z-50 flex flex-col bg-background transition-transform ease-out md:hidden ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ transitionDuration: `${MENU_TRANSITION_MS}ms` }}
        >
          <div className="flex h-16 items-center justify-between border-b border-tavern-border px-4 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-tavern-parchment"
              onClick={closeMenu}
            >
              <Image
                src="/assets/brand/logo-mark.svg"
                alt=""
                width={36}
                height={36}
                className="size-9"
              />
              <span className="font-display text-sm font-semibold tracking-wide">
                Routine
              </span>
            </Link>
            <button
              type="button"
              className="rounded-md border border-tavern-border p-2 text-tavern-parchment transition hover:border-tavern-gold/50 hover:text-tavern-gold"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col items-center justify-center gap-10 px-6"
            aria-label="Mobile"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={navLinkClass(pathname === href, "mobile")}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            <LanguageToggle className="mt-4" />
          </nav>
        </div>
      )}
    </header>
  );
}

function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
