"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { AsciiBackdrop } from "@/components/ascii/AsciiBackdrop";
import { golgol } from "@/components/ascii/programs";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { HudLabel } from "@/components/ui/terminal";

export default function NotFound() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const gol = React.useMemo(() => golgol({ color: "#4f7dff" }), []);

  return (
    <div
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ "--accent": "var(--depth-6)" } as React.CSSProperties}
    >
      <AsciiBackdrop program={gol} fontSize={15} opacityClass="opacity-60" />

      <div className="relative mx-auto w-full max-w-3xl px-4 py-32 md:px-6">
        <HudLabel>$ cat {pathname}</HudLabel>
        <ScrambleText
          text="404"
          as="h1"
          className="bitcount mt-3 block text-7xl text-accent md:text-9xl"
        />
        <p className="mono mt-4 text-sm text-foreground md:text-base">
          zsh: <span className="text-accent">no such file or directory</span>:{" "}
          <span className="break-all">{pathname}</span>
          <span className="caret" />
        </p>

        <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted">
          {language === "en"
            ? "The path you requested doesn't resolve to anything on this machine. It may have moved, been renamed, or never existed at all."
            : "La ruta que solicitaste no resuelve a nada en esta máquina. Puede que se haya movido, renombrado, o que nunca haya existido."}
        </p>

        <p className="mono mt-8 text-[10px] uppercase tracking-[0.2em] text-muted">
          {language === "en"
            ? "BG: CONWAY'S GAME OF LIFE — CLICK OR DRAG TO SEED CELLS"
            : "FONDO: JUEGO DE LA VIDA DE CONWAY — HAZ CLIC O ARRASTRA PARA SEMBRAR CÉLULAS"}
        </p>
      </div>
    </div>
  );
}
