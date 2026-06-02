"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS } from "@/lib/constants";

// Slight rotation for each card — alternating for editorial feel
const TILTS = ["rotate-1", "-rotate-1", "-rotate-1", "rotate-1"];

// Dark image-area backgrounds for each project — monochrome variety
const IMAGE_BG = ["#111111", "#1A1A1A", "#111111", "#1A1A1A"];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 section-white" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="Portfolio" title="Featured Work"
          subtitle="A selection of production systems built across web and mobile platforms." />

        {/* Polaroid grid — slight tilt on each card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-14">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${TILTS[i % TILTS.length]} hover:rotate-0 transition-transform duration-500`}
            >
              {/* Polaroid frame */}
              <div className="polaroid" style={{ borderRadius: "3px", border: "1px solid rgba(0,0,0,0.08)" }}>

                {/* Photo area */}
                <div
                  className="w-full flex items-center justify-center overflow-hidden"
                  style={{ height: "220px", background: IMAGE_BG[i % IMAGE_BG.length] }}
                >
                  <div className="text-center px-8 select-none">
                    <div className="font-semibold text-white/10 mb-2"
                      style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {project.title.split(" ").map((w: string) => w[0]).join("").slice(0, 3)}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">{project.category}</div>
                  </div>
                </div>

                {/* Polaroid caption area — generous bottom padding is key */}
                <div className="bg-white px-6 pt-5 pb-10">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    {project.category}
                  </span>
                  <h3 className="text-[1.1rem] font-semibold text-ink mt-1 mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3 font-light">
                    {project.description}
                  </p>
                  <p className="text-xs text-text-muted italic font-light mb-4">— {project.highlight}</p>
                  <div className="flex flex-wrap gap-1" style={{ paddingTop: "14px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    {project.tech.map((t: string) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded-sm text-text-muted"
                        style={{ background: "#F5F5F3", border: "1px solid rgba(0,0,0,0.08)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
