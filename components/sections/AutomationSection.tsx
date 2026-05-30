"use client";

import { motion } from "framer-motion";
import { User, Search, Bot, TrendingUp, Bot as BotIcon, Database, Server, Link, GraduationCap } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { CERTIFICATIONS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const CERT_ICONS: Record<string, LucideIcon> = {
  Bot: BotIcon,
  Database,
  Server,
  Link,
  GraduationCap,
};

const FLOW_STEPS = [
  {
    Icon: User,
    label: "Manual Process",
    sublabel: "Time-consuming tasks",
  },
  {
    Icon: Search,
    label: "RPA Analysis",
    sublabel: "Map & optimize",
  },
  {
    Icon: Bot,
    label: "Automation Bot",
    sublabel: "UIPath / IBM RPA",
  },
  {
    Icon: TrendingUp,
    label: "Results",
    sublabel: "Time saved. Errors reduced.",
  },
];

function AnimatedArrow() {
  return (
    <div className="hidden md:flex items-center justify-center w-12 shrink-0">
      <div className="relative w-full h-px bg-border-dark overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-8 h-full"
          style={{
            background: "linear-gradient(90deg, transparent, #6366F1, transparent)",
          }}
        />
      </div>
      <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-primary/60 shrink-0" />
    </div>
  );
}

export default function AutomationSection() {
  return (
    <section id="automation" className="py-24" style={{ background: "#070710" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="RPA & Automation"
          title="Process Automation Expertise"
          subtitle="Certified in UIPath and IBM RPA. Bridging software engineering with intelligent process automation."
        />

        {/* Flow diagram */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 mb-16 justify-center">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4 md:gap-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <GlowCard className="p-5 text-center min-w-[140px]">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 w-fit mx-auto mb-3">
                    <step.Icon size={20} className="text-primary" />
                  </div>
                  <div className="text-sm font-semibold text-foreground leading-tight mb-1">
                    {step.label}
                  </div>
                  <div className="text-[11px] text-muted leading-snug">{step.sublabel}</div>
                </GlowCard>
              </motion.div>

              {/* Arrow between steps */}
              {i < FLOW_STEPS.length - 1 && <AnimatedArrow />}

              {/* Mobile arrow */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="md:hidden text-primary text-xl rotate-90">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-foreground mb-5 text-center">
            Automation Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => {
              const Icon = CERT_ICONS[cert.icon] ?? GraduationCap;
              return (
                <motion.div
                  key={`${cert.title}-${cert.issuer}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <GlowCard className="p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20 shrink-0">
                      <Icon size={16} className="text-accent" />
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-muted text-sm mb-4">
            Need workflow automation? Let&apos;s talk.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            Discuss Automation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
