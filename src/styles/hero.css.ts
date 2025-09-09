import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const heroSection = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  textAlign: "center",
});

export const heroLogo = style({
  width: "13rem",
  marginInline: "auto",
  pointerEvents: "none",
  filter: `drop-shadow(${vars.shadows.logo})`,
  '@media': {
    'screen and (min-width: 768px)': { width: "20rem" },
    'screen and (min-width: 1024px)': { width: "24rem" },
  }
});

export const comingSoon = style({
  position: "absolute",
  top: "64%",
  fontFamily: vars.fonts.display,
  fontWeight: 800,
  letterSpacing: "0.25em",
  pointerEvents: "none",
  zIndex: 10,
  color: "#60a5fa",
  textShadow: `0 0 12px ${vars.colors.primary}, 0 0 24px ${vars.colors.primarySoft}, 0 0 36px ${vars.colors.primaryDeep}`,
  fontSize: "2.25rem",
  '@media': {
    'screen and (min-width: 768px)': { fontSize: "3rem" },
    'screen and (min-width: 1024px)': { fontSize: "3.75rem" },
  }
});

export const ctaBtn = style({
  position: "absolute",
  top: "82%",
  zIndex: 20,
  padding: "0.75rem 2rem",
  borderRadius: vars.radii.xl,
  fontWeight: 700,
  fontFamily: vars.fonts.display,
  border: `1px solid ${vars.colors.border}`,
  background: vars.colors.glass,
  backdropFilter: "blur(6px)",
  color: "#93c5fd",
  boxShadow: vars.shadows.cta,
  transition: "transform .15s ease, background .15s ease, color .15s ease",
  selectors: {
    '&:hover': {
      transform: "scale(1.05)",
      background: "rgba(59,130,246,0.2)",
      color: "#fff",
    }
  }
});
