import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 999,
  backgroundColor: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const dialog = style({
  width: "92%",
  maxWidth: 480,
  borderRadius: "16px",
  background: vars.colors.surface,
  color: vars.colors.text,
  boxShadow: vars.shadows.glowLg,
  border: `1px solid ${vars.colors.borderSoft}`,
});

export const dialogInner = style({
  padding: "1.75rem",
});

export const dialogTitle = style({
  textAlign: "center",
  fontSize: "1.5rem",
  fontWeight: 800,
  marginBottom: "1.5rem",
  color: "#93c5fd",
  fontFamily: vars.fonts.display,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const input = style({
  padding: "0.75rem",
  borderRadius: vars.radii.md,
  background: "rgba(30,58,138,0.3)", // blue-900/30
  border: `1px solid ${vars.colors.border}`,
  color: vars.colors.text,
  outline: "none",
  selectors: {
    '&:focus': {
      borderColor: vars.colors.focus
    }
  }
});

export const actions = style({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: vars.space.sm,
  gap: vars.space.md,
});

export const btnGhost = style({
  padding: "0.5rem 1.25rem",
  borderRadius: vars.radii.md,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#bfdbfe",
  transition: "background .15s ease",
  selectors: {
    '&:hover': { background: "rgba(255,255,255,0.1)" }
  }
});

export const btnPrimary = style({
  padding: "0.5rem 1.25rem",
  borderRadius: vars.radii.md,
  fontWeight: 800,
  color: "#fff",
  background: "#2563eb",
  border: "none",
  boxShadow: "0 0 14px #3b82f6",
  transition: "background .15s ease",
  selectors: {
    '&:hover': { background: "#3b82f6" }
  }
});
