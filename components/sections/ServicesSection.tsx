"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Layout, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = { Code2, Smartphone, Layout, Zap };

export default function ServicesSection() {
  return (
    // DARK section
    <section id="services" className="py-28 section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="Services" title="What I Build For You"
          subtitle="End-to-end development across web, mobile, and automation." dark />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Code2;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.09 }}>
                <div
                  className="rounded-2xl p-8 h-full flex flex-col transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                >
                  <div className="p-3 rounded-xl w-fit mb-6" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Icon size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2.5">{service.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 flex-1 font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.2)" }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                    className="text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    Get a quote →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
