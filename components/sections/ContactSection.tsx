"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  subject: z.enum(["Web Development","Mobile App","API Integration","RPA/Automation","Other"] as const),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("success"); reset();
    } catch { setStatus("error"); }
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-xl text-sm font-light transition-all duration-200 outline-none",
    "text-white placeholder-white/30",
    "focus:outline-none"
  );
  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    // DARK section
    <section id="contact" className="py-28 section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="Let's Connect" title="Start a Project"
          subtitle="Have a project in mind or looking to hire? Let's talk." dark />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Contact info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}>

            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-7" style={{ color: "rgba(255,255,255,0.4)" }}>
              Contact Information
            </p>

            <div className="space-y-5 mb-9">
              {[
                { icon: Mail,    label: "johnedward1436@gmail.com", href: "mailto:johnedward1436@gmail.com" },
                { icon: Phone,   label: "09477362471",              href: undefined },
                { icon: MapPin,  label: "Bocaue, Bulacan, Philippines", href: undefined },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl shrink-0" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Icon size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
                  </div>
                  {href
                    ? <a href={href} className="text-sm font-light transition-colors duration-200" style={{ color: "rgba(255,255,255,0.6)" }} onMouseEnter={e => { (e.target as HTMLElement).style.color = "#fff"; }} onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>{label}</a>
                    : <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
                  }
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-9">
              {[
                { href: "https://github.com/Drawde0731", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/john-edward-complido-3b7b8b257/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:johnedward1436@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label}
                  className="p-2.5 rounded-xl transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.5)"; el.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                Usually responds within <span className="text-white font-medium">24 hours.</span>
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>

            {status === "success" ? (
              <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="p-4 rounded-full" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <CheckCircle2 size={26} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">Message Sent!</h3>
                  <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}>I&apos;ll be in touch within 24 hours.</p>
                </div>
                <button onClick={() => setStatus("idle")} className="text-sm transition-colors cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }} onMouseEnter={e => { (e.target as HTMLElement).style.color = "#fff"; }} onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  Send another message
                </button>
              </div>
            ) : (
              <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {[
                    { id: "contact-name",    label: "Name",    type: "text",  placeholder: "Your name",       key: "name"  },
                    { id: "contact-email",   label: "Email",   type: "email", placeholder: "your@email.com",  key: "email" },
                  ].map(({ id, label, type, placeholder, key }) => (
                    <div key={key}>
                      <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</label>
                      <input id={id} type={type} placeholder={placeholder}
                        className={inputClass} style={inputStyle}
                        {...register(key as "name" | "email")}
                      />
                      {errors[key as "name" | "email"] && <p className="mt-1.5 text-xs text-red-400">{errors[key as "name" | "email"]?.message}</p>}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="contact-subject" className="block text-[10px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Subject</label>
                    <select id="contact-subject" className={cn(inputClass, "cursor-pointer")} style={inputStyle}
                      {...register("subject")}
                    >
                      <option value="" disabled style={{ background: "#1A1A1A" }}>Select a subject</option>
                      {["Web Development","Mobile App","API Integration","RPA/Automation","Other"].map(v => (
                        <option key={v} value={v} style={{ background: "#1A1A1A" }}>{v}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Message</label>
                    <textarea id="contact-message" rows={4} placeholder="Tell me about your project..."
                      className={cn(inputClass, "resize-none")} style={inputStyle}
                      {...register("message")}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl text-red-400 text-sm"
                      style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <AlertCircle size={14} className="shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button type="submit" disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium bg-white text-ink rounded-full hover:opacity-85 disabled:opacity-40 transition-opacity duration-200 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {status === "loading"
                      ? <><Loader2 size={14} className="animate-spin" /> Sending...</>
                      : <><Send size={13} /> Send Message</>
                    }
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
