"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const SOCIALS = [
  { href: "https://github.com/Drawde0731",                                   icon: Github,   label: "GitHub"   },
  { href: "https://www.linkedin.com/in/john-edward-complido-3b7b8b257/",     icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:johnedward1436@gmail.com",                                 icon: Mail,     label: "Email"    },
];

const outlined: React.CSSProperties = {
  WebkitTextStroke: "2.5px #111111",
  color: "transparent",
};

// Shared slide-from-left variant
const fromLeft = (delay: number) => ({
  initial: { opacity: 0, x: -48 },
  animate:  { opacity: 1, x: 0 },
  transition: {
    delay,
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as number[],
  },
});

// Slide-from-right for illustration (fires after left items are done)
const ILLUS_DELAY = 1.1;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center min-h-[calc(100vh-9rem)]">

          {/* ── Left: staggered slide-from-left ── */}
          <div className="flex flex-col gap-5 overflow-hidden">

            {/* Line 1 */}
            <motion.p
              {...fromLeft(0.1)}
              className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-ink leading-none tracking-tight"
            >
              Hello I&apos;m Drawde,
            </motion.p>

            {/* Line 2 */}
            <motion.h1
              {...fromLeft(0.35)}
              className="font-bold text-ink leading-none tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
            >
              <span style={outlined}>Software</span>{" "}
              <span style={outlined}>Engineer</span>
            </motion.h1>

            {/* Line 3 — description */}
            <motion.p
              {...fromLeft(0.6)}
              className="text-base leading-relaxed font-light max-w-md"
              style={{ color: "#888888" }}
            >
              Web. Mobile. AI. Automation. One engineer.
            </motion.p>

            {/* Line 4 — icons */}
            <motion.div
              {...fromLeft(0.85)}
              className="flex items-center gap-3"
            >
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-3.5 text-text-secondary hover:text-ink transition-colors duration-200"
                  style={{ border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px" }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: slide-from-right, fires after left is done ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: ILLUS_DELAY,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative select-none"
              style={{ width: "clamp(300px, 44vw, 560px)" }}
            >
              <Image
                src="/illustration-hero.png"
                alt="Cat on keyboard"
                width={560}
                height={560}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
