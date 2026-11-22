import type { Config } from "../config";
import type { SyntaxColors, UiColors } from ".";
import { alpha as a, flatten as f } from "../color";

export function generateEditorTheme(
	color: UiColors,
	syntax: SyntaxColors,
	type: "light" | "dark",
	config: Config,
) {
	// Current line style.
	let currentLine;
	if (config.altCurrentLine) {
		currentLine = {
			"editor.lineHighlightBackground": "#00000000", // Current line background colour.
			"editor.lineHighlightBorder": color.text.currentLineBorder, // Remove current line border.
		};
	} else {
		currentLine = {
			"editor.lineHighlightBackground": color.text.currentLineBgA, // Current line background colour.
			"editor.lineHighlightBorder": "#00000000", // Remove current line border.
		};
	}

	// Inlay hint style.
	let inlay;
	switch (config.inlayStyle) {
		case "noBackground": {
			inlay = {
				"editorInlayHint.foreground": color.text.decoration.codelens,
				"editorInlayHint.background": "#00000000",
				"editorInlayHint.typeForeground": color.text.decoration.codelens,
				"editorInlayHint.typeBackground": "#00000000",
				"editorInlayHint.parameterForeground": color.text.decoration.codelens,
				"editorInlayHint.parameterBackground": "#00000000",
			};
			break;
		}
		case "faintBackground": {
			inlay = {
				"editorInlayHint.foreground": color.text.decoration.alt1Inlay,
				"editorInlayHint.background": color.text.decoration.alt1InlayBgA,
				"editorInlayHint.typeForeground": color.text.decoration.alt1Inlay,
				"editorInlayHint.typeBackground": color.text.decoration.alt1InlayBgA,
				"editorInlayHint.parameterForeground": color.text.decoration.alt1Inlay,
				"editorInlayHint.parameterBackground": color.text.decoration.alt1InlayBgA,
			};
			break;
		}
		case "accent": {
			inlay = {
				"editorInlayHint.foreground": color.text.decoration.alt2Inlay,
				"editorInlayHint.background": "#00000000",
				"editorInlayHint.typeForeground": color.text.decoration.alt2Inlay,
				"editorInlayHint.typeBackground": "#00000000",
				"editorInlayHint.parameterForeground": color.text.decoration.alt2Inlay,
				"editorInlayHint.parameterBackground": "#00000000",
			};
			break;
		}
		case "accentBackground": {
			inlay = {
				"editorInlayHint.foreground": color.text.decoration.alt3Inlay,
				"editorInlayHint.background": color.text.decoration.alt3InlayBgA,
				"editorInlayHint.typeForeground": color.text.decoration.alt3Inlay,
				"editorInlayHint.typeBackground": color.text.decoration.alt3InlayBgA,
				"editorInlayHint.parameterForeground": color.text.decoration.alt3Inlay,
				"editorInlayHint.parameterBackground": color.text.decoration.alt3InlayBgA,
			};
			break;
		}
	}

	// Bracket guides styles.
	let brackets;
	if (config.monochromeBracketGuides) {
		brackets = {
			"editorBracketHighlight.foreground1": color.text.decoration.dark,
			"editorBracketHighlight.foreground2": color.text.decoration.dark,
			"editorBracketHighlight.foreground3": color.text.decoration.dark,
			"editorBracketHighlight.foreground4": color.text.decoration.dark,
			"editorBracketHighlight.foreground5": color.text.decoration.dark,
			"editorBracketHighlight.foreground6": color.text.decoration.dark,
			"editorBracketPairGuide.background1": color.text.decoration.light,
			"editorBracketPairGuide.background2": color.text.decoration.light,
			"editorBracketPairGuide.background3": color.text.decoration.light,
			"editorBracketPairGuide.background4": color.text.decoration.light,
			"editorBracketPairGuide.background5": color.text.decoration.light,
			"editorBracketPairGuide.background6": color.text.decoration.light,
			"editorBracketPairGuide.activeBackground1": color.text.decoration.dark,
			"editorBracketPairGuide.activeBackground2": color.text.decoration.dark,
			"editorBracketPairGuide.activeBackground3": color.text.decoration.dark,
			"editorBracketPairGuide.activeBackground4": color.text.decoration.dark,
			"editorBracketPairGuide.activeBackground5": color.text.decoration.dark,
			"editorBracketPairGuide.activeBackground6": color.text.decoration.dark,
		};
	} else {
		brackets = {
			"editorBracketHighlight.foreground1": color.brackets.one,
			"editorBracketHighlight.foreground2": color.brackets.two,
			"editorBracketHighlight.foreground3": color.brackets.three,
			"editorBracketHighlight.foreground4": color.brackets.four,
			"editorBracketHighlight.foreground5": color.brackets.five,
			"editorBracketHighlight.foreground6": color.brackets.six,
			"editorBracketPairGuide.background1": a(color.brackets.one, "50"),
			"editorBracketPairGuide.background2": a(color.brackets.two, "50"),
			"editorBracketPairGuide.background3": a(color.brackets.three, "50"),
			"editorBracketPairGuide.background4": a(color.brackets.four, "50"),
			"editorBracketPairGuide.background5": a(color.brackets.five, "50"),
			"editorBracketPairGuide.background6": a(color.brackets.six, "50"),
			"editorBracketPairGuide.activeBackground1": color.brackets.one,
			"editorBracketPairGuide.activeBackground2": color.brackets.two,
			"editorBracketPairGuide.activeBackground3": color.brackets.three,
			"editorBracketPairGuide.activeBackground4": color.brackets.four,
			"editorBracketPairGuide.activeBackground5": color.brackets.five,
			"editorBracketPairGuide.activeBackground6": color.brackets.six,
		};
	}

	// Output the appropriate error lens keys.
	let errorLens;
	let errorLensStatusBar;
	if (type == "light") {
		errorLens = {
			"errorLens.infoForegroundLight": color.diag.info,
			"errorLens.infoBackgroundLight": color.diag.infoBgA,
			"errorLens.hintForegroundLight": color.diag.hint,
			"errorLens.hintBackgroundLight": color.diag.hintBgA,
			"errorLens.warningForegroundLight": color.diag.warning,
			"errorLens.warningBackgroundLight": color.diag.warningBgA,
			"errorLens.errorForegroundLight": color.diag.error,
			"errorLens.errorBackgroundLight": color.diag.errorBgA,
			// Gutter icons.
			"errorLens.infoGutterIconColor": color.diag.info,
			"errorLens.warningGutterIconColor": color.diag.warning,
			"errorLens.errorGutterIconColor": color.diag.error,
		};
	} else {
		errorLens = {
			"errorLens.infoForeground": color.diag.info,
			"errorLens.infoBackground": color.diag.infoBgA,
			"errorLens.hintForeground": color.diag.hint,
			"errorLens.hintBackground": color.diag.hintBgA,
			"errorLens.warningForeground": color.diag.warning,
			"errorLens.warningBackground": color.diag.warningBgA,
			"errorLens.errorForeground": color.diag.error,
			"errorLens.errorBackground": color.diag.errorBgA,
			// Gutter icons.
			"errorLens.infoGutterIconColor": color.diag.info,
			"errorLens.warningGutterIconColor": color.diag.warning,
			"errorLens.errorGutterIconColor": color.diag.error,
		};
	}
	if (config.globalAccent == "everywhere") {
		errorLensStatusBar = {
			"errorLens.statusBarHintForeground": color.text.inverse,
			"errorLens.statusBarInfoForeground": color.text.inverse,
			"errorLens.statusBarWarningForeground": color.text.inverse,
			"errorLens.statusBarIconWarningForeground": color.text.inverse,
			"errorLens.statusBarErrorForeground": color.text.inverse,
			"errorLens.statusBarIconErrorForeground": color.text.inverse,
		};
	} else {
		errorLensStatusBar = {
			"errorLens.statusBarHintForeground": color.diag.hint,
			"errorLens.statusBarInfoForeground": color.diag.info,
			"errorLens.statusBarWarningForeground": color.diag.warning,
			"errorLens.statusBarIconWarningForeground": color.diag.warning,
			"errorLens.statusBarErrorForeground": color.diag.error,
			"errorLens.statusBarIconErrorForeground": color.diag.error,
		};
	}

	// Global accent options.
	let list;
	let widgets;
	let badges;
	let menu;
	let banner;
	let statusBar;
	let commandBar;

	const mutedStatusBar = {
		"statusBar.foreground": color.text.normal,
		"statusBar.background": color.ui.secondaryBg,
		"statusBarItem.hoverBackground": color.ui.hoverBgA,
		"statusBarItem.activeBackground": color.ui.activeBgA,
		"statusBarItem.compactHoverBackground": color.ui.hoverBgA,
		"statusBarItem.errorForeground": color.diag.error,
		"statusBarItem.errorBackground": color.ui.secondaryBg,
		"statusBarItem.warningForeground": color.diag.warning,
		"statusBarItem.warningBackground": color.ui.secondaryBg,
		"statusBarItem.prominentForeground": color.diag.info,
		"statusBarItem.prominentBackground": color.ui.secondaryBg,
		"statusBarItem.prominentHoverBackground": color.ui.hoverBgA,
		// Remote icon.
		"statusBarItem.remoteForeground": color.accent.primary,
		"statusBarItem.remoteBackground": color.ui.secondaryBg,
	};
	if (config.globalAccent == "minimal") {
		// MINIMAL
		statusBar = mutedStatusBar;
		list = {
			"list.hoverBackground": color.ui.listHoverBgA, // Background on individual entry on hover.
			"list.activeSelectionBackground": color.ui.selectedBg,
			"list.activeSelectionForeground": color.text.normal,
			"list.activeSelectionIconForeground": color.text.normal, // Doesn't work?
			"list.inactiveSelectionBackground": color.ui.listHoverBgA, // Colour of a selected item when the list is not actively selected.
			"list.highlightForeground": color.accent.primary, // E.g. matching text in the command palette.
			"list.focusHighlightForeground": color.text.normal, // E.g. matching text in the currently selected entry in the command palette.
		};
		widgets = {
			"editorSuggestWidget.foreground": color.text.normal, // All text.
			"editorSuggestWidget.background": color.ui.primaryBg,
			"editorSuggestWidget.border": color.ui.border,
			"editorSuggestWidget.highlightForeground": color.accent.primary, // Matching letters in other entries.
			"editorSuggestWidget.focusHighlightForeground": color.text.normal, // Matching letters in currently selected entry.
			"editorSuggestWidget.selectedBackground": color.ui.selectedBg, // Background of selected entry.
			"editorSuggestWidget.selectedForeground": color.text.normal, // Text in selected entry.
			"editorSuggestWidget.selectedIconForeground": color.text.normal, // Icon in selected entry.
			// This is the light bulb popup.
			"editorActionList.foreground": color.text.normal,
			"editorActionList.background": color.ui.primaryBg,
			"editorActionList.focusForeground": color.text.normal,
			"editorActionList.focusBackground": color.ui.selectedBg,
			//
			"peekViewResult.selectionForeground": color.text.normal, // Clicked entry.
			"peekViewResult.selectionBackground": color.ui.selectedBg, // Clicked entry.
		};
		badges = {
			"badge.foreground": color.accent.primary,
			"badge.background": color.ui.primaryBg,
			"activityBarBadge.foreground": color.accent.primary,
			"activityBarBadge.background": color.ui.primaryBg,
			"activityWarningBadge.foreground": color.diag.warning, // ???
			"activityWarningBadge.background": color.ui.primaryBg, // ???
			"activityErrorBadge.foreground": color.diag.error, // ???
			"activityErrorBadge.background": color.ui.primaryBg, // ???
		};
		banner = {
			"banner.foreground": color.text.normal,
			"banner.background": color.ui.secondaryBg,
			"banner.iconForeground": color.text.normal,
		};
		menu = {
			"menu.foreground": color.text.normal,
			"menu.background": color.ui.dropdownBg, // Background of a fly-out.
			"menu.selectionForeground": color.text.normal,
			"menu.selectionBackground": color.ui.selectedBg,
			//"menu.selectionBorder": "",
			"menu.separatorBackground": color.ui.separator,
			"menubar.selectionForeground": color.text.normal,
			"menubar.selectionBackground": color.ui.hoverBgA, // Background of hover/active menu bar item.
			//"menubar.selectionBorder": "",
		};
		commandBar = {
			"quickInput.foreground": color.text.normal, // All text.
			"quickInput.background": color.ui.primaryBg,
			"quickInputTitle.background": color.ui.primaryBg,
			"quickInputList.focusBackground": color.ui.selectedBg,
			"quickInputList.focusForeground": color.text.normal,
			"quickInputList.focusIconForeground": color.text.normal,
			"pickerGroup.border": color.ui.separator, // Border between groups within the drop down.
			"pickerGroup.foreground": color.accent.primary, // The little text seen sometimes, e.g. `other commands`.
		};
	} else {
		// DEFAULT + DISABLED_STATUS_BAR
		list = {
			"list.hoverBackground": color.ui.listHoverBgA, // Background on individual entry on hover.
			"list.activeSelectionBackground": color.accent.fill,
			"list.activeSelectionForeground": color.text.inverse,
			"list.activeSelectionIconForeground": color.text.inverse, // Doesn't work?
			"list.inactiveSelectionBackground": color.ui.listInactiveBgA, // Colour of a selected item when the list is not actively selected.
			"list.highlightForeground": color.accent.primary, // E.g. matching text in the command palette.
			"list.focusHighlightForeground": color.text.inverse, // E.g. matching text in the currently selected entry in the command palette.
		};
		widgets = {
			"editorSuggestWidget.foreground": color.text.normal, // All text.
			"editorSuggestWidget.background": color.ui.primaryBg,
			"editorSuggestWidget.border": color.ui.border,
			"editorSuggestWidget.highlightForeground": color.accent.primary, // Matching letters in other entries.
			"editorSuggestWidget.focusHighlightForeground": color.text.inverse, // Matching letters in currently selected entry.
			"editorSuggestWidget.selectedBackground": color.accent.fill, // Background of selected entry.
			"editorSuggestWidget.selectedForeground": color.text.inverse, // Text in selected entry.
			"editorSuggestWidget.selectedIconForeground": color.text.inverse, // Icon in selected entry.
			// This is the light bulb popup.
			"editorActionList.foreground": color.text.normal,
			"editorActionList.background": color.ui.primaryBg,
			"editorActionList.focusForeground": color.text.inverse,
			"editorActionList.focusBackground": color.accent.fill,
			//
			"peekViewResult.selectionForeground": color.text.emphasised, // Clicked entry.
			"peekViewResult.selectionBackground": color.accent.fill, // Clicked entry.
		};
		badges = {
			"badge.foreground": color.text.inverse,
			"badge.background": color.accent.fill,
			"activityBarBadge.foreground": color.text.inverse,
			"activityBarBadge.background": color.accent.fill,
			"activityWarningBadge.foreground": color.text.inverse, // ???
			"activityWarningBadge.background": color.diag.warning, // ???
			"activityErrorBadge.foreground": color.text.inverse, // ???
			"activityErrorBadge.background": color.diag.error, // ???
		};
		banner = {
			"banner.foreground": color.text.inverse,
			"banner.background": color.accent.fill,
			"banner.iconForeground": color.text.inverse,
		};
		menu = {
			"menu.foreground": color.text.normal,
			"menu.background": color.ui.dropdownBg, // Background of a fly-out.
			"menu.selectionForeground": color.text.inverse,
			"menu.selectionBackground": color.accent.fill,
			//"menu.selectionBorder": "",
			"menu.separatorBackground": color.ui.separator,
			"menubar.selectionForeground": color.text.normal,
			"menubar.selectionBackground": color.ui.hoverBgA, // Background of hover/active menu bar item.
			//"menubar.selectionBorder": "",
		};
		commandBar = {
			"quickInput.foreground": color.text.normal, // All text.
			"quickInput.background": color.ui.primaryBg,
			"quickInputTitle.background": color.ui.primaryBg,
			"quickInputList.focusBackground": color.accent.fill,
			"quickInputList.focusForeground": color.text.inverse,
			"quickInputList.focusIconForeground": color.text.inverse,
			"pickerGroup.border": color.ui.separator, // Border between groups within the drop down.
			"pickerGroup.foreground": color.accent.primary, // The little text seen sometimes, e.g. `other commands`.
		};

		if (config.globalAccent == "disabledStatusBar") {
			// DISABLED_STATUS_BAR
			statusBar = mutedStatusBar;
		} else {
			// DEFAULT
			statusBar = {
				"statusBar.foreground": color.text.inverse,
				"statusBar.background": color.accent.fill,
				"statusBarItem.hoverBackground": color.ui.statusHoverBgA,
				"statusBarItem.activeBackground": color.ui.statusActiveBgA,
				"statusBarItem.compactHoverBackground": color.ui.statusHoverBgA,
				"statusBarItem.errorForeground": color.text.inverse,
				"statusBarItem.errorBackground": color.accent.fill,
				"statusBarItem.warningForeground": color.text.inverse,
				"statusBarItem.warningBackground": color.accent.fill,
				"statusBarItem.prominentForeground": color.text.inverse,
				"statusBarItem.prominentBackground": color.accent.fill,
				"statusBarItem.prominentHoverBackground": color.ui.statusHoverBgA,
				// Remote icon.
				"statusBarItem.remoteForeground": color.text.inverse,
				"statusBarItem.remoteBackground": color.accent.secondary,
			};
		}
	}

	let editor_colors = {
		// EDITOR
		// Basics
		foreground: color.text.normal,
		disabledForeground: color.ui.disabledText, // Disabled text, e.g. disable menu dropdown entries.
		"editor.foreground": color.text.normal,
		"editor.background": color.ui.primaryBg,
		errorForeground: color.diag.error,
		"editorUnicodeHighlight.border": color.diag.error, // Highlight potentially confusing unicode characters.
		"editorUnicodeHighlight.background": color.diag.errorBgA,
		"widget.shadow": color.ui.shadow,
		//
		// Cursor/line
		"editorCursor.foreground": color.accent.primary,
		"editorCursor.background": color.ui.primaryBg, // Colour of a character when using block cursor.
		// "editorMultiCursor"
		...currentLine,
		"editorLineNumber.foreground": color.text.muted, // Line number colour in the gutter.
		"editorLineNumber.activeForeground": color.accent.primary, // Current line number colour in the gutter.
		"editor.foldBackground": color.text.currentLineBgA, // Colour of a line containing a folded range.
		"editor.foldPlaceholderForeground": color.text.normal, // Colour of the ... text when collapsed range.
		"editor.hoverHighlightBackground": color.text.currentLineBgA, // Background when hovering over a symbol.
		//
		// Text selection boxes/ranges
		"editor.selectionBackground": color.text.selectionBgA, // Background of selected text.
		//"editor.selectionForeground": "",
		"editor.inactiveSelectionBackground": color.text.secondarySelectionBgA, // Background of selection when editor not focused.
		"editor.selectionHighlightBackground": color.text.selectionBgA, // Background of matching text.
		//"editor.selectionHighlightBorder": "",
		//
		// Symbol selection boxes/ranges
		"editor.wordHighlightBackground": color.text.selectionBgA, // Background for selected symbol.
		//"editor.wordHighlightBorder": "",
		"editor.wordHighlightStrongBackground": color.text.selectionBgA, // Background of matching symbol.
		//"editor.wordHighlightStrongBorder": "",
		//
		// Search highlight boxes
		"editor.findMatchBackground": "#00000000", // Currently selected found match. Set to 0 so that it doesn't multiply with findMatchHighlightBackground.
		"editor.findMatchBorder": color.text.matchBorderA,
		"editor.findMatchHighlightBackground": color.text.matchBgA, // Found match(es)
		//"editor.findMatchHighlightBorder": "",
		"editor.findRangeHighlightBackground": color.text.secondarySelectionBgA, // Colour of the range of the current search.
		//"editor.findRangeHighlightBorder": "",
		//
		// Within the "search editor"
		"searchEditor.findMatchBackground": color.text.matchBgA,
		"searchEditor.findMatchBorder": color.text.matchBorderA,
		//"searchEditor.textInputBorder": "",
		//
		// Highlight colour of line containing found matching text.
		"editor.rangeHighlightBackground": color.text.matchBgA,
		//"editor.rangeHighlightBorder": "",
		"editor.symbolHighlightBackground": color.text.matchBgA, // ???
		//"editor.symbolHighlightBorder": "",
		//
		// Matching brackets
		"editorBracketMatch.border": color.text.decoration.dark, // Border around matching brackets.
		"editorBracketMatch.background": "#00000000", // Remove match background.
		//
		// Bracket pair colors
		...brackets,
		"editorBracketHighlight.unexpectedBracket.foreground": color.diag.error,
		//
		// Inlay hints
		...inlay,
		"editorCodeLens.foreground": color.text.decoration.codelens,
		// Debug inlay hints
		//"editor.inlineValuesForeground": "",
		//"editor.inlineValuesBackground": "#00000000",
		//
		// Whitespace and indentation
		"editorWhitespace.foreground": color.text.decoration.light,
		"editorIndentGuide.background": color.text.decoration.light,
		"editorIndentGuide.activeBackground": color.text.decoration.dark,
		"editorRuler.foreground": color.text.decoration.light,
		//
		// Ghost text
		"editorGhostText.foreground": color.text.muted, // Inline completion text.
		//"editorGhostText.border": "",
		//
		// Other
		"editorLink.activeForeground": color.accent.primary, // When ctrl+hovering over a symbol.
		"editorLightBulb.foreground": color.ui.lightBulb, // Colour of the light-bulb.
		"editorLightBulbAutoFix.foreground": color.ui.lightBulb, // ???
		//
		//
		//
		// SNIPPETS [x]
		"editor.snippetTabstopHighlightBackground": color.text.tabstopBgA,
		//"editor.snippetTabstopHighlightBorder": "",
		"editor.snippetFinalTabstopHighlightBackground": color.text.tabstopBgA,
		//"editor.snippetFinalTabstopHighlightBorder": "",
		//
		// ERRORS/WARNINGS/INFO [x]
		"editorHint.foreground": color.diag.hint, // Hint squiggle
		//"editorHint.border": "",
		"editorInfo.foreground": color.diag.info, // Info squiggle
		//"editorInfo.border": "",
		//"editorInfo.background": "",
		"editorWarning.foreground": color.diag.warning, // Warning squiggle
		//"editorWarning.border": "",
		//"editorWarning.background": "",
		"editorError.foreground": color.diag.error, // Error squiggle
		//"editorError.border": "",
		//"editorError.background": "",
		"editorUnnecessaryCode.opacity": color.text.faded, // Unused symbols/text - 75% opacity.
		//"editorUnnecessaryCode.border": "",
		"problemsInfoIcon.foreground": color.diag.info, // Icons, e.g. symbols in problem panel
		"problemsWarningIcon.foreground": color.diag.warning,
		"problemsErrorIcon.foreground": color.diag.error,
		//
		// ERROR LENS [x]
		...errorLens,
		...errorLensStatusBar,
		//
		// RULER [x]
		//"editorOverviewRuler.background": "",
		"editorOverviewRuler.border": color.ui.border, // Border between scroll-bar and editor.
		"editorOverviewRuler.findMatchForeground": color.diag.match, // Matching text through find/replace.
		"editorOverviewRuler.rangeHighlightForeground": color.diag.match, // Range of selected symbol, e.g. picking symbol with @NAME
		"editorOverviewRuler.selectionHighlightForeground": color.diag.selection, // Symbol at current cursor position..
		"editorOverviewRuler.wordHighlightForeground": color.diag.selection, // Matching symbol at position.
		"editorOverviewRuler.wordHighlightStrongForeground": color.diag.selection, // ???
		"editorOverviewRuler.bracketMatchForeground": color.diag.bracket,
		"editorOverviewRuler.addedForeground": color.git.addedOrStaged,
		"editorOverviewRuler.modifiedForeground": color.git.modified,
		"editorOverviewRuler.deletedForeground": color.git.removedOrConflicting,
		"editorOverviewRuler.infoForeground": color.diag.info,
		"editorOverviewRuler.warningForeground": color.diag.warning,
		"editorOverviewRuler.errorForeground": color.diag.error,
		//
		// GUTTER [x]
		"editorGutter.background": color.ui.primaryBg,
		"editorGutter.addedBackground": color.git.addedOrStaged, // Added strip.
		"editorGutter.modifiedBackground": color.git.modified, // Modified strip.
		"editorGutter.deletedBackground": color.git.removedOrConflicting, // Removed mark.
		"editorGutter.commentRangeForeground": color.text.muted, // ???
		// Buttons in gutter, e.g. in the diff view
		"editorGutter.itemBackground": color.ui.tertiaryBg,
		"editorGutter.itemGlyphForeground": color.text.normal,
		//"editorGutter.foldingControlForeground": "", // Arrow for folding code ranges.
		//
		// MINIMAP [x]
		"minimap.background": color.ui.primaryBg,
		//"minimap.foregroundOpacity": "", // ???
		"minimap.selectionHighlight": color.diag.selection, // Selection & current line
		"minimap.findMatchHighlight": color.diag.match, // Matching lines from find/replace.
		"minimap.errorHighlight": color.diag.error,
		"minimap.warningHighlight": color.diag.warning,
		//"minimap.selectionOccurrenceHighlight": "", // ???
		"minimapSlider.background": color.ui.scrollBgA, // Slider
		"minimapSlider.hoverBackground": color.ui.scrollHoverBgA, // Slider hover
		"minimapSlider.activeBackground": color.ui.scrollActiveBgA, // Slider held-down
		"minimapGutter.addedBackground": color.git.addedOrStaged,
		"minimapGutter.modifiedBackground": color.git.modified,
		"minimapGutter.deletedBackground": color.git.removedOrConflicting,
		//
		// BREADCRUMBS [x]
		"breadcrumb.foreground": color.text.light,
		"breadcrumb.background": color.ui.primaryBg,
		"breadcrumb.focusForeground": color.accent.primary,
		"breadcrumb.activeSelectionForeground": color.accent.primary,
		"breadcrumbPicker.background": color.ui.dropdownBg,
		//
		// STICKY [x]
		"editorStickyScroll.background": color.ui.primaryBg,
		"editorStickyScrollHover.background": color.ui.listHoverBgA,
		// WIDGETS [x],
		// Pop-up widgets, e.g. find & replace dialogue.
		"editorWidget.foreground": color.text.normal, // All text.
		"editorWidget.background": color.ui.secondaryBg,
		"editorWidget.border": color.ui.border, // Horizontal line on the left of the widget.
		"editorWidget.resizeBorder": color.ui.border,
		// Intellisense widget
		...widgets,
		// Hover/documentation widget
		"editorHoverWidget.foreground": color.text.normal,
		"editorHoverWidget.background": color.ui.primaryBg,
		"editorHoverWidget.border": color.ui.border,
		"editorHoverWidget.highlightForeground": color.accent.secondary, // ???
		"editorHoverWidget.statusBarBackground": color.ui.secondaryBg, // The bottom bar, e.g. `View problem, no fixes available`
		// Debug Exception widget
		"debugExceptionWidget.background": color.debug.exceptionBg,
		"debugExceptionWidget.border": color.ui.border,
		// Peek view errors/warnings
		"editorMarkerNavigation.background": color.ui.primaryBg,
		"editorMarkerNavigationInfo.background": color.diag.info,
		"editorMarkerNavigationInfo.headerBackground": color.diag.infoBg,
		"editorMarkerNavigationWarning.background": color.diag.warning,
		"editorMarkerNavigationWarning.headerBackground": color.diag.warningBg,
		"editorMarkerNavigationError.background": color.diag.error,
		"editorMarkerNavigationError.headerBackground": color.diag.errorBg,
		// Peek view normal
		"peekViewEditor.background": color.ui.primaryBg,
		"peekViewEditor.matchHighlightBackground": color.text.matchBg, // Matching text in symbol.
		"peekViewEditor.matchHighlightBorder": color.text.matchBorderA, // Matching text border.
		"peekViewEditorGutter.background": color.ui.primaryBg,
		"peekViewResult.background": color.ui.secondaryBg,
		"peekViewResult.fileForeground": color.text.emphasised, // File header text.
		"peekViewResult.lineForeground": color.text.normal, // Symbol text.
		"peekViewResult.matchHighlightBackground": color.text.matchBg, // Matching text in symbol.
		"peekView.border": color.diag.info,
		"peekViewTitle.background": color.diag.infoBg,
		"peekViewTitleLabel.foreground": color.text.emphasised,
		"peekViewTitleDescription.foreground": color.text.normal,
		//
		// DIFF VIEWER [x]
		"diffEditor.insertedTextBackground": color.git.insertedBgA,
		//"diffEditor.insertedTextBorder": "",
		"diffEditor.removedTextBackground": color.git.removedBgA,
		//"diffEditor.removedTextBorder": "",
		"diffEditor.border": color.ui.border, // Border between the two diff viewers.
		"diffEditor.diagonalFill": color.git.diffDiagonal, // Diagonal hatchings for differences.
		"multiDiffEditor.border": color.ui.border,
		"multiDiffEditor.background": color.ui.primaryBg,
		//
		// MERGE CONFLICT VIEWER [x]
		"merge.currentHeaderBackground": color.git.currentHeaderBgA,
		"merge.currentContentBackground": color.git.currentBgA,
		"merge.incomingHeaderBackground": color.git.incomingHeaderBgA,
		"merge.incomingContentBackground": color.git.incomingBgA,
		"merge.border": color.ui.border,
		//"merge.commonContentBackground": "",
		//"merge.commonHeaderBackground": "",
		"editorOverviewRuler.currentContentForeground": color.git.current,
		"editorOverviewRuler.incomingContentForeground": color.git.incoming,
		//"editorOverviewRuler.commonContentForeground": "",
		//
		// MERGE EDITOR [x]
		"mergeEditor.change.background": color.git.mergeLineChangeBgA,
		"mergeEditor.change.word.background": color.git.mergeWordChangeBgA,
		"mergeEditor.conflict.unhandledUnfocused.border": color.git.mergeUnhandledUnfocused,
		"mergeEditor.conflict.unhandledFocused.border": color.git.mergeUnhandledFocused,
		"mergeEditor.conflict.handledUnfocused.border": color.git.mergeHandledUnfocused,
		"mergeEditor.conflict.handledFocused.border": color.git.mergeHandledFocused,
		"mergeEditor.conflict.unhandled.minimapOverViewRuler": color.git.mergeUnhandledFocused,
		"mergeEditor.conflict.handled.minimapOverViewRuler": color.git.mergeHandledFocused,
		//
		//
		//
		// GENERAL TEXT
		"textLink.foreground": color.accent.link, // Link colour.
		"textLink.activeForeground": color.accent.linkHover, // Link hover/active colour.
		descriptionForeground: color.text.light,
		"textPreformat.foreground": color.ui.preformatText, // Inline code block text.
		"textPreformat.background": color.ui.secondaryBg,
		"textCodeBlock.background": color.ui.secondaryBg, // Code block background.
		"textBlockQuote.background": color.ui.secondaryBg, // Block quote background.
		"textBlockQuote.border": color.accent.primary, // Block quote left border.
		"textSeparator.foreground": color.ui.separator, // ???
		//
		// SELECTION
		focusBorder: color.accent.primary, // Border colour of focused panes/panels.
		"selection.background": color.text.selectionBg,
		//
		// BUTTONS [x]
		"button.foreground": color.text.inverse,
		"button.background": color.accent.fill,
		"button.hoverBackground": color.accent.fillHover,
		"button.secondaryForeground": color.text.inverse, // Secondary button, e.g. `Cancel` on a delete file dialogue.
		"button.secondaryBackground": color.accent.secondary,
		"button.secondaryHoverBackground": color.accent.secondaryHover,
		//"button.border": "",
		"checkbox.foreground": color.accent.primary, // Colour of the tick itself.
		"checkbox.background": color.ui.inputBg,
		"checkbox.border": color.ui.border,
		"checkbox.disabled.foreground": color.text.faded, // ???
		"checkbox.disabled.background": color.ui.secondaryBg, // ???
		// Radio button can be found in profile editor
		"radio.activeForeground": color.accent.primary,
		"radio.activeBackground": color.ui.inputBg,
		"radio.activeBorder": color.accent.primary,
		"radio.inactiveForeground": color.text.normal,
		"radio.inactiveBorder": color.ui.border,
		"radio.inactiveHoverBackground": color.ui.primaryBg,
		// All sorts of buttons everywhere, e.g. the little `...`, or the `show diff`, or the `vcs commit` buttons.
		"toolbar.hoverBackground": color.ui.hoverBgA,
		"toolbar.activeBackground": color.ui.activeBgA,
		"icon.foreground": color.text.normal, // All sorts of icons/buttons everywhere.
		//"toolbar.hoverOutline": "",
		//
		// DROPDOWNS [x]
		"dropdown.background": color.ui.inputBg, // Background of dropdown that's not open.
		"dropdown.listBackground": color.ui.inputBg, // Background of the list that opens.
		"dropdown.foreground": color.text.normal, // All text.
		"dropdown.border": color.ui.border, // Border of the dropdown input itself, when not clicked.
		//
		// LISTS [x]
		...list,
		//"list.focusOutline": "", // Outline of focused entry in list.
		"list.focusBackground": color.diag.selection, // Background colour of a focused list entry when searching & matching.
		"list.focusForeground": color.text.normal, // Text colour of a focused list entry when searching & matching.
		// Un-focused list
		//"list.inactiveSelectionForeground": "",
		//"list.inactiveSelectionIconForeground": "",
		//"list.inactiveFocusOutline": "", //
		"list.inactiveFocusBackground": color.diag.selection, // ???
		// Other
		"list.dropBackground": color.ui.primaryDropBg,
		"list.dropBetweenBackground": color.accent.primary, // ???
		"list.errorForeground": color.diag.error, // Text colour when there's an error.
		"list.warningForeground": color.diag.warning, // Text colour when there's a warning.
		"list.deemphasizedForeground": color.text.muted,
		"list.invalidItemForeground": color.diag.error, // Some error in the list.
		// Filter
		"listFilterWidget.background": color.text.matchBg, // The little pop-up when you start typing (searching) in a tree view.
		"listFilterWidget.outline": color.ui.border,
		"listFilterWidget.noMatchesOutline": color.diag.error,
		"list.filterMatchBackground": color.text.matchBg, // Background of list entries which match the filter.
		"list.filterMatchBorder": color.text.matchBorder,
		"tree.indentGuidesStroke": color.ui.treeIndent,
		"tree.tableColumnsBorder": color.ui.border,
		//
		// INPUT FIELDS [x]
		"input.border": color.ui.border,
		"input.foreground": color.text.normal,
		"input.background": color.ui.inputBg,
		"input.placeholderForeground": color.ui.placeholderText,
		"inputOption.activeBackground": color.text.selectionBg,
		//"inputOption.activeForeground": "#",
		//"inputOption.activeBorder": "",
		"inputValidation.infoForeground": color.diag.info,
		"inputValidation.infoBackground": color.diag.infoBg,
		"inputValidation.infoBorder": color.diag.info,
		"inputValidation.warningForeground": color.diag.warning,
		"inputValidation.warningBackground": color.diag.warningBg,
		"inputValidation.warningBorder": color.diag.warning,
		"inputValidation.errorForeground": color.diag.error,
		"inputValidation.errorBackground": color.diag.errorBg,
		"inputValidation.errorBorder": color.diag.error,
		//
		// SCROLLBAR [x]
		"scrollbar.shadow": color.ui.shadow, // General shadow when scrollable element is moved up.
		"scrollbarSlider.background": color.ui.scrollBgA, // Handle when mouse is in the pane.
		"scrollbarSlider.hoverBackground": color.ui.scrollHoverBgA, // Mouse-over.
		"scrollbarSlider.activeBackground": color.ui.scrollActiveBgA, // Held-down.
		//
		// PROGRESS BAR [x], e.g. vsc panel refresh/pull/push animation
		"progressBar.background": color.accent.primary,
		//
		// SMALL BADGES [x], e.g. # of changes in vcs panel, or # of problems
		...badges,
		//
		//
		//
		// TABS [x]
		"editorGroup.border": color.ui.border, // Border between editor panes.
		"editorGroup.focusedEmptyBorder": color.ui.border,
		"editorGroup.dropBackground": color.ui.primaryDropBg, // Background for re-organising tab panes.
		"editorGroupHeader.tabsBackground": color.ui.secondaryBg, // Background of tab row.
		"editorGroupHeader.noTabsBackground": color.ui.secondaryBg, // Background of no-tab row.
		"editorGroupHeader.tabsBorder": color.ui.border, // Border below the tab row.
		"editorGroupHeader.border": "#00000000", // Border underneath the tabs & breadcrumbs, if enabled.
		//
		"editorGroup.emptyBackground": color.ui.primaryBg, // Background of empty editor pane.
		//
		"editorGroup.dropIntoPromptForeground": color.text.normal,
		"editorGroup.dropIntoPromptBackground": color.ui.primaryBg,
		"editorGroup.dropIntoPromptBorder": "#00000000",
		// Individual tabs
		"tab.border": f(a(color.ui.border, "80"), color.ui.secondaryBg), // | Borders between tabs |, softer than other borders so uneven 1px rendering is less visible
		"tab.dragAndDropBorder": color.accent.primary,
		//
		"tab.activeForeground": color.text.normal,
		"tab.activeBackground": color.ui.primaryBg,
		"tab.unfocusedActiveForeground": color.text.muted,
		"tab.unfocusedActiveBackground": color.ui.primaryBg,
		"tab.activeBorder": "#00000000", // Bottom border for active tab.
		"tab.unfocusedActiveBorder": "#00000000",
		"tab.activeBorderTop": color.accent.primary, // Top border for active tab.
		"tab.unfocusedActiveBorderTop": color.ui.unfocusedTab,
		//
		"tab.lastPinnedBorder": color.ui.border, // Border between pinned and non-pinned tabs.
		//
		"tab.inactiveForeground": color.text.muted,
		"tab.inactiveBackground": color.ui.secondaryBg,
		"tab.unfocusedInactiveForeground": color.text.muted,
		"tab.unfocusedInactiveBackground": color.ui.secondaryBg,
		//
		"tab.hoverForeground": color.text.normal, // Text when hovering over a tab.
		"tab.unfocusedHoverForeground": color.text.normal, // Text when hovering over a tab.
		"tab.hoverBackground": color.ui.primaryBg, // Background when hovering over a tab.
		"tab.unfocusedHoverBackground": color.ui.primaryBg,
		"tab.hoverBorder": "#00000000",
		"tab.unfocusedHoverBorder": "#00000000",
		//
		"tab.activeModifiedBorder": "#00000000", // Top border for "dirty" files.
		"tab.unfocusedActiveModifiedBorder": "#00000000", // Top border for "dirty" files.
		"tab.inactiveModifiedBorder": "#00000000",
		"tab.unfocusedInactiveModifiedBorder": "#00000000",
		// For tabs that are selected as part of a multi-select, but not the currently active tab.
		"tab.selectedBackground": color.ui.primaryDropBg,
		//
		"editorPane.background": color.ui.primaryBg, // Background to the left/right side when the editor pane is centred.
		"sideBySideEditor.horizontalBorder": color.ui.border,
		"sideBySideEditor.verticalBorder": color.ui.border,
		//
		// ACTION BAR [x], icons on the tab bar for example
		"actionBar.toggledBackground": color.ui.primaryBg,
		//
		// ACTIVITY BAR [x], icons on the left/right
		"activityBar.background": color.ui.primaryBg, // Background of the entire bar.
		"activityBar.dropBorder": color.accent.primary, // Colour for when re-arranging icons.
		"activityBar.border": color.ui.border, // Border between bar and sidebar/whatever main panel.
		"activityBar.foreground": color.accent.primary, // Icon selected/hover colour.
		"activityBar.inactiveForeground": color.ui.activityBarInactive, // Icon not-selected colour.
		//"activityBar.activeBackground": "", // Background of active icon.
		"activityBar.activeBorder": color.accent.primary, // Line next to active icon.
		//"activityBar.activeFocusBorder": "", // ???
		"activityBarTop.foreground": color.accent.primary, // Icon selected/hover colour.
		"activityBarTop.inactiveForeground": color.ui.activityBarTopInactive, // Icon not-selected colour.
		"activityBarTop.activeBorder": color.accent.primary, // Line underneath the active icon.
		"activityBarTop.dropBorder": color.accent.primary, // Colour for when re-arranging icons.
		//
		// SIDEBAR [x]
		"sideBar.background": color.ui.secondaryBg,
		"sideBar.foreground": color.text.normal, // All text
		"sideBarTitle.foreground": color.text.normal, // Title, e.g. `Explorer` or `Run and Debug`.
		"sideBarSectionHeader.foreground": color.text.normal, // Header, e.g. `Outline` or `Task Explorer`.
		"sideBarSectionHeader.background": color.ui.tertiaryBg, // Header background
		//"sideBarSectionHeader.border": "", // Border between sections in a single pane.
		"sideBar.border": color.ui.border, // Border with the main editor pane.
		"sideBar.dropBackground": color.ui.primaryDropBg, // Background for re-organising panes in the sidebar.
		//
		// EXTENSION SIDEBAR [x]
		"extensionIcon.verifiedForeground": color.ui.verified,
		"extensionIcon.starForeground": color.ui.star,
		"extensionIcon.preReleaseForeground": color.ui.prerelease,
		"extensionIcon.sponsorForeground": color.ui.sponsor,
		"extensionIcon.privateForeground": color.ui.sponsor,
		"extensionBadge.remoteForeground": color.text.inverse,
		"extensionBadge.remoteBackground": color.ui.remote,
		"extensionButton.prominentForeground": color.text.inverse, // `Install` button
		"extensionButton.prominentBackground": color.accent.fill,
		"extensionButton.prominentHoverBackground": color.accent.fillHover,
		//
		// SETTINGS PAGE [x]
		"settings.headerForeground": color.text.bold, // Titles and headings
		"settings.modifiedItemIndicator": color.accent.primary, // Strip at the side of any modified settings.
		"settings.rowHoverBackground": "#00000000", // Background colour of the currently active setting.
		"settings.focusedRowBackground": "#00000000",
		"settings.focusedRowBorder": color.ui.border,
		//
		// WELCOME PAGE [x]
		"welcomePage.background": color.ui.primaryBg,
		"welcomePage.progress.foreground": color.accent.primary,
		"welcomePage.progress.background": color.ui.primaryBg,
		"welcomePage.tileBackground": color.ui.secondaryBg,
		"welcomePage.tileHoverBackground": color.ui.selectedSecondaryBg,
		"walkThrough.embeddedEditorBackground": color.ui.primaryBg,
		//
		// PANEL [x]
		"panel.background": color.ui.primaryBg,
		"panel.border": color.ui.border, // Border between panel and main editor pane.
		"panelSection.border": color.ui.border,
		//"panelInput.border": "", // ???
		//"panel.dropBorder": "", // ???
		"panelTitle.activeForeground": color.accent.primary, // Panel tabs, e.g. `Problems` or `Terminal`.
		"panelTitle.activeBorder": color.accent.primary, // Active tab underline.
		"panelTitle.inactiveForeground": color.text.normal,
		"panelSectionHeader.background": color.ui.secondaryBg, // E.g. `Debug Console` and `Output` panels in tab.
		"panelSectionHeader.foreground": color.text.normal,
		"panelSectionHeader.border": color.ui.border,
		"panelSection.dropBackground": color.ui.primaryDropBg, // Background for re-organising panels in a tab.
		//
		// DEBUG TOOLBAR & PANEL [x]
		"debugToolBar.background": color.ui.secondaryBg,
		"debugToolBar.border": color.ui.secondaryBg,
		//
		"debugIcon.breakpointForeground": color.debug.breakpoint, // The dot in the gutter.
		"debugIcon.breakpointDisabledForeground": color.debug.breakpointDisabled, // Disable dot.
		//"debugIcon.breakpointUnverifiedForeground": "", // ???
		//"debugIcon.breakpointCurrentStackframeForeground": "", // ???
		//"debugIcon.breakpointStackframeForeground": "" // ???
		"debugIcon.startForeground": color.debug.start, // The `|>` symbol in the debug panel.
		"debugIcon.pauseForeground": color.debug.pause, // The `||` symbol in the debug controller pop-down.
		"debugIcon.stopForeground": color.debug.stop,
		"debugIcon.disconnectForeground": color.debug.stop,
		"debugIcon.restartForeground": color.debug.stop,
		"debugIcon.stepOverForeground": color.debug.step,
		"debugIcon.stepIntoForeground": color.debug.step,
		"debugIcon.stepOutForeground": color.debug.step,
		"debugIcon.stepBackForeground": color.debug.step,
		"debugIcon.continueForeground": color.debug.start,
		"debugConsole.infoForeground": color.debug.info,
		"debugConsole.warningForeground": color.debug.warning,
		"debugConsole.errorForeground": color.debug.error,
		"debugConsole.sourceForeground": color.debug.source,
		"debugConsoleInputIcon.foreground": color.debug.input,
		//"debugView.exceptionLabelForeground": "",
		//"debugView.exceptionLabelBackground": "",
		//"debugView.stateLabelForeground": "",
		//"debugView.stateLabelForeground": "",
		//"debugView.valueChangedHighlight": "",
		//
		"debugTokenExpression.name": color.text.normal,
		"debugTokenExpression.value": color.text.normal,
		"debugTokenExpression.string": syntax.yellow,
		"debugTokenExpression.boolean": syntax.orange,
		"debugTokenExpression.number": syntax.orange,
		"debugTokenExpression.error": syntax.red,
		//
		// NOTIFICATIONS [x]
		//"notifications.foreground": "",
		"notifications.background": color.ui.primaryBg,
		//"notificationToast.border": "", // Border of notification pop-ups.
		"notifications.border": color.ui.border, // Border between notifications in notification centre.
		"notificationCenterHeader.background": color.ui.secondaryBg,
		"notificationCenterHeader.foreground": color.text.normal,
		//"notificationCenter.border": "", // Border of notification centre pop-up.
		"notificationsInfoIcon.foreground": color.diag.info,
		"notificationsWarningIcon.foreground": color.diag.warning,
		"notificationsErrorIcon.foreground": color.diag.error,
		"notificationLink.foreground": color.accent.primary, // ???
		//
		// DROP DOWN COMMAND BAR [x]
		...commandBar,
		"keybindingLabel.foreground": color.text.normal,
		"keybindingLabel.background": color.ui.selectedBgA,
		//"keybindingLabel.border": "", // Border when option is selected in command bar.
		//"keybindingLabel.bottomBorder": "",
		"keybindingTable.headerBackground": color.ui.secondaryBg,
		"keybindingTable.rowsBackground": color.ui.secondaryBg, // Background of every other row.
		//
		// COMMAND CENTER [x]
		"commandCenter.foreground": color.text.normal,
		"commandCenter.background": color.ui.primaryBg,
		"commandCenter.border": color.ui.border,
		"commandCenter.activeForeground": color.text.normal, // Text when hovering over.
		"commandCenter.activeBackground": color.ui.selectedBg, // Background when hovering over.
		//
		//
		//
		// WINDOW [x]
		"titleBar.activeForeground": color.text.normal,
		"titleBar.activeBackground": color.ui.primaryBg,
		"titleBar.inactiveForeground": color.text.light,
		"titleBar.inactiveBackground": color.ui.primaryBg,
		//"titleBar.border": "",
		...menu,
		//"window.activeBorder": "",
		//"window.inactiveBorder": "",
		"sash.hoverBorder": color.accent.primary, // Dragable border to resize panes.
		//
		// BANNER [x]
		...banner,
		//
		// STATUS BAR [x]
		...statusBar,
		//"statusBar.border": "",
		// When no folder open.
		"statusBar.noFolderForeground": color.text.normal,
		"statusBar.noFolderBackground": color.ui.statusEmptyBg,
		//"statusBar.noFolderBorder": "",
		// When debugging.
		"statusBar.debuggingForeground": color.text.inverse,
		"statusBar.debuggingBackground": color.ui.statusDebugBg,
		//"statusBar.debuggingBorder": "",
		//
		//
		//
		// SYMBOLS [x]
		"symbolIcon.arrayForeground": syntax.fg,
		"symbolIcon.booleanForeground": syntax.orange,
		"symbolIcon.classForeground": syntax.blue,
		"symbolIcon.colorForeground": color.text.normal,
		"symbolIcon.constantForeground": syntax.orange,
		"symbolIcon.enumeratorForeground": syntax.blue,
		"symbolIcon.enumeratorMemberForeground": syntax.cyan,
		"symbolIcon.eventForeground": color.text.normal,
		"symbolIcon.fieldForeground": syntax.lightPurple,
		"symbolIcon.fileForeground": color.text.normal,
		"symbolIcon.folderForeground": color.text.normal,
		"symbolIcon.functionForeground": syntax.green,
		"symbolIcon.interfaceForeground": syntax.cornflower,
		"symbolIcon.keyForeground": syntax.pink,
		"symbolIcon.keywordForeground": syntax.pink,
		"symbolIcon.methodForeground": syntax.green,
		"symbolIcon.moduleForeground": syntax.fg,
		"symbolIcon.namespaceForeground": syntax.fg,
		"symbolIcon.nullForeground": syntax.pink,
		"symbolIcon.numberForeground": syntax.orange,
		"symbolIcon.objectForeground": syntax.green,
		"symbolIcon.operatorForeground": syntax.gray,
		"symbolIcon.packageForeground": syntax.fg,
		"symbolIcon.propertyForeground": syntax.lightPurple,
		"symbolIcon.referenceForeground": syntax.pink,
		"symbolIcon.snippetForeground": syntax.pink,
		"symbolIcon.stringForeground": syntax.yellow,
		"symbolIcon.structForeground": syntax.blue,
		"symbolIcon.textForeground": color.text.normal,
		"symbolIcon.typeParameterForeground": syntax.skyBlue,
		"symbolIcon.unitForeground": syntax.orange,
		"symbolIcon.variableForeground": syntax.fg,
		//
		// TESTING COLORS [x]
		"testing.iconPassed": color.diag.testPassed,
		"testing.iconFailed": color.diag.testFailed,
		"testing.iconErrored": color.diag.testFailed,
		"testing.iconQueued": color.diag.testQueued,
		"testing.iconUnset": color.diag.testUnset,
		"testing.iconSkipped": color.diag.testSkipped,
		"testing.peekBorder": color.ui.border,
		//"testing.peekHeaderBackground": "",
		"testing.message.info.lineBackground": color.diag.infoBgA,
		"testing.message.info.decorationForeground": color.diag.info,
		"testing.message.error.lineBackground": color.diag.errorBgA,
		"testing.message.error.decorationForeground": color.diag.error,
		//
		// CHART COLORS [x]
		"charts.foreground": color.text.normal,
		"charts.lines": color.ui.chartLine,
		"charts.blue": color.ui.chartBlue,
		"charts.green": color.ui.chartGreen,
		"charts.yellow": color.ui.chartYellow,
		"charts.orange": color.ui.chartOrange,
		"charts.red": color.ui.chartRed,
		"charts.purple": color.ui.chartPurple,
		"chart.line": color.text.normal,
		"chart.axis": color.text.faded,
		"chart.guide": color.text.light,
		//
		// GIT COLORS [x]
		"gitDecoration.untrackedResourceForeground": color.git.untracked,
		"gitDecoration.addedResourceForeground": color.git.addedOrStaged, // Files added to vcs that are not currently tracked.
		"gitDecoration.modifiedResourceForeground": color.git.modified, // Files already in vcs that are modified.
		"gitDecoration.renamedResourceForeground": color.git.renamed,
		"gitDecoration.deletedResourceForeground": color.git.removedOrConflicting,
		"gitDecoration.stageModifiedResourceForeground": color.git.addedOrStaged,
		"gitDecoration.stageDeletedResourceForeground": color.git.ignoredOrSubmodule,
		"gitDecoration.ignoredResourceForeground": color.git.ignoredOrSubmodule,
		"gitDecoration.conflictingResourceForeground": color.git.removedOrConflicting,
		"gitDecoration.submoduleResourceForeground": color.git.ignoredOrSubmodule,
		"git.blame.editorDecorationForeground": syntax.gray,
		// SCM GRAPH [x]
		"scmGraph.foreground1": color.gitGraph[2],
		"scmGraph.foreground2": color.gitGraph[3],
		"scmGraph.foreground3": color.gitGraph[4],
		"scmGraph.foreground4": color.gitGraph[5],
		"scmGraph.foreground5": color.gitGraph[6],
		"scmGraph.historyItemRefColor": color.accent.secondary,
		"scmGraph.historyItemRemoteRefColor": color.accent.primary,
		"scmGraph.historyItemBaseRefColor": color.text.normal, // ???
		"scmGraph.historyItemHoverAdditionsForeground": color.git.addedOrStaged,
		"scmGraph.historyItemHoverDeletionsForeground": color.git.removedOrConflicting,
		//
		// MODERN UI [x], floating cards over a darker shell
		"modernUI.shellBackground": color.ui.tertiaryBg, // Window background around floating cards
		"modernUI.inactiveShellBackground": color.ui.tertiaryBg,
		"surface.background": color.ui.primaryBg, // Card background, e.g. the floating sidebar, panel and chat
		"surface.foreground": color.text.normal,
		"surface.border": color.ui.border,
		"editor.border": color.ui.border,
		"modernPanel.border": color.ui.border, // Outline of the bottom panel card
		"modernSash.gripForeground": color.text.decoration.light, // Grip handles on the resizable gaps between cards.
		"modernActivityBar.background": color.ui.tertiaryBg,
		"modernActivityBar.inactiveBackground": color.ui.tertiaryBg,
		"modernActivityBar.border": color.ui.border,
		"modernActivityBarItem.activeBackground": color.ui.selectedBgA, // Pill behind the selected view's icon.
		"modernActivityBarItem.activeForeground": color.accent.primary,
		"modernActivityBarItem.hoverBackground": color.ui.hoverBgA,
		"modernActivityBarItem.hoverForeground": color.text.normal,
		"modernEditorTab.activeBackground": color.ui.primaryBg,
		"modernEditorTab.activeForeground": color.text.normal,
		"modernEditorTab.activeHoverBackground": color.ui.primaryBg,
		"modernEditorTab.inactiveBackground": color.ui.secondaryBg,
		"modernEditorTab.hoverBackground": color.ui.primaryBg,
		"modernEditorTab.hoverForeground": color.text.normal,
		"modernEditorTab.activeActionBackground": color.ui.primaryBg,
		"modernEditorTab.activeHoverActionBackground": color.ui.primaryBg,
		"modernEditorTab.hoverActionBackground": color.ui.primaryBg,
		"modernEditorTab.selectedActionBackground": f(color.ui.listInactiveBgA, color.ui.primaryBg),
		"modernTab.activeBackground": color.ui.primaryBg,
		"modernTab.activeForeground": color.accent.primary,
		"modernTab.hoverBackground": color.ui.hoverBgA,
		"modernTab.hoverForeground": color.text.normal,
		//
		// AGENT SESSIONS WINDOW [x]
		"agents.background": color.ui.tertiaryBg,
		"agentsGradient.tintColor": a(color.accent.primary, "20"),
		"agentsPanel.background": color.ui.primaryBg,
		"agentsPanel.foreground": color.text.normal,
		"agentsPanel.border": color.ui.border,
		"agentsCard.border": color.ui.border,
		"agentsBottomPanel.border": color.ui.border,
		"activeSessionView.background": color.ui.primaryBg,
		"activeSessionView.foreground": color.text.normal,
		"inactiveSessionView.background": color.ui.secondaryBg,
		"inactiveSessionView.foreground": color.text.normal,
		"agentsChatInput.background": color.ui.inputBg,
		"agentsChatInput.foreground": color.text.normal,
		"agentsChatInput.border": color.ui.border,
		"agentsChatInput.focusBorder": color.accent.primary,
		"agentsChatInput.placeholderForeground": color.ui.placeholderText,
		"agentsBadge.background": color.accent.fill,
		"agentsBadge.foreground": color.text.inverse,
		"agentsUnreadBadge.background": color.accent.fill,
		"agentsUnreadBadge.foreground": color.text.inverse,
		"agentsNewSessionButton.background": color.accent.fill,
		"agentsNewSessionButton.foreground": color.text.inverse,
		"agentsNewSessionButton.hoverBackground": color.accent.fillHover,
		"agentsNewSessionButton.border": "#00000000",
		"agentsUpdateButton.downloadedBackground": color.accent.fill,
		"agentsUpdateButton.downloadingBackground": a(color.accent.primary, "60"),
		"agentsMobileDiff.addedForeground": color.git.addedOrStaged,
		"agentsMobileDiff.deletedForeground": color.git.removedOrConflicting,
		"agentsMobileDiff.modifiedForeground": color.git.modified,
		"agentStatusIndicator.background": color.ui.listInactiveBgA,
		"agentSessionReadIndicator.foreground": color.text.muted,
		"agentSessionSelectedBadge.border": color.text.inverse,
		"agentSessionSelectedUnfocusedBadge.border": color.ui.border,
		"agentFeedbackEditorWidget.background": color.ui.secondaryBg,
		"agentFeedbackEditorWidget.border": color.ui.border,
		"agentFeedbackInputWidget.border": color.ui.border,
		//
		// CHAT [x], requests use the faint accent tint
		"chat.requestBubbleBackground": color.ui.listInactiveBgA,
		"chat.requestBubbleHoverBackground": a(color.accent.primary, "24"),
		"chat.requestBorder": color.ui.border,
		"chat.requestCodeBorder": color.ui.border,
		"chat.avatarBackground": color.ui.secondaryBg,
		"chat.avatarForeground": color.text.normal,
		"chat.checkpointSeparator": color.ui.border,
		"chat.editedFileForeground": color.git.modified,
		"chat.linesAddedForeground": color.git.addedOrStaged,
		"chat.linesRemovedForeground": color.git.removedOrConflicting,
		"chat.slashCommandBackground": a(color.accent.secondary, "26"),
		"chat.slashCommandForeground": color.accent.secondary,
		"chat.thinkingShimmer": color.accent.primary,
		"inlineChat.background": color.ui.secondaryBg,
		"inlineChat.foreground": color.text.normal,
		"inlineChat.border": color.ui.border,
		"inlineChat.shadow": color.ui.shadow,
		"inlineChatInput.background": color.ui.inputBg,
		"inlineChatInput.border": color.ui.border,
		"inlineChatInput.focusBorder": color.accent.primary,
		"inlineChatInput.placeholderForeground": color.ui.placeholderText,
		"inlineChatDiff.inserted": color.git.insertedBgA,
		"inlineChatDiff.removed": color.git.removedBgA,
		"editorOverviewRuler.inlineChatInserted": color.git.addedOrStaged,
		"editorOverviewRuler.inlineChatRemoved": color.git.removedOrConflicting,
		"editorLightBulbAi.foreground": color.ui.lightBulb,
		//
		// INLINE EDIT SUGGESTIONS [x], original = removed, modified = added
		"inlineEdit.originalBackground": a(color.git.removedOrConflicting, "10"),
		"inlineEdit.originalChangedLineBackground": color.git.removedBgA,
		"inlineEdit.originalChangedTextBackground": a(color.git.removedOrConflicting, "40"),
		"inlineEdit.originalBorder": color.git.removedOrConflicting,
		"inlineEdit.modifiedBackground": a(color.git.addedOrStaged, "10"),
		"inlineEdit.modifiedChangedLineBackground": color.git.insertedBgA,
		"inlineEdit.modifiedChangedTextBackground": a(color.git.addedOrStaged, "40"),
		"inlineEdit.modifiedBorder": color.git.addedOrStaged,
		"inlineEdit.tabWillAcceptOriginalBorder": color.accent.primary,
		"inlineEdit.tabWillAcceptModifiedBorder": color.accent.primary,
		"inlineEdit.gutterIndicator.background": color.ui.secondaryBg,
		"inlineEdit.gutterIndicator.primaryBackground": color.accent.fill,
		"inlineEdit.gutterIndicator.primaryForeground": color.text.inverse,
		"inlineEdit.gutterIndicator.primaryBorder": color.accent.primary,
		"inlineEdit.gutterIndicator.secondaryBackground": color.ui.secondaryBg,
		"inlineEdit.gutterIndicator.secondaryForeground": color.text.normal,
		"inlineEdit.gutterIndicator.secondaryBorder": color.ui.border,
		"inlineEdit.gutterIndicator.successfulBackground": color.diag.testPassed,
		"inlineEdit.gutterIndicator.successfulForeground": color.text.inverse,
		"inlineEdit.gutterIndicator.successfulBorder": color.diag.testPassed,
		//
		// DIFF & MERGE [x], whole lines are fainter than the changed text on them
		"diffEditor.insertedLineBackground": a(color.git.addedOrStaged, "15"),
		"diffEditor.removedLineBackground": a(color.git.removedOrConflicting, "12"),
		"diffEditorGutter.insertedLineBackground": a(color.git.addedOrStaged, "15"),
		"diffEditorGutter.removedLineBackground": a(color.git.removedOrConflicting, "12"),
		"diffEditorOverview.insertedForeground": color.git.addedOrStaged,
		"diffEditorOverview.removedForeground": color.git.removedOrConflicting,
		"diffEditor.move.border": a(color.git.modified, "80"),
		"diffEditor.moveActive.border": color.git.modified,
		"diffEditor.unchangedCodeBackground": "#00000000",
		"diffEditor.unchangedRegionBackground": color.ui.secondaryBg,
		"diffEditor.unchangedRegionForeground": color.text.muted,
		"diffEditor.unchangedRegionShadow": color.ui.shadow,
		"multiDiffEditor.headerBackground": color.ui.secondaryBg,
		"merge.commonContentBackground": a(color.git.ignoredOrSubmodule, "2A"),
		"merge.commonHeaderBackground": a(color.git.ignoredOrSubmodule, "6A"),
		"editorOverviewRuler.commonContentForeground": color.git.ignoredOrSubmodule,
		"mergeEditor.changeBase.background": a(color.git.removedOrConflicting, "1A"),
		"mergeEditor.changeBase.word.background": a(color.git.removedOrConflicting, "2A"),
		"mergeEditor.conflict.input1.background": color.git.currentBgA,
		"mergeEditor.conflict.input2.background": color.git.incomingBgA,
		"mergeEditor.conflictingLines.background": color.git.mergeUnhandledUnfocused,
		//
		// EDITOR DETAILS [x]
		"editor.wordHighlightTextBackground": color.text.secondarySelectionBgA, // Textual (not semantic) occurrences.
		"editorOverviewRuler.wordHighlightTextForeground": color.diag.selection,
		"editor.placeholder.foreground": color.ui.placeholderText,
		"editor.linkedEditingBackground": color.text.tabstopBgA,
		"editor.stackFrameHighlightBackground": color.diag.warningBgA, // Top stack frame.
		"editor.focusedStackFrameHighlightBackground": color.diag.hintBgA,
		"editor.inlineValuesBackground": color.ui.selectedBgA, // Debug inline values.
		"editor.inlineValuesForeground": color.text.light,
		"editorMultiCursor.primary.foreground": color.accent.primary,
		"editorMultiCursor.primary.background": color.ui.primaryBg,
		"editorMultiCursor.secondary.foreground": color.ui.unfocusedTab,
		"editorMultiCursor.secondary.background": color.ui.primaryBg,
		"editorLineNumber.dimmedForeground": color.text.decoration.light,
		"editorGutter.foldingControlForeground": color.text.muted,
		"editorGutter.addedSecondaryBackground": a(color.git.addedOrStaged, "80"),
		"editorGutter.modifiedSecondaryBackground": a(color.git.modified, "80"),
		"editorGutter.deletedSecondaryBackground": a(color.git.removedOrConflicting, "80"),
		"editorGutter.commentGlyphForeground": color.text.normal,
		"editorGutter.commentUnresolvedGlyphForeground": color.accent.primary,
		"editorGutter.commentDraftGlyphForeground": color.accent.secondary,
		"editorOverviewRuler.background": color.ui.primaryBg,
		"editorOverviewRuler.commentForeground": color.text.muted,
		"editorOverviewRuler.commentUnresolvedForeground": color.accent.primary,
		"editorOverviewRuler.commentDraftForeground": color.accent.secondary,
		"editorCommentsWidget.rangeBackground": color.text.secondarySelectionBgA,
		"editorCommentsWidget.rangeActiveBackground": color.text.selectionBgA,
		"editorCommentsWidget.replyInputBackground": color.ui.inputBg,
		"editorCommentsWidget.resolvedBorder": color.ui.border,
		"editorCommentsWidget.unresolvedBorder": color.accent.primary,
		"symbolIcon.constructorForeground": syntax.green,
		"debugTokenExpression.type": syntax.blue,
		"debugView.exceptionLabelBackground": color.diag.error,
		"debugView.exceptionLabelForeground": color.text.inverse,
		"debugView.stateLabelBackground": color.ui.selectedBgA,
		"debugView.stateLabelForeground": color.text.normal,
		"debugView.valueChangedHighlight": color.diag.info,
		//
		// TEST COVERAGE & MESSAGES [x]
		"testing.coveredBackground": color.git.insertedBgA,
		"testing.coveredGutterBackground": a(color.git.addedOrStaged, "60"),
		"testing.uncoveredBackground": color.git.removedBgA,
		"testing.uncoveredGutterBackground": a(color.git.removedOrConflicting, "60"),
		"testing.uncoveredBranchBackground": color.diag.errorBg,
		"testing.coverCountBadgeBackground": color.accent.fill,
		"testing.coverCountBadgeForeground": color.text.inverse,
		"testing.message.error.badgeBackground": color.diag.error,
		"testing.message.error.badgeForeground": color.text.inverse,
		"testing.message.error.badgeBorder": color.diag.error,
		"testing.peekHeaderBackground": color.diag.infoBg,
		"testing.messagePeekBorder": color.diag.info,
		"testing.messagePeekHeaderBackground": color.diag.infoBgA,
		"testing.runAction": color.diag.testPassed,
		//
		// MARKDOWN ALERTS [x], GitHub-style callouts
		"markdownAlert.note.foreground": color.diag.info,
		"markdownAlert.tip.foreground": color.diag.testPassed,
		"markdownAlert.important.foreground": color.git.untracked,
		"markdownAlert.warning.foreground": color.diag.warning,
		"markdownAlert.caution.foreground": color.diag.error,
		//
		// NOTEBOOKS [x]
		"notebook.editorBackground": color.ui.primaryBg,
		"notebook.cellEditorBackground": color.ui.secondaryBg,
		"notebook.cellBorderColor": color.ui.border,
		"notebook.cellHoverBackground": color.ui.listHoverBgA,
		"notebook.focusedCellBackground": color.ui.listHoverBgA,
		"notebook.selectedCellBackground": color.ui.listInactiveBgA,
		"notebook.focusedCellBorder": color.accent.primary,
		"notebook.focusedEditorBorder": color.accent.primary,
		"notebook.inactiveFocusedCellBorder": color.ui.border,
		"notebook.selectedCellBorder": color.ui.border,
		"notebook.inactiveSelectedCellBorder": color.ui.border,
		"notebook.cellInsertionIndicator": color.accent.primary,
		"notebook.cellStatusBarItemHoverBackground": color.ui.hoverBgA,
		"notebook.cellToolbarSeparator": color.ui.separator,
		"notebook.outputContainerBackgroundColor": color.ui.secondaryBg,
		"notebook.outputContainerBorderColor": color.ui.border,
		"notebook.symbolHighlightBackground": color.text.matchBgA,
		"notebookEditorOverviewRuler.runningCellForeground": color.diag.info,
		"notebookScrollbarSlider.background": color.ui.scrollBgA,
		"notebookScrollbarSlider.hoverBackground": color.ui.scrollHoverBgA,
		"notebookScrollbarSlider.activeBackground": color.ui.scrollActiveBgA,
		"notebookStatusErrorIcon.foreground": color.diag.error,
		"notebookStatusRunningIcon.foreground": color.diag.info,
		"notebookStatusSuccessIcon.foreground": color.diag.testPassed,
		"interactive.activeCodeBorder": color.accent.primary,
		"interactive.inactiveCodeBorder": color.ui.border,
		//
		// SETTINGS EDITOR INPUTS [x]
		"settings.checkboxBackground": color.ui.inputBg,
		"settings.checkboxForeground": color.accent.primary,
		"settings.checkboxBorder": color.ui.border,
		"settings.dropdownBackground": color.ui.dropdownBg,
		"settings.dropdownForeground": color.text.normal,
		"settings.dropdownBorder": color.ui.border,
		"settings.dropdownListBorder": color.ui.border,
		"settings.textInputBackground": color.ui.inputBg,
		"settings.textInputForeground": color.text.normal,
		"settings.textInputBorder": color.ui.border,
		"settings.numberInputBackground": color.ui.inputBg,
		"settings.numberInputForeground": color.text.normal,
		"settings.numberInputBorder": color.ui.border,
		"settings.headerBorder": color.ui.border,
		"settings.sashBorder": color.ui.border,
		"settings.settingsHeaderHoverForeground": color.text.emphasised,
		"profiles.sashBorder": color.ui.border,
		"simpleFindWidget.sashBorder": color.ui.border,
		//
		// STATUS BAR OFFLINE, GAUGES & BADGES [x]
		"statusBarItem.offlineBackground": color.diag.errorBg,
		"statusBarItem.offlineForeground": color.diag.error,
		"statusBarItem.offlineHoverBackground": a(color.diag.error, "40"),
		"statusBarItem.offlineHoverForeground": color.diag.error,
		"gauge.foreground": color.accent.primary,
		"gauge.background": a(color.accent.primary, "30"),
		"gauge.warningForeground": color.diag.warning,
		"gauge.warningBackground": a(color.diag.warning, "30"),
		"gauge.errorForeground": color.diag.error,
		"gauge.errorBackground": a(color.diag.error, "30"),
		"panelTitleBadge.background": color.accent.fill,
		"panelTitleBadge.foreground": color.text.inverse,
		"profileBadge.background": color.accent.fill,
		"profileBadge.foreground": color.text.inverse,
		//
		// MISC WORKBENCH [x]
		"extensionButton.background": color.accent.fill,
		"extensionButton.foreground": color.text.inverse,
		"extensionButton.hoverBackground": color.accent.fillHover,
		"extensionButton.separator": a(color.text.inverse, "40"),
		"button.separator": a(color.text.inverse, "40"),
		"inputOption.hoverBackground": color.ui.hoverBgA,
		"radio.inactiveBackground": color.ui.primaryBg,
		"keybindingLabel.border": color.ui.border,
		"keybindingLabel.bottomBorder": color.ui.border,
		"commandCenter.inactiveForeground": color.text.light,
		"commandCenter.inactiveBorder": color.ui.border,
		"commandCenter.activeBorder": color.ui.border,
		"commandCenter.debuggingBackground": a(color.ui.statusDebugBg, "42"),
		"activityBar.activeFocusBorder": color.accent.primary,
		"activityBarTop.background": color.ui.secondaryBg,
		"panel.dropBorder": color.accent.primary,
		"panelInput.border": color.ui.border,
		"panelStickyScroll.background": color.ui.primaryBg,
		"panelStickyScroll.shadow": color.ui.shadow,
		"outputView.background": color.ui.primaryBg,
		"outputViewStickyScroll.background": color.ui.primaryBg,
		"peekViewEditorStickyScroll.background": color.ui.primaryBg,
		"peekViewEditorStickyScrollGutter.background": color.ui.primaryBg,
		"notifications.foreground": color.text.normal,
		"notificationCenter.border": color.ui.border,
		"notificationToast.border": color.ui.border,
		"listFilterWidget.shadow": color.ui.shadow,
		"tree.tableOddRowsBackground": color.ui.listHoverBgA,
		"search.resultsInfoForeground": color.text.light,
		"searchEditor.textInputBorder": color.ui.border,
		"commentsView.resolvedIcon": color.text.muted,
		"commentsView.unresolvedIcon": color.accent.primary,
		"ports.iconRunningProcessForeground": color.diag.testPassed,
		"mcpIcon.starForeground": color.ui.star,
		"scmGraph.historyItemHoverDefaultLabelBackground": color.ui.selectedBg,
		"scmGraph.historyItemHoverDefaultLabelForeground": color.text.normal,
		"scmGraph.historyItemHoverLabelForeground": color.text.inverse,
	};
	return editor_colors;
}
