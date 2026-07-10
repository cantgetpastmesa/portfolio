"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AsciiPortrait } from "@/components/ascii/AsciiPortrait";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Corners, HudLabel, Panel, SectionHeader, Tag } from "@/components/ui/terminal";
import certificationsData from "@/data/certifications.json";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const BTN_PRIMARY =
  "mono inline-block bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-[filter] hover:brightness-110";
const BTN_GHOST =
  "mono inline-block border border-line px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent";

/** scroll depth = sensor depth: sections warm through the jet colormap */
const depth = (n: 0 | 1 | 2 | 3 | 4 | 5 | 6) =>
  ({ "--accent": `var(--depth-${n})` }) as React.CSSProperties;

/** the point-cloud spectrum, for gradient text */
const JET_GRADIENT =
  "bg-[linear-gradient(90deg,#2743d0,#00b4ff,#00e8d0,#4dff7a,#c8ff3e,#ffd23e,#ff8c1a,#ff4526)] bg-clip-text text-transparent";

const timeline = [
  {
    tag: { en: "ACADEMIC", es: "ACADÉMICO" },
    year: "2022 — ",
    title: { en: "B.S. Electronic Engineering", es: "Ingeniería Electrónica" },
    org: "Universidad de los Andes",
    detail: {
      en: "Major in Electronic Engineering.",
      es: "Pregrado en Ingeniería Electrónica.",
    },
  },
  {
    tag: { en: "ACADEMIC", es: "ACADÉMICO" },
    year: "2022 — ",
    title: {
      en: "B.S. Computer Science & Software Engineering",
      es: "Ingeniería de Sistemas y Computación",
    },
    org: "Universidad de los Andes",
    detail: {
      en: "Double major, focused on ML/AI and robotics.",
      es: "Doble programa, con enfoque en ML/IA y robótica.",
    },
  },
  {
    tag: { en: "ACADEMIC", es: "ACADÉMICO" },
    year: "2024 — 2026",
    title: { en: "Minor in Machine Learning", es: "Opción en Machine Learning" },
    org: "Universidad de los Andes",
    detail: {
      en: "Identifying opportunities for ML applications, designing solutions with appropriate techniques, and evaluating AI systems with an ethical, socially responsible approach.",
      es: "Identificación de oportunidades para aplicaciones de ML, diseño de soluciones con técnicas apropiadas y evaluación de sistemas de IA con un enfoque ético y socialmente responsable.",
    },
  },
  {
    tag: { en: "LEADERSHIP", es: "LIDERAZGO" },
    year: "ROBOCOL",
    title: { en: "President — ROBOCOL", es: "Presidente — ROBOCOL" },
    org: { en: "Uniandes Robotics Team", es: "Equipo de Robótica Uniandes" },
    detail: {
      en: "Leading the university's robotics team: rover, underwater ROV and UAV projects. Full story on the robotics page.",
      es: "Liderando el equipo de robótica de la universidad: proyectos de rover, ROV submarino y UAV. Historia completa en la página de robótica.",
    },
    href: "/robotics",
  },
];

const focus = [
  {
    id: "01",
    art: "┌─┐ ┌─┐\n│x├─┤Σ│→ ŷ\n└─┘ └─┘",
    title: { en: "AI / ML Research", es: "Investigación IA / ML" },
    detail: {
      en: "Deep learning, reinforcement learning, neural networks.",
      es: "Aprendizaje profundo, aprendizaje por refuerzo, redes neuronales.",
    },
    href: "/research",
  },
  {
    id: "02",
    art: "[o]══[o]\n │ ▲▲ │\n═╧════╧═",
    title: { en: "Robotics", es: "Robótica" },
    detail: {
      en: "Autonomous systems, SLAM, perception, ROBOCOL.",
      es: "Sistemas autónomos, SLAM, percepción, ROBOCOL.",
    },
    href: "/robotics",
  },
  {
    id: "03",
    art: "m → E(k) → c\n      ↑\n     key",
    title: { en: "Cryptography", es: "Criptografía" },
    detail: {
      en: "Post-quantum cryptography, encryption, security.",
      es: "Criptografía post-cuántica, cifrado, seguridad.",
    },
    href: "/research",
  },
  {
    id: "04",
    art: "<app>\n  {code}\n</app>",
    title: { en: "Web & Mobile", es: "Web y Móvil" },
    detail: {
      en: "Full-stack development, mobile apps, cloud.",
      es: "Desarrollo full-stack, apps móviles, nube.",
    },
    href: "/projects",
  },
];

const interests = [
  { en: "Hardware", es: "Hardware" },
  { en: "Robotics", es: "Robótica" },
  { en: "Cryptography", es: "Criptografía" },
  { en: "Machine Learning", es: "Machine Learning" },
  { en: "Web & Mobile Dev", es: "Desarrollo Web y Móvil" },
  { en: "Entrepreneurship", es: "Emprendimiento" },
];

export default function Home() {
  const { language } = useLanguage();
  const featuredCerts = certificationsData.certifications.filter((c) => c.featured);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden" style={depth(0)}>
        <div className="grid-backdrop absolute inset-0" aria-hidden />
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-2 md:px-6">
          {/* Left: prompt intro */}
          <div className="space-y-6">
            <p className="mono text-xs uppercase tracking-[0.25em] text-muted">
              <span className="text-accent">$</span> ./init --profile
            </p>
            <h1 className="bitcount text-4xl leading-tight md:text-6xl">
              <ScrambleText text="FELIPE A." as="span" className="block" />
              <ScrambleText
                text="MESA N."
                as="span"
                className={`block ${JET_GRADIENT}`}
                startDelay={350}
              />
            </h1>
            <p className="mono caret text-sm leading-relaxed text-muted md:text-base">
              {language === "en"
                ? "Engineering intelligent systems — AI/ML research, robotics, and the software that binds them"
                : "Ingeniería de sistemas inteligentes — investigación en IA/ML, robótica y el software que las une"}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/robotics" className={BTN_PRIMARY}>
                {language === "en" ? "Robotics ↗" : "Robótica ↗"}
              </Link>
              <Link href="/contact" className={BTN_GHOST}>
                {language === "en" ? "Contact" : "Contacto"}
              </Link>
            </div>
            <div className="mono flex flex-wrap gap-x-6 gap-y-1 pt-4 text-[11px] uppercase tracking-[0.2em] text-muted">
              <span>
                <span className="text-accent">[SYS]</span> ONLINE
              </span>
              <span>
                <span className="text-accent">[POS]</span> BOGOTÁ, CO
              </span>
              <span>
                <span className="text-accent">[EDU]</span> UNIANDES ×2
              </span>
            </div>
          </div>

          {/* Right: point-cloud self-portrait rendered as ASCII */}
          <div className="relative">
            <Panel className="relative aspect-square w-full overflow-hidden">
              <AsciiPortrait
                src="/media/pointcloud-face-ascii.jpeg"
                fontSize={10}
                className="absolute inset-0"
                ariaLabel={
                  language === "en"
                    ? "ASCII rendering of a RealSense point-cloud self-portrait"
                    : "Autorretrato de nube de puntos RealSense renderizado en ASCII"
                }
              />
              <div className="scanline" aria-hidden />
            </Panel>
            <p className="mono mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
              <span>FIG. 00 — SELF-PORTRAIT</span>
              <span>INTEL REALSENSE // POINT CLOUD</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 01 ABOUT ─────────────────────────────────────────── */}
      <motion.section
        {...fadeIn}
        id="about"
        style={depth(1)}
        className="mx-auto max-w-7xl px-4 py-20 md:px-6"
      >
        <SectionHeader index="01" title={language === "en" ? "About" : "Acerca de mí"} meta="$ cat README.md · Z 0.4m" />
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <Panel className="p-6 md:p-8">
            <div className="space-y-4 text-sm leading-relaxed text-foreground/85 md:text-base">
              <p>
                {language === "en"
                  ? "I'm a double-major student in Electronic Engineering and Computer Science at Universidad de los Andes, working at the intersection of artificial intelligence, robotics, and software engineering. My focus: intelligent systems that learn, adapt, and operate autonomously in complex physical environments."
                  : "Estudio doble programa en Ingeniería Electrónica e Ingeniería de Sistemas en la Universidad de los Andes, trabajando en la intersección de la inteligencia artificial, la robótica y la ingeniería de software. Mi enfoque: sistemas inteligentes que aprenden, se adaptan y operan de forma autónoma en entornos físicos complejos."}
              </p>
              <p>
                {language === "en"
                  ? "Beyond research I build practical applications on top of state-of-the-art AI/ML, and I lead ROBOCOL — the university robotics team — where rovers, underwater ROVs and UAVs go from CAD to competition. I'm committed to a future where AI systems are safe, reliable, and beneficial."
                  : "Más allá de la investigación construyo aplicaciones prácticas sobre IA/ML de vanguardia, y lidero ROBOCOL — el equipo de robótica de la universidad — donde rovers, ROVs submarinos y UAVs pasan del CAD a la competencia. Estoy comprometido con un futuro donde los sistemas de IA sean seguros, confiables y beneficiosos."}
              </p>
            </div>
          </Panel>
          <div className="mono space-y-3 text-xs text-muted">
            <p className="text-foreground">
              <span className="text-accent">{">"}</span>{" "}
              {language === "en" ? "QUICK FACTS" : "DATOS RÁPIDOS"}
            </p>
            <p>— {language === "en" ? "Double major: Electronics + CS" : "Doble programa: Electrónica + Sistemas"}</p>
            <p>— {language === "en" ? "Minor in Machine Learning" : "Opción en Machine Learning"}</p>
            <p>— {language === "en" ? "President of ROBOCOL" : "Presidente de ROBOCOL"}</p>
            <p>— {language === "en" ? "Aiming at ML/AI research & startups" : "Con la mira en investigación ML/IA y startups"}</p>
          </div>
        </div>
      </motion.section>

      {/* ── 02 FOCUS ─────────────────────────────────────────── */}
      <motion.section {...fadeIn} style={depth(2)} className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader index="02" title={language === "en" ? "Focus" : "Enfoque"} meta="$ ls ./domains · Z 0.8m" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focus.map((f) => (
            <Link key={f.id} href={f.href} className="block">
              <Panel interactive className="flex h-full flex-col p-6">
                <pre className="mono mb-6 whitespace-pre text-xs leading-relaxed text-accent">
                  {f.art}
                </pre>
                <p className="mono mb-2 text-sm font-bold uppercase tracking-wider text-foreground">
                  <span className="text-muted">{f.id}_</span>
                  {f.title[language]}
                </p>
                <p className="text-xs leading-relaxed text-muted">{f.detail[language]}</p>
              </Panel>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── 03 TRAJECTORY ────────────────────────────────────── */}
      <motion.section {...fadeIn} style={depth(3)} className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          index="03"
          title={language === "en" ? "Trajectory" : "Trayectoria"}
          meta="$ git log --oneline · Z 1.2m"
        />
        <div className="space-y-px">
          {timeline.map((item, i) => {
            const inner = (
              <div className="grid gap-2 border border-line bg-[#0a0a08]/60 p-5 transition-colors hover:border-line-strong md:grid-cols-[140px_120px_1fr] md:gap-6">
                <span className="mono text-xs tracking-wider text-accent">{item.year}</span>
                <Tag accent={item.tag.en === "LEADERSHIP"}>{item.tag[language]}</Tag>
                <div>
                  <p className="mono text-sm font-bold text-foreground">{item.title[language]}</p>
                  <p className="mono mt-0.5 text-xs text-muted">
                    {typeof item.org === "string" ? item.org : item.org[language]}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.detail[language]}</p>
                </div>
              </div>
            );
            return item.href ? (
              <Link key={i} href={item.href} className="block">
                {inner}
              </Link>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>
      </motion.section>

      {/* ── 04 CERTIFICATIONS ────────────────────────────────── */}
      <motion.section {...fadeIn} style={depth(4)} className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          index="04"
          title={language === "en" ? "Certifications" : "Certificaciones"}
          meta={`${certificationsData.certifications.length} ${language === "en" ? "ENTRIES" : "REGISTROS"} · Z 1.6m`}
        />
        <div className="space-y-px">
          {featuredCerts.map((cert) => (
            <a
              key={cert.id}
              href={cert.credentialUrl !== "#" ? cert.credentialUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2 border border-line bg-[#0a0a08]/60 p-5 transition-colors hover:border-accent/60 md:grid-cols-[170px_1fr_auto] md:items-center md:gap-6"
            >
              <span className="mono text-xs uppercase tracking-wider text-muted">
                {cert.issuer.split("(")[0].trim()}
              </span>
              <div>
                <p className="mono text-sm font-bold text-foreground group-hover:text-accent">
                  {cert.title[language]}
                </p>
                <p className="mono mt-0.5 text-[11px] text-muted">{cert.date}</p>
              </div>
              <span className="mono text-xs text-muted transition-colors group-hover:text-accent">
                {language === "en" ? "VERIFY ↗" : "VERIFICAR ↗"}
              </span>
            </a>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/certifications" className={BTN_GHOST}>
            {language === "en" ? "All certifications →" : "Todas las certificaciones →"}
          </Link>
        </div>
      </motion.section>

      {/* ── 05 INTERESTS + CTA ───────────────────────────────── */}
      <motion.section {...fadeIn} style={depth(6)} className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader
          index="05"
          title={language === "en" ? "Interests" : "Intereses"}
          meta="Z 2.0m — CONTACT RANGE"
        />
        <div className="flex flex-wrap gap-2">
          {interests.map((it, i) => (
            <Tag key={i}>{it[language]}</Tag>
          ))}
        </div>

        <div className="relative mt-20 border border-line p-10 text-center md:p-16">
          <Corners />
          <HudLabel>{language === "en" ? "NEW MESSAGE" : "NUEVO MENSAJE"}</HudLabel>
          <p className="bitcount mx-auto mt-4 max-w-xl text-xl text-foreground md:text-2xl">
            {language === "en"
              ? "Building something at the edge of AI and the physical world?"
              : "¿Construyendo algo en el límite entre la IA y el mundo físico?"}
          </p>
          <div className="mt-8">
            <Link href="/contact" className={BTN_PRIMARY}>
              $ ./contact --init
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
