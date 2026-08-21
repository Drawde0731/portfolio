import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light surfaces
        "sand":       "#F5F5F3",
        "white":      "#FFFFFF",
        // Dark surfaces
        "ink":        "#111111",
        "ink-2":      "#1A1A1A",
        // Accent
        "accent":     "#F5C542",
        // Text
        "text-primary":   "#111111",
        "text-secondary": "#555555",
        "text-muted":     "#888888",
        // Dark section text
        "text-light":         "#FFFFFF",
        "text-light-muted":   "rgba(255,255,255,0.6)",
        // Borders
        "border-light": "rgba(0,0,0,0.08)",
        "border-dark":  "rgba(255,255,255,0.1)",
        // Legacy aliases
        background:      "#FFFFFF",
        surface:         "#FFFFFF",
        "border-subtle": "rgba(0,0,0,0.08)",
        foreground:      "#111111",
        muted:           "#888888",
        "muted-light":   "#AAAAAA",
        primary:         "#111111",
      },
      fontFamily: {
        sans: [
          "var(--font-space-grotesk)",
          "-apple-system", "BlinkMacSystemFont",
          "SF Pro Display", "SF Pro Text",
          "system-ui", "sans-serif",
        ],
        mono: ["SF Mono", "ui-monospace", "Menlo", "monospace"],
      },
      animation: {
        "cursor-blink": "cursorBlink 1s step-end infinite",
      },
      keyframes: {
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
      boxShadow: {
        "card":           "0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        "card-hover":     "0 4px 20px rgba(0,0,0,0.1)",
        "polaroid":       "0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        "polaroid-hover": "0 8px 32px rgba(0,0,0,0.14)",
      },
      container: {
        center:  true,
        padding: "1.5rem",
        screens: { "2xl": "1200px" },
      },
    },
  },
  plugins: [],
};

export default config;
