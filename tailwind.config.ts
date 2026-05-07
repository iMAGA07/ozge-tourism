import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from logo: warm terracotta red, deep crimson,
        // saffron yellow/gold, sand/cream, charcoal ink.
        brand: {
          ink: "#1a1410",
          charcoal: "#2a201a",
          terracotta: "#b14a2e",
          crimson: "#8a2a1f",
          saffron: "#e0a039",
          gold: "#c8902f",
          sand: "#f5ecdc",
          cream: "#faf6ee",
          paper: "#fbf8f1",
          mist: "#efe7d6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Futura", "Trebuchet MS", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Futura", "Trebuchet MS", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        cinematic: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scroll-hint": "scrollHint 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "subtle-float": "subtleFloat 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scrollHint: {
          "0%": { transform: "translateY(0)", opacity: "0.2" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
          "100%": { transform: "translateY(16px)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        subtleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
