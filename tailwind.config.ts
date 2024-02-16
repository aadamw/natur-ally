import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      salmon: "hsl(var(--salmon))",
      "blue-gray": {
        900: "hsl(var(--blue-gray-900))",
      },
      "purple-gray": "hsl(var(--purple-gray))",
      "midnight-gray": "hsl(var(--midnight-gray))",

      "midnight-purple": {
        DEFAULT: "hsl(var(--midnight-purple))",
        hover: "hsl(var(--midnight-purple-hover))",
        active: "hsl(var(--midnight-purple-active))",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
      },
    },
  },

  plugins: [],
};
export default config;
