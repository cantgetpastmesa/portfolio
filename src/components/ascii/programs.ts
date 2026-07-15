import type { AsciiProgram } from "./AsciiCanvas";

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

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

/**
 * Oscilloscope — two slow waveform traces drifting over a faint center
 * graticule, like a scope monitoring a live channel. CH1 is the accent,
 * amplitude-modulated so bursts travel across the screen; CH2 is a calmer
 * white reference. Traces render at half-cell vertical resolution via ▀/▄.
 */
export function oscilloscope({
  accent = "#e4b503",
  fps = 30,
}: { accent?: string; fps?: number } = {}): AsciiProgram {
  const ch1 = accent;
  const ch1Glow = rgba(accent, 0.35);
  const ch2 = "rgba(242,242,236,0.45)";
  const ch2Glow = "rgba(242,242,236,0.16)";
  const axis = "rgba(242,242,236,0.13)";
  return {
    fps,
    main(x, y, ctx) {
      const t = ctx.time;
      const cy = ctx.rows * 0.5;

      // CH1 — composite signal with a drifting amplitude envelope
      const env = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin((x / ctx.cols) * 5.2 - t * 0.8));
      const amp = ctx.rows * 0.24 * env;
      const y1 =
        cy + (Math.sin(x * 0.09 + t * 1.3) * 0.65 + Math.sin(x * 0.021 - t * 0.45) * 0.35) * amp;
      const d1 = Math.abs(y - y1);
      if (d1 < 0.5) return { char: y1 - Math.floor(y1) < 0.5 ? "▀" : "▄", color: ch1 };

      // CH2 — slower, fainter reference trace
      const y2 =
        cy +
        Math.sin(x * 0.05 - t * 0.6) * ctx.rows * 0.12 +
        Math.sin(x * 0.013 + t * 0.22) * ctx.rows * 0.07;
      const d2 = Math.abs(y - y2);
      if (d2 < 0.5) return { char: y2 - Math.floor(y2) < 0.5 ? "▀" : "▄", color: ch2 };

      // soft glow around each trace, then the graticule
      if (d1 < 1.6) return { char: "·", color: ch1Glow };
      if (d2 < 1.6) return { char: "·", color: ch2Glow };
      if (y === Math.floor(cy)) return { char: x % 10 === 0 ? "+" : "·", color: axis };
      return null;
    },
  };
}

/**
 * Golgol — port of ertdfgcvb's "Golgol" (play.ertdfgcvb.xyz/#/src/demos/gol_double_res),
 * based on Alex Miller's Game of Life. Three box chars (plus space) let each
 * char host two vertical automata cells for double resolution: '█' both,
 * '▀' upper, '▄' lower, ' ' neither. State lives in two buffers swapped by
 * frame parity; the grid is bounded (out-of-range neighbors count 0), seeded
 * 50% random, and pressing/dragging the pointer fills an 11×11 random rect.
 * Differences from the original: cells render in a single accent color
 * instead of the default foreground, and the debug info box is dropped.
 */
export function golgol({
  color = "#4f7dff",
  fps = 30,
}: { color?: string; fps?: number } = {}): AsciiProgram {
  let cols = 0;
  let rows = 0;
  const data: Uint8Array[] = [new Uint8Array(0), new Uint8Array(0)];

  const get = (x: number, y: number, w: number, h: number, buf: Uint8Array) => {
    if (x < 0 || x >= w) return 0;
    if (y < 0 || y >= h) return 0;
    return buf[y * w + x];
  };
  const set = (val: number, x: number, y: number, w: number, h: number, buf: Uint8Array) => {
    if (x < 0 || x >= w) return;
    if (y < 0 || y >= h) return;
    buf[y * w + x] = val;
  };

  return {
    fps,
    begin(ctx) {
      // the window has been resized (or "init"), reset the buffers
      if (cols !== ctx.cols || rows !== ctx.rows) {
        cols = ctx.cols;
        rows = ctx.rows;
        const len = cols * rows * 2; // double height
        data[0] = new Uint8Array(len);
        data[1] = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          const v = Math.random() > 0.5 ? 1 : 0;
          data[0][i] = v;
          data[1][i] = v;
        }
      }

      const prev = data[ctx.frame % 2];
      const curr = data[(ctx.frame + 1) % 2];
      const w = cols;
      const h = rows * 2;

      // fill a random rect while the pointer is pressed
      if (ctx.pointer.pressed) {
        const cx = Math.floor(ctx.pointer.x);
        const cy = Math.floor(ctx.pointer.y * 2);
        const s = 5;
        for (let y = cy - s; y <= cy + s; y++) {
          for (let x = cx - s; x <= cx + s; x++) {
            set(Math.random() < 0.5 ? 1 : 0, x, y, w, h, prev);
          }
        }
      }

      // update the automata
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const current = get(x, y, w, h, prev);
          const neighbors =
            get(x - 1, y - 1, w, h, prev) +
            get(x, y - 1, w, h, prev) +
            get(x + 1, y - 1, w, h, prev) +
            get(x - 1, y, w, h, prev) +
            get(x + 1, y, w, h, prev) +
            get(x - 1, y + 1, w, h, prev) +
            get(x, y + 1, w, h, prev) +
            get(x + 1, y + 1, w, h, prev);
          const i = x + y * w;
          if (current === 1) {
            curr[i] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            curr[i] = neighbors === 3 ? 1 : 0;
          }
        }
      }
    },
    main(x, y, ctx) {
      const curr = data[(ctx.frame + 1) % 2];
      const idx = x + y * 2 * cols;
      const upper = curr[idx];
      const lower = curr[idx + cols];
      if (upper && lower) return { char: "█", color };
      if (upper) return { char: "▀", color };
      if (lower) return { char: "▄", color };
      return null;
    },
  };
}

/**
 * Raymarched cube — a rounded box SDF spun on two axes, lambert-shaded onto
 * the density ramp with a quantized accent glow around near-miss rays.
 * Rays that miss the bounding sphere exit before marching, so the cost stays
 * concentrated where the cube actually is.
 */
export function sdfCube({
  accent = "#4f7dff",
  fps = 20,
}: { accent?: string; fps?: number } = {}): AsciiProgram {
  const RAMP = ".:-=+*#%@";
  const hot = accent;
  const mid = rgba(accent, 0.55);
  const dim = rgba(accent, 0.3);
  const glow = [rgba(accent, 0.1), rgba(accent, 0.2), rgba(accent, 0.32)];
  const OZ = -4.4;
  const B = 0.78; // half-extent
  let sx = 0, cxr = 1, sy = 0, cyr = 1;

  const sdf = (px: number, py: number, pz: number) => {
    // rotY then rotX
    const x1 = cyr * px + sy * pz;
    const z1 = -sy * px + cyr * pz;
    const y2 = cxr * py - sx * z1;
    const z2 = sx * py + cxr * z1;
    const qx = Math.abs(x1) - B;
    const qy = Math.abs(y2) - B;
    const qz = Math.abs(z2) - B;
    const ox = Math.max(qx, 0);
    const oy = Math.max(qy, 0);
    const oz = Math.max(qz, 0);
    return (
      Math.sqrt(ox * ox + oy * oy + oz * oz) +
      Math.min(Math.max(qx, Math.max(qy, qz)), 0) -
      0.06
    );
  };

  return {
    fps,
    begin(ctx) {
      const t = ctx.time;
      sx = Math.sin(t * 0.35);
      cxr = Math.cos(t * 0.35);
      sy = Math.sin(t * 0.55);
      cyr = Math.cos(t * 0.55);
    },
    main(x, y, ctx) {
      const sa = ctx.cols / (ctx.rows * ctx.cellAspect);
      // pan the cube off-center so it clears the text: right on wide
      // screens, toward the lower half on portrait ones
      const uc = sa > 1.15 ? 0.44 * sa : 0;
      const vc = sa > 1.15 ? 0 : 0.45;
      const u = ((x + 0.5) / ctx.cols - 0.5) * 2 * sa - uc;
      const v = ((y + 0.5) / ctx.rows - 0.5) * 2 - vc;
      const il = 1 / Math.sqrt(u * u + v * v + 1.6 * 1.6);
      const dx = u * il;
      const dy = v * il;
      const dz = 1.6 * il;
      // bounding-sphere test (r = 1.95 to keep the glow halo)
      const b = -OZ * dz;
      const disc = b * b - (OZ * OZ - 1.95 * 1.95);
      if (disc < 0) return null;
      const root = Math.sqrt(disc);
      let t = Math.max(b - root, 0);
      const tFar = b + root;
      let minD = 1e9;
      let hit = false;
      for (let i = 0; i < 44 && t < tFar; i++) {
        const d = sdf(dx * t, dy * t, OZ + dz * t);
        if (d < minD) minD = d;
        if (d < 0.004) {
          hit = true;
          break;
        }
        t += d;
      }
      if (!hit) {
        if (minD < 0.32) {
          const g = 1 - minD / 0.32;
          return { char: "·", color: glow[g > 0.66 ? 2 : g > 0.33 ? 1 : 0] };
        }
        return null;
      }
      const px = dx * t;
      const py = dy * t;
      const pz = OZ + dz * t;
      const e = 0.004;
      const nx = sdf(px + e, py, pz) - sdf(px - e, py, pz);
      const ny = sdf(px, py + e, pz) - sdf(px, py - e, pz);
      const nz = sdf(px, py, pz + e) - sdf(px, py, pz - e);
      const nl = 1 / (Math.sqrt(nx * nx + ny * ny + nz * nz) || 1);
      const lam = Math.max(0, (nx * -0.45 + ny * -0.7 + nz * -0.55) * nl);
      const n = 0.18 + 0.82 * lam;
      const char = RAMP[Math.min(RAMP.length - 1, Math.floor(n * RAMP.length))];
      return { char, color: n > 0.72 ? hot : n > 0.42 ? mid : dim };
    },
  };
}

/**
 * Spiral — port of ertdfgcvb's "Spiral" (play.ertdfgcvb.xyz/#/src/demos/spiral),
 * itself a port of ahihi's shader https://www.shadertoy.com/view/XdSGzR.
 * Differences from the original: time is seconds here (×0.6 ≡ their ms×0.0006),
 * the density ramp is pre-sorted by hand instead of via their sort() module,
 * and glyphs are tiered onto the page accent instead of plain white.
 */
export function spiral({
  accent = "#2bffb0",
  fps = 30,
}: { accent?: string; fps?: number } = {}): AsciiProgram {
  const TAU = Math.PI * 2;
  // '▅▃▁?ab012:. ' from the original, ordered dense → sparse
  const DENSITY = "▅▃ba02?1:.▁ ";
  const hot = rgba(accent, 0.95);
  const mid = rgba(accent, 0.5);
  const dim = "rgba(242,242,236,0.3)";
  return {
    fps,
    main(x, y, ctx) {
      const t = ctx.time * 0.6;
      const m = Math.min(ctx.cols, ctx.rows);
      const a = 1 / ctx.cellAspect;
      const stx = ((2 * (x - ctx.cols / 2)) / m) * a;
      const sty = (2 * (y - ctx.rows / 2)) / m;

      const radius = Math.max(Math.sqrt(stx * stx + sty * sty), 1e-4);
      const rot = 0.03 * TAU * t;
      const turn = Math.atan2(sty, stx) / TAU + rot;

      const nSub = 1.5;
      const turnSub = (nSub * turn) % nSub;

      const k = 0.1 * Math.sin(3 * t);
      const s = k * Math.sin(50 * (Math.pow(radius, 0.1) - 0.4 * t));
      const turnSine = turnSub + s;

      const iTurn = Math.floor((DENSITY.length * turnSine) % DENSITY.length);
      const iRadius = Math.floor(1.5 / Math.pow(radius * 0.5, 0.6) + 5 * t);
      const idx = (((iTurn + iRadius) % DENSITY.length) + DENSITY.length) % DENSITY.length;

      const char = DENSITY[idx];
      if (char === " ") return null;
      return { char, color: idx < 2 ? hot : idx < 6 ? mid : dim };
    },
  };
}

/**
 * The donut — classic a1k0n torus, rendered into a z-buffer each frame and
 * shaded on the canonical ".,-~:;=!*#$@" ramp. Parked off-center on wide
 * screens so it spins beside the content column.
 */
export function donut({
  accent = "#ffb340",
  fps = 18,
}: { accent?: string; fps?: number } = {}): AsciiProgram {
  const RAMP = ".,-~:;=!*#$@";
  const hot = accent;
  const mid = rgba(accent, 0.55);
  const dim = "rgba(242,242,236,0.3)";
  const back = "rgba(242,242,236,0.12)";
  const R1 = 1;
  const R2 = 2;
  const K2 = 5;
  let W = 0;
  let H = 0;
  let zb = new Float32Array(0);
  let lb = new Float32Array(0);
  return {
    fps,
    begin(ctx) {
      if (W !== ctx.cols || H !== ctx.rows) {
        W = ctx.cols;
        H = ctx.rows;
        zb = new Float32Array(W * H);
        lb = new Float32Array(W * H);
      }
      zb.fill(0);
      lb.fill(-99);
      const A = ctx.time * 0.7;
      const Bt = ctx.time * 0.4;
      const cA = Math.cos(A), sA = Math.sin(A);
      const cB = Math.cos(Bt), sB = Math.sin(Bt);
      const sa = W / (H * ctx.cellAspect);
      const base = Math.min(W, H * ctx.cellAspect);
      const K1 = (base * K2 * 0.3) / (R1 + R2);
      const cx = W * (sa > 1.15 ? 0.74 : 0.5);
      const cy = H * (sa > 1.15 ? 0.45 : 0.62);
      for (let th = 0; th < Math.PI * 2; th += 0.07) {
        const ct = Math.cos(th), st = Math.sin(th);
        const circx = R2 + R1 * ct;
        const circy = R1 * st;
        for (let ph = 0; ph < Math.PI * 2; ph += 0.02) {
          const cp = Math.cos(ph), sp = Math.sin(ph);
          const ox = circx * (cB * cp + sA * sB * sp) - circy * cA * sB;
          const oy = circx * (sB * cp - sA * cB * sp) + circy * cA * cB;
          const oz = K2 + cA * circx * sp + circy * sA;
          const ooz = 1 / oz;
          const xp = Math.floor(cx + K1 * ooz * ox);
          const yp = Math.floor(cy - (K1 * ooz * oy) / ctx.cellAspect);
          if (xp < 0 || xp >= W || yp < 0 || yp >= H) continue;
          const idx = yp * W + xp;
          if (ooz > zb[idx]) {
            zb[idx] = ooz;
            lb[idx] =
              cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
          }
        }
      }
    },
    main(x, y) {
      const l = lb[y * W + x];
      if (l < -10) return null;
      if (l <= 0) return { char: "·", color: back };
      const n = Math.min(1, l / 1.4);
      const char = RAMP[Math.min(RAMP.length - 1, Math.floor(n * RAMP.length))];
      return { char, color: n > 0.7 ? hot : n > 0.38 ? mid : dim };
    },
  };
}
