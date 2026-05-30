"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Layout, Zap, CheckCircle2 } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Layout,
  Zap,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Services"
          title="What I Build For You"
          subtitle="End-to-end development across web, mobile, and automation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Code2;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              >
                <GlowCard className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-4">
                    <Icon size={28} className="text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle2 size={13} className="text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-primary hover:text-accent transition-colors duration-200 font-medium cursor-pointer text-left"
                  >
                    Get a quote →
                  </button>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
