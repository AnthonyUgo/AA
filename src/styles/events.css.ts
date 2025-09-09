import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "./theme.css";


export const eventsSection = style({
  backgroundColor: vars.colors.bg, // same color all through
  color: vars.colors.text,
  minHeight: "100vh",
  padding: "7rem 1.25rem 3rem", // account for fixed navbar
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
});

export const eventsInner = style({
  width: "100%",
  maxWidth: 1200,
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1.5rem",
  '@media': { 'screen and (min-width: 1024px)': { gridTemplateColumns: "3fr 1fr" } }
});

export const headline = style({
  fontFamily: vars.fonts.display,
  fontSize: "1.3rem",
  marginBottom: "1rem",
  color: "#c7d2fe",
  textShadow: `0 0 10px ${vars.colors.primarySoft}`,
});

export const card = style({
  background: "rgba(20,30,50,0.9)",
  border: `1px solid ${vars.colors.borderSoft}`,
  borderRadius: "24px",
  boxShadow: `0 0 24px ${vars.colors.primary}33`,
  backdropFilter: "blur(8px)",
  padding: "1rem",
});

export const gameWrap = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

export const canvasWrap = style({
  borderRadius: "16px",
  overflow: "hidden",
  border: `1px solid ${vars.colors.border}`,
  alignSelf: "center",
});

export const statsBar = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: vars.fonts.mono,
  color: "#bfdbfe",
});

export const buttonRow = style({
  display: "flex",
  gap: ".5rem",
});

export const btn = style({
  padding: ".6rem .9rem",
  borderRadius: "14px",
  background: vars.colors.glass,
  border: `1px solid ${vars.colors.border}`,
  color: vars.colors.text,
  cursor: "pointer",
  transition: "all .15s ease",
  selectors: {
    '&:hover': { background: "rgba(59,130,246,0.2)", boxShadow: `0 0 12px ${vars.colors.primary}66` }
  }
});

export const sidebarTitle = style({
  fontFamily: vars.fonts.display,
  fontSize: "1.1rem",
  marginBottom: ".5rem",
  color: "#93c5fd",
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const listItem = style({
  display: "flex",
  justifyContent: "space-between",
  padding: ".55rem .75rem",
  borderRadius: "12px",
  border: `1px solid ${vars.colors.borderSoft}`,
  background: "rgba(59,130,246,0.07)",
  marginBottom: ".5rem",
  fontFamily: vars.fonts.mono,
});

const pulse = keyframes({
  '0%':   { opacity: 0.35, filter: 'drop-shadow(0 0 0 rgba(96,165,250,0))' },
  '50%':  { opacity: 1,    filter: 'drop-shadow(0 0 16px rgba(96,165,250,0.6))' },
  '100%': { opacity: 0.35, filter: 'drop-shadow(0 0 0 rgba(96,165,250,0))' },
});

export const startOverlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.35)",
  cursor: "pointer",
  userSelect: "none",
  borderRadius: "16px",
});

export const startText = style({
  fontFamily: vars.fonts.display,
  fontWeight: 800,
  letterSpacing: "0.12em",
  color: "#c7d2fe",
  textShadow: `0 0 10px ${vars.colors.primarySoft}`,
  animation: `${pulse} 1.2s infinite`,
  padding: "0.6rem 1rem",
  border: `1px dashed ${vars.colors.border}`,
  borderRadius: "14px",
  background: "rgba(59,130,246,0.10)",
});