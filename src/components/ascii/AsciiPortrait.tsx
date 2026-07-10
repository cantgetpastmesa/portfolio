"use client";
import React, { useMemo } from "react";
import { AsciiCanvas, type AsciiProgram, type AsciiContext } from "./AsciiCanvas";

/**
 * Renders an image as a living ASCII field: luminance-sampled characters
 * with a slow wobble, a scanning sweep, occasional glitch bands, and a
 * pointer "sensor" that excites nearby cells. Built for the RealSense
 * point-cloud portrait, works with any bright-on-dark image.
 *
 * Cells are colored through the jet colormap the RealSense viewer uses —
 * far/dim reads blue, near/bright reads red — so the ASCII portrait keeps
 * the palette of the source point cloud.
 */

const RAMP = " .:-=+*x#%@";

const JET = [
  "#2743d0",
  "#0066ff",
  "#00b4ff",
  "#00e8d0",
  "#4dff7a",
  "#c8ff3e",
  "#ffd23e",
  "#ff8c1a",
  "#ff4526",
];

const jet = (v: number) => JET[Math.min(JET.length - 1, Math.floor(v * JET.length))];

function createPortraitProgram(src: string): AsciiProgram {
  let img: HTMLImageElement | null = null;
  let luma: Float32Array | null = null;
  let sampledCols = 0;
  let sampledRows = 0;
  let redrawFn: (() => void) | null = null;

  // per-frame glitch state
  let glitchRow = -1;
  let glitchHeight = 0;
  let glitchShift = 0;

  const resample = (ctx: AsciiContext) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    if (sampledCols === ctx.cols && sampledRows === ctx.rows) return;
    const { cols, rows } = ctx;
    const off = document.createElement("canvas");
    off.width = cols;
    off.height = rows;
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;
    // center-crop the image to the aspect of the *displayed* grid
    // (cells are taller than wide, so the grid buffer is anisotropic)
    const dispW = cols;
    const dispH = rows * ctx.cellAspect;
    const scale = Math.max(dispW / img.naturalWidth, dispH / img.naturalHeight);
    const sw = dispW / scale;
    const sh = dispH / scale;
    octx.drawImage(
      img,
      (img.naturalWidth - sw) / 2,
      (img.naturalHeight - sh) / 2,
      sw,
      sh,
      0,
      0,
      cols,
      rows,
    );
    const data = octx.getImageData(0, 0, cols, rows).data;
    luma = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const v = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      luma[i] = Math.pow(v, 0.8); // lift mids a touch
    }
    sampledCols = cols;
    sampledRows = rows;
  };

  return {
    fps: 20,
    ramp: RAMP,
    init({ redraw }) {
      redrawFn = redraw;
      img = new Image();
      img.decoding = "async";
      img.onload = () => redrawFn?.();
      img.src = src;
    },
    begin(ctx) {
      resample(ctx);
      // roughly every ~5s, tear a horizontal band for a few frames
      const seed = Math.sin(Math.floor(ctx.time * 1.6) * 999.83) * 43758.5453;
      const r = seed - Math.floor(seed);
      if (r > 0.86) {
        glitchRow = Math.floor((r * 7919) % ctx.rows);
        glitchHeight = 1 + Math.floor(r * 3);
        glitchShift = Math.round((r - 0.93) * 40);
      } else {
        glitchRow = -1;
      }
    },
    main(x, y, ctx) {
      if (!luma || sampledCols !== ctx.cols) return null;
      const t = ctx.time;
      // slow breathing wobble
      let sx = x + Math.sin(y * 0.22 + t * 1.1) * 0.9 + Math.sin(y * 0.05 - t * 0.4) * 0.6;
      const sy = y + Math.sin(x * 0.09 + t * 0.7) * 0.4;
      if (glitchRow >= 0 && y >= glitchRow && y < glitchRow + glitchHeight) {
        sx += glitchShift;
      }
      const ix = Math.round(sx);
      const iy = Math.round(sy);
      if (ix < 0 || ix >= ctx.cols || iy < 0 || iy >= ctx.rows) return null;
      let v = luma[iy * ctx.cols + ix];

      // vertical scan sweep, brightens a passing band
      const sweep = ((t * 6) % (ctx.rows * 1.6)) - ctx.rows * 0.3;
      const sweepDist = Math.abs(y - sweep);
      if (sweepDist < 2) v += (1 - sweepDist / 2) * 0.22;

      // pointer acts like a sensor exciting nearby cells
      if (ctx.pointer.active) {
        const dx = (x - ctx.pointer.x) / ctx.cellAspect;
        const dy = y - ctx.pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 7;
        if (dist < radius) v += (1 - dist / radius) * 0.45;
      }

      if (v < 0.05) return null;
      v = Math.min(1, v);
      const char = RAMP[Math.min(RAMP.length - 1, Math.floor(v * (RAMP.length - 1) + 0.5))];
      return { char, color: jet(v) };
    },
  };
}

export function AsciiPortrait({
  src,
  className,
  fontSize = 11,
  ariaLabel,
}: {
  src: string;
  className?: string;
  fontSize?: number;
  ariaLabel?: string;
}) {
  const program = useMemo(() => createPortraitProgram(src), [src]);
  return (
    <AsciiCanvas
      program={program}
      fontSize={fontSize}
      className={className}
      ariaLabel={ariaLabel}
    />
  );
}
