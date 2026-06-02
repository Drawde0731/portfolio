"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

const STATS = [
  { value: "8+", label: "Systems Shipped"  },
  { value: "2+", label: "Years Experience" },
  { value: "5+", label: "Frameworks"       },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 section-light divider-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionHeader eyebrow="About Me" title="Building Software That Ships" align="left" className="mb-8" />

            <p className="text-text-secondary leading-[1.8] mb-5 font-light text-base">
              I&apos;m a software engineer based in the Philippines who turns complex
              product requirements into clean, production-ready applications. At Qymera,
              I&apos;ve shipped 8+ systems across web and mobile — from insurance platforms
              and HRIS tools to real-time chatbots and blockchain applications.
            </p>
            <p className="text-text-secondary leading-[1.8] mb-12 font-light text-base">
              With a background spanning React, Next.js, Flutter, React Native, and
              supporting backend work in Node.js and Django, I bring cross-platform
              fluency to every project. Whether it&apos;s a 3-day hackathon or a long-term
              SaaS build, I deliver.
            </p>

            <div className="grid grid-cols-3 gap-0 border-t border-black/[0.08]">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center py-6 px-2 border-r last:border-r-0 border-black/[0.08]">
                  <div className="text-[2.5rem] font-semibold text-ink leading-none mb-1.5 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] text-text-muted uppercase tracking-[0.14em] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — polaroid identity card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
            className="flex justify-center lg:justify-end"
          >
            <div
              className="polaroid rounded-sm p-6 pb-10 w-full max-w-[280px] text-center"
              style={{ border: "1px solid rgba(0,0,0,0.07)" }}
            >
              {/* Photo area — icon */}
              <div
                className="w-full mb-6 flex items-center justify-center overflow-hidden"
                style={{ height: "200px", background: "#111111" }}
              >
                <Image
                  src="/icon.png"
                  alt="Drawde"
                  width={120}
                  height={120}
                  className="object-contain select-none"
                  priority
                />
              </div>

              <div className="text-sm font-semibold text-ink mb-0.5">John Edward D. Complido</div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted mb-4">
                <MapPin size={10} />
                <span>Bocaue, Bulacan</span>
              </div>

              <div className="w-full h-px bg-black/[0.06] mb-4" />

              <div className="flex items-center justify-center gap-2 text-xs text-text-muted mb-5">
                <GraduationCap size={12} className="shrink-0" />
                <div className="text-left">
                  <div className="text-ink font-medium text-xs">BS Computer Science</div>
                  <div className="text-text-muted text-[11px]">TUP · 2023</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 justify-center">
                {["React","Next.js","Flutter","React Native","Vue.js","TypeScript","Node.js","Django"].map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[9px] font-mono rounded-sm border text-text-muted" style={{ borderColor: "rgba(0,0,0,0.1)", background: "#F5F5F3" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
