import { Config } from "../config";
import { UiColors } from ".";
import { alpha as a, flatten as f } from "../color";

// foreground/background + 8 ANSI colors * normal/bright/dim
export interface AnsiColors {
	foreground: string;
	background: string;
	black: string;
	brightBlack: string;
	dimBlack: string;
	white: string;
	brightWhite: string;
	dimWhite: string;
	blue: string;
	brightBlue: string;
	dimBlue: string;
	cyan: string;
	brightCyan: string;
	dimCyan: string;
	green: string;
	brightGreen: string;
	dimGreen: string;
	yellow: string;
	brightYellow: string;
	dimYellow: string;
	red: string;
	brightRed: string;
	dimRed: string;
	magenta: string;
	brightMagenta: string;
	dimMagenta: string;
}

export function selectAnsiColors(
	color: UiColors,
	type: "light" | "dark",
	config: Config,
): AnsiColors {
	const dim = (hex: string) => f(a(hex, "80"), color.ui.primaryBg).slice(0, 7);
	if (type == "light" && config.lightTerminalColorScheme != "normal+dark") {
		const alt = color.terminal.alternativeContrast!;
		const whole = color.terminal.alternativeWhole!;
		if (config.lightTerminalColorScheme == "normal+light") {
			return {
				foreground: color.terminal.foreground,
				background: color.ui.primaryBg,
				black: color.terminal.ansiBackground,
				brightBlack: alt.ansiContrastBackground,
				dimBlack: dim(color.terminal.ansiBackground),
				white: color.terminal.ansiForeground,
				brightWhite: alt.ansiContrastForeground,
				dimWhite: dim(color.terminal.ansiForeground),
				blue: color.terminal.ansiBlue,
				brightBlue: alt.ansiContrastBlue,
				dimBlue: dim(color.terminal.ansiBlue),
				cyan: color.terminal.ansiCyan,
				brightCyan: alt.ansiContrastCyan,
				dimCyan: dim(color.terminal.ansiCyan),
				green: color.terminal.ansiGreen,
				brightGreen: alt.ansiContrastGreen,
				dimGreen: dim(color.terminal.ansiGreen),
				yellow: color.terminal.ansiYellow,
				brightYellow: alt.ansiContrastYellow,
				dimYellow: dim(color.terminal.ansiYellow),
				red: color.terminal.ansiRed,
				brightRed: alt.ansiContrastRed,
				dimRed: dim(color.terminal.ansiRed),
				magenta: color.terminal.ansiMagenta,
				brightMagenta: alt.ansiContrastMagenta,
				dimMagenta: dim(color.terminal.ansiMagenta),
			};
		} else {
			return {
				foreground: whole.foreground,
				background: color.ui.primaryBg,
				black: whole.ansiBackground,
				brightBlack: whole.ansiContrastBackground,
				dimBlack: dim(whole.ansiBackground),
				white: whole.ansiForeground,
				brightWhite: whole.ansiContrastForeground,
				dimWhite: dim(whole.ansiForeground),
				blue: whole.ansiBlue,
				brightBlue: whole.ansiContrastBlue,
				dimBlue: dim(whole.ansiBlue),
				cyan: whole.ansiCyan,
				brightCyan: whole.ansiContrastCyan,
				dimCyan: dim(whole.ansiCyan),
				green: whole.ansiGreen,
				brightGreen: whole.ansiContrastGreen,
				dimGreen: dim(whole.ansiGreen),
				yellow: whole.ansiYellow,
				brightYellow: whole.ansiContrastYellow,
				dimYellow: dim(whole.ansiYellow),
				red: whole.ansiRed,
				brightRed: whole.ansiContrastRed,
				dimRed: dim(whole.ansiRed),
				magenta: whole.ansiMagenta,
				brightMagenta: whole.ansiContrastMagenta,
				dimMagenta: dim(whole.ansiMagenta),
			};
		}
	} else {
		return {
			foreground: color.terminal.foreground,
			background: color.ui.primaryBg,
			black: color.terminal.ansiBackground,
			brightBlack: color.terminal.ansiContrastBackground,
			dimBlack: dim(color.terminal.ansiBackground),
			white: color.terminal.ansiForeground,
			brightWhite: color.terminal.ansiContrastForeground,
			dimWhite: dim(color.terminal.ansiForeground),
			blue: color.terminal.ansiBlue,
			brightBlue: color.terminal.ansiContrastBlue,
			dimBlue: dim(color.terminal.ansiBlue),
			cyan: color.terminal.ansiCyan,
			brightCyan: color.terminal.ansiContrastCyan,
			dimCyan: dim(color.terminal.ansiCyan),
			green: color.terminal.ansiGreen,
			brightGreen: color.terminal.ansiContrastGreen,
			dimGreen: dim(color.terminal.ansiGreen),
			yellow: color.terminal.ansiYellow,
			brightYellow: color.terminal.ansiContrastYellow,
			dimYellow: dim(color.terminal.ansiYellow),
			red: color.terminal.ansiRed,
			brightRed: color.terminal.ansiContrastRed,
			dimRed: dim(color.terminal.ansiRed),
			magenta: color.terminal.ansiMagenta,
			brightMagenta: color.terminal.ansiContrastMagenta,
			dimMagenta: dim(color.terminal.ansiMagenta),
		};
	}
}

export function generateTerminalTheme(color: UiColors, type: "light" | "dark", config: Config) {
	const terminalColorScheme = ansiScheme(selectAnsiColors(color, type, config));
	return {
		// TERMINAL COLORS [x]
		...terminalColorScheme,
		//
		"terminal.selectionBackground": color.text.selectionBgA,
		"terminal.inactiveSelectionBackground": color.text.secondarySelectionBgA,
		"terminal.findMatchBackground": color.text.matchBg, // Currently selected match.
		"terminal.findMatchBorder": color.text.matchBorderA, // Currently selected match.
		"terminal.findMatchHighlightBackground": color.text.matchBgA, // Other matches.
		"terminal.findMatchHighlightBorder": "#00000000", // Other matches.
		"terminalOverviewRuler.cursorForeground": color.accent.primary,
		"terminalOverviewRuler.findMatchForeground": color.diag.match,
		//
		"terminalCommandDecoration.defaultBackground": color.terminal.default,
		"terminalCommandDecoration.successBackground": color.terminal.success,
		"terminalCommandDecoration.errorBackground": color.terminal.error,
		//
		"terminalCursor.foreground": color.accent.primary,
		"terminalCursor.background": color.ui.primaryBg, // Colour of text when selected by block cursor.
		//
		"terminal.dropBackground": color.ui.primaryDropBg, // // Background for re-organising stacked terminals.
		"terminal.tab.activeBorder": color.ui.border, // ???
	};
}

function ansiScheme(c: AnsiColors) {
	return {
		"terminal.foreground": c.foreground,
		"terminal.background": c.background,
		"terminal.ansiBlack": c.black,
		"terminal.ansiBrightBlack": c.brightBlack,
		"terminal.ansiWhite": c.white,
		"terminal.ansiBrightWhite": c.brightWhite,
		"terminal.ansiBlue": c.blue,
		"terminal.ansiBrightBlue": c.brightBlue,
		"terminal.ansiCyan": c.cyan,
		"terminal.ansiBrightCyan": c.brightCyan,
		"terminal.ansiGreen": c.green,
		"terminal.ansiBrightGreen": c.brightGreen,
		"terminal.ansiYellow": c.yellow,
		"terminal.ansiBrightYellow": c.brightYellow,
		"terminal.ansiRed": c.red,
		"terminal.ansiBrightRed": c.brightRed,
		"terminal.ansiMagenta": c.magenta,
		"terminal.ansiBrightMagenta": c.brightMagenta,
	};
}
