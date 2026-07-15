"use client";
import React from "react";
import { AsciiCanvas, type AsciiProgram } from "./AsciiCanvas";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Full-viewport ASCII program running behind a page, plus the floating
 * [FX] toggle so visitors can freeze it. The preference persists in
 * localStorage and is shared by every page via useSyncExternalStore, so
 * pausing on one route pauses them all.
 */

const KEY = "ascii-fx-paused";
const EVT = "ascii-fx-change";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
};
const getSnapshot = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const getServerSnapshot = () => false;

export function AsciiBackdrop({
  program,
  fontSize = 13,
  opacityClass = "opacity-40",
}: {
  program: AsciiProgram;
  fontSize?: number;
  opacityClass?: string;
}) {
  const { language } = useLanguage();
  const paused = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    try {
      localStorage.setItem(KEY, paused ? "0" : "1");
    } catch {
      // private mode etc. — toggle still works for this page via the event
    }
    window.dispatchEvent(new Event(EVT));
  };

  return (
    <>
      <div className={`pointer-events-none fixed inset-0 ${opacityClass}`} aria-hidden>
        <AsciiCanvas program={program} fontSize={fontSize} paused={paused} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/55 via-transparent to-[#050505]" />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={paused}
        className="mono fixed bottom-4 right-4 z-40 border border-line bg-[#050505]/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
      >
        {paused
          ? `▶ ${language === "en" ? "PLAY FX" : "REANUDAR FX"}`
          : `■ ${language === "en" ? "PAUSE FX" : "PAUSAR FX"}`}
      </button>
    </>
  );
}
