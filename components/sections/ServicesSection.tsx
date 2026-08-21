"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Layout, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = { Code2, Smartphone, Layout, Zap };

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-28 bg-white"
      style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Services"
          title="What I Build"
          subtitle="End-to-end development across web, mobile, and automation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Code2;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
              >
                <div
                  className="bg-white hover:shadow-card-hover rounded-xl p-8 h-full flex flex-col transition-shadow duration-300"
                  style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                >
                  {/* Icon */}
                  <div
                    className="p-3 rounded-lg w-fit mb-6"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <Icon size={20} className="text-text-secondary" />
                  </div>

                  <h3 className="text-base font-semibold text-ink mb-2.5">{service.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 font-light">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm font-light text-text-muted">
                        <span className="w-1 h-1 rounded-full shrink-0 bg-text-muted/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
