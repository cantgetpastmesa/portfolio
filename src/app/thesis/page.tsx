"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { AsciiBackdrop } from "@/components/ascii/AsciiBackdrop";
import { wobbleField } from "@/components/ascii/programs";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Corners, HudLabel, Panel } from "@/components/ui/terminal";

export default function ThesisPage() {
  const { language } = useLanguage();
  const wobble = React.useMemo(() => wobbleField({ density: 0.35, accent: "#ff8c1a" }), []);

  return (
    <div
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ "--accent": "var(--depth-5)" } as React.CSSProperties}
    >
      <AsciiBackdrop program={wobble} opacityClass="opacity-50" />

      <div className="relative mx-auto w-full max-w-4xl px-4 py-32 md:px-6">
        <HudLabel>$ tail -f thesis.log</HudLabel>
        <ScrambleText
          text={language === "en" ? "UNDERGRADUATE THESIS" : "TESIS DE PREGRADO"}
          as="h1"
          className="bitcount mt-3 block text-3xl text-foreground md:text-5xl"
        />

        <Panel className="mt-10 p-6 md:p-8">
          <div className="mono grid gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-line pb-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {language === "en" ? "STATUS" : "ESTADO"}
              </span>
              <span className="text-accent">
                {language === "en" ? "IN PROGRESS" : "EN PROGRESO"}
                <span className="caret" />
              </span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-line pb-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {language === "en" ? "UNIVERSITY" : "UNIVERSIDAD"}
              </span>
              <span className="text-foreground">Universidad de los Andes</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {language === "en" ? "FIELD" : "ÁREA"}
              </span>
              <span className="text-foreground">
                {language === "en" ? "ML / AI — TBA" : "ML / IA — por anunciar"}
              </span>
            </div>
          </div>
        </Panel>

        <div className="relative mt-6 border border-dashed border-line p-6 md:p-8">
          <Corners />
          <p className="text-sm leading-relaxed text-muted">
            {language === "en"
              ? "The abstract, document and key figures will be published here as the work matures. Until then, the research page tracks the open lines feeding into it."
              : "El resumen, el documento y las figuras clave se publicarán aquí a medida que el trabajo madure. Mientras tanto, la página de investigación registra las líneas abiertas que lo alimentan."}
          </p>
          <Link
            href="/research"
            className="mono mt-6 inline-block border border-line px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {language === "en" ? "→ Research" : "→ Investigación"}
          </Link>
        </div>
      </div>
    </div>
  );
}
