"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { useEffect } from "react";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{  opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden flex flex-col"
              style={{
                height: "min(90vh, 860px)",
                pointerEvents: "auto",
                boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
              }}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5 shrink-0"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
              >
                <span className="text-sm font-semibold text-ink">Resume</span>
                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    download="Drawde_Resume.pdf"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-ink text-white rounded-full hover:opacity-75 transition-opacity duration-200"
                  >
                    <Download size={12} />
                    Download
                  </a>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-text-secondary hover:text-ink hover:bg-black/5 transition-all duration-200 cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF viewer */}
              <iframe
                src="/resume.pdf"
                className="w-full flex-1 border-0"
                title="Drawde Resume"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
