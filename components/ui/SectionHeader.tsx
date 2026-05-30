"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 mb-3",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="text-accent text-xs font-mono uppercase tracking-[0.2em] font-medium">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted text-base md:text-lg leading-relaxed",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
