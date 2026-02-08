import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-scale": "pulse-scale 0.6s ease-out forwards",
        "fade-out": "fade-out 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        "pulse-scale": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "50%": { transform: "scale(1.3)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
