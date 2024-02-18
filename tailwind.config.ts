import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        salmon: "hsl(var(--salmon))",
        "blue-gray": {
          50: "hsl(var(--blue-gray-50))",
          900: "hsl(var(--blue-gray-900))",
        },
        "purple-gray": "hsl(var(--purple-gray))",
        "midnight-gray": "hsl(var(--midnight-gray))",

        "light-purple": {
          DEFAULT: "hsla(var(--light-purple))",
          hover: "hsla(var(--light-purple-hover))",
          active: "hsla(var(--light-purple-active))",
        },

        "midnight-purple": {
          DEFAULT: "hsl(var(--midnight-purple))",
          hover: "hsl(var(--midnight-purple-hover))",
          active: "hsl(var(--midnight-purple-active))",
        },
        background: "hsl(var(--background))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
      },
    },
  },

  plugins: [],
};
export default config;
