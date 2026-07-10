"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const ROUTES = [
  { path: "/robotics", key: "nav.robotics" },
  { path: "/projects", key: "nav.projects" },
  { path: "/research", key: "nav.research" },
  { path: "/thesis", key: "nav.thesis" },
  { path: "/certifications", key: "nav.certifications" },
  { path: "/contact", key: "nav.contact" },
] as const;

export function TerminalNav() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const langToggle = (
    <button
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="mono text-xs tracking-widest text-muted transition-colors hover:text-foreground"
      aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
    >
      [<span className={cn(language === "en" && "text-accent")}>EN</span>
      {"/"}
      <span className={cn(language === "es" && "text-accent")}>ES</span>]
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[#050505]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 md:px-6">
        <Link href="/" className="mono group text-sm text-foreground">
          <span className="text-accent">felipe@mesa</span>
          <span className="text-muted">:</span>
          <span className="text-muted transition-colors group-hover:text-foreground">~</span>
          <span className="text-muted">$</span>
        </Link>

        {/* Desktop links */}
        <nav className="mono ml-auto hidden items-center gap-5 md:flex" aria-label="Main">
          {ROUTES.map((r) => {
            const active = pathname.startsWith(r.path);
            return (
              <Link
                key={r.path}
                href={r.path}
                className={cn(
                  "text-xs tracking-wider transition-colors",
                  active ? "text-accent" : "text-muted hover:text-foreground",
                )}
              >
                <span className={cn(active ? "text-accent" : "text-line-strong")}>./</span>
                {t(r.key).toLowerCase()}
              </Link>
            );
          })}
          {langToggle}
        </nav>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-4 md:hidden">
          {langToggle}
          <button
            onClick={() => setOpen(!open)}
            className="mono text-xs tracking-widest text-foreground"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "[x]" : "[≡]"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="mono flex flex-col border-t border-line bg-[#050505] px-6 py-6 md:hidden"
          aria-label="Main"
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "border-b border-line py-3 text-sm tracking-wider",
              pathname === "/" ? "text-accent" : "text-muted",
            )}
          >
            <span className="text-line-strong">cd </span>~
          </Link>
          {ROUTES.map((r) => {
            const active = pathname.startsWith(r.path);
            return (
              <Link
                key={r.path}
                href={r.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-line py-3 text-sm tracking-wider",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <span className="text-line-strong">cd </span>
                {t(r.key).toLowerCase()}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
