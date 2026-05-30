"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";

const STATS = [
  { value: "8+", label: "Systems Shipped" },
  { value: "2+", label: "Years Experience" },
  { value: "5+", label: "Frameworks" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionHeader
              eyebrow="About Me"
              title="Building Software That Ships"
              align="left"
              className="mb-6"
            />

            <p className="text-muted leading-relaxed mb-4">
              I&apos;m a software engineer based in the Philippines who turns complex
              product requirements into clean, production-ready applications. At Qymera,
              I&apos;ve shipped 8+ systems across web and mobile — from insurance platforms
              and HRIS tools to real-time chatbots and blockchain applications. I specialize
              in transforming UI/UX designs into pixel-perfect, performant interfaces,
              then connecting them to the data they need.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              With a background spanning React, Next.js, Flutter, React Native, and
              supporting backend work in Node.js and Django, I bring cross-platform
              fluency to every project. Whether it&apos;s a 3-day hackathon or a long-term
              SaaS build, I deliver.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((stat) => (
                <GlowCard key={stat.label} className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary text-glow mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted leading-tight">{stat.label}</div>
                </GlowCard>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <GlowCard className="relative p-8 w-full max-w-sm text-center overflow-hidden">
              {/* Animated glow ring */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none border-animate"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Monogram */}
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-mono font-black text-primary text-glow leading-none mb-4 select-none">
                  Drawde
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  John Edward D. Complido
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-muted mb-4">
                  <MapPin size={12} className="text-accent" />
                  <span>Bocaue, Bulacan</span>
                </div>

                {/* Tech badges */}
                <div className="mt-5 flex flex-wrap gap-1.5 justify-center">
                  {[
                    "React", "Next.js", "Flutter", "React Native", "Expo",
                    "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS",
                    "Tailwind CSS", "Bootstrap", "Node.js", "Django", "FastAPI", "REST APIs",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-mono rounded-md border border-border-dark text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
