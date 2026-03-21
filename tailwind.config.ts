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
        forest: {
          DEFAULT: "#0C2318",
          50:  "#e8f5ee",
          100: "#c3dfd0",
          200: "#9ac9b0",
          300: "#6fb390",
          400: "#4a9e74",
          500: "#2a8a5a",
          600: "#1e7048",
          700: "#145736",
          800: "#0C2318",
          900: "#071610",
        },
        lime: {
          DEFAULT: "#C9F135",
          50:  "#f7fde5",
          100: "#edfabc",
          200: "#e1f790",
          300: "#d4f262",
          400: "#C9F135",
          500: "#b0d41e",
          600: "#8aaa14",
          700: "#65800d",
          800: "#435507",
          900: "#222b03",
        },
        emerald: {
          DEFAULT: "#17A97E",
          50:  "#e7f9f3",
          100: "#c0f0e1",
          200: "#95e5cc",
          300: "#64d9b5",
          400: "#38ce9f",
          500: "#17A97E",
          600: "#0e8a66",
          700: "#096b4f",
          800: "#054c38",
          900: "#022d21",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-instrument)", "system-ui", "sans-serif"],
        sans:    ["var(--font-instrument)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(ellipse 80% 60% at 50% -10%, #17A97E33 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
