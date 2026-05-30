"use client";

import { motion } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS } from "@/lib/constants";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Work"
          subtitle="A selection of production systems built across web and mobile platforms."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            >
              <GlowCard className="p-6 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300 cursor-default">
                {/* Category badge */}
                <div className="mb-3">
                  <span className="px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-wider rounded-full border border-accent/30 text-accent">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Highlight */}
                <p className="text-xs text-muted/70 italic mb-4 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  {project.highlight}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-mono rounded-md border border-border-dark text-muted group-hover:border-primary/30 transition-colors duration-300"
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
    </section>
  );
}
