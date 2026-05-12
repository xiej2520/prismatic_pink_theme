function parse(hex: string): [number, number, number, number] {
  let h = hex.replace(/^#/, "");
  if (h.length === 3 || h.length === 4){
    h = h.split("").map(c => c + c).join("");
  }
  if (h.length !== 6 && h.length !== 8) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) : 255;
  return [r, g, b, a];
}

const toByte = (n: number) => Math.round(n).toString(16).padStart(2, "0").toUpperCase();

function format(r: number, g: number, b: number, a?: number): string {
  const base = `#${toByte(r)}${toByte(g)}${toByte(b)}`;
  return a === undefined ? base : base + toByte(a);
}

// add alpha channel to 6-char hex, a in [0, 1] or hex
export function alpha(hex: string, a: number | string): string {
  const [r, g, b] = parse(hex);
  const aa = typeof a === "string" ? parseInt(a, 16) : Math.round(Math.min(1, Math.max(0, a)) * 255);
  return format(r, g, b, aa);
}

export function flatten(foreground: string, background: string): string {
  const [fr, fg, fb, fa] = parse(foreground);
  const [br, bg, bb, ba] = parse(background);

  const foregroundAlpha = fa / 255;
  const backgroundAlpha = ba / 255;

  const alpha = foregroundAlpha + backgroundAlpha * (1 - foregroundAlpha);

  if (alpha === 0) {
    return format(0, 0, 0);
  }

  const blend = (f: number, b: number) =>
    (f * foregroundAlpha + b * backgroundAlpha * (1 - foregroundAlpha)) / alpha;

  return format(
    blend(fr, br),
    blend(fg, bg),
    blend(fb, bb)
  );
}
