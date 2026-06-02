"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow:   string;
  title:     string;
  subtitle?: string;
  align?:    "left" | "center";
  dark?:     boolean;  // true when inside a dark section
  className?: string;
}

export default function SectionHeader({
  eyebrow, title, subtitle, align = "center", dark = false, className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn("mb-16", align === "center" ? "text-center" : "text-left", className)}
    >
      <p className={cn(
        "text-[10px] font-semibold tracking-[0.22em] uppercase mb-4",
        align === "center" ? "text-center" : "text-left",
        dark ? "text-text-light-muted" : "text-text-muted"
      )}>
        {eyebrow}
      </p>
      <h2 className={cn(
        "font-semibold leading-tight mb-5",
        "text-[clamp(1.75rem,3vw,2.75rem)] tracking-[-0.02em]",
        dark ? "text-white" : "text-ink"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-base md:text-lg leading-relaxed font-light",
          align === "center" ? "max-w-xl mx-auto" : "max-w-xl",
          dark ? "text-text-light-muted" : "text-text-secondary"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
