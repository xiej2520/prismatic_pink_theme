import { test } from "node:test";
import * as assert from "node:assert/strict";
import { alpha as a, flatten as f } from "../src/color";

test("alpha: hex string attaches the alpha channel", () => {
	assert.equal(a("#FF2884", "40"), "#FF288440");
});

test("alpha: fraction attaches the hex string", () => {
	assert.equal(a("#FF2884", 0.25), "#FF288440");
});

test("alpha: fraction clamped to [0, 1]", () => {
	assert.equal(a("#FF2884", 2), "#FF2884FF");
	assert.equal(a("#FF2884", -1), "#FF288400");
});

test("alpha: replace existing alpha", () => {
	assert.equal(a("#FF288480", "40"), "#FF288440");
});

test("flatten: translucent foreground over background", () => {
	assert.equal(f("#FF4C986A", "#1E1E22"), "#7C3153");
});

test("flatten: opaque foreground over background", () => {
	assert.equal(f("#FF4C98FF", "#1E1E22"), "#FF4C98");
	assert.equal(f("#FF4C98", "#1E1E22"), "#FF4C98");
});

test("flatten: transparent foreground over background", () => {
	assert.equal(f("#FF4C9800", "#1E1E22"), "#1E1E22");
});

test("shorthand #RGB(A)", () => {
	assert.equal(a("#F28", "40"), "#FF228840");
	assert.equal(f("#F286", "#1E1E22"), f("#FF228866", "#1E1E22"));
});

test("invalid hex strings throw", () => {
	assert.throws(() => a("not-color", "40"));
	assert.throws(() => f("#12345", "#1E1E22"));
});
