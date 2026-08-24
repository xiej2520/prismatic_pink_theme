import type { SyntaxColors, UiColors } from "./theme";
import { alpha as a, flatten as f } from "./color";
import { hue, sem, brackets, gitGraph, todo } from "./shared";

const local = {
	fg: "#C0C4D0",
	boldFg: "#B2B6C4",
	gray: "#636D83",
	border: "#3D434F",
	bg: "#1E1E22", // primary bg
	bg2: "#1C1C20", // secondary, darker
	bg3: "#121218", // tertiary, darkest
	uiNormal: "#CFD7E6", // brighter, blue tinted
};

export const darkSyntax: SyntaxColors = {
	// Pink Candy Dark remix with darker, more neutral background #1E1E22
	// try to keep contrast to 7.5-9, slightly more saturation
	fg: local.fg,
	gray: "#828DA0",
	fadedGray: local.gray,

	red: "#F24646",

	orange: "#FF8D5C",

	// go for warmer yellow
	yellow: "#E3C24A",

	lime: "#89E736",
	// operators are short, extremely high contrast but low saturation should be fine
	lightGreen: "#D6FFD6",
	green: hue.brightGreen,

	//deepBlue: "#5C79ED",
	cyan: hue.teal,
	lightBlue: hue.paleBlue,
	skyBlue: "#5CA2ED",
	blue: hue.brightBlue,
	cornflower: "#8AA5FF",

	purple: "#A177F5",
	violet: "#DD99FF",
	lightPurple: "#D5C0E9",

	pink: hue.softPink,
	lightPink: "#EEBBFF",
	strongPink: hue.hotPink,
	boldGreen: "#2ECC4B",
	boldPink: "#F750AE",
	boldViolet: "#D88AFF",
	boldFg: local.boldFg,
};

export const darkColors: UiColors = {
	// Note: All non-alpha backgrounds are based on `primaryBg`.

	text: {
		// Most ui text, text editor default text
		normal: local.uiNormal,

		// Setting header text
		bold: local.fg,

		// Text editor line number, text editor suggestion ghost text, list deemphasized text, tab unfocused title,
		// (??? x1)
		// TODO: separate line number color
		muted: "#8F9199",

		// Breadcrumb text, general description text, titlebar unfocused text
		light: "#7C869B",

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
		faded: "#000000C0",

		decoration: {
			// Text editor whitespace chars, text editor indentation guides, text editor rulers
			light: "#51576C",

			// Text editor matching bracket border, text editor corrent indentation guide
			//
			// MONO_GUIDES: Bracket match guides
			dark: "#F829A0",

			// Codelens
			//
			// DEFAULT_INLAY: Inlay hint text
			codelens: "#9C9C9C",

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
		currentLineBgA: a(hue.white, "10"),
		// ALT_LINE: Text editor current line border
		currentLineBorder: a(hue.white, "10"),

		// Text editor selection background box, text editor matching text background box, text editor matching
		// symbol background box, text editor selection boxes, general selection, input field, terminal selection,
		selectionBg: a(hue.hotPink, "40"),
		selectionBgA: a(hue.hotPink, "40"),
		// Text editor unfocused selection background box, text editor find current range background box, terminal
		// unfocused selection
		secondarySelectionBgA: a(hue.hotPink, "20"),

		// Text editor tabstop background box
		tabstopBgA: a(hue.brightPink, "1A"),

		// Text editor & search sidebar find match background box, text editor match line background, peek view
		// match background box, list filter widget background, list filter match background, terminal find match
		// background box, (??? x1)
		matchBg: a(hue.limeYellow, "3C"),
		matchBgA: a(hue.limeYellow, "3C"),

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
		hintBg: "#293B38",
		hintBgA: a(sem.hint, "20"),
		infoBg: "#233847", // +(general peek view)
		infoBgA: a(sem.info, "20"), // +(general peek view)
		warningBg: "#403530",
		warningBgA: a(sem.warning, "20"),
		errorBg: "#3E2A3B",
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
			foreground: local.boldFg, // 0m (default foreground)
			background: local.bg, // terminal surface, separate from ANSI black
			normal: {
				// ANSI 30-37
				black: darkSyntax.fadedGray, // "black" text should be gray to actually be readable
				red: darkSyntax.red,
				green: darkSyntax.green,
				yellow: darkSyntax.yellow,
				blue: darkSyntax.skyBlue,
				magenta: hue.purple,
				cyan: hue.darkTeal,
				white: local.uiNormal,
			},
			bright: {
				// ANSI 90-97; VS Code also applies these to bold text
				black: darkSyntax.gray,
				red: hue.pink,
				green: hue.brightGreen,
				yellow: hue.gold,
				blue: hue.brightBlue,
				magenta: hue.magenta,
				cyan: hue.teal,
				white: local.fg,
			},
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
		// pure gray feels warmer, add slight blue tint
		//primaryBg: "#22222A",
		primaryBg: local.bg,

		// Widgets, hover widget status bar, peek view list, tab row background, tab row empty background, tab
		// inactive background, tab unfocused background, sidebar background, panel section header background,
		// debug toolbar background & border, notification centre header, titlebar, block quote background,
		// code-block background, keybind table header backgrounds, keybind table even row background
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar background, status bar remote icon background,
		secondaryBg: local.bg2,

		// Sidebar section header background
		tertiaryBg: local.bg3,

		// Breadcrumb, menu, any button which dropdowns
		dropdownBg: local.bg,

		// Checkbox, dropdown (+list), input field,
		inputBg: local.bg,

		// Tab group, sidebar pane, panel section, terminal, list
		primaryDropBg: a(hue.brightPink, "1A"),

		// All borders
		border: local.border,

		// Menu separator, command bar group separator, border between pinned and non-pinned tabs, (??? x1)
		separator: local.border,

		// Input field foreground
		// make faded text readable
		placeholderText: "#B1A3BE",

		// Menu disabled entry foreground
		disabledText: "#B499B9",

		// Little buttons, titlebar menu buttons, editor stick hover
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar hover/active button overlays
		hoverBgA: a(hue.white, "1A"),
		activeBgA: a(hue.white, "2A"),

		// Lists, command bar hover, notification hover
		//
		// MINIMAL: List unfocused selected overlay
		listHoverBgA: a(hue.white, "10"),
		// DEFAULT: DISABLED_STATUS_BAR: List unfocused selected overlay
		listInactiveBgA: a(hue.brightPink, "1A"),

		// Keybind background
		selectedBgA: a(hue.white, "10"),

		// Dropdown selected, intellisense widget, peek view result, menu dropdown, command bar, command center
		// hover
		selectedBg: f(a(hue.white, "10"), local.bg),
		// Welcome page tile on hover
		selectedSecondaryBg: f(a(hue.white, "10"), local.bg2),

		// Tree indent guide
		treeIndent: sem.accent,

		// Scrollbar/minimap handle overlays
		scrollBgA: a(hue.white, "20"),
		scrollHoverBgA: a(hue.white, "40"),
		scrollActiveBgA: a(sem.accent, "60"),

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

	// TODO: Update with new colors
	brackets: brackets,

	gitGraph: gitGraph,

	todo: todo,
};
