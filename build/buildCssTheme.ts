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
    "--pp-fg-bold": color.text.bold,
    "--pp-fg-inverse": color.text.inverse,
    "--pp-fg-emphasized": color.text.emphasised,
    "--pp-fg-faded": color.text.faded,
    "--pp-placeholder": color.ui.placeholderText,
    "--pp-disabled": color.ui.disabledText,

    "--pp-border": color.ui.border,
    "--pp-dropdown-bg": color.ui.dropdownBg,
    "--pp-input-bg": color.ui.inputBg,
    "--pp-drop-bg": color.ui.primaryDropBg,
    "--pp-separator": color.ui.separator,

    "--pp-hover-bg": color.ui.hoverBgA,
    "--pp-active-bg": color.ui.activeBgA,
    "--pp-list-hover-bg": color.ui.listHoverBgA,
    "--pp-list-inactive-bg": color.ui.listInactiveBgA,
    "--pp-selected-bg": color.ui.selectedBg,
    "--pp-selected-secondary-bg": color.ui.selectedSecondaryBg,

    "--pp-scrollbar-bg": color.ui.scrollBgA,
    "--pp-scrollbar-hover-bg": color.ui.scrollHoverBgA,
    "--pp-scrollbar-active-bg": color.ui.scrollActiveBgA,

    "--pp-selection-bg": color.text.selectionBg,
    "--pp-selection-overlay-bg": color.text.selectionBgA,
    "--pp-selection-unfocused-bg": color.text.secondarySelectionBgA,

    "--pp-accent": color.accent.primary,
    "--pp-accent-hover": color.accent.primaryHover,
    "--pp-accent-secondary": color.accent.secondary,
    "--pp-accent-secondary-hover": color.accent.secondaryHover,

    "--pp-comment": syntax.lightPink,
    "--pp-link": color.accent.link,
    "--pp-link-hover": color.accent.linkHover,

    "--pp-diag-hint": color.diag.hint,
    "--pp-diag-info": color.diag.info,
    "--pp-diag-warning": color.diag.warning,
    "--pp-diag-error": color.diag.error,
    "--pp-diag-hint-bg": color.diag.hintBg,
    "--pp-diag-info-bg": color.diag.infoBg,
    "--pp-diag-warning-bg": color.diag.warningBg,
    "--pp-diag-error-bg": color.diag.errorBg,

    "--pp-git-added": color.git.addedOrStaged,
    "--pp-git-modified": color.git.modified,
    "--pp-git-renamed": color.git.renamed,
    "--pp-git-untracked": color.git.untracked,
    "--pp-git-removed": color.git.removedOrConflicting,
    "--pp-git-ignored": color.git.ignoredOrSubmodule,
    "--pp-git-inserted-bg": color.git.insertedBgA,
    "--pp-git-removed-bg": color.git.removedBgA,
    "--pp-git-current": color.git.current,
    "--pp-git-incoming": color.git.incoming,

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

    "--pp-chart-line": color.ui.chartLine,
    "--pp-chart-blue": color.ui.chartBlue,
    "--pp-chart-green": color.ui.chartGreen,
    "--pp-chart-yellow": color.ui.chartYellow,
    "--pp-chart-orange": color.ui.chartOrange,
    "--pp-chart-red": color.ui.chartRed,
    "--pp-chart-purple": color.ui.chartPurple,
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

const css = `/* Prismatic Pink CSS properties
 * Generated file. Do not edit manually.
 */

${block(":root,\n.prismatic-pink-dark", dark)}
${block(".prismatic-pink-contrast", contrast)}
${block(".prismatic-pink-light", light)}
`;

const folder = makeOutputFolder("themes");
const filePath = path.join(folder, "prismatic-pink.css");
console.log(`Writing "prismatic-pink.css" to ${filePath}`);
fs.writeFileSync(filePath, css);
