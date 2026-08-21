"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="about"
      className="py-28 bg-white"
      style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: illustration ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center"
          >
            <div
              className="relative select-none"
              style={{ width: "clamp(240px, 40vw, 460px)" }}
            >
              <Image
                src="/illustration-about.png"
                alt="Cozy coding setup with cat"
                width={460}
                height={460}
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* ── Right: text ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-3">
                About Me
              </p>
              <h2
                className="font-bold text-ink tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Building Software
                <br />
                That Ships
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed font-light">
              I&apos;m a software engineer with two years of experience building
              production systems for enterprise clients, insurance platforms,
              HRIS, multi-tenant POS, and custom internal tools. I live at the
              intersection of design and engineering, which means I care about
              how things look as much as how they work.
            </p>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              My typical stack is React or Next.js on the front, Flutter or
              React Native on mobile, and whatever backend the project calls for.
              I&apos;ve shipped apps used daily by real users, not just toy projects.
            </p>

            {/* Info chips */}
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <MapPin size={14} className="text-text-secondary" />
                </div>
                <span className="text-sm text-text-secondary font-light">
                  Bocaue, Bulacan, Philippines
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <GraduationCap size={14} className="text-text-secondary" />
                </div>
                <span className="text-sm text-text-secondary font-light">
                  BS Information Technology, Bulacan State University
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => scrollTo("contact")}
                className="px-7 py-3.5 text-sm font-semibold bg-ink text-white rounded-full hover:opacity-75 transition-opacity duration-200 cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
