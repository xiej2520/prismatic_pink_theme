import * as fs from "fs";
import * as path from "path";
import { THEMES } from "../src/themes";
import type { UiColors, SyntaxColors } from "../src/theme";
import { DEFAULT_CONFIG, type Config } from "../src/config";
import { generateSemanticThemeColors } from "../src/theme/semantic";
import { selectAnsiColors } from "../src/theme/terminal";
import { makeOutputFolder } from "./buildEnv";

const themesFolder = makeOutputFolder("themes")
const buildFolder = makeOutputFolder("build")

const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"),
) as { version: string };

const config = DEFAULT_CONFIG as unknown as Config;

fs.writeFileSync(path.join(themesFolder, "cached_config.json"), JSON.stringify(config));
createTheme("prismatic-pink-zed.json");

function createTheme(file: string) {
  const jsonPath = path.join(buildFolder, file);

  const ext = {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Prismatic Pink",
    description: `Prismatic Pink Theme v${version}`,
    author: "xiej2520",
    isUserGenerated: true,
    themes: THEMES.map(t => generateTheme(t.label, t.type, t.colors, t.syntax, config)),
  };
  console.log(`Writing Zed theme(s) to ${jsonPath}`);
  fs.writeFileSync(jsonPath, JSON.stringify(ext, undefined, 2));
}

function generateTheme(
  name: string,
  type: "light" | "dark",
  color: UiColors,
  syntax: SyntaxColors,
  config: Config,
): Object {
  return {
    name,
    appearance: type,
    style: {
      ...generateColors(color, type, config),
      syntax: generateSyntax(syntax, config),
    },
  };
}

function generateColors(color: UiColors, type: "light" | "dark", config: Config) {
  const ansi = selectAnsiColors(color, type, config);
  const surface = {
    background: color.ui.primaryBg,

    "surface.background": color.ui.tertiaryBg,
    "elevated_surface.background": color.ui.tertiaryBg,
    "panel.background": color.ui.secondaryBg,
    "panel.focused_border": color.ui.border,

    "panel.indent_guide": color.ui.treeIndent + "40",
    "panel.indent_guide_hover": color.ui.treeIndent + "C0",
    "panel.indent_guide_active": color.ui.treeIndent,

    "panel.overlay_background": color.ui.secondaryBg,
    "panel.overlay_hover": color.ui.selectedBg,

    "pane.focused_border": color.ui.hoverBgA,

    //"pane_group.border": "#3D434F",
  };
  const border = {
    border: color.ui.border,
    "border.variant": color.ui.border,
    "border.focused": color.accent.primaryHover,
    "border.selected": color.accent.primary,
    "border.transparent": color.accent.link, // ???
    "border.disabled": color.ui.secondaryBg,
  };
  const text = {
    text: color.text.normal,
    "text.muted": color.text.muted,
    "text.placeholder": color.ui.placeholderText,
    "text.disabled": color.ui.disabledText,
    "text.accent": color.accent.link,
    "link_text.hover": color.accent.linkHover,
  };
  const icon = {
    icon: color.text.normal,
    "icon.muted": color.text.muted,
    "icon.disabled": color.ui.disabledText,
    "icon.placeholder": color.ui.placeholderText,
    "icon.accent": color.accent.link,
  };
  const editor = {
    "editor.foreground": color.text.normal,
    "editor.background": color.ui.primaryBg,
    "editor.gutter.background": color.ui.secondaryBg,
    "editor.active_line.background": color.text.currentLineBgA,
    "editor.highlighted_line.background": color.ui.secondaryBg,
    "editor.debugger_active_line.background": color.diag.hintBgA,
    "editor.subheader.background": color.ui.secondaryBg,
    "editor.active_line_number": color.accent.primary,
    "editor.line_number": color.text.muted,
    // whitespace
    "editor.invisible": color.text.decoration.alt2Inlay,
    "editor.wrap_guide": color.ui.separator, // ?
    "editor.active_wrap_guide": color.ui.treeIndent, // ?
    "editor.indent_guide": color.ui.treeIndent + "40", // ?
    "editor.indent_guide_active": color.ui.treeIndent + "80", // ?
    "editor.document_highlight.read_background": null,
    "editor.document_highlight.write_background": null,
    "editor.document_highlight.bracket_background": null,
    "search.match_background": color.text.matchBg,
    "search.active_match_background": color.text.matchBorder, // green
  };
  const navigation = {
    "status_bar.background": color.ui.secondaryBg,
    "title_bar.background": color.ui.primaryBg,
    "title_bar.inactive_background": color.ui.secondaryBg,
    "toolbar.background": color.ui.secondaryBg,
  };
  const element = {
    "element.background": color.ui.primaryBg,
    "element.hover": color.ui.hoverBgA,
    "element.active": color.ui.activeBgA,
    "element.selected": color.ui.selectedBg,
    "element.selection_background": color.ui.selectedBgA,
    "element.disabled": color.ui.tertiaryBg,
  };
  const ghostElement = {
    "ghost_element.background": color.ui.primaryBg,
    "ghost_element.hover": color.ui.hoverBgA,
    "ghost_element.active": color.ui.activeBgA,
    "ghost_element.selected": color.ui.selectedBg,
    "ghost_element.disabled": color.ui.tertiaryBg,
  };
  const dropTarget = {
    "drop_target.background": color.ui.selectedBg, // ?
    "drop_target.border": color.accent.primary, // ?
  };
  const tabs = {
    "tab_bar.background": color.ui.secondaryBg,
    "tab.inactive_background": color.ui.secondaryBg,
    "tab.active_background": color.ui.primaryBg,
  };
  const scrollBar = {
    "scrollbar.thumb.background": color.ui.scrollBgA,
    "scrollbar.thumb.hover_background": color.ui.scrollHoverBgA,
    "scrollbar.thumb.active_background": color.ui.scrollActiveBgA,
    "scrollbar.thumb.border": color.ui.border,
    "scrollbar.track.background": color.ui.primaryBg,
    "scrollbar.track.border": color.ui.border,
  };
  const minimap = {
    "minimap.thumb.background": color.ui.scrollBgA,
    "minimap.thumb.hover_background": color.ui.scrollHoverBgA,
    "minimap.thumb.active_background": color.ui.scrollActiveBgA,
    "minimap.thumb.border": color.ui.border,
  };
  const status = {
    hint: color.text.decoration.alt1Inlay,
    "hint.background": color.text.decoration.alt1InlayBgA,
    "hint.border": null,

    // slider button
    info: color.diag.info,
    "info.background": color.diag.infoBgA,
    "info.border": null,

    success: color.diag.testPassed,
    "success.background": null,
    "success.border": null,

    warning: color.diag.warning,
    "warning.background": color.diag.warningBgA,
    "warning.border": null,

    error: color.diag.error,
    "error.background": color.diag.errorBgA,
    "error.border": null,

    created: color.git.addedOrStaged,
    "created.background": color.diag.hintBgA,
    "created.border": null,

    modified: color.git.modified,
    "modified.background": color.diag.infoBgA,
    "modified.border": null,

    deleted: color.git.removedOrConflicting,
    "deleted.background": color.diag.errorBgA,
    "deleted.border": null,

    conflict: color.git.removedOrConflicting,
    "conflict.background": color.diag.warningBgA,
    "conflict.border": null,

    renamed: color.git.renamed,
    "renamed.background": color.diag.infoBgA,
    "renamed.border": null,

    hidden: color.diag.hint,
    "hidden.background": color.diag.hintBgA,
    "hidden.border": null,

    ignored: color.git.ignoredOrSubmodule,
    "ignored.background": color.diag.hintBgA,
    "ignored.border": null,

    predictive: null,
    "predictive.background": null,
    "predictive.border": null,

    unreachable: color.diag.hint,
    "unreachable.background": color.diag.hintBgA,
    "unreachable.border": null,
  };
  const versionControl = {
    "version_control.added": color.git.addedOrStaged,
    "version_control.deleted": color.git.removedOrConflicting,
    "version_control.modified": color.git.modified,
    "version_control.renamed": color.git.renamed,
    "version_control.conflict": color.git.removedOrConflicting,
    "version_control.ignored": color.git.ignoredOrSubmodule,
    "version_control.conflict_marker.ours": color.git.currentBgA,
    "version_control.conflict_marker.theirs": color.git.incomingBgA,
  };
  const terminal = {
    "terminal.background": ansi.background,
    "terminal.foreground": ansi.foreground,
    "terminal.bright_foreground": ansi.foreground,
    "terminal.dim_foreground": null,
    "terminal.ansi.black": ansi.black,
    "terminal.ansi.bright_black": ansi.brightBlack,
    "terminal.ansi.dim_black": ansi.dimBlack,
    "terminal.ansi.red": ansi.red,
    "terminal.ansi.bright_red": ansi.brightRed,
    "terminal.ansi.dim_red": ansi.dimRed,
    "terminal.ansi.green": ansi.green,
    "terminal.ansi.bright_green": ansi.brightGreen,
    "terminal.ansi.dim_green": ansi.dimGreen,
    "terminal.ansi.yellow": ansi.yellow,
    "terminal.ansi.bright_yellow": ansi.brightYellow,
    "terminal.ansi.dim_yellow": ansi.dimYellow,
    "terminal.ansi.blue": ansi.blue,
    "terminal.ansi.bright_blue": ansi.brightBlue,
    "terminal.ansi.dim_blue": ansi.dimBlue,
    "terminal.ansi.magenta": ansi.magenta,
    "terminal.ansi.bright_magenta": ansi.brightMagenta,
    "terminal.ansi.dim_magenta": ansi.dimMagenta,
    "terminal.ansi.cyan": ansi.cyan,
    "terminal.ansi.bright_cyan": ansi.brightCyan,
    "terminal.ansi.dim_cyan": ansi.dimCyan,
    "terminal.ansi.white": ansi.white,
    "terminal.ansi.bright_white": ansi.brightWhite,
    "terminal.ansi.dim_white": ansi.dimWhite,
  };
  const players = {
    players: [
      {
        cursor: color.accent.primary,
        background: color.ui.inputBg, // ?
        selection: color.text.selectionBg,
      },
    ],
  };
  return {
    ...surface,
    ...border,
    ...text,
    ...icon,
    ...editor,
    ...navigation,
    ...element,
    ...ghostElement,
    ...dropTarget,
    ...tabs,
    ...scrollBar,
    ...minimap,
    ...status,
    ...versionControl,
    ...terminal,
    ...players,
  };
}

function generateSyntax(syntax: SyntaxColors, config: Config) {
  const semantic = generateSemanticThemeColors(syntax);
  const commentColor = config.mutedComments ? semantic.faded : semantic.comment;
  const comments = {
    comment: config.italicComments ? { color: commentColor, font_style: "italic" } : commentColor,
    "comment.doc": config.italicComments ? { color: commentColor, font_style: "italic" } : commentColor,
  };
  const literals = {
    string: semantic.string,
    "string.escape": semantic.escapeSequence,
    "string.regex": semantic.regexp,
    "string.special": semantic.escapeSequence,
    "string.special.symbol": semantic.escapeSequence,
    // markdown code span
    "text.literal": semantic.text,
  };
  const constants = {
    number: semantic.number,
    boolean: semantic.boolean,
    constant: semantic.constant,
  };
  const keywords = {
    keyword: semantic.keyword,
    operator: semantic.operator,
    preproc: semantic.operator,
  };
  const functions = {
    function: semantic.function,
    //"method": semantic.method,
    constructor: semantic.method,
    attribute: semantic.attribute,
  };
  const types = {
    type: semantic.struct,
    enum: semantic.enum,
    namespace: semantic.namespace,
    variant: semantic.enumMember,
  };
  const variables = {
    variable: semantic.variable,
    "variable.special": semantic.selfKeyword,
    property: semantic.property,
    label: semantic.label,
  };
  const punctuation = {
    punctuation: semantic.punctuation,
    "punctuation.bracket": semantic.operator,
    "punctuation.delimiter": semantic.operator,
    "punctuation.list_marker": semantic.enumMember,
    // markdown code block
    "punctuation.markup": syntax.fg,
    "punctuation.special": semantic.operator,
  };
  const markup = {
    tag: semantic.keyword,
    title: {
      color: syntax.pink,
      font_weight: 500,
    },
    emphasis: {
      color: syntax.lightPink,
      font_style: "italic",
    },
    "emphasis.strong": {
      color: syntax.boldGreen,
      font_weight: 600,
    },
    link_text: syntax.blue,
    link_uri: syntax.cornflower,
    selector: syntax.yellow,
    "selector.pseudo": syntax.lime,
  };
  const other = {
    primary: semantic.text,
    embedded: syntax.boldFg,
    predictive: {
      color: syntax.fadedGray,
      font_style: "italic",
      font_weight: 300,
    },
    // inlay hints
    hint: syntax.gray,
  };
  const flat = {
    ...comments,
    ...literals,
    ...constants,
    ...keywords,
    ...functions,
    ...types,
    ...variables,
    ...punctuation,
    ...markup,
    ...other,
  };
  return Object.fromEntries(
    Object.entries(flat).map(([key, value]) => [
      key,
      typeof value === "string"
        ? { color: value, background_color: null, font_style: null, font_weight: null }
        : value,
    ]),
  );
}
