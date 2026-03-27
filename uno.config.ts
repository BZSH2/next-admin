import { defineConfig } from "unocss";
import presetWind4 from "@unocss/preset-wind4";

const unoConfig = defineConfig({
  content: {
    filesystem: ["./app/**/*.{js,jsx,ts,tsx,mdx,html}"],
  },
  theme: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
  },
  presets: [
    presetWind4({
      dark: "media",
      preflights: {
        reset: true,
      },
    }),
  ],
});

export default unoConfig;
