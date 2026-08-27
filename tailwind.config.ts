import type { Config } from "tailwindcss";

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F",
        paper: "#FAF7F2",
        accent: "#E8A33D",
        success: "#18794E",
        "success-soft": "#DFF3E8",
        error: "#B42318",
        modelled: "#1D5D8F",
        "modelled-soft": "#DCEBFA",
        ink: "#17202A",
        muted: "#4B5563",
        line: "#D8D1C5",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      minHeight: {
        tap: "2.75rem",
      },
      minWidth: {
        tap: "2.75rem",
      },
    },
  },
} satisfies Config;

export default tailwindConfig;
