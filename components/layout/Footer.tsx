import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border-dark bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="font-mono font-bold text-2xl text-primary">
            Drawde<span className="text-accent">.</span>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Drawde0731"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-lg border border-border-dark text-muted hover:text-foreground hover:border-primary/40 transition-all duration-200 cursor-pointer"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/john-edward-complido-3b7b8b257/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg border border-border-dark text-muted hover:text-foreground hover:border-primary/40 transition-all duration-200 cursor-pointer"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:johnedward1436@gmail.com"
              aria-label="Send email"
              className="p-2.5 rounded-lg border border-border-dark text-muted hover:text-foreground hover:border-primary/40 transition-all duration-200 cursor-pointer"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted text-center">
            © 2026 Drawde. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
