import * as fs from "fs";
import * as path from "path";
import { darkColors, darkSyntax } from "../src/dark";
import { blackContrastColors, blackContrastSyntax } from "../src/black-contrast";
import { lightColors, lightSyntax } from "../src/light";
import type { UiColors, SyntaxColors } from "../src/theme";
import { DEFAULT_CONFIG, type Config } from "../src/config";
import { selectAnsiColors } from "../src/theme/terminal";
import { generateSemanticThemeColors } from "../src/theme/semantic";

import { alpha as a, flatten as f } from "../src/color";
import { makeOutputFolder } from "./buildEnv";

const config = DEFAULT_CONFIG as unknown as Config;

// Only write the files when run as a script, tests import `generateLua`.
if (require.main === module) {
  const folder = makeOutputFolder("themes/nvim");
  createTheme(path.join(folder, "prismatic-pink.lua"), "prismatic-pink", "dark", darkColors, darkSyntax);
  createTheme(path.join(folder, "prismatic-pink-contrast.lua"), "prismatic-pink-contrast", "dark", blackContrastColors, blackContrastSyntax);
  createTheme(path.join(folder, "prismatic-pink-light.lua"), "prismatic-pink-light", "light", lightColors, lightSyntax);
}

function createTheme(filePath: string, colorsName: string, background: "light" | "dark", color: UiColors, syntax: SyntaxColors) {
  console.log(`Writing Neovim colors "${colorsName}" to ${filePath}`);
  fs.writeFileSync(filePath, generateLua(colorsName, background, color, syntax));
}

function hi(group: string, opts: Record<string, string | boolean | number>): string {
  const fields = Object.entries(opts)
    .map(([key, value]) => (typeof value === "string" ? `${key} = "${value}"` : `${key} = ${value}`))
    .join(", ");
  return `hi("${group}", { ${fields} })`;
}

export function generateLua(colorsName: string, background: "dark" | "light", color: UiColors, syntax: SyntaxColors): string {
  const ansi = selectAnsiColors(color, background, config);
  const builtinType = config.builtinTypeColor === "type" ? syntax.blue : syntax.pink;
  const sem = generateSemanticThemeColors(syntax, config);
  const terminalColors = [
    ansi.black, ansi.red, ansi.green, ansi.yellow, ansi.blue, ansi.magenta, ansi.cyan, ansi.white,
    ansi.brightBlack, ansi.brightRed, ansi.brightGreen, ansi.brightYellow, ansi.brightBlue, ansi.brightMagenta, ansi.brightCyan, ansi.brightWhite,
  ];

  const groups = [
    // editor ui
    hi("Normal", { fg: syntax.fg, bg: color.ui.primaryBg }),
    hi("NormalNC", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("NormalFloat", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("FloatBorder", { fg: color.ui.border, bg: color.ui.secondaryBg }),
    hi("FloatTitle", { fg: syntax.pink, bg: color.ui.secondaryBg, bold: true }),
    hi("Cursor", { fg: color.ui.primaryBg, bg: color.accent.primary }),
    hi("CursorLine", { bg: f(color.text.currentLineBgA, color.ui.primaryBg) }),
    hi("CursorLineNr", { fg: color.accent.primary, bold: true }),
    hi("LineNr", { fg: syntax.fadedGray }),
    hi("SignColumn", { fg: syntax.fadedGray, bg: color.ui.primaryBg }),
    hi("ColorColumn", { bg: f(color.text.currentLineBorder, color.ui.primaryBg) }),
    hi("VertSplit", { fg: color.ui.border }),
    hi("WinSeparator", { fg: color.ui.border }),
    hi("EndOfBuffer", { fg: syntax.fadedGray }),
    hi("Folded", { fg: syntax.gray, bg: color.ui.secondaryBg }),
    hi("FoldColumn", { fg: syntax.fadedGray, bg: color.ui.primaryBg }),

    // status/tab line
    hi("StatusLine", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("StatusLineNC", { fg: color.text.muted, bg: color.ui.tertiaryBg }),
    hi("TabLine", { fg: color.text.muted, bg: color.ui.secondaryBg }),
    hi("TabLineFill", { bg: color.ui.secondaryBg }),
    hi("TabLineSel", { fg: syntax.fg, bg: color.ui.primaryBg, bold: true }),
    hi("WinBar", { fg: color.text.light, bg: color.ui.primaryBg }),
    hi("WinBarNC", { fg: syntax.fadedGray, bg: color.ui.secondaryBg }),

    // popup/completion menu
    hi("Pmenu", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("PmenuSel", { fg: syntax.fg, bg: color.ui.selectedBg, bold: true }),
    hi("PmenuSbar", { bg: color.ui.tertiaryBg }),
    hi("PmenuThumb", { bg: syntax.gray }),
    hi("PmenuMatch", { fg: syntax.pink, bg: color.ui.secondaryBg }),
    hi("PmenuMatchSel", { fg: syntax.pink, bg: color.ui.selectedBg, bold: true }),

    // search/selection
    hi("Search", { fg: syntax.fg, bg: f(color.text.matchBgA, color.ui.primaryBg) }),
    hi("IncSearch", { fg: color.ui.primaryBg, bg: color.accent.primary }),
    hi("CurSearch", { fg: color.ui.primaryBg, bg: color.accent.primary }),
    hi("Visual", { bg: f(color.text.selectionBgA, color.ui.primaryBg) }),
    hi("VisualNOS", { bg: f(color.text.secondarySelectionBgA, color.ui.primaryBg) }),
    hi("MatchParen", { fg: color.accent.primary, bold: true }),

    // messages / prompts
    hi("ModeMsg", { fg: syntax.green, bold: true}),
    hi("MsgArea", { fg: syntax.fg } ),
    hi("MoreMsg", { fg: color.accent.secondary } ),
    hi("Question", { fg: color.accent.secondary } ),
    hi("ErrorMsg", { fg: color.diag.error } ),
    hi("WarningMsg", { fg: color.diag.warning } ),

    // diff
    hi("DiffAdd", { bg: color.git.insertedBgA }),
    hi("DiffChange", { bg: color.diag.infoBgA }),
    hi("DiffDelete", { bg: color.git.removedBgA }),
    hi("DiffText", { bg: color.diag.infoBgA }),
    hi("Added", { fg: color.git.addedOrStaged }),
    hi("Changed", { fg: color.git.modified }),
    hi("Removed", { fg: color.git.removedOrConflicting }),

    // spell
    hi("SpellBad", { undercurl: true, sp: color.diag.error }),
    hi("SpellCap", { undercurl: true, sp: color.diag.warning }),
    hi("SpellRare", { undercurl: true, sp: color.diag.hint }),
    hi("SpellLocal", { undercurl: true, sp: color.diag.info }),

    // diagnostics
    hi("DiagnosticError", { fg: color.diag.error }),
    hi("DiagnosticWarn", { fg: color.diag.warning }),
    hi("DiagnosticInfo", { fg: color.diag.info }),
    hi("DiagnosticHint", { fg: color.diag.hint }),
    hi("DiagnosticVirtualTextError", { fg: color.diag.error, bg: color.diag.errorBg }),
    hi("DiagnosticVirtualTextWarn", { fg: color.diag.warning, bg: color.diag.warningBg }),
    hi("DiagnosticVirtualTextInfo", { fg: color.diag.info, bg: color.diag.infoBg }),
    hi("DiagnosticVirtualTextHint", { fg: color.diag.hint, bg: color.diag.hintBg }),
    hi("DiagnosticUnderlineError", { undercurl: true, sp: color.diag.error }),
    hi("DiagnosticUnderlineWarn", { undercurl: true, sp: color.diag.warning }),
    hi("DiagnosticUnderlineInfo", { undercurl: true, sp: color.diag.info }),
    hi("DiagnosticUnderlineHint", { undercurl: true, sp: color.diag.hint }),
    hi("DiagnosticSignError", { fg: color.diag.error }),
    hi("DiagnosticSignWarn", { fg: color.diag.warning }),
    hi("DiagnosticSignInfo", { fg: color.diag.info }),
    hi("DiagnosticSignHint", { fg: color.diag.hint }),
    hi("DiagnosticOk", { fg: color.diag.testPassed }),
    hi("OkMsg", { fg: color.diag.testPassed }),
    hi("DiagnosticDeprecated", { strikethrough: true }),
    // VS Code fades unused code to 75% opacity; approximate it on plain text
    hi("DiagnosticUnnecessary", { fg: f(a(syntax.fg, "C0"), color.ui.primaryBg) }),

    // Git signs
    hi("GitSignsAdd", { fg: color.git.addedOrStaged }),
    hi("GitSignsChange", { fg: color.git.modified }),
    hi("GitSignsDelete", { fg: color.git.removedOrConflicting }),

    // Misc UI
    hi("Directory", { fg: color.accent.secondary }),
    hi("Title", { fg: syntax.pink, bold: true }),
    hi("NonText", { fg: syntax.fadedGray }),
    hi("Whitespace", { fg: color.text.decoration.light }),
    hi("SpecialKey", { fg: syntax.fadedGray }),
    hi("Conceal", { fg: syntax.gray }),
    hi("QuickFixLine", { bg: color.text.currentLineBgA }),
    hi("qfLineNr", { fg: syntax.fadedGray }),

    // Base syntax
    hi("Comment", { fg: syntax.lightPink }),
    hi("Constant", { fg: syntax.orange }),
    hi("String", { fg: syntax.yellow }),
    hi("Character", { fg: syntax.orange }),
    hi("Number", { fg: syntax.orange }),
    hi("Boolean", { fg: syntax.orange }),
    hi("Float", { fg: syntax.orange }),

    hi("Identifier", { fg: syntax.fg }),
    hi("Function", { fg: syntax.green }),

    hi("Statement", { fg: syntax.pink }),
    hi("Conditional", { fg: syntax.pink }),
    hi("Repeat", { fg: syntax.pink }),
    hi("Label", { fg: syntax.lime }),
    hi("Operator", { fg: syntax.lightGreen }),
    hi("Keyword", { fg: syntax.pink }),
    hi("Exception", { fg: syntax.pink }),

    hi("PreProc", { fg: syntax.strongPink }),
    hi("Include", { fg: syntax.pink }),
    hi("Define", { fg: syntax.pink }),
    hi("Macro", { fg: syntax.strongPink }),
    hi("PreCondit", { fg: syntax.pink }),

    hi("Type", { fg: syntax.pink }),
    hi("StorageClass", { fg: syntax.pink }),
    hi("Structure", { fg: syntax.blue }),
    hi("Typedef", { fg: syntax.blue }),

    hi("Special", { fg: syntax.orange }),
    hi("SpecialChar", { fg: syntax.orange }),
    hi("Tag", { fg: syntax.pink }),
    hi("Delimiter", { fg: syntax.lightGreen }),
    hi("SpecialComment", { fg: syntax.lightPink }),
    hi("Debug", { fg: syntax.red }),

    hi("Underlined", { underline: true }),
    hi("Ignore", { fg: syntax.fadedGray }),
    hi("Error", { fg: syntax.red }),
    hi("Todo", { fg: syntax.fg, bold: true }),

    //// Treesitter https://neovim.io/doc/user/treesitter/#_treesitter-syntax-highlighting
    // identifiers
    hi("@variable", { fg: syntax.fg }),
    hi("@variable.builtin", { fg: syntax.pink }),
    hi("@variable.parameter", { fg: syntax.violet }),
    hi("@variable.parameter.builtin", { fg: syntax.orange }),
    hi("@variable.member", { fg: syntax.lightPurple }),
    hi("@variable.member.key", { fg: syntax.lightPurple }),
    hi("@property", { fg: syntax.lightPurple }),

    hi("@constant", { fg: syntax.orange }),
    hi("@constant.builtin", { fg: syntax.orange }),
    hi("@constant.macro", { fg: syntax.orange }),

    // strings
    hi("@string", { fg: syntax.yellow }),
    hi("@string.escape", { fg: syntax.orange }),
    hi("@string.special", { fg: syntax.orange }),
    hi("@string.regexp", { fg: syntax.orange }),
    hi("@character", { fg: syntax.orange }),
    hi("@character.special", { fg: syntax.orange }),
    hi("@number", { fg: syntax.orange }),
    hi("@number.float", { fg: syntax.orange }),
    hi("@boolean", { fg: syntax.orange }),

    // functions
    hi("@function", { fg: syntax.green }),
    hi("@function.builtin", { link: "@function" }),
    hi("@function.call", { link: "@function" }),
    hi("@function.macro", { fg: syntax.strongPink }),
    hi("@function.method", { link: "@function" }),
    hi("@function.method.call", { link: "@function" }),
    hi("@constructor", { fg: syntax.blue }),

    // keywords
    hi("@keyword", { fg: syntax.pink }),
    hi("@keyword.function", { link: "@keyword" }),
    hi("@keyword.operator", { link: "@keyword" }),
    hi("@keyword.import", { link: "@keyword" }),
    hi("@keyword.return", { link: "@keyword" }),
    hi("@keyword.coroutine", { link: "@keyword" }),
    hi("@keyword.conditional", { link: "@keyword" }),
    hi("@keyword.repeat", { link: "@keyword" }),
    hi("@keyword.exception", { link: "@keyword" }),
    hi("@keyword.modifier", { link: "@keyword" }),
    hi("@keyword.type", { link: "@keyword" }),
    hi("@keyword.debug", { fg: syntax.red }),

    // types
    hi("@type", { fg: syntax.blue }),
    hi("@type.builtin", { fg: builtinType }),
    hi("@type.definition", { fg: syntax.blue }),
    hi("@attribute", { fg: syntax.orange }),

    // punctuation
    hi("@punctuation.delimiter", { fg: syntax.lightGreen }),
    hi("@punctuation.bracket", { fg: syntax.lightGreen }),
    hi("@punctuation.special", { fg: syntax.lightGreen }),
    hi("@operator", { fg: syntax.lightGreen }),

    // namespaces/modules
    hi("@module", { fg: syntax.fg }),
    hi("@module.builtin", { fg: syntax.pink }),
    hi("@label", { fg: syntax.lime }),

    // markup/docs
    hi("@comment", { fg: syntax.lightPink }),
    hi("@comment.documentation", { fg: syntax.lightPink }),
    hi("@string.documentation", { fg: syntax.lightPink }), // Python docstrings

    hi("@markup.heading", { fg: syntax.pink, bold: true }),
    hi("@markup.strong", { fg: syntax.boldGreen, bold: true }),
    hi("@markup.italic", { fg: syntax.lightPink, italic: true }),
    hi("@markup.underline", { underline: true }),
    hi("@markup.strikethrough", { strikethrough: true }),
    hi("@markup.link", { fg: syntax.blue, underline: true }),
    hi("@markup.link.url", { fg: syntax.cornflower, underline: true }),
    hi("@markup.link.label", { fg: color.accent.secondary }),
    hi("@markup.raw", { fg: syntax.fg }),
    hi("@markup.raw.block", { fg: syntax.fg }),
    hi("@markup.list", { fg: syntax.cyan, bold: true }),
    hi("@markup.list.checked", { fg: syntax.cyan, bold: true }),
    hi("@markup.list.unchecked", { fg: syntax.cyan, bold: true }),
    hi("@markup.quote", { fg: syntax.yellow, italic: true }),
    hi("@markup.math", { fg: syntax.orange }),

    // diff
    hi("@diff.plus", { fg: color.git.addedOrStaged }),
    hi("@diff.minus", { fg: color.git.removedOrConflicting }),
    hi("@diff.delta", { fg: color.git.modified }),

    // tags (HTML/JSX),
    hi("@tag", { fg: syntax.pink }),
    hi("@tag.builtin", { fg: syntax.pink }),
    hi("@tag.attribute", { fg: syntax.cyan, italic: true }),
    hi("@tag.delimiter", { fg: syntax.lightGreen }),

    // deprecated symbols keep Neovim's strikethrough; the other LSP groups are at the end
    hi("@lsp.mod.deprecated", { link: "DiagnosticDeprecated" }),

    // telescope

    hi("TelescopeNormal", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("TelescopeBorder", { fg: color.ui.border, bg: color.ui.secondaryBg }),
    hi("TelescopePromptNormal", { fg: syntax.fg, bg: color.ui.selectedBg }),
    hi("TelescopePromptBorder", { fg: color.ui.border, bg: color.ui.selectedBg }),
    hi("TelescopePromptTitle", { fg: syntax.pink, bold: true }),
    hi("TelescopeResultsTitle", { fg: color.accent.secondary, bold: true }),
    hi("TelescopePreviewTitle", { fg: syntax.green, bold: true }),
    hi("TelescopeSelection", { bg: color.ui.selectedBg }),
    hi("TelescopeSelectionCaret", { fg: color.accent.primary }),
    hi("TelescopeMatching", { fg: syntax.pink, bold: true }),

    // nvim-tree
    hi("NvimTreeNormal", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("NvimTreeGitDirty", { fg: color.git.modified }),
    hi("NvimTreeGitNew", { fg: color.git.addedOrStaged }),
    hi("NvimTreeGitDeleted", { fg: color.git.removedOrConflicting }),
    hi("NvimTreeOpenedFile", { fg: color.accent.primary }),
    hi("NvimTreeRootFolder", { fg: syntax.pink, bold: true }),
    hi("NvimTreeFolderIcon", { fg: color.accent.secondary }),
    hi("NvimTreeFolderName", { fg: syntax.fg }),
    hi("NvimTreeIndentMarker", { fg: color.ui.border }),

    hi("NeoTreeNormal", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("NeoTreeNormalNC", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("NeoTreeRootName", { fg: syntax.pink, bold: true }),
    hi("NeoTreeGitAdded", { fg: color.git.addedOrStaged }),
    hi("NeoTreeGitModified", { fg: color.git.modified }),
    hi("NeoTreeGitDeleted", { fg: color.git.removedOrConflicting }),
    hi("NeoTreeGitUntracked", { fg: color.git.untracked }),

    // which-key
    hi("WhichKey", { fg: syntax.pink }),
    hi("WhichKeyGroup", { fg: color.accent.secondary }),
    hi("WhichKeyDesc", { fg: syntax.fg }),
    hi("WhichKeySeparator", { fg: syntax.fadedGray }),
    hi("WhichKeyFloat", { fg: syntax.fg, bg: color.ui.secondaryBg }),

    // indent guides (indent-blankline),
    hi("IblIndent", { fg: color.text.decoration.light }),
    hi("IblScope", { fg: color.accent.primary }),
    hi("IndentBlanklineChar", { fg: color.text.decoration.light }),
    hi("IndentBlanklineContextChar", { fg: color.accent.primary }),

    // noice/notify
    hi("NotifyERRORBorder", { fg: color.diag.error }),
    hi("NotifyWARNBorder", { fg: color.diag.warning }),
    hi("NotifyINFOBorder", { fg: color.diag.info }),
    hi("NotifyDEBUGBorder", { fg: syntax.fadedGray }),
    hi("NotifyTRACEBorder", { fg: syntax.purple }),

    hi("NotifyERRORTitle", { fg: color.diag.error }),
    hi("NotifyWARNTitle", { fg: color.diag.warning }),
    hi("NotifyINFOTitle", { fg: color.diag.info }),
    hi("NotifyDEBUGTitle", { fg: syntax.fadedGray }),
    hi("NotifyTRACETitle", { fg: syntax.purple }),

    hi("NotifyERRORIcon", { fg: color.diag.error }),
    hi("NotifyWARNIcon", { fg: color.diag.warning }),
    hi("NotifyINFOIcon", { fg: color.diag.info }),

    // mini statusline/lualine
    hi("lualine_a_normal", { fg: color.ui.primaryBg, bg: color.accent.primary, bold: true }),
    hi("lualine_b_normal", { fg: syntax.fg, bg: color.ui.secondaryBg }),
    hi("lualine_c_normal", { fg: color.text.muted, bg: color.ui.primaryBg }),

    // groups Neovim defines with its own palette
    hi("CursorColumn", { bg: f(color.text.currentLineBgA, color.ui.primaryBg) }),
    hi("FloatShadow", { bg: "#000000", blend: 80 }),
    hi("FloatShadowThrough", { bg: "#000000", blend: 100 }),
    hi("lCursor", { link: "Cursor" }),
    // inlay hints and code lens
    hi("LspInlayHint", { fg: color.text.decoration.codelens }),
    hi("LspCodeLens", { fg: color.text.decoration.codelens }),

    // LSP semantic tokens, matching `semanticTokenColors` in src/theme/semantic.ts (checked by test/nvim.test.ts).
    // Neovim adds font styles of overlapping groups and can't remove them, so type-level bold that VS Code
    // turns off for some modifiers (JS/TS variables vs `readonly`) is left out.
    "",
    "-- LSP semantic tokens",
    hi("@lsp.type.keyword", { fg: sem.keyword }),
    hi("@lsp.type.type", { fg: sem.type }),
    hi("@lsp.type.builtinType", { fg: sem.builtinType }),
    hi("@lsp.type.selfKeyword", { fg: sem.selfKeyword }),
    hi("@lsp.type.newOperator", { fg: sem.newOperator }),
    hi("@lsp.type.punctuation", { fg: sem.punctuation }),
    hi("@lsp.type.operator", { fg: sem.operator }),
    hi("@lsp.type.arithmetic", { fg: sem.arithmetic }),
    hi("@lsp.type.comparison", { fg: sem.comparison }),
    hi("@lsp.type.logical", { fg: sem.logical }),
    hi("@lsp.type.bitwise", { fg: sem.bitwise }),
    hi("@lsp.type.function", { fg: sem.function }),
    hi("@lsp.type.method", { fg: sem.method }),
    hi("@lsp.type.decorator", { fg: sem.decorator }),
    hi("@lsp.type.attribute", { fg: sem.attribute }),
    hi("@lsp.type.macro", { fg: sem.macro }),
    hi("@lsp.type.lifetime", { fg: sem.lifetime }),
    hi("@lsp.type.label", { fg: sem.label }),
    hi("@lsp.type.namespace", { fg: sem.namespace }),
    hi("@lsp.type.struct", { fg: sem.struct }),
    hi("@lsp.type.class", { fg: sem.class }),
    hi("@lsp.type.typeAlias", { fg: sem.typeAlias }),
    hi("@lsp.type.enum", { fg: sem.enum }),
    hi("@lsp.type.union", { fg: sem.union }),
    hi("@lsp.type.enumMember", { fg: sem.enumMember }),
    hi("@lsp.type.interface", { fg: sem.interface }),
    hi("@lsp.type.typeParameter", { fg: sem.typeParameter }),
    hi("@lsp.type.variable", { fg: sem.variable }),
    hi("@lsp.type.parameter", { fg: sem.parameter }),
    hi("@lsp.type.property", { fg: sem.property }),
    hi("@lsp.type.constant", { fg: sem.constant }),
    hi("@lsp.type.boolean", { fg: sem.boolean }),
    hi("@lsp.type.number", { fg: sem.number }),
    hi("@lsp.type.string", { fg: sem.string }),
    hi("@lsp.type.regexp", { fg: sem.regexp }),
    hi("@lsp.type.formatSpecifier", { fg: sem.formatSpecifier }),
    hi("@lsp.type.comment", { fg: sem.comment }),
    hi("@lsp.type.event", { fg: sem.event }),
    hi("@lsp.type.plainKeyword.cs", { fg: sem.keyword }),
    hi("@lsp.type.controlKeyword.cs", { fg: sem.keyword }),
    hi("@lsp.typemod.member.static.cs", { fg: sem.function, underline: true }),
    hi("@lsp.typemod.method.static.typescript", { fg: sem.method, underline: true }),
    hi("@lsp.type.member.cs", { fg: sem.method }),
    hi("@lsp.typemod.class.static.cs", { fg: sem.class, underline: true }),
    hi("@lsp.type.local.cs", { fg: sem.variable }),
    hi("@lsp.type.field.cs", { fg: sem.property }),
    hi("@lsp.typemod.field.static.cs", { fg: sem.property, underline: true }),
    hi("@lsp.type.property.cs", { fg: sem.property, bold: true }),
    hi("@lsp.typemod.property.static.cs", { fg: sem.property, bold: true, underline: true }),
    hi("@lsp.typemod.property.static.typescript", { fg: sem.property, underline: true }),
    hi("@lsp.mod.constant", { fg: sem.constant }),
    hi("@lsp.typemod.function.constant", { fg: sem.function }),
    hi("@lsp.typemod.method.constant", { fg: sem.method }),
    hi("@lsp.typemod.variable.static.cs", { fg: sem.constant }),
    hi("@lsp.typemod.variable.readonly.cs", { fg: sem.constant }),
    hi("@lsp.type.stringVerbatim.cs", { fg: sem.string }),
    hi("@lsp.type.unresolvedReference", { fg: sem.error }),
    hi("@lsp.type.macro.c", { underline: true }),
    hi("@lsp.type.macro.cpp", { underline: true }),
    hi("@lsp.type.xmlDocCommentText", { fg: sem.text }),
    hi("@lsp.type.xmlDocCommentName.cs", { fg: sem.comment }),
    hi("@lsp.type.xmlDocCommentDelimiter.cs", { fg: sem.comment }),
    hi("@lsp.type.xmlDocCommentAttributeName.cs", { fg: sem.attribute }),
    hi("@lsp.type.xmlDocCommentAttributeQuotes.cs", { fg: sem.string }),
    hi("@lsp.type.xmlDocCommentAttributeValue.cs", { fg: sem.string }),
    hi("@lsp.typemod.keyword.constant", { fg: sem.keyword }),
    hi("@lsp.typemod.operator.controlFlow.rust", { fg: sem.keyword }),
    hi("@lsp.type.label.rust", { fg: sem.label }),
    hi("@lsp.type.lifetime.rust", { fg: sem.lifetime }),
    hi("@lsp.type.formatSpecifier.rust", { fg: sem.formatSpecifier }),
    hi("@lsp.type.macroBang.rust", { fg: sem.macro }),
    hi("@lsp.typemod.variable.reference", { italic: true }),
    hi("@lsp.typemod.method.reference", { italic: true }),
    hi("@lsp.typemod.function.reference", { italic: true }),
    hi("@lsp.typemod.parameter.reference", { italic: true }),
    hi("@lsp.typemod.selfKeyword.reference", { italic: true }),
    hi("@lsp.typemod.variable.mutable", { fg: sem.mutVariable, bold: true }),
    hi("@lsp.typemod.method.mutable", { fg: sem.mutMethod, bold: true }),
    hi("@lsp.typemod.function.mutable", { fg: sem.mutFunction, bold: true }),
    hi("@lsp.typemod.parameter.mutable", { fg: sem.mutParameter, bold: true }),
    hi("@lsp.mod.unsafe", { fg: sem.unsafe }),
    hi("@lsp.typemod.keyword.unsafe", { bold: true, underline: true }),
    hi("@lsp.typemod.function.unsafe", { underline: true }),
    hi("@lsp.typemod.method.unsafe", { underline: true }),
    hi("@lsp.typemod.attributeBracket.attribute.rust", { fg: sem.attribute }),
    hi("@lsp.typemod.builtinAttribute.attribute.rust", { fg: sem.attribute }),
    hi("@lsp.typemod.toolModule.attribute.rust", { fg: sem.attribute }),
    hi("@lsp.typemod.decorator.attribute.rust", { fg: sem.attribute }),
    hi("@lsp.typemod.derive.attribute.rust", { fg: sem.attribute }),
    hi("@lsp.typemod.generic.attribute.rust", { fg: sem.attribute }),
    hi("@lsp.typemod.parenthesis.attribute.rust", { fg: sem.attribute }),
    hi("@lsp.type.tomlTableKey", { fg: sem.enum }),
    hi("@lsp.type.tomlArrayKey", { fg: sem.label }),
    hi("@lsp.type.decorator.java", { fg: sem.attribute }),
    hi("@lsp.type.decorator.kotlin", { fg: sem.attribute }),
    hi("@lsp.type.annotationMember.java", { fg: sem.property }),
    hi("@lsp.type.record.java", { fg: sem.class }),
    hi("@lsp.type.recordComponent.java", { fg: sem.property }),
    hi("@lsp.type.selfParameter", { fg: sem.selfKeyword }),
    hi("@lsp.type.clsParameter", { fg: sem.selfKeyword }),
    hi("@lsp.typemod.class.builtin.python", { fg: sem.builtinType }),
    hi("@lsp.typemod.variable.readonly.python", { fg: sem.constant }),
    hi("@lsp.type.builtinConstant", { fg: sem.constant }),
    hi("@lsp.typemod.string.documentation.python", { fg: sem.comment }),
    hi("@lsp.typemod.type.defaultLibrary.c", { fg: sem.builtinType }),
    hi("@lsp.typemod.type.defaultLibrary.cpp", { fg: sem.builtinType }),
    hi("@lsp.type.property.nix", { fg: sem.variable }),
    hi("@lsp.typemod.property.definition.nix", { fg: sem.property }),
    hi("@lsp.typemod.variable.definition.nix", { fg: sem.property }),
    hi("@lsp.type.parameter.nix", { fg: sem.variable }),
    hi("@lsp.typemod.parameter.definition.nix", { fg: sem.parameter }),
    hi("@lsp.typemod.struct.builtin.nix", { fg: sem.constant }),
    hi("@lsp.type.path.nix", { fg: sem.string }),
    hi("@lsp.type.method.nix", { fg: sem.property }),
    hi("@lsp.type.type.nix", { fg: sem.variable }),
    hi("@lsp.type.regexp.nix", { fg: sem.parameter }),
    hi("@lsp.type.macro.nix", { fg: sem.boolean }),
    hi("@lsp.type.interface.nix", { fg: sem.variable }),
    hi("@lsp.typemod.keyword.static.nix", { fg: sem.function }),
  ];

  // Neovim highlight groups can't have alpha, so composite any #RRGGBBAA color over editor background
  const body = groups.join("\n").replace(
    /#[0-9A-Fa-f]{8}/g,
    m => f(m, color.ui.primaryBg)
  );

  return `-- ${colorsName} Theme

vim.opt.background = "${background}"
vim.cmd("highlight clear")
if vim.fn.exists("syntax_on") == 1 then
  vim.cmd("syntax reset")
end
vim.g.colors_name = "${colorsName}"

local function hi(group, opts)
  opts.default = false
  vim.api.nvim_set_hl(0, group, opts)
end

${terminalColors.map((c, i) => `vim.g.terminal_color_${i} = "${f(c, color.ui.primaryBg)}"`).join("\n")}

${body}
`;
}

