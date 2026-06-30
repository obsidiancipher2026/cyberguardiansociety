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
        void: "#020408",
        abyss: "#060D14",
        surface: {
          DEFAULT: "#0C1825",
          raised: "#0F2033",
          tertiary: "#111D30",
        },
        border: {
          DEFAULT: "#1A3050",
          glow: "#2563EB",
        },
        cyan: {
          core: "#3B82F6",
          dim: "#1D4ED8",
          ghost: "rgba(59, 130, 246, 0.10)",
        },
        teal: {
          accent: "#EF4444",
        },
        purple: {
          deep: "#6B21A8",
          glow: "#A855F7",
        },
        threat: "#EF4444",
        red: {
          threat: "#EF4444",
        },
        "white-primary": "#F0F8FF",
        "white-muted": "#8BA9C4",
        "white-ghost": "#3A5A78",
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideInUp: "slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        scaleIn: "scaleIn 0.3s ease-out",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 2s infinite",
        "scanline-sweep": "scanline-sweep 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.97)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.02)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59,130,246,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(59,130,246,0.2)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scanline-sweep": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      backgroundImage: {
        "hero-mesh": "radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(239,68,68,0.12) 0%, transparent 50%)",
        "gradient-cyan": "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
        "gradient-mix": "linear-gradient(135deg, #3B82F6 0%, #EF4444 100%)",
      },
      boxShadow: {
        "card": "0 0 0 1px rgba(26,48,80,1), 0 0 40px -10px rgba(59,130,246,0.10)",
        "card-hover": "0 20px 60px rgba(59,130,246,0.08)",
        "glow-cyan": "0 0 40px -10px rgba(59,130,246,0.15)",
        "glow-red": "0 0 16px rgba(239,68,68,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
