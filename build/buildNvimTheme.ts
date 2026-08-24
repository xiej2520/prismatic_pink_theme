import * as fs from "fs";
import * as path from "path";
import { darkColors, darkSyntax } from "../src/dark";
import { blackContrastColors, blackContrastSyntax } from "../src/black-contrast";
import { lightColors, lightSyntax } from "../src/light";
import type { UiColors, SyntaxColors } from "../src/theme";
import { DEFAULT_CONFIG, type Config } from "../src/config";
import { selectAnsiColors } from "../src/theme/terminal";

import { flatten as f } from "../src/color";
import { makeOutputFolder } from "./buildEnv";

const config = DEFAULT_CONFIG as unknown as Config;

const folder = makeOutputFolder("themes");
createTheme(path.join(folder, "prismatic-pink.lua"), "prismatic-pink", "dark", darkColors, darkSyntax);
createTheme(path.join(folder, "prismatic-pink-contrast.lua"), "prismatic-pink-contrast", "dark", blackContrastColors, blackContrastSyntax);
createTheme(path.join(folder, "prismatic-pink-light.lua"), "prismatic-pink-light", "light", lightColors, lightSyntax);

function createTheme(filePath: string, colorsName: string, background: "light" | "dark", color: UiColors, syntax: SyntaxColors) {
  console.log(`Writing Neovim colors "${colorsName}" to ${filePath}`);
  fs.writeFileSync(filePath, generateLua(colorsName, background, color, syntax));
}

function hi(group: string, opts: Record<string, string | boolean>): string {
  const fields = Object.entries(opts)
    .map(([key, value]) => (typeof value === "string" ? `${key} = "${value}"` : `${key} = ${value}`))
    .join(", ");
  return `hi("${group}", { ${fields} })`;
}

function generateLua(colorsName: string, background: "dark" | "light", color: UiColors, syntax: SyntaxColors): string {
  const ansi = selectAnsiColors(color, background, config);
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
    hi("@type.builtin", { fg: syntax.pink }),
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

    hi("@markup.heading", { fg: syntax.pink, bold: true }),
    hi("@markup.strong", { fg: syntax.green, bold: true }),
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

    // LSP semantic token fallbacks

    //- Standard LSP token types
    hi("@lsp.type.namespace", { fg: syntax.fg }),

    hi("@lsp.type.type", { fg: syntax.blue }),
    hi("@lsp.type.class", { fg: syntax.blue }),
    hi("@lsp.type.struct", { fg: syntax.blue }),
    hi("@lsp.type.enum", { fg: syntax.blue }),
    hi("@lsp.type.interface", { fg: syntax.cornflower }),
    hi("@lsp.type.typeParameter", { fg: syntax.skyBlue }),

    hi("@lsp.type.parameter", { fg: syntax.violet }),
    hi("@lsp.type.variable", { fg: syntax.fg }),
    hi("@lsp.type.property", { fg: syntax.lightPurple }),
    hi("@lsp.type.enumMember", { fg: syntax.cyan }),

    hi("@lsp.type.function", { fg: syntax.green }),
    hi("@lsp.type.method", { fg: syntax.green }),
    hi("@lsp.type.decorator", { fg: syntax.green }),
    hi("@lsp.type.macro", { fg: syntax.strongPink }),

    hi("@lsp.type.modifier", { fg: syntax.pink }),

    hi("@lsp.type.keyword", { fg: syntax.pink }),
    hi("@lsp.type.operator", { fg: syntax.lightGreen }),

    hi("@lsp.type.string", { fg: syntax.yellow }),
    hi("@lsp.type.number", { fg: syntax.orange }),
    hi("@lsp.type.regexp", { fg: syntax.orange }),

    hi("@lsp.type.comment", { fg: syntax.lightPink }),
    hi("@lsp.type.event", { fg: syntax.lime }),

    //- Standard LSP modifiers
    hi("@lsp.mod.abstract", {}),
    hi("@lsp.mod.async", {}),
    hi("@lsp.mod.declaration", {}),
    hi("@lsp.mod.defaultLibrary", {}),
    hi("@lsp.mod.definition", {}),
    hi("@lsp.mod.deprecated", {}),
    hi("@lsp.mod.documentation", {}),
    hi("@lsp.mod.modification", {}),
    hi("@lsp.mod.readonly", {}),
    hi("@lsp.mod.static", {}),

    //- LSP extensions
    hi("@lsp.type.builtinType", { fg: syntax.pink }),
    hi("@lsp.type.label", { fg: syntax.lime }),
    //// rust-analyzer
    hi("@lsp.type.lifetime", { fg: syntax.purple }),
    hi("@lsp.type.selfKeyword", { fg: syntax.pink }),
    hi("@lsp.type.formatSpecifier", { fg: syntax.purple }),

    hi("@lsp.mod.mutable", { bold: true }),
    hi("@lsp.mod.reference", { italic: true }),
    hi("@lsp.mod.unsafe", { fg: syntax.red }),

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
    hi("NotifyTRAcolor.ui.border", { fg: syntax.purple }),

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
  ];

  // Neovim highlight groups can't have alpha, so composite any #RRGGBBAA color over editor background
  const body = groups.join("\n").replace(
    /#[0-9A-Fa-f]{8}/g,
    m => f(m, color.ui.primaryBg)
  );

  return `-- ${colorsName} Theme

vim.opt.background = "${background}"
vim.cmd("highlight clear")
if vim.fn.exists("syntax_on") then
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

