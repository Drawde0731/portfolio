"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ─── Keyboard Keys — spell D-R-A-W-D-E ───────────────────────────────────────

const KEYS = [
  { label: "D", style: { top: "18%", left:  "5%" },  delay: 0   },
  { label: "R", style: { top: "65%", left:  "4%" },  delay: 0.4 },
  { label: "A", style: { top: "40%", left:  "8%" },  delay: 0.8 },
  { label: "W", style: { top: "22%", right: "6%" },  delay: 0.2 },
  { label: "D", style: { top: "72%", right: "5%" },  delay: 0.6 },
  { label: "E", style: { top: "48%", right: "7%" },  delay: 1.0 },
];

function KeyboardKey({ label, style, delay }: {
  label: string; style: React.CSSProperties; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.35, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      style={style}
      className="absolute z-10 hidden lg:flex"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
        className="key-cap min-w-[40px] h-10 flex items-center justify-center px-2.5 font-mono text-[11px] font-medium select-none"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink">

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23ffffff'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Keyboard keys */}
      {KEYS.map((key, i) => (
        <KeyboardKey key={i} label={key.label} style={key.style} delay={key.delay} />
      ))}

      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-28 pb-16 flex flex-col items-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Status: Spraying Insecticide to Prod
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h1
            className="font-semibold text-white leading-none"
            style={{ fontSize: "clamp(4rem, 14vw, 9rem)", letterSpacing: "-0.035em" }}
          >
            Drawde
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-center max-w-md"
        >
          <p className="text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            Full-stack engineer in the Philippines
          </p>
          <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
            Building production web and mobile apps in React, Next.js, Flutter, and React Native —
            from Figma files to live deployments.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => go("projects")}
            className="px-7 py-3 text-sm font-medium bg-white text-ink rounded-full hover:opacity-85 transition-opacity duration-200 cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={() => go("contact")}
            className="px-7 py-3 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer hover:bg-white/[0.06]"
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
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
