import { test } from "node:test";
import * as assert from "node:assert/strict";
import { DEFAULT_CONFIG, type Config } from "../src/config";
import { generateSemanticTheme, generateSemanticThemeColors } from "../src/theme/semantic";
import type { SyntaxColors, UiColors } from "../src/theme";
import { darkColors, darkSyntax } from "../src/dark";
import { blackContrastColors, blackContrastSyntax } from "../src/black-contrast";
import { lightColors, lightSyntax } from "../src/light";
import { generateLua } from "../build/buildNvimTheme";

const config = DEFAULT_CONFIG as unknown as Config;

// vsc language ids that differ from nvim filetypes.
const filetypes: Record<string, string> = { csharp: "cs" };
// SemanticThemeColors keys that are spread into semanticTokenColors but aren't LSP token types.
const notTokenTypes = new Set(["text", "faded", "mutVariable", "mutParameter", "mutFunction", "mutMethod", "error", "unsafe", "escapeSequence", "character"]);
const fontStyles = ["bold", "italic", "underline", "strikethrough"];

type Style = { fg?: string; styles: string[] };

// nvim `@lsp.*` groups expected by `semanticTokenColors`
function expectedGroups(syntax: SyntaxColors): Map<string, Style> {
	const rules = generateSemanticTheme(generateSemanticThemeColors(syntax, config), config);
	// nvim can't unset font styles, so type-level styles that VS Code resets for a modifier aren't expected.
	const resetFor = new Set<string>();
	for (const [selector, value] of Object.entries(rules)) {
		const [head = "", lang = ""] = selector.split(":");
		const [type = "", ...mods] = head.split(".");
		if (mods.length === 1 && typeof value === "object" && value.fontStyle === "") resetFor.add(`${type}:${lang}`);
	}
	const out = new Map<string, Style>();
	for (const [selector, value] of Object.entries(rules)) {
		const [head = "", lang = ""] = selector.split(":");
		const [type = "", ...mods] = head.split(".");
		// nvim has no group for several modifiers at once.
		if (mods.length > 1 || notTokenTypes.has(type)) continue;
		const ft = lang ? "." + (filetypes[lang] ?? lang) : "";
		const group =
			type === "*" ? `@lsp.mod.${mods[0]}${ft}`
			: mods.length === 1 ? `@lsp.typemod.${type}.${mods[0]}${ft}`
			: `@lsp.type.${type}${ft}`;
		if (type === "*" && mods.length !== 1) continue;
		const style = typeof value === "string" ? { foreground: value } : value;
		const styles = String(style.fontStyle ?? "").split(" ").filter((w) => fontStyles.includes(w));
		if (!style.foreground && styles.length === 0) continue;
		if (!style.foreground && mods.length === 0 && resetFor.has(`${type}:${lang}`)) continue;
		out.set(group, { fg: style.foreground?.toUpperCase(), styles: styles.sort() });
	}
	return out;
}

/** The `@lsp.*` groups in the generated Lua. */
function luaGroups(lua: string): Map<string, Style> {
	const out = new Map<string, Style>();
	for (const m of lua.matchAll(/^hi\("(@lsp\.[^"]+)", \{ (.*) \}\)$/gm)) {
		const fields = Object.fromEntries([...m[2]!.matchAll(/(\w+) = ("[^"]*"|\w+)/g)].map((f) => [f[1], f[2]!.replace(/"/g, "")]));
		if (fields["link"]) continue;
		out.set(m[1]!, { fg: fields["fg"]?.toUpperCase(), styles: fontStyles.filter((s) => fields[s] === "true").sort() });
	}
	return out;
}

const themes: [string, "dark" | "light", UiColors, SyntaxColors][] = [
	["prismatic-pink", "dark", darkColors, darkSyntax],
	["prismatic-pink-contrast", "dark", blackContrastColors, blackContrastSyntax],
	["prismatic-pink-light", "light", lightColors, lightSyntax],
];

for (const [name, background, colors, syntax] of themes) {
	test(`${name}: nvim LSP groups match the VS Code semantic token colors`, () => {
		const expected = expectedGroups(syntax);
		const actual = luaGroups(generateLua(name, background, colors, syntax));
		for (const [group, style] of expected) {
			assert.deepEqual(actual.get(group), style, `${group} differs from semanticTokenColors`);
		}
		for (const group of actual.keys()) {
			assert.ok(expected.has(group), `${group} has no matching semanticTokenColors rule`);
		}
	});
}
