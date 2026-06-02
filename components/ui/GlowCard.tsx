"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: "default" | "subtle";
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({
  children,
  className,
  glowColor = "default",
  ...props
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border-subtle rounded-2xl",
        "shadow-card hover:shadow-card-hover",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
