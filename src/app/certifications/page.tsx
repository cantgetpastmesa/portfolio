"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import certificationsData from "@/data/certifications.json";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { HudLabel, Tag } from "@/components/ui/terminal";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CertificationsPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = React.useState<"all" | "featured">("all");

  const certs =
    filter === "all"
      ? certificationsData.certifications
      : certificationsData.certifications.filter((c) => c.featured);

  return (
    <div
      className="relative min-h-screen pb-24 pt-32"
      style={{ "--accent": "var(--depth-4)" } as React.CSSProperties}
    >
      <div className="grid-backdrop absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <HudLabel>$ sha256sum ./credentials/*</HudLabel>
        <ScrambleText
          text={language === "en" ? "CERTIFICATIONS" : "CERTIFICACIONES"}
          as="h1"
          className="bitcount mt-3 block text-4xl text-foreground md:text-6xl"
        />
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {language === "en"
            ? "Verified credentials — courses, professional certificates and achievements. Every entry links to its issuer for verification."
            : "Credenciales verificadas — cursos, certificados profesionales y logros. Cada entrada enlaza a su emisor para verificación."}
        </p>

        <div className="mono mt-10 flex gap-2 text-xs">
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "border px-3 py-1 uppercase tracking-wider transition-colors",
                filter === f
                  ? "border-accent bg-accent text-black"
                  : "border-line text-muted hover:border-line-strong hover:text-foreground",
              )}
            >
              {f === "all"
                ? language === "en"
                  ? "All"
                  : "Todas"
                : language === "en"
                  ? "Featured"
                  : "Destacadas"}
            </button>
          ))}
        </div>

        {/* Ledger */}
        <div className="mt-8 space-y-px">
          {certs.map((cert, i) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="group border border-line bg-[#0a0a08]/60 p-6 transition-colors hover:border-line-strong"
            >
              <div className="mono flex flex-wrap items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                <span>
                  {String(i + 1).padStart(2, "0")} — {cert.issuer}
                </span>
                <span className="flex items-center gap-3">
                  {cert.featured && <span className="text-accent">★ FEATURED</span>}
                  <span>{cert.date}</span>
                </span>
              </div>
              <h2 className="mono mt-3 text-lg font-bold text-foreground md:text-xl">
                {cert.title[language]}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                {cert.description[language]}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
              <div className="mono mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-xs">
                <span className="text-muted">
                  ID: <span className="text-foreground/70">{cert.credentialId}</span>
                </span>
                {cert.credentialUrl !== "#" && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                  >
                    {language === "en" ? "VERIFY" : "VERIFICAR"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
