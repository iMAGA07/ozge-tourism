import type { Config } from "tailwindcss";

// Brand palette taken from the Ozge Academy logo: the book/pen blue, the
// crescent gold and the red of the ornamented wordmark.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A1F38", 900: "#071629", 800: "#0A1F38", 700: "#123056" },
        brand: { DEFAULT: "#1559A0", 600: "#1559A0", 500: "#2470BD", 100: "#E4EEF9", 50: "#F2F7FC" },
        gold: { DEFAULT: "#EDBE3A", 600: "#D9A51C", 300: "#F6D978", 100: "#FCF1D2" },
        ruby: { DEFAULT: "#B3261E", 600: "#9A1F18", 100: "#F8E1DF" },
        paper: "#FBF9F4",
        mist: "#E7EAF0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1240px" },
      keyframes: {
        orbit: { to: { transform: "rotate(360deg)" } },
        "orbit-rev": { to: { transform: "rotate(-360deg)" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        shimmer: { to: { backgroundPosition: "200% center" } },
      },
      animation: {
        orbit: "orbit 60s linear infinite",
        "orbit-slow": "orbit 120s linear infinite",
        "orbit-rev": "orbit-rev 90s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
