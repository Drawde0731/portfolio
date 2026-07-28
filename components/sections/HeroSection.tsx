"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FADE_UP = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function HeroSection() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen bg-ink overflow-hidden">
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23ffffff'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Two-column grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 min-h-screen grid grid-cols-1 lg:grid-cols-[46%_54%] items-center">

        {/* ── Left: Typography ── */}
        <div className="flex flex-col gap-7 py-28 lg:py-0">

          {/* Status badge */}
          <motion.div {...FADE_UP(0.10)}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              Status: Spraying Insecticide to Prod
            </span>
          </motion.div>

          {/* Name */}
          <motion.div {...FADE_UP(0.25)}>
            <h1
              className="font-bold text-white leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: "clamp(4.5rem, 11vw, 8.5rem)" }}
            >
              Drawde
            </h1>
          </motion.div>

          {/* Roles — stacked, static */}
          <motion.div {...FADE_UP(0.40)} className="flex flex-col gap-0.5">
            {[
              "Software Engineer",
              "Full Stack Developer",
              "AI Application Builder",
            ].map((role) => (
              <span
                key={role}
                className="text-base font-light leading-loose"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div {...FADE_UP(0.52)}>
            <div
              className="h-px w-44"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div {...FADE_UP(0.58)}>
            <p
              className="text-base font-medium leading-snug"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              From Design to Deployment.
              <br />
              Any Stack. Any Platform.
            </p>
          </motion.div>

          {/* Supporting copy */}
          <motion.div {...FADE_UP(0.66)}>
            <p
              className="text-sm font-light leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              I architect systems, build applications, and automate what
              shouldn&apos;t be done by hand — then ship it to production.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...FADE_UP(0.75)}
            className="flex flex-col sm:flex-row gap-3 pt-1"
          >
            <button
              onClick={() => go("projects")}
              className="px-7 py-3 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
              style={{ background: "#FFFFFF", color: "#111111" }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.background = "rgba(255,255,255,0.88)";
                t.style.transform = "translateY(-1px)";
                t.style.boxShadow = "0 8px 24px rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.background = "#FFFFFF";
                t.style.transform = "translateY(0)";
                t.style.boxShadow = "none";
              }}
            >
              View My Work
            </button>
            <button
              onClick={() => go("contact")}
              className="px-7 py-3 text-sm font-light rounded-full transition-all duration-200 cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.65)",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.background = "rgba(255,255,255,0.06)";
                t.style.borderColor = "rgba(255,255,255,0.30)";
                t.style.color = "rgba(255,255,255,0.85)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.background = "transparent";
                t.style.borderColor = "rgba(255,255,255,0.18)";
                t.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* ── Right: 3D canvas placeholder (wired in Task 3) ── */}
        <div className="hidden lg:block h-screen" />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.22em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  );
}
