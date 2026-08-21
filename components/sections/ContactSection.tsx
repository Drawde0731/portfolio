"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Loader2, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "loading" | "success" | "error";

const SOCIALS = [
  { href: "https://github.com/Drawde0731",                                       icon: Github,   label: "GitHub"   },
  { href: "https://www.linkedin.com/in/john-edward-complido-3b7b8b257/",         icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:johnedward1436@gmail.com",                                     icon: Mail,     label: "Email"    },
];

const inputBase =
  "w-full px-4 py-3.5 text-sm text-ink placeholder-text-muted bg-white outline-none transition-colors duration-200 rounded-none";
const inputStyle = {
  border: "2px solid rgba(0,0,0,0.2)",
  borderRadius: "6px",
};
const inputFocusStyle = {
  border: "2px solid #111111",
  borderRadius: "6px",
};

function Field({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-28 bg-white"
      style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ── Left: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {status === "success" ? (
              <div className="flex flex-col gap-5 pt-4">
                <CheckCircle2 size={32} className="text-ink" />
                <h3 className="text-xl font-bold text-ink">Message sent.</h3>
                <p className="text-sm text-text-secondary font-light">
                  I&apos;ll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-text-muted hover:text-ink transition-colors cursor-pointer w-fit"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                <Field>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={inputBase}
                    style={focused === "name" ? inputFocusStyle : inputStyle}
                    {...register("name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </Field>

                <Field>
                  <input
                    type="email"
                    placeholder="Email"
                    className={inputBase}
                    style={focused === "email" ? inputFocusStyle : inputStyle}
                    {...register("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </Field>

                <Field>
                  <textarea
                    rows={6}
                    placeholder="How can I help?"
                    className={`${inputBase} resize-none`}
                    style={focused === "message" ? inputFocusStyle : inputStyle}
                    {...register("message")}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </Field>

                {status === "error" && (
                  <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                )}

                {/* Button row */}
                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-ink text-white hover:opacity-75 disabled:opacity-40 transition-opacity duration-200 cursor-pointer disabled:cursor-not-allowed"
                    style={{ borderRadius: "4px" }}
                  >
                    {status === "loading"
                      ? <><Loader2 size={14} className="animate-spin" /> Sending...</>
                      : "Get In Touch"
                    }
                  </button>

                  {SOCIALS.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="p-3 text-text-secondary hover:text-ink transition-colors duration-200"
                      style={{ border: "2px solid rgba(0,0,0,0.2)", borderRadius: "6px" }}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </form>
            )}
          </motion.div>

          {/* ── Right: headline + info ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <h2
              className="font-bold text-ink leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
            >
              Let&apos;s{" "}
              <span style={{ WebkitTextStroke: "2px #111111", color: "transparent" }}>
                Work
              </span>
              <br />
              Together
            </h2>

            <p className="text-sm text-text-secondary font-light leading-relaxed max-w-sm">
              Building production-ready web and mobile applications. Let&apos;s turn your ideas
              into products that work, scale, and ship.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="mailto:johnedward1436@gmail.com"
                className="text-base font-bold text-ink hover:opacity-60 transition-opacity duration-200"
              >
                johnedward1436@gmail.com
              </a>
              <span className="text-base font-bold text-ink">09477362471</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
