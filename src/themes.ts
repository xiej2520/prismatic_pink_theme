import type { UiColors, SyntaxColors } from "./theme";
import { darkColors, darkSyntax } from "./dark";
import { blackContrastColors, blackContrastSyntax } from "./black-contrast";

export interface ThemeEntry {
  label: string;
  file: string;
  type: "light" | "dark";
  colors: UiColors;
  syntax: SyntaxColors;
}

export const THEMES: ThemeEntry[] = [
  {
    label: "Prismatic Pink",
    file: "prismatic-pink.json",
    type: "dark",
    colors: darkColors,
    syntax: darkSyntax,
  },
  {
    label: "Prismatic Pink High Contrast",
    file: "prismatic-pink-contrast.json",
    type: "dark",
    colors: blackContrastColors,
    syntax: blackContrastSyntax,
  },
]