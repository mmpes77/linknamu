import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
