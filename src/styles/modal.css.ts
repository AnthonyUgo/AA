import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 999,
  backgroundColor: "rgba(0,0,0,0.75)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const dialog = style({
  width: "92%",
  maxWidth: 480,
  borderRadius: "28px", // softer, more bubble-like
  background: "rgba(20,30,50,0.9)", // brighter translucent background
  color: vars.colors.text,
  boxShadow: `0 0 30px ${vars.colors.primary}66`, // slightly stronger glow
  border: `1px solid ${vars.colors.borderSoft}`,
  backdropFilter: "blur(12px)",
});

export const dialogInner = style({
  padding: "2.5rem", // more breathing room
});

export const dialogTitle = style({
  textAlign: "center",
  fontSize: "1.9rem",
  fontWeight: 800,
  marginBottom: "2rem", // more spacing under title
  color: vars.colors.primary,
  fontFamily: vars.fonts.display,
  textShadow: `0 0 12px ${vars.colors.primarySoft}`,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg, // bigger spacing between inputs
});

export const input = style({
  padding: "1rem 1.25rem", // bigger bubble
  borderRadius: "18px",
  background: "rgba(59,130,246,0.12)",
  border: `1px solid ${vars.colors.border}`,
  color: vars.colors.text,
  outline: "none",
  fontSize: "1rem",
  transition: "all 0.25s ease",
  selectors: {
    "&:focus": {
      borderColor: vars.colors.primary,
      boxShadow: `0 0 12px ${vars.colors.primary}77`,
      background: "rgba(59,130,246,0.2)",
    },
  },
});

export const actions = style({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: vars.space.lg,
  gap: vars.space.md,
});

export const btnGhost = style({
  flex: 1,
  padding: "0.85rem 1.25rem",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.06)",
  border: `1px solid ${vars.colors.borderSoft}`,
  color: vars.colors.textMuted,
  fontWeight: 600,
  textAlign: "center",
  transition: "all 0.2s ease",
  boxShadow: "inset 0 0 6px rgba(255,255,255,0.1)",
  selectors: {
    "&:hover": {
      background: "rgba(255,255,255,0.12)",
      color: "#fff",
    },
  },
});

export const btnPrimary = style({
  flex: 1,
  padding: "0.85rem 1.25rem",
  borderRadius: "18px",
  fontWeight: 700,
  fontSize: "1rem",
  textAlign: "center",
  color: "#fff",
  background: vars.colors.primary,
  border: "none",
  boxShadow: `0 4px 14px ${vars.colors.primary}aa`, // stronger button glow
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      background: vars.colors.primarySoft,
      boxShadow: `0 6px 18px ${vars.colors.primary}`,
      transform: "translateY(-2px)", // lift effect
    },
    "&:active": {
      transform: "translateY(0)", // press effect
      boxShadow: `0 3px 10px ${vars.colors.primary}`,
    },
  },
});
