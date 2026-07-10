import type { AsciiProgram } from "./AsciiCanvas";

/**
 * Sparse wobbly field — layered sine domain-warp, kept below a threshold so
 * it reads as drifting texture behind content instead of a wall of noise.
 */
export function wobbleField({
  density = 0.42,
  accentChance = 0.985,
  accent = "#00d4ff",
  fps = 18,
}: { density?: number; accentChance?: number; accent?: string; fps?: number } = {}): AsciiProgram {
  return {
    fps,
    main(x, y, ctx) {
      const t = ctx.time * 0.55;
      const xi = x / ctx.cellAspect; // isotropic coords
      const warp = Math.sin(y * 0.11 + t + Math.sin(xi * 0.07 - t * 0.8) * 2.2);
      const v =
        0.5 + 0.5 * Math.sin(xi * 0.16 + warp * 1.9 + t) * Math.sin(y * 0.13 - t * 0.4);
      if (v < 1 - density) return null;
      const n = (v - (1 - density)) / density;
      // rare accent cells drifting through the field
      const sparkle = Math.sin(xi * 12.9898 + y * 78.233 + Math.floor(t * 2)) * 0.5 + 0.5;
      if (n > 0.6 && sparkle > accentChance) {
        return { char: "+", color: accent };
      }
      return n * 0.55;
    },
  };
}

/**
 * Falling telemetry columns — sparse vertical streams, monochrome with
 * accent-colored heads. Deterministic per column so it loops cleanly.
 */
export function dataStream({
  fps = 20,
  gap = 3,
  accent = "#e4b503",
}: { fps?: number; gap?: number; accent?: string } = {}): AsciiProgram {
  const CHARS = "01<>[]{}|/\\-_=+*";
  const hash = (n: number) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  return {
    fps,
    main(x, y, ctx) {
      if (x % gap !== 0) return null;
      const col = x / gap;
      const speed = 2.5 + hash(col) * 6;
      const len = 4 + Math.floor(hash(col * 7.77) * 10);
      const cycle = ctx.rows + len + 20 + hash(col * 3.3) * 30;
      const head = (ctx.time * speed + hash(col * 13.7) * cycle) % cycle;
      const d = head - y;
      if (d < 0 || d > len) return null;
      const charSeed = hash(col * 31.7 + y * 7.3 + Math.floor(ctx.time * 2));
      const char = CHARS[Math.floor(charSeed * CHARS.length)];
      if (d < 1) return { char, color: accent };
      const fade = 1 - d / len;
      return { char, color: `rgba(242,242,236,${(0.08 + fade * 0.3).toFixed(3)})` };
    },
  };
}
