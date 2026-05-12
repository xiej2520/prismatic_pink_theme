import { Config } from "../config";
import { UiColors } from ".";

export function generateTerminalTheme(
	color: UiColors,
	type: "light" | "dark",
	config: Config
) {
	// Terminal colour scheme.
	let terminalColourScheme;
	if (type == "light" && config.lightTerminalColourScheme != "normal+dark") {
		if (config.lightTerminalColourScheme == "normal+light") {
			terminalColourScheme = {
				"terminal.foreground": color.terminal.foreground,
				"terminal.background": color.ui.primaryBg,
				"terminal.ansiBlack": color.terminal.ansiBackground,
				"terminal.ansiBrightBlack":
					color.terminal.alternativeContrast!.ansiContrastBackground,
				"terminal.ansiWhite": color.terminal.ansiForeground,
				"terminal.ansiBrightWhite":
					color.terminal.alternativeContrast!.ansiContrastForeground,
				"terminal.ansiBlue": color.terminal.ansiBlue,
				"terminal.ansiBrightBlue": color.terminal.alternativeContrast!.ansiContrastBlue,
				"terminal.ansiCyan": color.terminal.ansiCyan,
				"terminal.ansiBrightCyan": color.terminal.alternativeContrast!.ansiContrastCyan,
				"terminal.ansiGreen": color.terminal.ansiGreen,
				"terminal.ansiBrightGreen": color.terminal.alternativeContrast!.ansiContrastGreen,
				"terminal.ansiYellow": color.terminal.ansiYellow,
				"terminal.ansiBrightYellow": color.terminal.alternativeContrast!.ansiContrastYellow,
				"terminal.ansiRed": color.terminal.ansiRed,
				"terminal.ansiBrightRed": color.terminal.alternativeContrast!.ansiContrastRed,
				"terminal.ansiMagenta": color.terminal.ansiMagenta,
				"terminal.ansiBrightMagenta":
					color.terminal.alternativeContrast!.ansiContrastMagenta,
			};
		} else {
			terminalColourScheme = {
				"terminal.foreground": color.terminal.alternativeWhole!.foreground,
				"terminal.background": color.ui.primaryBg,
				"terminal.ansiBlack": color.terminal.alternativeWhole!.ansiBackground,
				"terminal.ansiBrightBlack": color.terminal.alternativeWhole!.ansiContrastBackground,
				"terminal.ansiWhite": color.terminal.alternativeWhole!.ansiForeground,
				"terminal.ansiBrightWhite": color.terminal.alternativeWhole!.ansiContrastForeground,
				"terminal.ansiBlue": color.terminal.alternativeWhole!.ansiBlue,
				"terminal.ansiBrightBlue": color.terminal.alternativeWhole!.ansiContrastBlue,
				"terminal.ansiCyan": color.terminal.alternativeWhole!.ansiCyan,
				"terminal.ansiBrightCyan": color.terminal.alternativeWhole!.ansiContrastCyan,
				"terminal.ansiGreen": color.terminal.alternativeWhole!.ansiGreen,
				"terminal.ansiBrightGreen": color.terminal.alternativeWhole!.ansiContrastGreen,
				"terminal.ansiYellow": color.terminal.alternativeWhole!.ansiYellow,
				"terminal.ansiBrightYellow": color.terminal.alternativeWhole!.ansiContrastYellow,
				"terminal.ansiRed": color.terminal.alternativeWhole!.ansiRed,
				"terminal.ansiBrightRed": color.terminal.alternativeWhole!.ansiContrastRed,
				"terminal.ansiMagenta": color.terminal.alternativeWhole!.ansiMagenta,
				"terminal.ansiBrightMagenta": color.terminal.alternativeWhole!.ansiContrastMagenta,
			};
		}
	} else {
		terminalColourScheme = {
			"terminal.foreground": color.terminal.foreground,
			"terminal.background": color.ui.primaryBg,
			"terminal.ansiBlack": color.terminal.ansiBackground,
			"terminal.ansiBrightBlack": color.terminal.ansiContrastBackground,
			"terminal.ansiWhite": color.terminal.ansiForeground,
			"terminal.ansiBrightWhite": color.terminal.ansiContrastForeground,
			"terminal.ansiBlue": color.terminal.ansiBlue,
			"terminal.ansiBrightBlue": color.terminal.ansiContrastBlue,
			"terminal.ansiCyan": color.terminal.ansiCyan,
			"terminal.ansiBrightCyan": color.terminal.ansiContrastCyan,
			"terminal.ansiGreen": color.terminal.ansiGreen,
			"terminal.ansiBrightGreen": color.terminal.ansiContrastGreen,
			"terminal.ansiYellow": color.terminal.ansiYellow,
			"terminal.ansiBrightYellow": color.terminal.ansiContrastYellow,
			"terminal.ansiRed": color.terminal.ansiRed,
			"terminal.ansiBrightRed": color.terminal.ansiContrastRed,
			"terminal.ansiMagenta": color.terminal.ansiMagenta,
			"terminal.ansiBrightMagenta": color.terminal.ansiContrastMagenta,
		};
	}
  return {
    // TERMINAL COLORS [x]
    ...terminalColourScheme,
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

