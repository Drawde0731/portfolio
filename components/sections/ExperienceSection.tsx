"use client";

import { motion } from "framer-motion";
import { Bot, Database, Server, Link, GraduationCap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { EXPERIENCE, CERTIFICATIONS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const CERT_ICONS: Record<string, LucideIcon> = { Bot, Database, Server, Link, GraduationCap };

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 section-light" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Career"
          title="Experience & Certifications"
          subtitle="Two years shipping production software across web, mobile, and enterprise platforms."
        />

        {/* Timeline — left-border card approach, no floating dots */}
        <div className="space-y-5 mb-20">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <div
                className="bg-white rounded-2xl p-7"
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderLeft: exp.current ? "3px solid #111111" : "3px solid rgba(0,0,0,0.12)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-base font-semibold text-ink">{exp.role}</h3>
                      {exp.current && (
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-ink text-white">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary font-medium">{exp.company}</div>
                  </div>
                  <span className="text-xs text-text-muted font-mono shrink-0 pt-0.5">{exp.period}</span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-5">
                  {exp.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-3 text-sm text-text-secondary leading-relaxed font-light">
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ background: "rgba(0,0,0,0.2)" }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div
                  className="flex flex-wrap gap-1.5 pt-4"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-mono rounded-full text-text-muted"
                      style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-text-muted mb-8 text-center">
          Certifications
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, i) => {
            const Icon = CERT_ICONS[cert.icon] ?? GraduationCap;
            return (
              <motion.div
                key={`${cert.title}-${cert.issuer}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div
                  className="bg-white rounded-2xl p-5 flex items-center gap-4"
                  style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                >
                  <div
                    className="p-2.5 rounded-xl shrink-0"
                    style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.07)" }}
                  >
                    <Icon size={14} className="text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink leading-tight">{cert.title}</div>
                    <div className="text-xs text-text-muted mt-0.5">{cert.issuer}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
