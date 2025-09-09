import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const navBar = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  backgroundColor: "rgba(10,15,31,0.7)",
  backdropFilter: "blur(10px)",
  boxShadow: vars.shadows.glowSm,
});

export const navInner = style({
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 1.5rem",
});

export const logoLink = style({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

export const logoImg = style({
  width: 40,
  height: 40,
  objectFit: "contain",
  filter: "drop-shadow(0 0 8px #3b82f6)",
  transition: "transform .2s ease",
  selectors: {
    '&:hover': { transform: "scale(1.1)" }
  }
});

export const navIcons = style({
  display: "flex",
  alignItems: "center",
  gap: "2.5rem",
  fontSize: "1.5rem",
});

export const navIconLink = style({
  color: "#93c5fd",
  textDecoration: "none",
  transition: "transform .15s ease, color .15s ease",
  filter: "drop-shadow(0 0 10px #3b82f6)",
  selectors: {
    '&:hover': {
      transform: "scale(1.25)",
      color: "#ffffff",
    }
  }
});
