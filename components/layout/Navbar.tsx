"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ResumeModal from "@/components/ui/ResumeModal";

const SECTION_OFFSETS: Record<string, number> = {
  about:      50,
  projects:   50,
  experience: 50,
  services:   50,
  contact:    50,
};

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [resumeOpen,    setResumeOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
    const observe = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", observe, { passive: true });
    return () => window.removeEventListener("scroll", observe);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const offset = SECTION_OFFSETS[id] ?? 0;
    window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-black/[0.07]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-base font-bold text-ink hover:opacity-60 transition-opacity duration-200 cursor-pointer tracking-tight"
          >
            Drawde.
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const active = activeSection === id;
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={cn(
                    "px-5 py-2 text-[15px] rounded-full transition-all duration-200 cursor-pointer",
                    active
                      ? "bg-ink text-white font-medium"
                      : "text-text-secondary hover:text-ink hover:bg-black/5"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => setResumeOpen(true)}
              className="px-6 py-2.5 text-[15px] font-semibold bg-ink text-white rounded-full hover:opacity-75 transition-opacity duration-200 cursor-pointer"
            >
              Resume
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-xl text-text-secondary hover:text-ink hover:bg-black/5 transition-all duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/[0.07] px-6 py-5 flex flex-col gap-1 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="py-3 text-left text-sm font-medium text-text-secondary hover:text-ink transition-colors duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}
            <div className="pt-3 mt-1 border-t border-black/[0.07]">
              <button
                onClick={() => { setMobileOpen(false); setResumeOpen(true); }}
                className="w-full py-3 text-sm font-semibold bg-ink text-white rounded-full hover:opacity-75 transition-opacity duration-200 cursor-pointer"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
