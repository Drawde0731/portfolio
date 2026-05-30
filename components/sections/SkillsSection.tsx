"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Server, Database, Wrench, Bot } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    key: "frontend" as keyof typeof SKILLS,
    label: "Frontend",
    Icon: Monitor,
    skills: SKILLS.frontend,
  },
  {
    key: "mobile" as keyof typeof SKILLS,
    label: "Mobile",
    Icon: Smartphone,
    skills: SKILLS.mobile,
  },
  {
    key: "backend" as keyof typeof SKILLS,
    label: "Backend",
    Icon: Server,
    skills: SKILLS.backend,
  },
  {
    key: "database" as keyof typeof SKILLS,
    label: "Database",
    Icon: Database,
    skills: SKILLS.database,
  },
  {
    key: "tools" as keyof typeof SKILLS,
    label: "Tools",
    Icon: Wrench,
    skills: SKILLS.tools,
  },
  {
    key: "ai" as keyof typeof SKILLS,
    label: "AI & Automation",
    Icon: Bot,
    skills: SKILLS.ai,
  },
];

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 text-xs font-mono rounded-lg border border-border-dark text-muted bg-background hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default">
      {label}
    </span>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Technical Arsenal"
          subtitle="Cross-platform fluency across frontend, mobile, backend, AI, and automation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(({ key, label, Icon, skills }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className={cn("")}
            >
              <GlowCard className="p-5 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
