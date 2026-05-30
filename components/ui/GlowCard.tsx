"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: "indigo" | "cyan";
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({
  children,
  className,
  glowColor = "indigo",
  ...props
}: GlowCardProps) {
  const glowStyles =
    glowColor === "cyan"
      ? "hover:border-[rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
      : "hover:border-[rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]";

  return (
    <div
      className={cn(
        "bg-surface border border-border-dark rounded-xl transition-all duration-300",
        glowStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
