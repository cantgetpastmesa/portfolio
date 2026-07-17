"use client";
import React, { useEffect, useRef } from "react";

/**
 * A character-grid renderer in the spirit of play.ertdfgcvb.xyz.
 * Programs get called once per cell per frame and return either an
 * intensity (mapped onto a density ramp) or an explicit char + color.
 * Rendering goes through a glyph atlas so full-viewport grids stay cheap.
 */

export type AsciiPointer = { x: number; y: number; active: boolean; pressed: boolean };

export type AsciiContext = {
  cols: number;
  rows: number;
  time: number;
  frame: number;
  pointer: AsciiPointer;
  /** cell height / cell width — useful to keep program math isotropic */
  cellAspect: number;
};

export type AsciiCellOut = { char: string; color?: string } | number | null;

export type AsciiProgram = {
  fps?: number;
  ramp?: string;
  colors?: { base?: string; dim?: string; accent?: string };
  /** called when the engine mounts; `redraw` forces a static repaint (reduced-motion mode) */
  init?: (api: { redraw: () => void }) => void;
  /** per-frame precompute hook */
  begin?: (ctx: AsciiContext) => void;
  main: (x: number, y: number, ctx: AsciiContext) => AsciiCellOut;
};

export const DENSITY_RAMP = " .:-=+*x#%@";

const DEFAULTS = {
  base: "rgba(242,242,236,0.92)",
  dim: "rgba(242,242,236,0.30)",
  accent: "#e4b503",
};

type Atlas = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  index: Map<string, number>;
};

const MAX_CELLS = 15000;
const ATLAS_CAPACITY = 96;

export function AsciiCanvas({
  program,
  fontSize = 14,
  className,
  ariaLabel,
  paused = false,
}: {
  program: AsciiProgram;
  fontSize?: number;
  className?: string;
  ariaLabel?: string;
  /** freezes the loop on the last drawn frame (a first frame is always drawn) */
  paused?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const programRef = useRef(program);
  const pausedRef = useRef(paused);

  useEffect(() => {
    programRef.current = program;
  }, [program]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(canvas).fontFamily || "monospace";

    let cols = 0;
    let rows = 0;
    let cw = 0; // css px
    let ch = 0;
    let size = fontSize;
    let frame = 0;
    let raf = 0;
    let lastDraw = 0;
    let visible = true;
    let disposed = false;
    const start = performance.now();
    const pointer: AsciiPointer = { x: -1e4, y: -1e4, active: false, pressed: false };
    let atlases = new Map<string, Atlas>();

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      size = fontSize;
      ctx2d.font = `${size}px ${family}`;
      cw = ctx2d.measureText("M").width;
      ch = size * 1.18;
      let c = Math.max(1, Math.floor(rect.width / cw));
      let r = Math.max(1, Math.floor(rect.height / ch));
      if (c * r > MAX_CELLS) {
        const scale = Math.sqrt((c * r) / MAX_CELLS);
        size = fontSize * scale;
        ctx2d.font = `${size}px ${family}`;
        cw = ctx2d.measureText("M").width;
        ch = size * 1.18;
        c = Math.max(1, Math.floor(rect.width / cw));
        r = Math.max(1, Math.floor(rect.height / ch));
      }
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      // assigning width/height wipes the canvas — skip when nothing changed
      if (c === cols && r === rows && w === canvas.width && h === canvas.height) return false;
      cols = c;
      rows = r;
      canvas.width = w;
      canvas.height = h;
      atlases = new Map();
      return true;
    };

    const glyph = (char: string, color: string): { atlas: Atlas; idx: number } | null => {
      let atlas = atlases.get(color);
      if (!atlas) {
        const c = document.createElement("canvas");
        c.width = Math.ceil(cw * dpr) * ATLAS_CAPACITY;
        c.height = Math.ceil(ch * dpr);
        const actx = c.getContext("2d");
        if (!actx) return null;
        actx.font = `${size * dpr}px ${family}`;
        actx.textAlign = "center";
        actx.textBaseline = "middle";
        actx.fillStyle = color;
        atlas = { canvas: c, ctx: actx, index: new Map() };
        atlases.set(color, atlas);
      }
      let idx = atlas.index.get(char);
      if (idx === undefined) {
        if (atlas.index.size >= ATLAS_CAPACITY) return null;
        idx = atlas.index.size;
        atlas.index.set(char, idx);
        atlas.ctx.fillText(char, (idx + 0.5) * Math.ceil(cw * dpr), Math.ceil(ch * dpr) / 2);
      }
      return { atlas, idx };
    };

    const draw = (now: number) => {
      const p = programRef.current;
      const ramp = p.ramp ?? DENSITY_RAMP;
      const colors = { ...DEFAULTS, ...p.colors };
      const ctx: AsciiContext = {
        cols,
        rows,
        time: (now - start) / 1000,
        frame,
        pointer,
        cellAspect: ch / cw,
      };
      p.begin?.(ctx);
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      const cwDev = Math.ceil(cw * dpr);
      const chDev = Math.ceil(ch * dpr);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const out = p.main(x, y, ctx);
          if (out === null) continue;
          let char: string;
          let color: string;
          if (typeof out === "number") {
            if (out <= 0) continue;
            const v = Math.min(1, out);
            char = ramp[Math.min(ramp.length - 1, Math.floor(v * (ramp.length - 1) + 0.5))];
            color = v > 0.82 ? colors.base : colors.dim;
          } else {
            char = out.char;
            color = out.color ?? colors.base;
          }
          if (char === " ") continue;
          const g = glyph(char, color);
          if (!g) continue;
          ctx2d.drawImage(
            g.atlas.canvas,
            g.idx * cwDev,
            0,
            cwDev,
            chDev,
            Math.round(x * cw * dpr),
            Math.round(y * ch * dpr),
            cwDev,
            chDev,
          );
        }
      }
      frame++;
    };

    const loop = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (pausedRef.current && frame > 0) return;
      const fps = programRef.current.fps ?? 24;
      if (now - lastDraw < 1000 / fps) return;
      lastDraw = now;
      draw(now);
    };

    const redraw = () => {
      if (disposed) return;
      if (cols === 0 && !measure()) return;
      draw(performance.now());
    };

    const ro = new ResizeObserver(() => {
      // repaint right away — a real resize just wiped the canvas, and the
      // rAF loop (throttled, or idle when paused/reduced) may not repaint
      // soon enough to avoid a visible blank flash
      if (measure()) redraw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / cw;
      pointer.y = (e.clientY - rect.top) / ch;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      pointer.pressed = true;
    };
    const onUp = () => {
      pointer.pressed = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    measure();
    programRef.current.init?.({ redraw });
    if (reduced) {
      redraw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [fontSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`mono block h-full w-full ${className ?? ""}`}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
}
