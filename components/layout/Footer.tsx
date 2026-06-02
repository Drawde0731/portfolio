import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col items-center gap-8">

          {/* Logo */}
          <div className="font-semibold text-lg text-white tracking-tight">
            Drawde<span className="opacity-30">.</span>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-light transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Drawde0731"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl transition-all duration-200 text-white/40 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/john-edward-complido-3b7b8b257/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl transition-all duration-200 text-white/40 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:johnedward1436@gmail.com"
              aria-label="Send email"
              className="p-2.5 rounded-xl transition-all duration-200 text-white/40 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

          {/* Copyright */}
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 Drawde. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
