import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  colors: {
    bg: "#0a0f1f",
    glass: "rgba(255,255,255,0.05)",
    surface: "#0d1b2a",
    border: "rgba(59,130,246,0.4)",
    borderSoft: "rgba(59,130,246,0.2)",
    text: "#ffffff",
    textMuted: "#a5b4fc",
    primary: "#3b82f6",
    primarySoft: "#2563eb",
    primaryDeep: "#1e40af",
    focus: "#60a5fa",
  },
  shadows: {
    glowSm: "0 0 15px rgba(59,130,246,0.15)",
    glowMd: "0 0 20px #3b82f6",
    glowLg: "0 0 30px #3b82f6",
    logo: "0 0 25px #3b82f6",
    cta: "0 0 20px #3b82f6",
    ctaSm: "0 0 14px #3b82f6",
  },
  fonts: {
    body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
    display: "'Orbitron', ui-monospace, monospace",
  },
  radii: {
    md: "12px",
    xl: "18px",
    full: "9999px",
  },
  space: {
    xs: "0.375rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  }
});
