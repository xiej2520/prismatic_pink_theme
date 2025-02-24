import { SyntaxColors, UiColors } from "./theme";

export const blackContrastSyntax: SyntaxColors = {
	// aim for >9.5 contrast https://webaim.org/resources/contrastchecker/
	fg: "#D3D7DE",
	gray: "#828DA0",
	fadedGray: "#7A7A8A",

	pink: "#F85EB4",
	strongPink: "#FF2884",

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
	lightBlue: "#97BCCD",
	lightPurple: "#D3C3EF",
	lightPink: "#EEBBFF",

	boldGreen: "#2BBF46",
	boldPink: "#F750AE",
	boldViolet: "#D88AFF",
	boldFg: "#C5CAD3",
};

export const blackContrastColors: UiColors = {
	// Note: All non-alpha backgrounds are based on `primaryBg`.

	text: {
		// Most ui text, text editor default text
		//normal: "#ABB2BF",
		normal: "#E8EBF2", // brighter, blue tinted

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
		inverse: "#FFFFFF",

		// Peek view selected text, peek view header text, peek view filename text,
		emphasised: "#FFFFFF",

		/// Text editor unnecessary text
		faded: "#000000C0",

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
			alt1InlayBgA: "#FFFFFF07",

			// ACCENT_INLAY: Inlay hint text
			alt2Inlay: "#7E3558", // FF4C986A on primaryBg

			// ACCENT_BCKG_INLAY: Inlay hint text
			alt3Inlay: "#8B385E", // FF4C987A on primaryBg
			// ACCENT_BCKG_INLAY: Inlay hint background
			alt3InlayBgA: "#FF4C9810",
		},

		// Text editor folded line, text editor hover over symbol background box
		//
		// NORMAL_LINE: Text editor current line background
		currentLineBgA: "#FFFFFF20",
		// ALT_LINE: Text editor current line border
		currentLineBorder: "#FFFFFF20",

		// Text editor selection background box, text editor matching text background box, text editor matching
		// symbol background box, text editor selection boxes, general selection, input field, terminal selection,
		selectionBg: "#FF288440", // FF4C981A on primaryBg
		selectionBgA: "#FF288440",
		// Text editor unfocused selection background box, text editor find current range background box, terminal
		// unfocused selection
		secondarySelectionBgA: "#FF288430",

		// Text editor tabstop background box
		tabstopBgA: "#FF4C981A",

		// Text editor & search sidebar find match background box, text editor match line background, peek view
		// match background box, list filter widget background, list filter match background, terminal find match
		// background box, (??? x1)
		matchBg: "#4E522B",
		matchBgA: "#CCD00C3A",

		// Text editor & search sidebar find match border, peek view match border, list filter match border,
		// terminal find match border,
		matchBorder: "#31A155",
		matchBorderA: "#31A1558A",
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
		primary: "#FF1277",

		primaryHover: "#DA005F",
		link: "#ff388d",
		linkHover: "#ff4c98",

		// Button background, codeblock text, (??? x1)
		//
		// DEFAULT: status bar remote background
		secondary: "#09A1ED",
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
		hint: "#31A155",
		info: "#018ACC", // +(general peek view, status bar prominent if applicable)
		warning: "#E17615", // +(list warning text)
		error: "#FF1277", // +(general error text, bracket mismatch foreground, list error text, list invalid text, list no matches, confusing unicode highlighting border)

		// Error lens line background, peek view header background, input validation background, testing message
		// line background (info+error),
		hintBg: "#293B38",
		hintBgA: "#31A15520",
		infoBg: "#233847", // +(general peek view)
		infoBgA: "#018ACC20", // +(general peek view)
		warningBg: "#403530",
		warningBgA: "#E1761520",
		errorBg: "#3E2A3B",
		errorBgA: "#FF12771A", // +(confusing unicode highlighting)

		// Testing status icons
		testPassed: "#31A155",
		testQueued: "#018ACC",
		testFailed: "#FF1277",
		testUnset: "#E17615",
		testSkipped: "#7A7A8A",
	},

	git: {
		// Ruler markers, minimap markers, gutter markers, file names
		addedOrStaged: "#31A155",
		modified: "#018ACC",
		renamed: "#13BBB7",
		untracked: "#C75AF3",
		removedOrConflicting: "#FF1277",
		ignoredOrSubmodule: "#7A7A8A",
		current: "#31A155",
		incoming: "#018ACC",

		// Diff viewer line backgrounds, refactor preview text backgrounds
		insertedBgA: "#31A1552A", // Entire modified line #243a31 Specifically added #264b37
		removedBgA: "#FF127720", // Entire modified line #3f2234 Specifically removed #58203c
		diffDiagonal: "#7A7A8A88",

		// Conflict viewer line backgrounds
		currentBgA: "#31A1552A",
		currentHeaderBgA: "#31A1556A",
		incomingBgA: "#018ACC2A",
		incomingHeaderBgA: "#018ACC6A",

		// Merge editor backgrounds
		mergeWordChangeBgA: "#CCD00C2A",
		mergeLineChangeBgA: "#CCD00C1A",
		mergeUnhandledUnfocused: "#CCD00C4A",
		mergeUnhandledFocused: "#CCD00CAA", // +(ruler marker)
		mergeHandledUnfocused: "#FFFFFF3A",
		mergeHandledFocused: "#FFFFFF8A", // +(ruler marker)
	},

	debug: {
		// Debug toolbar icons
		start: "#31A155",
		pause: "#E17615",
		step: "#018ACC",
		stop: "#FF1277",

		// Gutter icons
		breakpoint: "#FF1277",
		breakpointDisabled: "#7A7A8A",

		// Exception widget background
		exceptionBg: "#3D412F",

		// Debug console text
		info: "#10B1FE",
		warning: "#FF6B66",
		error: "#FF2884",
		source: "#FFFFFF",
		input: "#D177F5",
	},

	terminal: {
		// Command decoration icons
		default: "#7A7A8A", // +(SetMark sequence)
		success: "#31A155",
		error: "#FF1277",

		foreground: "#D3D7DE", // 0m (foreground)
		ansiForeground: "#1C1C1C", //37m (background)
		ansiContrastForeground: "#FFFFFF", // (technicall 37;1m but vscode also applies this to just bold 1m, hence it's white)
		ansiBackground: "#FFFFFF", // 30m
		ansiContrastBackground: "#666666", // 30;1m
		ansiBlue: "#09A1ED",
		ansiContrastBlue: "#41B9FF",
		ansiCyan: "#13BBB7",
		ansiContrastCyan: "#16DAD6",
		ansiGreen: "#2DAE58",
		ansiContrastGreen: "#25DA6A",
		ansiYellow: "#CF9C00",
		ansiContrastYellow: "#FFC104",
		ansiRed: "#FF0046",
		ansiContrastRed: "#FF2E87",
		ansiMagenta: "#C010EF",
		ansiContrastMagenta: "#C75AF3",
	},

	ui: {
		// Intellisense widget, command bar, text editor, text editor block cursor char, text editor gutter, text
		// editor minimap, breacrumbs, hover widget, peek view text editor, peek view text gutter, tab empty group,
		// tab drop-into promp, tab active background, tab hover background, tab zen mode sides, activity bar
		// background, welcome page background, panel background, notification background, command center
		// background, titlebar
		//
		// MINIMAL: Badge background,
		primaryBg: "#000000",
		//primaryBg: "#22222A",

		// Widgets, hover widget status bar, peek view list, tab row background, tab row empty background, tab
		// inactive background, tab unfocused background, sidebar background, panel section header background,
		// debug toolbar background & border, notification centre header, block quote background,
		// code-block background, keybind table header backgrounds, keybind table even row background
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar background, status bar remote icon background,
		secondaryBg: "#101010",

		// Sidebar section header background
		tertiaryBg: "#000000",

		// Breadcrumb, menu, any button which dropdowns
		dropdownBg: "#000000",

		// Checkbox, dropdown (+list), input field,
		inputBg: "#181818",

		// Tab group, sidebar pane, panel section, terminal, list
		primaryDropBg: "#FF4C981A",

		// All borders
		border: "#222228",

		// Menu separator, command bar group separator, border between pinned and non-pinned tabs, (??? x1)
		separator: "#404043",

		// Input field foreground
		placeholderText: "#B1A3BE",

		// Menu disabled entry foreground, (this is chosen to match `placeholderText` since the disabled text also
		// has a secondary fade layer)
		disabledText: "#D4C9D9",

		// Little buttons, titlebar menu buttons, editor stick hover
		//
		// DISABLED_STATUS_BAR: MINIMAL: Status bar hover/active button overlays
		hoverBgA: "#FF288460",
		activeBgA: "#FF288480",

		// Lists, command bar hover, notification hover
		//
		// MINIMAL: List unfocused selected overlay
		listHoverBgA: "#FF288440",
		// DEFAULT: DISABLED_STATUS_BAR: List unfocused selected overlay
		listInactiveBgA: "#FF4C981A",

		// Keybind background
		selectedBgA: "#FFFFFF10",

		// Dropdown selected, intellisense widget, peek view result, menu dropdown, command bar, command center
		// hover
		selectedBg: "#2F2F37", // FFFFFF10 on primaryBg
		// Welcome page tile on hover
		selectedSecondaryBg: "#35343A", // FFFFFF10 on secondaryBg

		// Tree indent guide
		treeIndent: "#FF1277",

		// Scrollbar/minimap handle overlays
		scrollBgA: "#FFFFFF20",
		scrollHoverBgA: "#FFFFFF40",
		scrollActiveBgA: "#FF127760",

		// Shadow whenever some scrollable element is scrolled, shadows around open widgets
		shadow: "#0000005F",

		// Status bar during debugging background
		statusDebugBg: "#31A155",
		// Status bar when no folder is open background
		statusEmptyBg: "#151419",
		// DEFAULT: Status bar hover/active button overlays
		statusHoverBgA: "#FFFFFF2F",
		statusActiveBgA: "#FFFFFF4F",

		// Tab open but unfocused indicator
		unfocusedTab: "#FF288080",

		// Activity bar inactive icon
		activityBarInactive: "#7A7A8A",
		activityBarTopInactive: "#778297",

		// Code actions icon
		lightBulb: "#FFC104",

		// Extension badge icons
		star: "#FFC104",
		remote: "#09A1ED",
		verified: "#31A155",
		prerelease: "#E17615",
		sponsor: "#FF1277",

		// Chart colours
		chartLine: "#B9BFCA",
		chartBlue: "#10B1FE",
		chartGreen: "#3FC56B",
		chartYellow: "#F9C859",
		chartOrange: "#FF6B66",
		chartRed: "#FF2884",
		chartPurple: "#D177F5",

		preformatText: "#09A1ED",
	},

	// TODO: update with new colors
	brackets: {
		one: "#3FC56B",
		two: "#10B1FE",
		three: "#F9C859",
		four: "#FF6B66",
		five: "#D177F5",
		six: "#B58E95",
	},

	gitGraph: [
		"#F85EB4",
		"#10B1FE",
		"#3FC56B",
		"#F9C859",
		"#FF6B66",
		"#D177F5",
		"#B58E95",
		"#97BCCD",
		"#15C9C5",
		"#9ACC12",
	],

	todo: {
		todo: "#B9BFCA",
		fixme: "#FF6B66",
		bug: "#FF2884",
		hack: "#F9C859",
		maybe: "#15C9C5",
		unchecked: "#B9BFCA",
		checked: "#3FC56B",
	},
};
