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
        // Text
        "text-primary":   "#111111",
        "text-secondary": "#555555",
        "text-muted":     "#777777",
        // Dark section text
        "text-light":         "#FFFFFF",
        "text-light-muted":   "rgba(255,255,255,0.65)",
        // Borders
        "border-light": "rgba(0,0,0,0.08)",
        "border-dark":  "rgba(255,255,255,0.1)",
        // Legacy aliases used in components
        background:      "#F5F5F3",
        surface:         "#FFFFFF",
        "border-subtle": "rgba(0,0,0,0.08)",
        foreground:      "#111111",
        muted:           "#777777",
        "muted-light":   "#999999",
        primary:         "#111111",
        accent:          "#111111",
      },
      fontFamily: {
        sans: [
          "-apple-system", "BlinkMacSystemFont",
          "SF Pro Display", "SF Pro Text",
          "var(--font-inter)", "system-ui", "sans-serif",
        ],
        mono: ["SF Mono", "ui-monospace", "Menlo", "monospace"],
      },
      animation: {
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "float-slow":   "floatSlow 4s ease-in-out infinite",
      },
      keyframes: {
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
      },
      boxShadow: {
        "card":           "0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        "card-hover":     "0 4px 20px rgba(0,0,0,0.1)",
        "polaroid":       "0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        "polaroid-hover": "0 8px 32px rgba(0,0,0,0.14)",
        "dark-card":      "0 2px 8px rgba(0,0,0,0.4)",
        "dark-card-hover":"0 8px 32px rgba(0,0,0,0.6)",
      },
      rotate: {
        "1":    "1deg",
        "-1":   "-1deg",
        "1.5":  "1.5deg",
        "-1.5": "-1.5deg",
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
