"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Mail } from "lucide-react";
import { HudLabel } from "@/components/ui/terminal";

export const Footer = () => {
  const { language, t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { name: t("nav.robotics"), href: "/robotics" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.research"), href: "/research" },
    { name: t("nav.thesis"), href: "/thesis" },
    { name: t("nav.certifications"), href: "/certifications" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="border-t border-line bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="mono text-sm text-foreground">
              <span className="text-accent">felipe@mesa</span>
              <span className="text-muted">:~$ whoami</span>
            </p>
            <p className="text-sm text-muted">
              {language === "en"
                ? "Electronic & Computer engineering student — AI/ML and robotics."
                : "Estudiante de Ingeniería Electrónica y de Sistemas — IA/ML y robótica."}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://github.com/cantgetpastmesa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted transition-colors hover:text-accent"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/felipe-a-mesa-n"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition-colors hover:text-accent"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href="mailto:f.mesan@uniandes.edu.co"
                aria-label="Email"
                className="text-muted transition-colors hover:text-accent"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav className="mono grid grid-cols-2 content-start gap-x-8 gap-y-2" aria-label="Footer">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <div className="mono space-y-2 text-xs text-muted md:text-right">
            <p>
              <HudLabel>[POS]</HudLabel> 4.6483°N 74.0836°W — BOGOTÁ, CO
            </p>
            <p>
              <HudLabel>[UTC]</HudLabel> -05:00
            </p>
            <p>
              <HudLabel>[STATUS]</HudLabel>{" "}
              <span className="text-accent">
                {language === "en" ? "OPEN TO COLLABORATION" : "ABIERTO A COLABORAR"}
              </span>
            </p>
          </div>
        </div>

        <div className="mono mt-10 border-t border-line pt-6 text-center text-[11px] tracking-wider text-muted">
          © {year} FELIPE A. MESA N. —{" "}
          {language === "en" ? "BUILT FROM SCRATCH, NO TEMPLATES" : "HECHO DESDE CERO, SIN PLANTILLAS"}
        </div>
      </div>
    </footer>
  );
};
