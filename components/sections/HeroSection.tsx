"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Keyboard Keys ────────────────────────────────────────────────────────────

const KEYS = ["ESC", "TAB", "⌘", "⇧", "↑", "↓", "←", "→"];

const KEY_POSITIONS = [
  { top: "12%", left: "5%", delay: 0 },
  { top: "18%", right: "8%", delay: 0.4 },
  { top: "72%", left: "3%", delay: 0.8 },
  { top: "65%", right: "5%", delay: 0.2 },
  { top: "35%", left: "8%", delay: 1.0 },
  { top: "80%", right: "12%", delay: 0.6 },
  { top: "48%", left: "2%", delay: 1.2 },
  { top: "28%", right: "3%", delay: 0.9 },
];

function KeyboardKey({
  label,
  style,
  delay,
  scrollY,
}: {
  label: string;
  style: React.CSSProperties;
  delay: number;
  scrollY: number;
}) {
  const pressAmount = Math.min(scrollY / 400, 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1 - pressAmount * 0.7, scale: 1, y: pressAmount * 12 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={style}
      className="absolute z-10 hidden lg:flex"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2.8 + delay * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        className="min-w-[40px] h-10 flex items-center justify-center px-2.5 rounded-md font-mono text-xs font-medium text-muted select-none"
        style={{
          background: "rgba(13,13,18,0.9)",
          border: "1px solid #1A1A2E",
          boxShadow: "0 4px 0 #0D0D12, 0 5px 8px rgba(0,0,0,0.4)",
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// ─── Terminal ─────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { text: "$ npx solve-problem", color: "text-accent", delay: 200 },
  { text: "", color: "text-muted", delay: 900 },
  { text: "? Business Need", color: "text-muted", delay: 1200 },
  { text: "> Streamline operations and reduce manual work", color: "text-foreground", delay: 1800 },
  { text: "", color: "text-muted", delay: 2200 },
  { text: "✓ Building web application...", color: "text-green-400", delay: 2600 },
  { text: "✓ Building mobile experience...", color: "text-green-400", delay: 3300 },
  { text: "✓ Creating AI agents...", color: "text-green-400", delay: 4000 },
  { text: "✓ Automating workflows...", color: "text-green-400", delay: 4700 },
  { text: "✓ Deploying globally...", color: "text-green-400", delay: 5400 },
  { text: "", color: "text-muted", delay: 6000 },
  { text: "● Solution delivered.", color: "text-foreground", delay: 6400, cursor: true },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass rounded-xl p-5 font-mono text-xs leading-relaxed max-w-[520px] w-full"
      style={{ boxShadow: "0 0 40px rgba(99,102,241,0.1)" }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-muted text-[10px]">terminal — portfolio</span>
      </div>

      {/* Lines */}
      <div className="space-y-1.5 min-h-[100px]">
        {TERMINAL_LINES.map((line, i) =>
          visibleLines.includes(i) ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={cn("flex items-center gap-0", line.color)}
            >
              <span>{line.text}</span>
              {line.cursor && visibleLines.includes(i) && (
                <span className="ml-0.5 w-2 h-[1em] bg-primary inline-block cursor-blink" />
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
  "Software Engineer",
  "Full Stack Developer",
  "Cross-Platform Builder",
  "Frontend Specialist",
  "Mobile Developer",
  "AI Automation",
  "LLM Applications",
  "Deep Learning",
  "Workflow Automation",
  "Agent Development",
  "RAG Systems"
];

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-9 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="gradient-text text-2xl md:text-3xl font-bold"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Glow orbs */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Keyboard keys (scattered) */}
      {KEYS.map((key, i) => (
        <KeyboardKey
          key={key}
          label={key}
          style={KEY_POSITIONS[i]}
          delay={KEY_POSITIONS[i].delay}
          scrollY={scrollY}
        />
      ))}

      {/* Main content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center gap-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-border-dark"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-muted font-medium">Status: Spraying Insecticide to Prod</span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-foreground mb-4 leading-[1.1] tracking-tight">
            <span className="text-glow">Drawde</span>
          </h1>

          {/* Role cycler */}
          <RoleCycler />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center max-w-lg"
        >
          <p className="text-base md:text-lg font-mono text-accent mb-3 tracking-wide">
            From Design to Deployment. Any Stack. Any Platform.
          </p>
          <p className="text-muted text-sm md:text-base leading-relaxed">
            Building production-ready web and mobile applications across React,
            Next.js, Flutter, and React Native. Clean code. Fast delivery. Real
            results.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="px-7 py-3.5 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-200 cursor-pointer shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] hover:-translate-y-0.5"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-7 py-3.5 text-sm font-semibold text-foreground rounded-xl border border-border-dark hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="w-full flex justify-center"
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-muted"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
