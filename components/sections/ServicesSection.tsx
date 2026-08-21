"use client";

import { Code2, Smartphone, Brain, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILLS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const SKILL_ICONS: Record<string, LucideIcon> = { Code2, Smartphone, Brain, Zap };

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="py-28 bg-white"
      style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Skills"
          title="What I Know"
          subtitle="Technologies and tools I work with across web, mobile, AI, and automation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILLS.map((skill) => {
            const Icon = SKILL_ICONS[skill.icon] ?? Code2;
            return (
              <div
                key={skill.title}
                className="bg-white rounded-xl p-8 flex flex-col gap-5"
                style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                {/* Icon */}
                <div
                  className="p-3 rounded-lg w-fit"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <Icon size={20} className="text-text-secondary" />
                </div>

                {/* Title + description */}
                <div>
                  <h3 className="text-base font-semibold text-ink mb-2">{skill.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    {skill.description}
                  </p>
                </div>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-full text-text-muted"
                      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
