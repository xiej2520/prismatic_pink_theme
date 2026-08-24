import { CACHE_FILE } from "./paths";
import * as fs from "fs";
// require `vscode` lazily in `getConfig`/`resetConfig` so build scripts don't import them

// Note: the accepted values should be kept in-line with `package.json`.
// Register deprecated settings with their old key, `getConfig` falls back to reading it.

export interface SettingDef<T> {
	key: string;
	legacyVscodeKeys?: string[];
	migrateLegacy?: (raw: unknown) => T | undefined;
	default: T;
	isValid: (v: unknown) => boolean;
}

function stringEnum<T extends string>(...values: T[]) {
	return (v: unknown): v is T => typeof v === "string" && (values as string[]).includes(v);
}

const isBoolean = (v: unknown): v is boolean => typeof v === "boolean";

export const SETTINGS: SettingDef<any>[] = [
	{
		key: "markdownSyntaxStyle",
		legacyVscodeKeys: ["mutedMarkdownPlaintext"],
		migrateLegacy: (raw) =>
			raw === true ? "mutedPlaintext" : raw === false ? "traditional" : undefined,
		default: "traditional",
		isValid: stringEnum("traditional", "mutedPlaintext", "mutedPunctuation"),
	},
	{
		key: "italicComments",
		legacyVscodeKeys: ["italicizedComments"],
		default: false,
		isValid: isBoolean,
	},
	{
		key: "mutedComments",
		default: false,
		isValid: isBoolean,
	},
	{
		key: "altCurrentLine",
		legacyVscodeKeys: ["alternateCurrentLineStyle"],
		default: false,
		isValid: isBoolean,
	},
	{
		key: "monochromeBracketGuides",
		legacyVscodeKeys: ["monochromeBracketPairGuides"],
		default: false,
		isValid: isBoolean,
	},
	{
		key: "inlayStyle",
		legacyVscodeKeys: ["inlayHintStyle"],
		default: "noBackground",
		isValid: stringEnum("noBackground", "faintBackground", "accent", "accentBackground"),
	},
	{
		key: "lightTerminalColorScheme",
		legacyVscodeKeys: ["light.terminalColorScheme"],
		default: "normal+dark",
		isValid: stringEnum("normal+dark", "normal+light", "dark+normal"),
	},
	{
		key: "globalAccent",
		default: "disabledStatusBar",
		isValid: stringEnum("everywhere", "disabledStatusBar", "minimal"),
	},
	{
		key: "boldDefaultMutableVariables",
		default: false,
		isValid: isBoolean,
	},
];

export const DEFAULT_CONFIG = Object.fromEntries(SETTINGS.map((s) => [s.key, s.default])) as {
	markdownSyntaxStyle: "traditional" | "mutedPlaintext" | "mutedPunctuation";
	italicComments: boolean;
	mutedComments: boolean;
	altCurrentLine: boolean;
	monochromeBracketGuides: boolean;
	inlayStyle: "noBackground" | "faintBackground" | "accent" | "accentBackground";
	lightTerminalColorScheme: "normal+dark" | "normal+light" | "dark+normal";
	globalAccent: "everywhere" | "disabledStatusBar" | "minimal";
	boldDefaultMutableVariables: boolean;
};

export type ConfigValues = typeof DEFAULT_CONFIG;

export class Config {
	constructor(public values: ConfigValues) {}

	get markdownSyntaxStyle() {
		return this.values.markdownSyntaxStyle;
	}
	get italicComments() {
		return this.values.italicComments;
	}
	get mutedComments() {
		return this.values.mutedComments;
	}
	get altCurrentLine() {
		return this.values.altCurrentLine;
	}
	get monochromeBracketGuides() {
		return this.values.monochromeBracketGuides;
	}
	get inlayStyle() {
		return this.values.inlayStyle;
	}
	get lightTerminalColorScheme() {
		return this.values.lightTerminalColorScheme;
	}
	get globalAccent() {
		return this.values.globalAccent;
	}
	get boldDefaultMutableVariables() {
		return this.values.boldDefaultMutableVariables;
	}

	/**
	 * The default configuration settings.
	 */
	static DEFAULT: Config = new Config(DEFAULT_CONFIG);

	/**
	 * Returns whether the theme configuration has been modified since the last time it was written to the cache.
	 */
	isModified(): boolean {
		// If there is no cache, then we need to assume that the configuration has been modified. We also want to
		// create the cache file for future use.
		if (!fs.existsSync(CACHE_FILE)) {
			this.writeToCache();
			return true;
		}

		try {
			const cached =
				JSON.parse(fs.readFileSync(CACHE_FILE, { encoding: "utf8" })).values ?? {};
			return SETTINGS.some((s) => (this as any)[s.key] !== cached[s.key]);
		} catch {
			return true;
		}
	}

	/**
	 * Writes the configuration to the cache file.
	 */
	writeToCache() {
		fs.writeFileSync(CACHE_FILE, JSON.stringify(this, undefined, 4), { encoding: "utf8" });
	}
}

/**
 * Returns the current configuration of the theme.
 */
export function getConfig(): Config {
	const vscode: typeof import("vscode") = require("vscode");
	const config = vscode.workspace.getConfiguration("theme-prismatic-pink");

	const values = {} as Record<string, unknown>;
	for (const s of SETTINGS) {
		const raw = config.inspect(s.key)?.globalValue;
		if (raw !== undefined && s.isValid(raw)) {
			values[s.key] = raw;
			continue;
		}
		const legacyRaw = s.legacyVscodeKeys
			?.map((k) => config.inspect(k)?.globalValue)
			.find((v) => v !== undefined);
		if (legacyRaw !== undefined) {
			const migrated = s.migrateLegacy ? s.migrateLegacy(legacyRaw) : legacyRaw;
			if (migrated !== undefined && s.isValid(migrated)) {
				values[s.key] = migrated;
				continue;
			}
		}
		values[s.key] = s.default;
	}
	return new Config(values as ConfigValues);
}

/**
 * Resets the configuration of the theme to the default settings by undefining every configuration key, and resets
 * the cache as well.
 */
export function resetConfig() {
	Config.DEFAULT.writeToCache();
	const vscode: typeof import("vscode") = require("vscode;");
	const config = vscode.workspace.getConfiguration("theme-prismatic-pink");
	for (const s of SETTINGS) {
		config.update(s.key, undefined, true);
		for (const legacyKey of s.legacyVscodeKeys ?? []) {
			config.update(legacyKey, undefined, true);
		}
	}
}
