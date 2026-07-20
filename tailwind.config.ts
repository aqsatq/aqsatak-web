import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black1: "#08080b",
        black2: "#111116",
        red1: "#8a0303",
        red2: "#d4111f",
        redneon: "#ff1436",
        gold: "#d4af37",
        goldsoft: "#e8c766",
      },
      fontFamily: {
        display: ["Almarai", "sans-serif"],
        body: ["Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
