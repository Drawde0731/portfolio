"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Bot, Database, Server, Link, GraduationCap } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { EXPERIENCE, CERTIFICATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const CERT_ICONS: Record<string, LucideIcon> = {
  Bot,
  Database,
  Server,
  Link,
  GraduationCap,
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Career"
          title="Experience & Certifications"
          subtitle="Two years shipping production software across web, mobile, and enterprise platforms."
        />

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full w-full"
              style={{
                background: "linear-gradient(180deg, #6366F1 0%, #22D3EE 100%)",
              }}
            />
          </div>

          <div className="space-y-10 pl-14 md:pl-16">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="relative"
              >
                {/* Node on timeline */}
                <div
                  className={cn(
                    "absolute -left-10 md:-left-12 top-5 w-4 h-4 rounded-full border-2 z-10",
                    exp.current
                      ? "bg-primary border-primary shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                      : "bg-background border-border-dark"
                  )}
                />

                <GlowCard className="p-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-foreground">{exp.role}</h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-primary font-medium text-sm mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                    <span className="text-xs text-muted font-mono shrink-0">{exp.period}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                        <CheckCircle2
                          size={14}
                          className="text-primary shrink-0 mt-0.5"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[10px] font-mono rounded-md border border-border-dark text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => {
              const Icon = CERT_ICONS[cert.icon] ?? GraduationCap;
              return (
                <motion.div
                  key={`${cert.title}-${cert.issuer}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <GlowCard className="p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground leading-tight">
                        {cert.title}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{cert.issuer}</div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
