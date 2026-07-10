"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AsciiCanvas } from "@/components/ascii/AsciiCanvas";
import { dataStream } from "@/components/ascii/programs";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { Corners, HudLabel, Panel, SectionHeader, Tag } from "@/components/ui/terminal";
import { machines, presidencyLog, teamStats, instagramPosts } from "@/data/robotics";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

export default function RoboticsPage() {
  const { language } = useLanguage();
  const stream = React.useMemo(() => dataStream({ gap: 4 }), []);

  return (
    <div
      className="min-h-screen"
      style={{ "--accent": "var(--robocol)" } as React.CSSProperties}
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-60" aria-hidden>
          <AsciiCanvas program={stream} fontSize={13} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-36 md:px-6">
          <HudLabel>
            {language === "en" ? "UNIANDES ROBOTICS TEAM" : "EQUIPO DE ROBÓTICA UNIANDES"}
          </HudLabel>
          <div className="mt-6 max-w-3xl">
            <Image
              src="/robocol/wordmark-white.png"
              alt="ROBOCOL"
              width={1892}
              height={396}
              priority
              className="h-auto w-full max-w-xl"
            />
          </div>
          <div className="mt-6 h-1 w-40 bg-accent" aria-hidden />
          <p className="mono mt-6 max-w-2xl text-sm leading-relaxed text-foreground/85 md:text-base">
            {language === "en"
              ? "Rovers for simulated Mars terrain. ROVs for underwater missions. UAVs for autonomous flight. I serve as president of the team — this is where the machines live."
              : "Rovers para terreno marciano simulado. ROVs para misiones submarinas. UAVs para vuelo autónomo. Soy el presidente del equipo — aquí es donde viven las máquinas."}
          </p>

          {/* HUD stat strip */}
          <div className="mt-12 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {teamStats.map((s, i) => (
              <div key={i} className="bg-[#050505] p-4">
                <p className="bitcount text-2xl text-accent">{s.value}</p>
                <p className="mono mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                  {s.label[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 MACHINES ──────────────────────────────────────── */}
      <motion.section {...fadeIn} className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          index="01"
          title={language === "en" ? "The Machines" : "Las Máquinas"}
          meta="$ ls ./fleet --technical-sheets"
        />
        <div className="space-y-16">
          {machines.map((m, i) => (
            <div
              key={m.id}
              className={`grid items-stretch gap-6 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              {/* Print sheet with the technical drawing */}
              <div className="[direction:ltr]">
                <Panel className="relative overflow-hidden bg-[#f2f2ec] p-0">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={m.image}
                      alt={`${m.name} — ${m.class[language]}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="mono flex items-center justify-between border-t border-black/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-black/60">
                    <span>{m.figure}</span>
                    <span>ROBOCOL — {m.name}</span>
                    <span>SCALE N/A</span>
                  </div>
                </Panel>
              </div>

              {/* Spec sheet */}
              <div className="[direction:ltr] flex flex-col justify-center space-y-5">
                <div>
                  <p className="mono text-xs uppercase tracking-[0.25em] text-muted">{m.class[language]}</p>
                  <h3 className="bitcount mt-1 text-3xl text-foreground md:text-4xl">
                    <span className="text-accent">/</span>
                    {m.name}
                  </h3>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-foreground/80">
                  {m.description[language]}
                </p>
                <div className="max-w-xl border border-line">
                  {m.specs.map((s, j) => (
                    <div
                      key={j}
                      className="mono grid grid-cols-[130px_1fr] gap-4 border-b border-line px-4 py-2 text-xs last:border-b-0"
                    >
                      <span className="uppercase tracking-wider text-muted">{s.label[language]}</span>
                      <span className="text-foreground">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {m.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                  {m.competition && <Tag accent>{m.competition}</Tag>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 02 COMMAND LOG (presidency) ──────────────────────── */}
      <motion.section {...fadeIn} className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          index="02"
          title={language === "en" ? "Command Log" : "Bitácora de Mando"}
          meta="$ tail -f presidency.log"
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <Panel className="h-fit p-6">
            <HudLabel>{language === "en" ? "ROLE" : "CARGO"}</HudLabel>
            <p className="bitcount mt-2 text-2xl text-accent">
              {language === "en" ? "PRESIDENT" : "PRESIDENTE"}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              {language === "en"
                ? "Leading ROBOCOL means running an engineering org inside a university: budgets, sponsors, recruiting, and shipping three vehicle programs a year with a volunteer team."
                : "Liderar ROBOCOL significa dirigir una organización de ingeniería dentro de una universidad: presupuestos, patrocinadores, reclutamiento y sacar adelante tres programas de vehículos al año con un equipo de voluntarios."}
            </p>
          </Panel>
          <div className="space-y-px">
            {presidencyLog.map((e, i) => (
              <div
                key={i}
                className="grid gap-2 border border-line bg-[#0a0a08]/60 p-5 md:grid-cols-[110px_1fr] md:gap-6"
              >
                <span className="mono text-xs tracking-wider text-accent">{e.date}</span>
                <div>
                  <p className="mono text-sm font-bold text-foreground">{e.title[language]}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{e.body[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 03 FIELD FEED (Instagram) ────────────────────────── */}
      <motion.section {...fadeIn} className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          index="03"
          title={language === "en" ? "Field Feed" : "Desde el Campo"}
          meta="$ curl instagram --embed"
        />
        {instagramPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {instagramPosts.map((url) => (
              <Panel key={url} className="overflow-hidden p-0">
                <InstagramEmbed url={url} />
              </Panel>
            ))}
          </div>
        ) : (
          <div className="relative border border-dashed border-line p-10 text-center">
            <Corners />
            <p className="mono text-sm text-muted">
              <span className="text-accent">[FEED OFFLINE]</span>{" "}
              {language === "en"
                ? "Drop Instagram post URLs into src/data/robotics.ts → instagramPosts to embed builds, competitions and lab moments here."
                : "Agrega URLs de posts de Instagram en src/data/robotics.ts → instagramPosts para incrustar construcciones, competencias y momentos del laboratorio aquí."}
            </p>
          </div>
        )}
      </motion.section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <div className="relative border border-line bg-[#0a0a08]/60 p-10 text-center">
          <Corners />
          <p className="mono text-lg font-bold text-foreground md:text-xl">
            {language === "en"
              ? "Want the ML side of the story?"
              : "¿Quieres el lado de ML de la historia?"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/research"
              className="mono inline-block bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-[filter] hover:brightness-110"
            >
              {language === "en" ? "Research →" : "Investigación →"}
            </Link>
            <Link
              href="/thesis"
              className="mono inline-block border border-line px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {language === "en" ? "Thesis" : "Tesis"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
