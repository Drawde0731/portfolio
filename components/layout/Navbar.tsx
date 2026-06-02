"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Hero is dark — nav text starts light, then shifts when past hero
  const [pastHero, setPastHero]     = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      // Hero is ~100vh tall
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SECTION_OFFSETS: Record<string, number> = {
    about: 50, skills: 50, projects: 10, services: 0, contact: 50,
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - (SECTION_OFFSETS[id] ?? 64);
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const isLight = pastHero && scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? isLight ? "nav-glass" : "nav-glass-dark"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "font-semibold text-base tracking-tight transition-all duration-300 cursor-pointer",
            isLight
              ? "text-ink hover:opacity-60"
              : "text-white hover:opacity-60"
          )}
          aria-label="Go to top"
        >
          Drawde<span className="opacity-40">.</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg transition-colors duration-200 cursor-pointer",
                  isLight
                    ? "text-text-secondary hover:text-ink"
                    : "text-text-light-muted hover:text-white"
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            onClick={() => scrollTo("#contact")}
            className={cn(
              "px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
              isLight
                ? "bg-ink text-white hover:opacity-80"
                : "bg-white text-ink hover:opacity-80"
            )}
          >
            Hire Me
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "md:hidden p-2 transition-colors cursor-pointer",
            isLight ? "text-text-secondary" : "text-text-light-muted"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "md:hidden overflow-hidden border-t",
              isLight
                ? "nav-glass border-black/[0.07]"
                : "nav-glass-dark border-white/[0.07]"
            )}
          >
            <ul className="flex flex-col px-4 py-3 gap-0.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm rounded-lg transition-colors duration-200 cursor-pointer",
                      isLight ? "text-text-secondary hover:text-ink" : "text-text-light-muted hover:text-white"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <button
                  onClick={() => scrollTo("#contact")}
                  className={cn(
                    "w-full px-4 py-3 text-sm font-medium rounded-full transition-opacity hover:opacity-80 cursor-pointer",
                    isLight ? "bg-ink text-white" : "bg-white text-ink"
                  )}
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
