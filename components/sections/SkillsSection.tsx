"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Server, Database, Wrench, Bot } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILLS } from "@/lib/constants";

const CATEGORIES = [
  { key: "frontend" as keyof typeof SKILLS, label: "Frontend",        Icon: Monitor,    skills: SKILLS.frontend },
  { key: "mobile"   as keyof typeof SKILLS, label: "Mobile",          Icon: Smartphone, skills: SKILLS.mobile   },
  { key: "backend"  as keyof typeof SKILLS, label: "Backend",         Icon: Server,     skills: SKILLS.backend  },
  { key: "database" as keyof typeof SKILLS, label: "Database",        Icon: Database,   skills: SKILLS.database },
  { key: "tools"    as keyof typeof SKILLS, label: "Tools",           Icon: Wrench,     skills: SKILLS.tools    },
  { key: "ai"       as keyof typeof SKILLS, label: "AI & Automation", Icon: Bot,        skills: SKILLS.ai       },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 section-white" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Technology Stack"
          subtitle="Cross-platform fluency across frontend, mobile, backend, AI, and automation."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(({ key, label, Icon, skills }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div
                className="rounded-2xl p-6 h-full transition-shadow duration-300 hover:shadow-card-hover"
                style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                    <Icon size={15} className="text-text-secondary" />
                  </div>
                  <span className="text-sm font-semibold text-ink">{label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono rounded-full text-text-secondary transition-all duration-200 cursor-default hover:text-ink hover:border-black/20"
                      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
