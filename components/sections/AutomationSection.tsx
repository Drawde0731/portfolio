"use client";

import { motion } from "framer-motion";
import { User, Search, Bot, TrendingUp, Database, Server, Link, GraduationCap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { CERTIFICATIONS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const CERT_ICONS: Record<string, LucideIcon> = { Bot, Database, Server, Link, GraduationCap };

const FLOW_STEPS = [
  { Icon: User,       label: "Manual Process", sublabel: "Time-consuming tasks"       },
  { Icon: Search,     label: "RPA Analysis",   sublabel: "Map & optimize"             },
  { Icon: Bot,        label: "Automation Bot", sublabel: "UIPath / IBM RPA"           },
  { Icon: TrendingUp, label: "Results",        sublabel: "Time saved. Errors reduced." },
];

export default function AutomationSection() {
  return (
    <section id="automation" className="py-28 section-light" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="RPA & Automation" title="Process Automation Expertise"
          subtitle="Certified in UIPath and IBM RPA. Bridging software engineering with intelligent process automation." />

        {/* Flow diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 mb-20">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 md:gap-0">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.12 }}>
                <div className="bg-white rounded-2xl p-6 text-center min-w-[145px] transition-shadow duration-300 hover:shadow-card-hover"
                  style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="p-2.5 rounded-xl w-fit mx-auto mb-4" style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.07)" }}>
                    <step.Icon size={18} className="text-text-secondary" />
                  </div>
                  <div className="text-sm font-semibold text-ink leading-tight mb-1">{step.label}</div>
                  <div className="text-[11px] text-text-muted font-light">{step.sublabel}</div>
                </div>
              </motion.div>
              {i < FLOW_STEPS.length - 1 && (
                <>
                  <div className="hidden md:flex items-center w-10 shrink-0">
                    <div className="h-px w-7" style={{ background: "rgba(0,0,0,0.12)" }} />
                    <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "7px solid rgba(0,0,0,0.15)" }} />
                  </div>
                  <div className="md:hidden text-text-muted">↓</div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-text-muted mb-8 text-center">Automation Certifications</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-lg mx-auto">
          {CERTIFICATIONS.filter(c => c.issuer === "UIPath" || c.issuer === "IBM").map((cert, i) => {
            const Icon = CERT_ICONS[cert.icon] ?? GraduationCap;
            return (
              <motion.div key={`${cert.title}-${cert.issuer}`} initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl p-5 flex items-center gap-4 group hover:shadow-card-hover transition-shadow duration-300 block"
                  style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                >
                  <div className="p-2.5 rounded-xl shrink-0 group-hover:bg-ink transition-all duration-200" style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.07)" }}>
                    <Icon size={14} className="text-text-secondary group-hover:text-gray-300 transition-colors duration-200" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink leading-tight">{cert.title}</div>
                    <div className="text-xs text-text-muted mt-0.5">{cert.issuer}</div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center">
          <p className="text-sm text-text-muted mb-5 font-light">Need workflow automation? Let&apos;s talk.</p>
          <button
            onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="px-7 py-3 text-sm font-medium bg-ink text-white rounded-full hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            Discuss Automation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
