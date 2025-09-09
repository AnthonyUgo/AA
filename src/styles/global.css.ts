import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const __vanilla_globals__ = true;

// Baseline layout
globalStyle("html, body, #root", {
  height: "100%",
  margin: 0,
  padding: 0,
});

// Body global styles
globalStyle("body", {
  background: "radial-gradient(circle at top, #0a0f1f 0%, #0d1b2a 40%, #1b263b 100%)",
  color: vars.colors.text,
  fontFamily: vars.fonts.mono,
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

// Reset common elements
globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

// Headings
globalStyle("h1, h2, h3, h4, h5, h6", {
  fontFamily: vars.fonts.display,
  margin: 0,
  fontWeight: 700,
  lineHeight: 1.2,
  color: vars.colors.text,
});

// Paragraphs
globalStyle("p", {
  margin: 0,
  marginBottom: vars.space.md,
  color: vars.colors.text,
});

// Links
globalStyle("a", {
  color: vars.colors.primary,
  textDecoration: "none",
  transition: "color .2s ease",
});
globalStyle("a:hover", {
  color: "#fff",
});

// Buttons
globalStyle("button", {
  border: "none",
  cursor: "pointer",
  fontFamily: vars.fonts.display,
});

// Inputs
globalStyle("input, textarea", {
  backgroundColor: vars.colors.surface,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.md,
  padding: vars.space.sm,
  color: vars.colors.text,
});

// Specific AA logo image override (from your old index.css)
globalStyle('img[alt="AA Logo"]', {
  maxWidth: "50px",
  maxHeight: "50px",
  overflow: "hidden",
});
