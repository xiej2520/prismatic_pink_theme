import type { SyntaxColors, UiColors } from "./theme";
import { alpha as a, flatten as f } from "./color";
import { hue, sem, brackets, gitGraph, todo } from "./shared";

const local = {
	gray: "#7A7A8A",
	border: "#222228",
	bg: "#000000", // primary/tertiary/dropdown background
	bgAlt: "#040406", // secondary background
	inputBg: "#181818",
	uiNormal: "#E8EBF2",
};

export const blackContrastSyntax: SyntaxColors = {
	// aim for >9.5 contrast https://webaim.org/resources/contrastchecker/
	fg: "#D6DAE0",
	gray: "#828DA0",
	fadedGray: local.gray,

	pink: hue.softPink,
	strongPink: hue.hotPink,

	red: "#F35858",
	orange: "#FF8142",
	yellow: "#F9D959",
	lime: "#89E736",
	green: "#38CB5E",

	cyan: "#16DAD5",
	skyBlue: "#77AFEE",
	blue: "#29BBFF",
	cornflower: "#A3ACFF",
	purple: "#B3A4FE",
	violet: "#CF94FF",

	lightGreen: "#D6FFD6",
	lightBlue: hue.paleBlue,
	lightPurple: "#D3C3EF",
	lightPink: "#EEBBFF",

	boldGreen: "#2BBF46",
	boldPink: "#F750AE",
	boldViolet: "#D88AFF",
	boldFg: "#C8CCD6",
};

export const blackContrastColors: UiColors = {
	// Note: All non-alpha backgrounds are based on `primaryBg`.

	text: {
		// Most ui text, text editor default text
		normal: local.uiNormal, // brighter, blue tinted

		// Setting header text
		bold: "#CFD7E6",

		// Text editor line number, text editor suggestion ghost text, list deemphasized text, tab unfocused title,
		// (??? x1)
		muted: "#A0A9C5",

		// Breadcrumb text, general description text, titlebar unfocused text
		light: "#B0B8CF",

		// Button text, extension button text, status bar when debugging text & icons
		//
		// DEFAULT: DISABLED_STATUS_BAR: Command bar & intellisense & list selected text & icon, badge text, banner
		// text, menu selected text
		//
		// DEFAULT: Status bar text & icons
		inverse: hue.white,

		// Peek view selected text, peek view header text, peek view filename text,
		emphasised: hue.white,

		/// Text editor unnecessary text
		faded: a(local.bg, "C0"),

		decoration: {
			// Text editor whitespace chars, text editor indentation guides, text editor rulers
			light: "#535B6E",

			// Text editor matching bracket border, text editor corrent indentation guide
			//
			// MONO_GUIDES: Bracket match guides
			dark: "#F829A0",

			// Codelens
			//
			// DEFAULT_INLAY: Inlay hint text
			codelens: "#9C9CA4",

			// BCKG_INLAY: Inlay hint text
			alt1Inlay: "#9099AB",
			// BCKG_INLAY: Inlay hint background
			alt1InlayBgA: a(hue.white, "07"),

			// ACCENT_INLAY: Inlay hint text
			alt2Inlay: f(a(hue.brightPink, "6A"), local.bg), // FF4C986A on primaryBg

			// ACCENT_BCKG_INLAY: Inlay hint text
			alt3Inlay: f(a(hue.brightPink, "7A"), local.bg), // FF4C987A on primaryBg
			// ACCENT_BCKG_INLAY: Inlay hint background
			alt3InlayBgA: a(hue.brightPink, "10"),
		},

		// Text editor folded line, text editor hover over symbol background box
		//
		// NORMAL_LINE: Text editor current line background
		currentLineBgA: a(hue.white, "20"),
		// ALT_LINE: Text editor current line border
		currentLineBorder: a(hue.white, "20"),

		// Text editor selection background box, text editor matching text background box, text editor matching
		// symbol background box, text editor selection boxes, general selection, input field, terminal selection,
		selectionBg: a(hue.hotPink, "40"), // FF4C981A on primaryBg
		selectionBgA: a(hue.hotPink, "40"),
		// Text editor unfocused selection background box, text editor find current range background box, terminal
		// unfocused selection
		secondarySelectionBgA: a(hue.hotPink, "30"),

		// Text editor tabstop background box
		tabstopBgA: a(hue.brightPink, "1A"),

		// Text editor & search sidebar find match background box, text editor match line background, peek view
		// match background box, list filter widget background, list filter match background, terminal find match
		// background box, (??? x1)
		matchBg: a(hue.limeYellow, "3A"),
		matchBgA: a(hue.limeYellow, "3A"),

		// Text editor & search sidebar find match border, peek view match border, list filter match border,
		// terminal find match border,
		matchBorder: a(sem.success, "8A"),
		matchBorderA: a(sem.success, "8A"),
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
		// TODO: split these up, especially sidebar list selected element background
		primary: sem.accent,
		primaryHover: sem.accentHover,
		link: hue.vividPink,
		linkHover: hue.brightPink,

		// Button background, codeblock text, (??? x1)
		//
		// DEFAULT: status bar remote background
		secondary: sem.link,
		secondaryHover: "#0784C2",
	},

	diag: {
		// Ruler markers, minimap markers,
		selection: "#81577A", // +(list search match background, ??? x1)
		match: "#9CA320", // +(marker for currently selected @SYMBOL)
		bracket: "#5A63755A",

		// Error lens text, error lens gutter icons, peek view border, input validation text & border, testing
		// message line text (info+error), text editor underline squiggles, problems panel icons, ruler markers,
		// minimap markers, notification icons,
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar text & icons,
		hint: sem.hint,
		info: sem.info, // +(general peek view, status bar prominent if applicable)
		warning: sem.warning, // +(list warning text)
		error: sem.error, // +(general error text, bracket mismatch foreground, list error text, list invalid text, list no matches, confusing unicode highlighting border)

		// Error lens line background, peek view header background, input validation background, testing message
		// line background (info+error),
		hintBg: f(a(sem.hint, "20"), local.bg),
		hintBgA: a(sem.hint, "20"),
		infoBg: f(a(sem.info, "20"), local.bg), // +(general peek view)
		infoBgA: a(sem.info, "20"), // +(general peek view)
		warningBg: f(a(sem.warning, "20"), local.bg),
		warningBgA: a(sem.warning, "20"),
		errorBg: f(a(sem.error, "1A"), local.bg),
		errorBgA: a(sem.error, "1A"), // +(confusing unicode highlighting)

		// Testing status icons
		testPassed: sem.success,
		testQueued: sem.info,
		testFailed: sem.error,
		testUnset: sem.warning,
		testSkipped: local.gray,
	},

	git: {
		// Ruler markers, minimap markers, gutter markers, file names
		addedOrStaged: sem.added,
		modified: sem.modified,
		renamed: sem.renamed,
		untracked: sem.untracked,
		removedOrConflicting: sem.removed,
		ignoredOrSubmodule: local.gray,
		current: sem.success,
		incoming: sem.info,

		// Diff viewer line backgrounds, refactor preview text backgrounds
		insertedBgA: a(sem.added, "2A"), // Entire modified line #243a31 Specifically added #264b37
		removedBgA: a(sem.removed, "20"), // Entire modified line #3f2234 Specifically removed #58203c
		diffDiagonal: a(local.gray, "88"),

		// Conflict viewer line backgrounds
		currentBgA: a(sem.success, "2A"),
		currentHeaderBgA: a(sem.success, "6A"),
		incomingBgA: a(sem.info, "2A"),
		incomingHeaderBgA: a(sem.info, "6A"),

		// Merge editor backgrounds
		mergeWordChangeBgA: a(hue.limeYellow, "2A"),
		mergeLineChangeBgA: a(hue.limeYellow, "1A"),
		mergeUnhandledUnfocused: a(hue.limeYellow, "4A"),
		mergeUnhandledFocused: a(hue.limeYellow, "AA"), // +(ruler marker)
		mergeHandledUnfocused: a(hue.white, "3A"),
		mergeHandledFocused: a(hue.white, "8A"), // +(ruler marker)
	},

	debug: {
		// Debug toolbar icons
		start: sem.success,
		pause: sem.warning,
		step: sem.info,
		stop: sem.accent,

		// Gutter icons
		breakpoint: sem.accent,
		breakpointDisabled: local.gray,

		// Exception widget background
		exceptionBg: "#3D412F",

		// Debug console text
		info: hue.brightBlue,
		warning: sem.warning,
		error: hue.hotPink,
		source: hue.white,
		input: hue.purple,
	},

	terminal: {
		// Command decoration icons
		default: local.gray, // +(SetMark sequence)
		success: sem.success,
		error: sem.accent,

		ansi: {
			foreground: blackContrastSyntax.fg, // 0m (default foreground)
			background: local.bg, // terminal surface, separate from ANSI black
			normal: {
				// ANSI 30-37
				black: blackContrastSyntax.fadedGray, // "black" text should be gray to actually be readable
				red: blackContrastSyntax.red,
				green: blackContrastSyntax.green,
				yellow: blackContrastSyntax.yellow,
				blue: blackContrastSyntax.blue,
				magenta: hue.magenta,
				cyan: hue.teal,
				white: local.uiNormal,
			},
			bright: {
				// ANSI 90-97; VS Code also applies these to bold text
				black: blackContrastSyntax.gray,
				red: hue.pink,
				green: hue.brightGreen,
				yellow: hue.gold,
				blue: hue.brightBlue,
				magenta: "#C010EF",
				cyan: "#16DAD6",
				white: hue.white,
			},
		},
	},

	ui: {
		// Intellisense widget, command bar, text editor, text editor block cursor char, text editor gutter, text
		// editor minimap, breacrumbs, hover widget, peek view text editor, peek view text gutter, tab empty group,
		// tab drop-into promp, tab active background, tab hover background, tab zen mode sides, activity bar
		// background, welcome page background, panel background, notification background, command center
		// background, titlebar
		//
		// MINIMAL: Badge background,
		primaryBg: local.bg,

		// Widgets, hover widget status bar, peek view list, tab row background, tab row empty background, tab
		// inactive background, tab unfocused background, sidebar background, panel section header background,
		// debug toolbar background & border, notification centre header, block quote background,
		// code-block background, keybind table header backgrounds, keybind table even row background
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar background, status bar remote icon background,
		secondaryBg: local.bgAlt,

		// Sidebar section header background
		tertiaryBg: local.bg,

		// Breadcrumb, menu, any button which dropdowns
		dropdownBg: local.bg,

		// Checkbox, dropdown (+list), input field,
		inputBg: local.inputBg,

		// Tab group, sidebar pane, panel section, terminal, list
		primaryDropBg: a(hue.brightPink, "1A"),

		// All borders
		border: local.border,

		// Menu separator, command bar group separator, border between pinned and non-pinned tabs, (??? x1)
		separator: "#404043",

		// Input field foreground
		placeholderText: "#B1A3BE",

		// Menu disabled entry foreground
		disabledText: "#B499B9",

		// Little buttons, titlebar menu buttons, editor stick hover
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar hover/active button overlays
		hoverBgA: a(hue.hotPink, "A0"),
		activeBgA: a(hue.hotPink, "C0"),

		// Lists, command bar hover, notification hover
		//
		// MINIMAL: List unfocused selected overlay
		listHoverBgA: a(hue.hotPink, "60"),
		// DEFAULT: DISABLED_STATUS_BAR: List unfocused selected overlay
		listInactiveBgA: a(hue.brightPink, "1A"),

		// Keybind background
		selectedBgA: a(hue.white, "10"),

		// Dropdown selected, intellisense widget, peek view result, menu dropdown, command bar, command center
		// hover
		selectedBg: f(a(hue.white, "10"), local.bg), // FFFFFF10 on primaryBg
		// Welcome page tile on hover
		selectedSecondaryBg: f(a(hue.white, "10"), local.bgAlt), // FFFFFF10 on secondaryBg

		// Tree indent guide
		treeIndent: sem.accent,

		// Scrollbar/minimap handle overlays
		scrollBgA: a(hue.white, "40"),
		scrollHoverBgA: a(hue.white, "60"),
		scrollActiveBgA: a(sem.accent, "80"),

		// Shadow whenever some scrollable element is scrolled, shadows around open widgets
		shadow: a(local.bg, "5F"),

		// Status bar during debugging background
		statusDebugBg: sem.success,
		// Status bar when no folder is open background
		statusEmptyBg: "#151419",
		// DEFAULT: Status bar hover/active button overlays
		statusHoverBgA: a(hue.white, "2F"),
		statusActiveBgA: a(hue.white, "4F"),

		// Tab open but unfocused indicator
		unfocusedTab: a(hue.brightPink, "80"),

		// Activity bar inactive icon
		activityBarInactive: local.gray,
		activityBarTopInactive: "#778297",

		// Code actions icon
		lightBulb: hue.gold,

		// Extension badge icons
		star: hue.gold,
		remote: sem.link,
		verified: sem.success,
		prerelease: sem.warning,
		sponsor: sem.accent,

		// Chart colours
		chartLine: hue.lightGray,
		chartBlue: hue.brightBlue,
		chartGreen: hue.brightGreen,
		chartYellow: hue.yellow,
		chartOrange: hue.coral,
		chartRed: hue.hotPink,
		chartPurple: hue.purple,

		preformatText: sem.link,
	},

	// TODO: update with new colors
	brackets: brackets,

	gitGraph: gitGraph,

	todo: todo,
};
