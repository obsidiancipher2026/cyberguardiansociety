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
        void: "#07111F",
        abyss: "#101827",
        surface: {
          DEFAULT: "#182233",
          raised: "#1E2D45",
        },
        border: {
          DEFAULT: "#2A3F5A",
          light: "#3B5A7A",
        },
        electric: {
          DEFAULT: "#3B82F6",
          dim: "#2563EB",
          ghost: "rgba(59, 130, 246, 0.10)",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          dim: "#06B6D4",
          ghost: "rgba(34, 211, 238, 0.10)",
        },
        red: {
          DEFAULT: "#EF4444",
          dim: "#DC2626",
          ghost: "rgba(239, 68, 68, 0.10)",
        },
        "text-primary": "#F0F8FF",
        "text-muted": "#94A3B8",
        "text-ghost": "#475569",
        "white-primary": "#F0F8FF",
        "white-muted": "#94A3B8",
        "white-ghost": "#475569",
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
        shimmer: "shimmer 2s infinite",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
        "gradient-mix": "linear-gradient(135deg, #3B82F6 0%, #EF4444 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3)",
        "card": "0 0 0 1px rgba(42,63,90,1), 0 8px 32px -8px rgba(0,0,0,0.3)",
        "card-hover": "0 0 0 1px rgba(59,130,246,1), 0 12px 48px -12px rgba(59,130,246,0.15)",
        "glow-blue": "0 0 40px -10px rgba(59,130,246,0.15)",
        "glow-red": "0 0 16px rgba(239,68,68,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
