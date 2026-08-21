"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-28"
      style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Portfolio
          </p>
          <h2
            className="font-bold text-white tracking-tight leading-none"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
          >
            My Projects
          </h2>
          <p className="mt-4 text-base font-light max-w-lg"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            Personal projects built for fun, for friends, and for real people.
          </p>
        </motion.div>

        {/* Numbered project list */}
        <div>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* divider */}
              {i > 0 && <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />}

              <div className="py-10 grid grid-cols-1 lg:grid-cols-[6rem_1fr] gap-5 lg:gap-10 items-start group">

                {/* Number */}
                <div
                  className="font-bold tabular-nums leading-none shrink-0 select-none transition-opacity duration-300 group-hover:opacity-80"
                  style={{
                    fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                    color: "#F5C542",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] mb-1 block"
                        style={{ color: "rgba(255,255,255,0.35)" }}>
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold text-white leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors shrink-0 mt-1"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                    >
                      <ExternalLink size={12} />
                      Live Site
                    </a>
                  </div>

                  <p className="text-sm leading-relaxed mb-3 font-light max-w-2xl"
                    style={{ color: "rgba(255,255,255,0.55)" }}>
                    {project.description}
                  </p>
                  {project.highlight && (
                    <p className="text-xs italic mb-4 font-light"
                      style={{ color: "rgba(255,255,255,0.35)" }}>
                      {project.highlight}
                    </p>
                  )}

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t: string) => (
                      <span key={t}
                        className="px-2.5 py-1 text-[10px] font-mono rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.45)",
                        }}>
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
