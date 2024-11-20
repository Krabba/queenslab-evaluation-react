import type { Config } from "tailwindcss";
import tailwind from "tailwindcss/colors";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: tailwind.slate[900],
        },
        accent: {
          DEFAULT: tailwind.slate[800],
          content: tailwind.slate[50],
        },
        primary: {
          DEFAULT: tailwind.blue[600],
          content: tailwind.blue[50],
        },
        muted: {
          DEFAULT: tailwind.gray[600],
          content: tailwind.gray[400],
        },
        popover: {
          DEFAULT: tailwind.slate[900],
          content: tailwind.slate[50],
        },
        input: {
          DEFAULT: tailwind.slate[900],
          content: tailwind.slate[50],
          placeholder: tailwind.slate[400],
        },
        border: tailwind.slate[700],
        ring: tailwind.sky[500],
        queenslab: {
          DEFAULT: "#F7D5FC",
          primary: "#AAF7A3",
          backdrop: "#0C0D14",
          background: "#232A52",
          accent: "#13112A",
          content: "#FEFEF1",
        },
      },
    },
  },

  plugins: [],
} satisfies Config;

export default config;
