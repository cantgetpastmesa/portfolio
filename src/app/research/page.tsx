"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import researchData from "@/data/research.json";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { FileText } from "lucide-react";
import { HudLabel, Panel, SectionHeader } from "@/components/ui/terminal";

const CATEGORIES = [
  { id: "aiml", index: "01", title: { en: "AI & Machine Learning", es: "IA y Machine Learning" } },
  { id: "robotics", index: "02", title: { en: "Robotics", es: "Robótica" } },
  { id: "crypto", index: "03", title: { en: "Cryptography", es: "Criptografía" } },
] as const;

export default function ResearchPage() {
  const { language } = useLanguage();

  return (
    <div
      className="relative min-h-screen pb-24 pt-32"
      style={{ "--accent": "var(--depth-0)" } as React.CSSProperties}
    >
      <div className="grid-backdrop absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <HudLabel>$ cat ./research/index.md</HudLabel>
        <ScrambleText
          text={language === "en" ? "RESEARCH" : "INVESTIGACIÓN"}
          as="h1"
          className="bitcount mt-3 block text-4xl text-foreground md:text-6xl"
        />
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {language === "en"
            ? "Open research lines I'm developing during my degrees. Publications will be linked here as they materialize — the thesis has its own page."
            : "Líneas de investigación abiertas que desarrollo durante mis carreras. Las publicaciones se enlazarán aquí a medida que se materialicen — la tesis tiene su propia página."}
        </p>

        <div className="mt-16 space-y-20">
          {CATEGORIES.map((cat) => {
            const items = researchData.research.filter((r) => r.category === cat.id);
            if (items.length === 0) return null;
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <SectionHeader index={cat.index} title={cat.title[language]} />
                <div className="space-y-4">
                  {items.map((item) => (
                    <Panel key={item.id} className="p-6 md:p-8">
                      <div className="mono mb-3 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em]">
                        <span className="text-muted">{item.id}</span>
                        {item.placeholder && (
                          <span className="text-accent">
                            [{language === "en" ? "OPEN LINE" : "LÍNEA ABIERTA"}]
                          </span>
                        )}
                      </div>
                      <h3 className="mono text-xl font-bold text-foreground md:text-2xl">
                        {item.title[language]}
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
                        {item.abstract[language]}
                      </p>
                      {(item.papers.length > 0 || item.code) && (
                        <div className="mono mt-6 flex flex-wrap gap-4 border-t border-line pt-4 text-xs">
                          {item.papers.map((paper: { title: string; pdf: string; venue?: string }) => (
                            <a
                              key={paper.pdf}
                              href={paper.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                            >
                              <FileText className="h-4 w-4" />
                              {paper.title}
                              {paper.venue ? ` — ${paper.venue}` : ""}
                            </a>
                          ))}
                          {item.code && (
                            <a
                              href={item.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                            >
                              <GithubIcon className="h-4 w-4" /> CODE
                            </a>
                          )}
                        </div>
                      )}
                    </Panel>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
