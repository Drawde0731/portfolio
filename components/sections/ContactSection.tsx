"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.enum([
    "Web Development",
    "Mobile App",
    "API Integration",
    "RPA/Automation",
    "Other",
  ] as const),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass = cn(
  "w-full px-4 py-3 rounded-xl text-sm font-medium",
  "bg-surface border border-border-dark",
  "text-foreground placeholder:text-muted/60",
  "focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30",
  "transition-all duration-200"
);

export default function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Let's Connect"
          title="Start a Project"
          subtitle="Have a project in mind or looking to hire? Let's talk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Contact Information
            </h3>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:johnedward1436@gmail.com"
                className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors duration-200 group cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-surface border border-border-dark group-hover:border-primary/40 transition-colors">
                  <Mail size={16} className="text-primary" />
                </div>
                <span>johnedward1436@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-muted">
                <div className="p-2.5 rounded-lg bg-surface border border-border-dark">
                  <Phone size={16} className="text-primary" />
                </div>
                <span>09477362471</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted">
                <div className="p-2.5 rounded-lg bg-surface border border-border-dark">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span>Bocaue, Bulacan, Philippines</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mb-8">
              <a
                href="https://github.com/Drawde0731"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl border border-border-dark text-muted hover:text-foreground hover:border-primary/40 transition-all duration-200 cursor-pointer"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/john-edward-complido-3b7b8b257/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl border border-border-dark text-muted hover:text-foreground hover:border-primary/40 transition-all duration-200 cursor-pointer"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:johnedward1436@gmail.com"
                aria-label="Email"
                className="p-2.5 rounded-xl border border-border-dark text-muted hover:text-foreground hover:border-primary/40 transition-all duration-200 cursor-pointer"
              >
                <Mail size={18} />
              </a>
            </div>

            <GlowCard className="p-4 flex items-center gap-3" glowColor="cyan">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              <p className="text-sm text-muted">
                Usually responds within{" "}
                <span className="text-foreground font-medium">24 hours.</span>
              </p>
            </GlowCard>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {status === "success" ? (
              <GlowCard className="p-8 flex flex-col items-center text-center gap-4" glowColor="cyan">
                <div className="p-4 rounded-full bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-muted">
                    I&apos;ll be in touch within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-primary hover:text-accent transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </GlowCard>
            ) : (
              <GlowCard className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-muted mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      className={inputClass}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-muted mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-medium text-muted mb-1.5"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      className={cn(inputClass, "cursor-pointer")}
                      {...register("subject")}
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="API Integration">API Integration</option>
                      <option value="RPA/Automation">RPA/Automation</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-muted mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      className={cn(inputClass, "resize-none")}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Error state */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={14} className="shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-white rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </GlowCard>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
