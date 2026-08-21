"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";

const SOCIALS = [
  { href: "https://github.com/Drawde0731",                                           icon: Github,   label: "GitHub"   },
  { href: "https://www.linkedin.com/in/john-edward-complido-3b7b8b257/",             icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:johnedward1436@gmail.com",                                         icon: Mail,     label: "Email"    },
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center min-h-[calc(100vh-9rem)]">

          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-5 max-w-xl"
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              <span className="text-xs font-mono text-text-muted">
                Status: Spraying Insecticide to Prod
              </span>
            </div>

            {/* Greeting + name */}
            <div>
              <p className="text-sm font-medium text-text-muted mb-2 tracking-wide">
                Hello, I&apos;m
              </p>
              <h1
                className="font-bold text-ink tracking-tight leading-none"
                style={{ fontSize: "clamp(3.8rem, 9vw, 7rem)" }}
              >
                Drawde
              </h1>
              <p className="mt-3 text-lg font-medium text-text-secondary">
                Full-stack engineer
              </p>
            </div>

            {/* Body */}
            <p className="text-base text-text-secondary leading-relaxed font-light">
              Building production web and mobile apps in React, Next.js, Flutter,
              and React Native — from Figma files to live deployments.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-black/10 text-text-secondary hover:text-ink hover:border-black/20 transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => scrollTo("projects")}
                className="px-7 py-3.5 text-sm font-semibold bg-ink text-white rounded-full hover:opacity-75 transition-opacity duration-200 cursor-pointer"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-7 py-3.5 text-sm font-semibold rounded-full border border-black/12 text-text-secondary hover:text-ink hover:border-black/25 transition-all duration-200 cursor-pointer"
              >
                Get in Touch
              </button>
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
              style={{ width: "clamp(260px, 38vw, 480px)" }}
            >
              <Image
                src="/illustration-hero.png"
                alt="Cat on keyboard"
                width={480}
                height={480}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/25"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
