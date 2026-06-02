"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Keyboard Keys ────────────────────────────────────────────────────────────

const KEYS = ["ESC", "TAB", "⌘", "⇧", "↑", "↓", "←", "→"];

const KEY_POSITIONS = [
  { top: "15%",  left: "6%",   delay: 0   },
  { top: "22%",  right: "7%",  delay: 0.4 },
  { top: "68%",  left: "4%",   delay: 0.8 },
  { top: "60%",  right: "6%",  delay: 0.2 },
  { top: "40%",  left: "10%",  delay: 1.0 },
  { top: "76%",  right: "10%", delay: 0.6 },
  { top: "52%",  left: "2%",   delay: 1.2 },
  { top: "32%",  right: "3%",  delay: 0.9 },
];

function KeyboardKey({ label, style, delay, scrollY }: {
  label: string; style: React.CSSProperties; delay: number; scrollY: number;
}) {
  const pressAmount = Math.min(scrollY / 500, 1);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: (0.4 - pressAmount * 0.4), scale: 1, y: pressAmount * 8 }}
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

// ─── Terminal ─────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { text: "$ npx solve-problem",                            color: "text-white",       delay: 200  },
  { text: "",                                               color: "",                 delay: 900  },
  { text: "? Business Need",                                color: "text-white/50",    delay: 1200 },
  { text: "> Streamline operations and reduce manual work", color: "text-white/80",    delay: 1800 },
  { text: "",                                               color: "",                 delay: 2200 },
  { text: "✓ Building web application...",                  color: "text-green-400",   delay: 2600 },
  { text: "✓ Building mobile experience...",                color: "text-green-400",   delay: 3300 },
  { text: "✓ Creating AI agents...",                        color: "text-green-400",   delay: 4000 },
  { text: "✓ Automating workflows...",                      color: "text-green-400",   delay: 4700 },
  { text: "✓ Deploying globally...",                        color: "text-green-400",   delay: 5400 },
  { text: "",                                               color: "",                 delay: 6000 },
  { text: "● Solution delivered.",                          color: "text-white",       delay: 6400, cursor: true },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => setVisibleLines((p) => [...p, i]), line.delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="rounded-2xl p-5 font-mono text-xs leading-relaxed max-w-[500px] w-full"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-white/30 text-[10px] tracking-wide">terminal — portfolio</span>
      </div>
      <div className="space-y-1.5 min-h-[104px]">
        {TERMINAL_LINES.map((line, i) =>
          visibleLines.includes(i) ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className={cn("flex items-center", line.color)}
            >
              <span>{line.text}</span>
              {line.cursor && (
                <span className="ml-0.5 w-1.5 h-[1em] bg-white inline-block cursor-blink" />
              )}
            </motion.div>
          ) : null
        )}
      </div>
    </motion.div>
  );
}

// ─── Role Cycler ──────────────────────────────────────────────────────────────

const ROLES = [
  "Software Engineer", "Full Stack Developer", "Cross-Platform Builder",
  "Frontend Specialist", "Mobile Developer", "AI Automation",
  "LLM Applications", "Deep Learning", "Workflow Automation",
  "Agent Development", "RAG Systems",
];

function RoleCycler() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-9 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-xl md:text-2xl font-light text-white/50 tracking-tight"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink">

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23ffffff'/%3E%3C/svg%3E\")", backgroundSize: "4px 4px" }}
      />

      {/* Keyboard keys */}
      {KEYS.map((key, i) => (
        <KeyboardKey key={key} label={key} style={KEY_POSITIONS[i]} delay={KEY_POSITIONS[i].delay} scrollY={scrollY} />
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
            className="font-semibold text-white leading-none mb-4"
            style={{ fontSize: "clamp(4rem, 14vw, 9rem)", letterSpacing: "-0.035em" }}
          >
            Drawde
          </h1>
          <RoleCycler />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-center max-w-md"
        >
          <p className="text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            From Design to Deployment. Any Stack. Any Platform.
          </p>
          <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
            Building production-ready web and mobile applications across React,
            Next.js, Flutter, and React Native. Clean code. Fast delivery. Real results.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
            className="px-7 py-3 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.65 }}
          className="w-full flex justify-center"
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.22em]">Scroll</span>
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
