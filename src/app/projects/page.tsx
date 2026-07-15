"use client";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import projectsData from "@/data/projects.json";
import { AsciiBackdrop } from "@/components/ascii/AsciiBackdrop";
import { spiral } from "@/components/ascii/programs";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { ExternalLink, FileText } from "lucide-react";
import { HudLabel, Panel, Tag } from "@/components/ui/terminal";
import { cn } from "@/lib/utils";

type Category = "all" | "aiml" | "crypto" | "robotics" | "webmobile";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<Category>("all");
  const backdrop = React.useMemo(() => spiral({ accent: "#2bffb0" }), []);

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: language === "en" ? "All" : "Todos" },
    { id: "aiml", label: "AI/ML" },
    { id: "crypto", label: language === "en" ? "Crypto" : "Cripto" },
    { id: "robotics", label: language === "en" ? "Robotics" : "Robótica" },
    { id: "webmobile", label: language === "en" ? "Web & Mobile" : "Web y Móvil" },
  ];

  const filtered =
    selected === "all"
      ? projectsData.projects
      : projectsData.projects.filter((p) => p.category === selected);

  return (
    <div
      className="relative min-h-screen pb-24 pt-32"
      style={{ "--accent": "var(--depth-2)" } as React.CSSProperties}
    >
      <AsciiBackdrop program={backdrop} opacityClass="opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <HudLabel>$ ls ./projects --all</HudLabel>
        <ScrambleText
          text={language === "en" ? "PROJECTS" : "PROYECTOS"}
          as="h1"
          className="bitcount mt-3 block text-4xl text-foreground md:text-6xl"
        />
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {language === "en"
            ? "Selected builds across AI/ML, robotics, cryptography and the web. Entries marked IN-PROGRESS are being written up — code and demos land as they ship."
            : "Construcciones seleccionadas en IA/ML, robótica, criptografía y web. Las entradas marcadas EN-PROGRESO están en redacción — el código y los demos llegan a medida que salen."}
        </p>

        {/* Filter row styled as a grep */}
        <div className="mono mt-10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted">$ grep -i</span>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={cn(
                "border px-3 py-1 uppercase tracking-wider transition-colors",
                selected === c.id
                  ? "border-accent bg-accent text-black"
                  : "border-line text-muted hover:border-line-strong hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Listing */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
            >
              <Panel interactive className="flex h-full flex-col p-6">
                <div className="mono mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                  <span className="text-muted">
                    {String(i + 1).padStart(2, "0")} / {p.category}
                  </span>
                  {p.placeholder ? (
                    <span className="text-accent">
                      [{language === "en" ? "IN-PROGRESS" : "EN-PROGRESO"}]
                    </span>
                  ) : (
                    <span className="text-muted">[{language === "en" ? "SHIPPED" : "PUBLICADO"}]</span>
                  )}
                </div>
                <h2 className="mono text-xl font-bold text-foreground">{p.title[language]}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {p.description[language]}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.techStack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
                {!p.placeholder && (
                  <div className="mono mt-5 flex gap-4 border-t border-line pt-4 text-xs">
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                      >
                        <GithubIcon className="h-4 w-4" /> CODE
                      </a>
                    )}
                    {p.links.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                      >
                        <ExternalLink className="h-4 w-4" /> LIVE
                      </a>
                    )}
                    {p.links.paper && (
                      <a
                        href={p.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                      >
                        <FileText className="h-4 w-4" /> PAPER
                      </a>
                    )}
                  </div>
                )}
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
