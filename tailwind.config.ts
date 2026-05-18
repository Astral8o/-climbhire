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
        cream: "#EDEAE4",
        ink: "#1C1C18",
        lime: "#00C9B1",
        teal: "#70A4A4",
        "ink-80": "rgba(28,28,24,0.80)",
        "ink-60": "rgba(28,28,24,0.60)",
        "ink-40": "rgba(28,28,24,0.40)",
        "ink-20": "rgba(28,28,24,0.20)",
        "ink-10": "rgba(28,28,24,0.10)",
        "ink-05": "rgba(28,28,24,0.05)",
      },
      fontFamily: {
        display: ["var(--font-epilogue)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        script: ["var(--font-cedarville)", "cursive"],
        mono: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        squircle: "2.5rem",
        "squircle-sm": "1.25rem",
        "squircle-md": "2rem",
      },
      boxShadow: {
        "stamp-xs": "2px 2px 0 0 #1C1C18",
        "stamp-sm": "4px 4px 0 0 #1C1C18",
        "stamp-md": "8px 8px 0 0 #1C1C18",
        "stamp-lg": "16px 16px 0 0 #1C1C18",
        "stamp-lime": "16px 16px 0 0 #00C9B1",
        "stamp-lime-md": "8px 8px 0 0 #00C9B1",
        whisper: "12px 12px 0 0 rgba(28,28,24,0.03)",
      },
      keyframes: {
        growWidth: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "grow-width": "growWidth 0.6s ease-out both",
        marquee: "marquee 32s linear infinite",
        "fade-in": "fadeIn 0.25s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
