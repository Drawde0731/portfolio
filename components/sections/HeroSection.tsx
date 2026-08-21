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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center min-h-[calc(100vh-9rem)]">

          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-7"
          >
            {/* Headline */}
            <h1
              className="font-bold text-ink leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
            >
              Hello I&apos;m Drawde,
              <br />
              <span style={outlined}>Software</span>{" "}
              <span style={outlined}>Engineer</span>
            </h1>

            {/* Description */}
            <p
              className="text-base leading-relaxed font-light max-w-md"
              style={{ color: "#888888" }}
            >
              Web. Mobile. AI. Automation. One engineer.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-3.5 text-text-secondary hover:text-ink transition-colors duration-200"
                  style={{
                    border: "1.5px solid rgba(0,0,0,0.15)",
                    borderRadius: "8px",
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: illustration ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative select-none"
              style={{ width: "clamp(300px, 44vw, 560px)" }}
            >
              <Image
                src="/illustration-hero.png"
                alt="Cat on keyboard"
                width={460}
                height={460}
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
