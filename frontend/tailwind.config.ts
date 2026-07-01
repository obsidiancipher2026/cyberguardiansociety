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
        base: "#05070C",
        surface: {
          DEFAULT: "#0B0F17",
          raised: "#12161F",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          hover: "rgba(124,92,255,0.25)",
          light: "rgba(255,255,255,0.12)",
        },
        aurora: {
          violet: "#7C5CFF",
          cyan: "#22D3EE",
          emerald: "#34E89E",
        },
        signal: {
          amber: "#FFB020",
        },
        alert: {
          coral: "#FF5C72",
        },
        electric: {
          DEFAULT: "#7C5CFF",
          dim: "#6A4FE0",
          ghost: "rgba(124, 92, 255, 0.10)",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          dim: "#06B6D4",
          ghost: "rgba(34, 211, 238, 0.10)",
        },
        red: {
          DEFAULT: "#FF5C72",
          dim: "#E0455A",
          ghost: "rgba(255, 92, 114, 0.10)",
        },
        "text-primary": "#F5F7FA",
        "text-secondary": "#9AA4B2",
        "text-muted": "#5B6472",
        "text-ghost": "#5B6472",
        "white-primary": "#F5F7FA",
        "white-muted": "#9AA4B2",
        "white-ghost": "#5B6472",
        void: "#05070C",
        abyss: "#0B0F17",
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
        "aurora-drift": "aurora-drift 20s ease-in-out infinite alternate",
        "scan-line": "scan-line 3s linear infinite",
        "blink-cursor": "blink-cursor 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
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
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,92,255,0.08)" },
          "50%": { boxShadow: "0 0 40px rgba(124,92,255,0.16)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "aurora-drift": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
          "100%": { transform: "translate(10px, -10px) scale(1.02)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-aurora": "linear-gradient(135deg, #7C5CFF 0%, #22D3EE 50%, #34E89E 100%)",
        "gradient-aurora-text": "linear-gradient(90deg, #7C5CFF, #22D3EE, #34E89E)",
        "gradient-aurora-subtle": "linear-gradient(135deg, rgba(124,92,255,0.12) 0%, rgba(34,211,238,0.08) 50%, rgba(52,232,158,0.06) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "card": "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px -8px rgba(0,0,0,0.4)",
        "card-hover": "0 0 0 1px rgba(124,92,255,0.25), 0 12px 48px -12px rgba(124,92,255,0.12)",
        "aurora": "0 0 60px -20px rgba(124,92,255,0.15)",
        "glow-violet": "0 0 40px -10px rgba(124,92,255,0.2)",
        "glow-cyan": "0 0 40px -10px rgba(34,211,238,0.2)",
        "glow-emerald": "0 0 40px -10px rgba(52,232,158,0.2)",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '16px',
        'xl': '24px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
