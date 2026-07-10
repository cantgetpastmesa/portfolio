"use client";
import React, { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&";

/**
 * Decrypt-style reveal: characters resolve left to right out of a pool of
 * glyph noise. Re-runs when `text` changes (e.g. language switch).
 */
export function ScrambleText({
  text,
  as: Tag = "span",
  className,
  speed = 28,
  startDelay = 0,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let revealed = 0;
    let interval: ReturnType<typeof setInterval>;
    const tick = () => {
      // reveal ~1 char per tick, scramble a short window after the cursor
      revealed = Math.min(text.length, revealed + 1);
      let out = text.slice(0, revealed);
      const tail = Math.min(text.length - revealed, 6);
      for (let i = 0; i < tail; i++) {
        const src = text[revealed + i];
        out += src === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (revealed >= text.length) clearInterval(interval);
    };
    const timeout = setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(text);
        return;
      }
      interval = setInterval(tick, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
