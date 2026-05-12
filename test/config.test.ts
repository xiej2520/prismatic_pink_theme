import { test } from "node:test";
import * as assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import { DEFAULT_CONFIG, SETTINGS } from "../src/config";

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"),
);

const properties = packageJson.contributes.configuration.properties;
const EXTENSION_PREFIX = "theme-prismatic-pink.";

const DEPRECATED_KEYS = new Set(["mutedMarkdownPlaintext", ...SETTINGS.flatMap(s => s.legacyVscodeKeys ?? [])]);

test("every SETTINGS entry has a matching package.json configuration property", () => {
  for (const s of SETTINGS) {
    const key = `${EXTENSION_PREFIX}${s.key}`;
    assert.ok(key in properties, `package.json is missing configuration property "${key}`);
  }
});

test("every current package.json configuration property has a matching SETTINGS entry", () => {
  const settingsKeys = new Set(SETTINGS.map(s => s.key));
  for (const fullKey of Object.keys(properties)) {
    const key = fullKey.slice(EXTENSION_PREFIX.length);
    if (DEPRECATED_KEYS.has(key)) {
      continue;
    }
    assert.ok(settingsKeys.has(key), `SETTINGS is missing an entry for "${fullKey}"`);
  }
});

test("every legacyVscodeKeys entry has a matching deprecated package.json property", () => {
  for (const s of SETTINGS) {
    for (const legacyKey of s.legacyVscodeKeys ?? []) {
      const key = `${EXTENSION_PREFIX}${legacyKey}`;
      assert.ok(key in properties, `package.json is missing deprecated config "${key}"`);
      assert.ok(properties[key].deprecationMessage, `"${key}" should be marked deprecated`);
    }
  }
})

test("DEFAULT_CONFIG matches package.json defaults", () => {
  for (const s of SETTINGS) {
    const prop = properties[`${EXTENSION_PREFIX}${s.key}`];
    assert.equal((DEFAULT_CONFIG as any)[s.key], prop.default, `${s.key} default mismatch`)
  }
});

test("every SETTINGS default isValid", () => {
  for (const s of SETTINGS) {
    assert.ok(s.isValid(s.default), `${s.key} default isn't valid`);
  }
});
