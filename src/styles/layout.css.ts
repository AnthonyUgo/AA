import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const appRoot = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  backgroundColor: vars.colors.bg,
  color: vars.colors.text,
  fontFamily: vars.fonts.mono,
});
