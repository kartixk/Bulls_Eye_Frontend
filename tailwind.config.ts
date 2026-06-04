import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0e17",
        surface: "#111826",
        border: "#1f2937",
        muted: "#94a3b8",
        accent: "#22c55e",
        danger: "#ef4444",
      },
      fontFamily: { mono: ["ui-monospace", "SFMono-Regular", "monospace"] },
    },
  },
  plugins: [],
};
export default config;
