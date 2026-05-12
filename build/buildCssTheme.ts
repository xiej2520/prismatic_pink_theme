import * as fs from "fs";
import * as path from "path";
import { darkColors, darkSyntax } from "../src/dark";
import { blackContrastColors, blackContrastSyntax } from "../src/black-contrast";
import { lightColors, lightSyntax } from "../src/light";
import type { UiColors, SyntaxColors } from "../src/theme";
import { DEFAULT_CONFIG, type Config } from "../src/config";
import { selectAnsiColors } from "../src/theme/terminal";
import { makeOutputFolder } from "./buildEnv";

const config = DEFAULT_CONFIG as unknown as Config;

const camelToKebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

function themeVars(color: UiColors, syntax: SyntaxColors, type: "light" | "dark"): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(syntax)) {
    vars[`--pp-syntax-${camelToKebab(key)}`] = value;
  }

  const ansi = selectAnsiColors(color, type, config);

  Object.assign(vars, {
    "--pp-bg": color.ui.primaryBg,
    "--pp-bg-alt": color.ui.secondaryBg,
    "--pp-bg-deep": color.ui.tertiaryBg,
    "--pp-fg": color.text.normal,
    "--pp-fg-muted": color.text.muted,
    "--pp-fg-light": color.text.light,
    "--pp-comment": syntax.lightPink,
    "--pp-border": color.ui.border,
    "--pp-selection": color.text.selectionBg,
    "--pp-accent": color.accent.primary,
    "--pp-link": color.accent.link,
    "--pp-link-hover": color.accent.linkHover,

    "--pp-hint": color.diag.hint,
    "--pp-info": color.diag.info,
    "--pp-warning": color.diag.warning,
    "--pp-error": color.diag.error,
    "--pp-hint-bg": color.diag.hintBg,
    "--pp-info-bg": color.diag.infoBg,
    "--pp-warning-bg": color.diag.warningBg,
    "--pp-error-bg": color.diag.errorBg,

    "--pp-git-added": color.git.addedOrStaged,
    "--pp-git-modified": color.git.modified,
    "--pp-git-renamed": color.git.renamed,
    "--pp-git-untracked": color.git.untracked,
    "--pp-git-removed": color.git.removedOrConflicting,
    "--pp-git-ignored": color.git.ignoredOrSubmodule,

    "--pp-debug-start": color.debug.start,
    "--pp-debug-pause": color.debug.pause,
    "--pp-debug-step": color.debug.step,
    "--pp-debug-stop": color.debug.stop,

    "--pp-bracket-1": color.brackets.one,
    "--pp-bracket-2": color.brackets.two,
    "--pp-bracket-3": color.brackets.three,
    "--pp-bracket-4": color.brackets.four,
    "--pp-bracket-5": color.brackets.five,
    "--pp-bracket-6": color.brackets.six,

    "--pp-terminal-fg": ansi.foreground,
    "--pp-terminal-bg": ansi.background,

    "--pp-terminal-black": ansi.black,
    "--pp-terminal-white": ansi.white,
    "--pp-terminal-red": ansi.red,
    "--pp-terminal-green": ansi.green,
    "--pp-terminal-yellow": ansi.yellow,
    "--pp-terminal-blue": ansi.blue,
    "--pp-terminal-magenta": ansi.magenta,
    "--pp-terminal-cyan": ansi.cyan,

    "--pp-terminal-bright-black": ansi.brightBlack,
    "--pp-terminal-bright-white": ansi.brightWhite,
    "--pp-terminal-bright-red": ansi.brightRed,
    "--pp-terminal-bright-green": ansi.brightGreen,
    "--pp-terminal-bright-yellow": ansi.brightYellow,
    "--pp-terminal-bright-blue": ansi.brightBlue,
    "--pp-terminal-bright-magenta": ansi.brightMagenta,
    "--pp-terminal-bright-cyan": ansi.brightCyan,

    "--pp-terminal-dim-black": ansi.dimBlack,
    "--pp-terminal-dim-white": ansi.dimWhite,
    "--pp-terminal-dim-red": ansi.dimRed,
    "--pp-terminal-dim-green": ansi.dimGreen,
    "--pp-terminal-dim-yellow": ansi.dimYellow,
    "--pp-terminal-dim-blue": ansi.dimBlue,
    "--pp-terminal-dim-magenta": ansi.dimMagenta,
    "--pp-terminal-dim-cyan": ansi.dimCyan,
  });

  return vars;
}

function block(selectors: string, vars: Record<string, string>): string {
  const body = Object.entries(vars)
    .map(([k, v]) => `\t${k}: ${v};`)
    .join("\n");
  return `${selectors} {\n${body}\n}`;
}

const dark = themeVars(darkColors, darkSyntax, "dark");
const contrast = themeVars(blackContrastColors, blackContrastSyntax, "dark");
const light = themeVars(lightColors, lightSyntax, "light");

const css = `/* Prismatic Pink CSS properties */

${block(":root,\n.prismatic-pink-dark", dark)}
${block(":root,\n.prismatic-pink-contrast", contrast)}
${block(":root,\n.prismatic-pink-light", light)}
`;

const folder = makeOutputFolder("themes");
fs.writeFileSync(path.join(folder, "prismatic-pink.css"), css);
