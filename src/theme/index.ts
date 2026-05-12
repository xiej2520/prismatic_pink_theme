import type { Config } from "../config";
import { THEMES } from "../themes";
import { THEME_FOLDER } from "../paths";
import * as fs from "fs";
import * as path from "path";
import { generateEditorTheme } from "./editor";
import { generateTerminalTheme } from "./terminal";
import { generateSemanticTheme, generateSemanticThemeColors } from "./semantic";
import { generateTextMateTheme } from "./textmate";

/**
 * Creates the theme `.json` files.
 * @param config The current configuration.
 */
export function createThemes(config: Config) {
  for (const t of THEMES) {
    const jsonPath = path.join(THEME_FOLDER, t.file);
    const theme = generateTheme(t.colors, t.syntax, t.label, t.type, config);
    fs.writeFileSync(jsonPath, JSON.stringify(theme, undefined, 4));
  }
}

function generateTheme(
	color: UiColors,
	syntax: SyntaxColors,
	name: string,
	type: "light" | "dark",
	config: Config
) {
	const semanticThemeColors = generateSemanticThemeColors(syntax);
	return {
		name: name,
		type: type,
		colors: {
			...generateEditorTheme(color, syntax, type, config),
			...generateTerminalTheme(color, type, config),
		},
		semanticHighlighting: true,
		semanticTokenColors: generateSemanticTheme(semanticThemeColors, config),
		...generateTextMateTheme(syntax, config),
	};
}

export interface SyntaxColors {
	fg: string;
	gray: string;
	fadedGray: string;

	pink: string;
	strongPink: string;

	red: string;
	orange: string;
	yellow: string;
	lime: string;
	green: string;
	cyan: string;
	cornflower: string;
	skyBlue: string;
	blue: string;
	purple: string;
	// idk if I like violet for parameters, maybe light pale green?
	violet: string;
	// Bold text, due to it's boldness, has a higher contrast. To maintain the same perceptual contrast, a lower
	// contrast colour must be used instead.
	boldGreen: string,
	boldPink: string;
	boldViolet: string;
	boldFg: string;

	// light colors
	lightPink: string;
	lightGreen: string;
	lightBlue: string;
	lightPurple: string;
}

export interface UiColors {
	text: {
		// Most ui text, text editor default text
		normal: string;

		// Setting header text
		bold: string;

		// Text editor line number, text editor suggestion ghost text, list deemphasized text, tab unfocused title,
		// (??? x1)
		muted: string;

		// Breadcrumb text, general description text, titlebar unfocused text
		light: string;

		// Button text, extension button text, status bar when debugging text & icons
		//
		// DEFAULT: DISABLED_STATUS_BAR: Command bar & intellisense & list selected text & icon, badge text, banner
		// text, menu selected text
		//
		// DEFAULT: Status bar text & icons
		inverse: string;

		// Peek view selected text, peek view header text, peek view filename text,
		emphasised: string;

		/// Text editor unnecessary text
		faded: string;

		decoration: {
			// Text editor whitespace chars, text editor indentation guides, text editor rulers
			light: string;

			// Text editor matching bracket border, text editor corrent indentation guide
			//
			// MONO_GUIDES: Bracket match guides
			dark: string;

			// Codelens
			//
			// DEFAULT_INLAY: Inlay hint text
			codelens: string;

			// BCKG_INLAY: Inlay hint text
			alt1Inlay: string;
			// BCKG_INLAY: Inlay hint background
			alt1InlayBgA: string;

			// ACCENT_INLAY: Inlay hint text
			alt2Inlay: string; // FF4C986A on primaryBg

			// ACCENT_BCKG_INLAY: Inlay hint text
			alt3Inlay: string; // FF4C987A on primaryBg
			// ACCENT_BCKG_INLAY: Inlay hint background
			alt3InlayBgA: string;
		};

		// Text editor folded line, text editor hover over symbol background box
		//
		// NORMAL_LINE: Text editor current line background
		currentLineBgA: string;
		// ALT_LINE: Text editor current line border
		currentLineBorder: string;

		// Text editor selection background box, text editor matching text background box, text editor matching
		// symbol background box, text editor selection boxes, general selection, input field, terminal selection,
		selectionBg: string; // FF4C981A on primaryBg
		selectionBgA: string;
		// Text editor unfocused selection background box, text editor find current range background box, terminal
		// unfocused selection
		secondarySelectionBgA: string;

		// Text editor tabstop background box
		tabstopBgA: string;

		// Text editor & search sidebar find match background box, text editor match line background, peek view
		// match background box, list filter widget background, list filter match background, terminal find match
		// background box, (??? x1)
		matchBg: string;
		matchBgA: string;

		// Text editor & search sidebar find match border, peek view match border, list filter match border,
		// terminal find match border,
		matchBorder: string;
		matchBorderA: string;
	};

	accent: {
		// Cursor, text editor current line number, text editor ctrl+click, breadcrumb focused/active text, link
		// text, border of focused elements, button background, extension button background, checkbox tick,
		// progress bar, tab focused indicator, activity bar hover/active icon, activity bar active border,
		// settings modified indicator, panel active title, panel active indicator, border when draggable, command
		// bar grouping text, intellisense widget matching text, block quote left border, welcome page progress
		// bar, (??? x1)
		//
		// DEFAULT: DISABLED_STATUS_BAR: List & command bar currently selected background, intellisense widget
		// selected background, peek view widget selected background, badge background, banner background, menu
		// selected background
		//
		// DEFAULT: status bar background
		//
		// DISABLED_STATUS_BAR: MINIMAL: status bar remote icon
		//
		// MINIMAL: list & command bar matching text, badge text
		primary: string;
		primaryHover: string;
		link: string;
		linkHover: string;

		// Button background, codeblock text, (??? x1)
		//
		// DEFAULT: status bar remote background
		secondary: string;
		secondaryHover: string;
	};

	diag: {
		// Ruler markers, minimap markers,
		selection: string; // +(list search match background, ??? x1)
		match: string; // +(marker for currently selected @SYMBOL)
		bracket: string;

		// Error lens text, error lens gutter icons, peek view border, input validation text & border, testing
		// message line text (info+error), text editor underline squiggles, problems panel icons, ruler markers,
		// minimap markers, notification icons,
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar text & icons,
		hint: string;
		info: string; // +(general peek view, status bar prominent if applicable)
		warning: string; // +(list warning text)
		error: string; // +(general error text, bracket mismatch foreground, list error text, list invalid text, list no matches, confusing unicode highlighting border)

		// Error lens line background, peek view header background, input validation background, testing message
		// line background (info+error),
		hintBg: string;
		hintBgA: string;
		infoBg: string; // +(general peek view)
		infoBgA: string; // +(general peek view)
		warningBg: string;
		warningBgA: string;
		errorBg: string;
		errorBgA: string; // +(confusing unicode highlighting)

		// Testing status icons
		testPassed: string;
		testQueued: string;
		testFailed: string;
		testUnset: string;
		testSkipped: string;
	};

	git: {
		// Ruler markers, minimap markers, gutter markers, file names
		addedOrStaged: string;
		modified: string;
		renamed: string;
		untracked: string;
		removedOrConflicting: string;
		ignoredOrSubmodule: string;
		current: string;
		incoming: string;

		// Diff viewer line backgrounds, refactor preview text backgrounds
		insertedBgA: string; // Entire modified line #243a31 Specifically added #264b37
		removedBgA: string; // Entire modified line #3f2234 Specifically removed #58203c
		diffDiagonal: string;

		// Conflict viewer line backgrounds
		currentBgA: string;
		currentHeaderBgA: string;
		incomingBgA: string;
		incomingHeaderBgA: string;

		// Merge editor backgrounds
		mergeWordChangeBgA: string;
		mergeLineChangeBgA: string;
		mergeUnhandledUnfocused: string;
		mergeUnhandledFocused: string; // +(ruler marker)
		mergeHandledUnfocused: string;
		mergeHandledFocused: string; // +(ruler marker)
	};

	debug: {
		// Debug toolbar icons
		start: string;
		pause: string;
		step: string;
		stop: string;

		// Gutter icons
		breakpoint: string;
		breakpointDisabled: string;

		// Exception widget background
		exceptionBg: string;

		// Debug console text
		info: string;
		warning: string;
		error: string;
		source: string;
		input: string;
	};

	terminal: {
		// Command decoration icons
		default: string; // +(SetMark sequence)
		success: string;
		error: string;

		foreground: string;

		ansiForeground: string; // 7
		ansiContrastForeground: string; // 7^
		ansiBackground: string; // 0
		ansiContrastBackground: string; // 0^
		ansiBlue: string; // 4
		ansiContrastBlue: string; // 4^
		ansiCyan: string; // 6
		ansiContrastCyan: string; // 6^
		ansiGreen: string; // 2
		ansiContrastGreen: string; // 2^
		ansiYellow: string; // 3
		ansiContrastYellow: string; // 3^
		ansiRed: string; // 1
		ansiContrastRed: string; // 1^
		ansiMagenta: string; // 5
		ansiContrastMagenta: string; // 5^

		// Alternative set of colours for the "bright" aixterm colours (90-97/100-107).
		alternativeContrast?: {
			ansiContrastForeground: string; // 7^
			ansiContrastBackground: string; // 0^
			ansiContrastBlue: string; // 4^
			ansiContrastCyan: string; // 6^
			ansiContrastGreen: string; // 2^
			ansiContrastYellow: string; // 3^
			ansiContrastRed: string; // 1^
			ansiContrastMagenta: string; // 5^
		};

		// Alternative set of all ANSI/aixterm colours.
		alternativeWhole?: {
			foreground: string;

			ansiForeground: string; // 7
			ansiContrastForeground: string; // 7^
			ansiBackground: string; // 0
			ansiContrastBackground: string; // 0^
			ansiBlue: string; // 4
			ansiContrastBlue: string; // 4^
			ansiCyan: string; // 6
			ansiContrastCyan: string; // 6^
			ansiGreen: string; // 2
			ansiContrastGreen: string; // 2^
			ansiYellow: string; // 3
			ansiContrastYellow: string; // 3^
			ansiRed: string; // 1
			ansiContrastRed: string; // 1^
			ansiMagenta: string; // 5
			ansiContrastMagenta: string; // 5^
		};
	};

	ui: {
		// Intellisense widget, command bar, text editor, text editor block cursor char, text editor gutter, text
		// editor minimap, breacrumbs, hover widget, peek view text editor, peek view text gutter, tab empty group,
		// tab drop-into promp, tab active background, tab hover background, tab zen mode sides, activity bar
		// background, welcome page background, panel background, notification background, command center
		// background
		//
		// MINIMAL: Badge background,
		primaryBg: string;

		// Widgets, hover widget status bar, peek view list, tab row background, tab row empty background, tab
		// inactive background, tab unfocused background, sidebar background, panel section header background,
		// debug toolbar background & border, notification centre header, titlebar, block quote background,
		// code-block background, keybind table header backgrounds, keybind table even row background
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar background, status bar remote icon background,
		secondaryBg: string;

		// Sidebar section header background
		tertiaryBg: string;

		// Breadcrumb, menu, any button which dropdowns
		dropdownBg: string;

		// Checkbox, dropdown (+list), input field,
		inputBg: string;

		// Tab group, sidebar pane, panel section, terminal, list
		primaryDropBg: string;

		// All borders
		border: string;

		// Menu separator, command bar group separator, border between pinned and non-pinned tabs, (??? x1)
		separator: string;

		// Input field foreground
		placeholderText: string;

		// Menu disabled entry foreground, (this is chosen to match `placeholderText` since the disabled text also
		// has a secondary fade layer)
		disabledText: string;

		// Little buttons, titlebar menu buttons, editor stick hover
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar hover/active button overlays
		hoverBgA: string;
		activeBgA: string;

		// Lists, command bar hover, notification hover
		//
		// MINIMAL: List unfocused selected overlay
		listHoverBgA: string;
		// DEFAULT: DISABLED_STATUS_BAR: List unfocused selected overlay
		listInactiveBgA: string;

		// Keybind background
		selectedBgA: string;

		// Dropdown selected, intellisense widget, peek view result, menu dropdown, command bar, command center
		// hover
		selectedBg: string; // FFFFFF10 on primaryBg
		// Welcome page tile on hover
		selectedSecondaryBg: string; // FFFFFF10 on secondaryBg

		// Tree indent guide
		treeIndent: string;

		// Scrollbar/minimap handle overlays
		scrollBgA: string;
		scrollHoverBgA: string;
		scrollActiveBgA: string;

		// Shadow whenever some scrollable element is scrolled, shadows around open widgets
		shadow: string;

		// Status bar during debugging background
		statusDebugBg: string;
		// Status bar when no folder is open background
		statusEmptyBg: string;
		// DEFAULT: Status bar hover/active button overlays
		statusHoverBgA: string;
		statusActiveBgA: string;

		// Tab unfocused indicator
		unfocusedTab: string; // FF4C986A on primaryBg

		// Activity bar inactive icon
		activityBarInactive: string;
		activityBarTopInactive: string;

		// Code actions icon
		lightBulb: string;

		// Extension badge icons
		star: string;
		remote: string;
		verified: string;
		prerelease: string;
		sponsor: string;

		// Chart colors
		chartLine: string;
		chartBlue: string;
		chartGreen: string;
		chartYellow: string;
		chartOrange: string;
		chartRed: string;
		chartPurple: string;

		preformatText: string;
	};

	brackets: {
		one: string;
		two: string;
		three: string;
		four: string;
		five: string;
		six: string;
	};

	gitGraph: [string, string, string, string, string, string, string, string, string, string];

	todo: {
		todo: string;
		fixme: string;
		bug: string;
		hack: string;
		maybe: string;
		unchecked: string;
		checked: string;
	};
}
