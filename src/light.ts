import type { SyntaxColors, UiColors } from "./theme";
import { TerminalAnsiPalette } from "./theme/terminal";

//export const lightSyntax: SyntaxColors = {
//	fg: "#565869",
//	gray: "#777777",
//	fadedGray: "#ADB1C2",
//	strongPink: "#FF1277",
//	pink: "#F767BB",
//	purple: "#C75AF3",
//	blue: "#09A1ED",
//	lightBlue: "#6F7FB2",
//	cyan: "#27B0AC",
//	green: "#2DAE58",
//	lime: "#85AF1A",
//	yellow: "#C69613",
//	orange: "#FF5C57",
//	mauve: "#A8759A",
//	boldFg: "#6C6E83",
//	boldPink: "#F871C0",
//	boldBlue: "#1DAEf6",
//	boldLightBlue: "#7B8dAE",
//};

export const lightSyntax: SyntaxColors = {
	// Keep at least 3:1 contrast on background. Bold are just below.
	fg: "#565869",
	gray: "#747474",
	fadedGray: "#898D9D",

	pink: "#EB5CB1",
	strongPink: "#FF1277",

	red: "#E5484D",
	orange: "#F75703",
	yellow: "#B98B01",
	lime: "#7BA403",
	green: "#19A24D",
	cyan: "#07A3A0",
	cornflower: "#5270C7",
	skyBlue: "#2E7DC4",
	blue: "#0194DB",
	purple: "#9177F4",
	violet: "#9B53CA",

	boldGreen: "#28AA55",
	boldPink: "#F565BA",
	boldViolet: "#A059CF",
	boldFg: "#6C6E83",

	lightPink: "#8E6984",
	lightGreen: "#4A604E",
	lightBlue: "#97BCCD",
	lightPurple: "#8466AA",
};

// three sets of colors: dark (higher contrast) --- normal (the syntax colors, at least 3:1) --- light (lower contrast)
const terminalNormal: TerminalAnsiPalette = {
	black: "#919199",
	red: "#E5484D",
	green: "#19A24D",
	yellow: "#B98B01",
	blue: "#0194DB",
	magenta: "#C75AF3",
	cyan: "#07A3A0",
	white: "#565869",
};

const terminalDark: TerminalAnsiPalette = {
	black: "#8B8FA0",
	red: "#db3839",
	green: "#1e9347",
	yellow: "#a1790c",
	blue: "#1684c2",
	magenta: "#a853cb",
	cyan: "#288d8a",
	white: "#343545",
};

const terminalLight: TerminalAnsiPalette = {
	black: "#b4b6cc",
	red: "#fe8b82",
	green: "#55ce76",
	yellow: "#ddac37",
	blue: "#78c6fd",
	magenta: "#d991f9",
	cyan: "#4bcac5",
	white: "#8b8fa0",
};

export const lightColors: UiColors = {
	// Note: All non-alpha backgrounds are based on `primaryBg`.

	text: {
		// Most ui text, text editor default text
		normal: "#565869",

		// Setting header text
		bold: "#565869",

		// Text editor line number, text editor suggestion ghost text, list deemphasized text, tab unfocused title,
		// (??? x1)
		muted: "#787C8C",

		// Breadcrumb text, general description text, titlebar unfocused text
		light: "#747474",

		// Button text, extension button text, status bar when debugging text & icons
		//
		// DEFAULT: DISABLED_STATUS_BAR: Command bar & intellisense & list selected text & icon, badge text, banner
		// text, menu selected text
		//
		// DEFAULT: Status bar text & icons
		inverse: "#FFFFFF",

		// Peek view selected text, peek view header text, peek view filename text,
		emphasised: "#000000",

		// Text editor unnecessary text
		faded: "#000000C0",

		decoration: {
			// Text editor whitespace chars, text editor indentation guides, text editor rulers
			light: "#CECECE",

			// Text editor matching bracket border, text editor corrent indentation guide
			//
			// MONO_GUIDES: Bracket match guides
			dark: "#929292",

			// Codelens
			//
			// DEFAULT_INLAY: Inlay hint text
			codelens: "#747474",

			// BCKG_INLAY: Inlay hint text
			alt1Inlay: "#6C6E84",
			// BCKG_INLAY: Inlay hint background
			alt1InlayBgA: "#00000007",

			// ACCENT_INLAY: Inlay hint text
			alt2Inlay: "#FC9AC5", // FF12776A on primaryBg

			// ACCENT_BCKG_INLAY: Inlay hint text
			alt3Inlay: "#FC8CBD", // FF12777A on primaryBg
			// ACCENT_BCKG_INLAY: Inlay hint background
			alt3InlayBgA: "#FF127710",
		},

		// Text editor folded line, text editor hover over symbol background box
		//
		// NORMAL_LINE: Text editor current line background
		currentLineBgA: "#00000014",
		// ALT_LINE: Text editor current line border
		currentLineBorder: "#00000008",

		// Text editor selection background box, text editor matching text background box, text editor matching
		// symbol background box, text editor selection boxes, general selection, input field, terminal selection,
		selectionBg: "#FBE3EE", // FF12771A on primaryBg
		selectionBgA: "#FF12772A",
		// Text editor unfocused selection background box, text editor find current range background box, terminal
		// unfocused selection
		secondarySelectionBgA: "#FF127710",

		// Text editor tabstop background box
		tabstopBgA: "#FF12771A",

		// Text editor & search sidebar find match background box, text editor match line background, peek view
		// match background box, list filter widget background, list filter match background, terminal find match
		// background box, (??? x1)
		matchBg: "#F7F9CB",
		matchBgA: "#EFF3283A",

		// Text editor & search sidebar find match border, peek view match border, list filter match border,
		// terminal find match border,
		matchBorder: "#03863C",
		matchBorderA: "#03863C20",
	},

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
		primary: "#FF1277",
		primaryHover: "#DA005F",
		link: "#FF1277",
		linkHover: "#DA005F",

		// Button background, codeblock text, (??? x1)
		//
		// DEFAULT: status bar remote background
		secondary: "#057AB6",
		secondaryHover: "#036CA2",
	},

	diag: {
		// Ruler markers, minimap markers,
		selection: "#FBCEE2", // +(list search match background, ??? x1)
		match: "#F0E657", // +(marker for currently selected @SYMBOL)
		bracket: "#7777775A",

		// Error lens text, error lens gutter icons, peek view border, input validation text & border, testing
		// message line text (info+error), text editor underline squiggles, problems panel icons, ruler markers,
		// minimap markers, notification icons,
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar text & icons,
		hint: "#03863C",
		info: "#057AB6", // +(general peek view, status bar prominent if applicable)
		warning: "#BB5704", // +(list warning text)
		error: "#FF1277", // +(general error text, bracket mismatch foreground, list error text, list invalid text, list no matches, confusing unicode highlighting border)

		// Error lens line background, peek view header background, input validation background, testing message
		// line background (info+error),
		hintBg: "#DBECE4",
		hintBgA: "#03863C20",
		infoBg: "#DBEBF3", // +(general peek view)
		infoBgA: "#057AB620", // +(general peek view)
		warningBg: "#F2E6DD",
		warningBgA: "#BB570420",
		errorBg: "#FBE3EE",
		errorBgA: "#FF12771A", // +(confusing unicode highlighting)

		// Test status icons
		testPassed: "#03863C",
		testQueued: "#057AB6",
		testFailed: "#FF1277",
		testUnset: "#BB5704",
		testSkipped: "#898C9D",
	},

	git: {
		// Ruler markers, minimap markers, gutter markers, file names
		addedOrStaged: "#03863C",
		modified: "#057AB6",
		renamed: "#03827F",
		untracked: "#AE3FD8",
		removedOrConflicting: "#FF1277",
		ignoredOrSubmodule: "#898C9D",
		current: "#03863C",
		incoming: "#057AB6",

		// Diff viewer line backgrounds, refactor preview text backgrounds
		insertedBgA: "#03863C2A", // Entire modified line #d3f2e6 Specifically added #b2ead3
		removedBgA: "#FF127720", // Entire modified line #fbddea Specifically removed #fcc2db
		diffDiagonal: "#ADB1C288",

		// Conflict viewer line backgrounds
		currentBgA: "#03863C2A",
		currentHeaderBgA: "#03863C6A",
		incomingBgA: "#057AB62A",
		incomingHeaderBgA: "#057AB66A",

		// Merge editor backgrounds
		mergeWordChangeBgA: "#EFF3282A",
		mergeLineChangeBgA: "#EFF3281A",
		mergeUnhandledUnfocused: "#EFF3287A",
		mergeUnhandledFocused: "#EFF328DA", // +(ruler marker)
		mergeHandledUnfocused: "#0000002A",
		mergeHandledFocused: "#0000004A", // +(ruler marker)
	},

	debug: {
		// Debug toolbar icons
		start: "#03863C",
		pause: "#BB5704",
		step: "#057AB6",
		stop: "#FF1277",

		// Gutter icons
		breakpoint: "#FF1277",
		breakpointDisabled: "#898C9D",

		// Exception widget background
		exceptionBg: "#F7F9CB",

		// Debug console text
		info: "#057AB6",
		warning: "#BB5704",
		error: "#E30068",
		source: "#000000",
		input: "#AE3FD8",
	},

	terminal: {
		default: "#898C9D",
		success: "#03863C",
		error: "#FF1277",

		// normal+dark: darker (higher contrast) colors for bright,
		ansi: {
			foreground: "#565869", // 0m (default foreground)
			background: "#FAFBFC", // terminal surface, separate from ANSI black
			normal: terminalNormal,
			bright: terminalDark,
		},

		// normal+light: lighter (lower contrast) colors for bright
		alternativeBright: terminalLight,

		// dark+normal: darker (higher contrast) colors for standard ANSI, normal colors for bright
		alternativeWhole: {
			foreground: "#343545",
			background: "#FAFBFC",
			normal: terminalDark,
			bright: terminalNormal,
		},
	},

	ui: {
		// Intellisense widget, command bar, text editor, text editor block cursor char, text editor gutter, text
		// editor minimap, breacrumbs, hover widget, peek view text editor, peek view text gutter, tab empty group,
		// tab drop-into promp, tab active background, tab hover background, tab zen mode sides, activity bar
		// background, welcome page background, panel background, notification background, command center
		// background
		//
		// MINIMAL: Badge background,
		primaryBg: "#FAFBFC",

		// Widgets, hover widget status bar, peek view list, tab row background, tab row empty background, tab
		// inactive background, tab unfocused background, sidebar background, panel section header background,
		// debug toolbar background & border, notification centre header, titlebar, block quote background,
		// code-block background, keybind table header backgrounds, keybind table even row background
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar background, status bar remote icon background,
		secondaryBg: "#F3F3F3",

		// Sidebar section header background
		tertiaryBg: "#E5E5E5",

		// Breadcrumb, menu, any button which dropdowns
		dropdownBg: "#FAFBFC",

		// Checkbox, dropdown (+list), input field,
		inputBg: "#FAFBFC",

		// Tab group, sidebar pane, panel section, terminal, list
		primaryDropBg: "#FF12771A",

		// All borders
		border: "#CECECE",

		// Menu separator, command bar group separator, border between pinned and non-pinned tabs, (??? x1)
		separator: "#CECECE",

		// Input field foreground
		placeholderText: "#868686",

		// Menu disabled entry foreground, (this is chosen to match `placeholderText` since the disabled text also
		// has a secondary fade layer)
		disabledText: "#929292",

		// Little buttons, titlebar menu buttons, editor stick hover
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar hover/active button overlays
		hoverBgA: "#0000001A",
		activeBgA: "#0000002A",

		// Lists, command bar hover, notification hover
		//
		// MINIMAL: List unfocused selected overlay
		listHoverBgA: "#00000010",
		// DEFAULT: DISABLED_STATUS_BAR: List unfocused selected overlay
		listInactiveBgA: "#FF12771A",

		// Keybind background
		selectedBgA: "#00000010",

		// Dropdown selected, intellisense widget, peek view result, menu dropdown, command bar, command center
		// hover
		selectedBg: "#EBECED", // 00000010 on primaryBg
		// Welcome page tile on hover
		selectedSecondaryBg: "#DADADA", // 00000010 on secondaryBg

		// Tree indent guide
		treeIndent: "#C7C9CA",

		// Scrollbar/minimap handle overlays
		scrollBgA: "#00000010",
		scrollHoverBgA: "#0000001F",
		scrollActiveBgA: "#0000002F",

		// Shadow whenever some scrollable element is scrolled, shadows around open widgets
		shadow: "#0000002F",

		// Status bar during debugging background
		statusDebugBg: "#03863C",
		// Status bar when no folder is open background
		statusEmptyBg: "#E5E5E5",
		// DEFAULT: Status bar hover/active button overlays
		statusHoverBgA: "#0000002F",
		statusActiveBgA: "#0000004F",

		// Tab unfocused indicator
		unfocusedTab: "#FC9AC5", // FF12776A on primaryBg

		// Activity bar inactive icon
		activityBarInactive: "#919298",
		activityBarTopInactive: "#8B8C97",

		// Code actions icon
		lightBulb: "#FFC104",

		// Extension badge icons
		star: "#FFC104",
		remote: "#057AB6",
		verified: "#03863C",
		prerelease: "#BB5704",
		sponsor: "#FF1277",

		// Chart colours
		chartLine: "#565869",
		chartBlue: "#0194DB",
		chartGreen: "#19A24D",
		chartYellow: "#B98B01",
		chartOrange: "#F75703",
		chartRed: "#FF1277",
		chartPurple: "#C75AF3",

		preformatText: "#057AB6",
	},

	brackets: {
		one: "#19A24D",
		two: "#0194DB",
		three: "#B98B01",
		four: "#E5484D",
		five: "#C75AF3",
		six: "#A8759A",
	},

	gitGraph: [
		"#EB5CB1",
		"#0194DB",
		"#19A24D",
		"#B98B01",
		"#E5484D",
		"#C75AF3",
		"#A8759A",
		"#6E82A6",
		"#07A3A0",
		"#7BA403",
	],

	todo: {
		todo: "#565869",
		fixme: "#E5484D",
		bug: "#FF1277",
		hack: "#B98B01",
		maybe: "#07A3A0",
		unchecked: "#565869",
		checked: "#19A24D",
	},
};
