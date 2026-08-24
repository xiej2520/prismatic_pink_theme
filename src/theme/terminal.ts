import { Config } from "../config";
import type { UiColors } from ".";
import { alpha as a, flatten as f } from "../color";

export interface TerminalAnsiPalette {
	black: string;
	red: string;
	green: string;
	yellow: string;
	blue: string;
	magenta: string;
	cyan: string;
	white: string;
}

export interface TerminalPalette {
	foreground: string; // Default text color, restored by ESC[0m/ESC[39m.
	background: string; // Default terminal surface.
	normal: TerminalAnsiPalette; // ANSI 30-37.
	bright: TerminalAnsiPalette; // ANSI 90-97 (aixterm bright colors).
}

// Colors used by terminal theme targets.
//
// foreground and background are the default text and surface colors, and restored after
// a reset (e.g. ESC[0m). ANSI white/black are used when 37/97 or 30/90 are emitted.
// black 0, red 1, green 2, yellow 3, blue 4, magenta 5, cyan 6, white 7.
// Normal colors use 30-37; bright colors use 90-97. Dim colors are the SGR 2 variants `ESC[2;30m`.
// VS Code currently only uses normal and bright ANSI theme keys; other targets may use the dim values.
export interface AnsiColors {
	foreground: string;
	background: string;

	black: string; // 30
	brightBlack: string; // 90
	dimBlack: string; //

	white: string; // 37
	brightWhite: string; // 97
	dimWhite: string;

	blue: string; // 34
	brightBlue: string; // 94
	dimBlue: string;

	cyan: string; // 36
	brightCyan: string; // 96
	dimCyan: string;

	green: string; // 32
	brightGreen: string; // 92
	dimGreen: string;

	yellow: string; // 33
	brightYellow: string; // 93
	dimYellow: string;

	red: string; // 31
	brightRed: string; // 91
	dimRed: string;

	magenta: string; // 35
	brightMagenta: string; // 95
	dimMagenta: string;
}

function makeAnsiColors(base: TerminalPalette): AnsiColors {
	const dim = (hex: string) => f(a(hex, "80"), base.background).slice(0, 7);
	const normal = base.normal;
	const bright = base.bright;

	return {
		foreground: base.foreground,
		background: base.background,
		black: normal.black,
		brightBlack: bright.black,
		dimBlack: dim(normal.black),
		white: normal.white,
		brightWhite: bright.white,
		dimWhite: dim(normal.white),
		blue: normal.blue,
		brightBlue: bright.blue,
		dimBlue: dim(normal.blue),
		cyan: normal.cyan,
		brightCyan: bright.cyan,
		dimCyan: dim(normal.cyan),
		green: normal.green,
		brightGreen: bright.green,
		dimGreen: dim(normal.green),
		yellow: normal.yellow,
		brightYellow: bright.yellow,
		dimYellow: dim(normal.yellow),
		red: normal.red,
		brightRed: bright.red,
		dimRed: dim(normal.red),
		magenta: normal.magenta,
		brightMagenta: bright.magenta,
		dimMagenta: dim(normal.magenta),
	};
}

// handle config.lightTerminalColorScheme
export function selectAnsiColors(
	color: UiColors,
	type: "light" | "dark",
	config: Config,
): AnsiColors {
	const terminal = color.terminal;
	// Light themes support normal+dark: darker (higher contrast) colors for bright,
	// normal+light: lighter (lower contrast) colors for bright, or
	// dark+normal: darker (higher contrast) colors for standard ANSI.
	let palette = terminal.ansi;
	if (type === "light" && config.lightTerminalColorScheme === "normal+light") {
		palette = { ...terminal.ansi, bright: terminal.alternativeBright! };
	} else if (type === "light" && config.lightTerminalColorScheme === "dark+normal") {
		palette = terminal.alternativeWhole!;
	}
	return makeAnsiColors(palette);
}

// VS Code supports default, normal ANSI, and bright ANSI keys. Dim values
// remain available in AnsiColors for Zed, Nvim, and CSS serializers.
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

export function generateTerminalTheme(color: UiColors, type: "light" | "dark", config: Config) {
	return {
		// TERMINAL COLORS [x]
		...ansiScheme(selectAnsiColors(color, type, config)),
		//
		"terminal.selectionBackground": color.text.selectionBgA,
		"terminal.inactiveSelectionBackground": color.text.secondarySelectionBgA,
		"terminal.findMatchBackground": color.text.matchBg, // Currently selected match.
		"terminal.findMatchBorder": color.text.matchBorderA, // Currently selected match.
		"terminal.findMatchHighlightBackground": color.text.matchBgA, // Other matches.
		"terminal.findMatchHighlightBorder": "#00000000", // Other matches.
		"terminalOverviewRuler.cursorForeground": color.accent.primary,
		"terminalOverviewRuler.findMatchForeground": color.diag.match,
		"terminalCommandDecoration.defaultBackground": color.terminal.default,
		"terminalCommandDecoration.successBackground": color.terminal.success,
		"terminalCommandDecoration.errorBackground": color.terminal.error,
		"terminalCursor.foreground": color.accent.primary,
		"terminalCursor.background": color.ui.primaryBg, // Colour of text when selected by block cursor.
		//
		"terminal.dropBackground": color.ui.primaryDropBg, // Background for re-organising stacked terminals.
		"terminal.tab.activeBorder": color.ui.border, // ???
	};
}

// reference theme
export const alacritty = {
	background: "#101014",
	foreground: "#D0D0D0",
	dim_foreground: "#A0A0A0",
	normal: {
		black: "#0B1012",
		red: "#E05555",
		green: "#60D455",
		yellow: "#F0CC60",
		blue: "#5D88F0",
		magenta: "#D85CCF",
		cyan: "#40D0D0",
		white: "#F0F0F0",
	},
	bright: {
		black: "#777777",
		red: "#FF5050",
		green: "#70F648",
		yellow: "#F4DD28",
		blue: "#417DFF",
		magenta: "#D85CF8",
		cyan: "#2EEBEB",
		white: "#FFFFFF",
	},

	dim: {
		black: "#0F0F10",
		red: "#A04040",
		green: "#509040",
		yellow: "#B4A050",
		blue: "#486AB0",
		magenta: "#90488C",
		cyan: "#408080",
		white: "#909090",
	},
};
