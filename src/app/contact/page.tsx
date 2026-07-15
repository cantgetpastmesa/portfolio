"use client";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { AsciiBackdrop } from "@/components/ascii/AsciiBackdrop";
import { plasma } from "@/components/ascii/programs";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { HudLabel, Panel } from "@/components/ui/terminal";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Loader2 } from "lucide-react";

const FIELD =
  "mono w-full border border-line bg-[#0a0a08] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors";

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const backdrop = React.useMemo(() => plasma(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            language === "en"
              ? "Message sent. I'll get back to you soon."
              : "Mensaje enviado. Te responderé pronto.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            language === "en"
              ? "Failed to send. Try again or email me directly."
              : "Error al enviar. Inténtalo de nuevo o escríbeme directamente.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          language === "en"
            ? "An error occurred. Please try again later."
            : "Ocurrió un error. Por favor, inténtalo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen pb-24 pt-32">
      <AsciiBackdrop program={backdrop} opacityClass="opacity-45" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <HudLabel>$ ./contact --init</HudLabel>
        <ScrambleText
          text={language === "en" ? "GET IN TOUCH" : "CONTACTO"}
          as="h1"
          className="bitcount mt-3 block text-4xl text-foreground md:text-6xl"
        />
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {language === "en"
            ? "Research collaboration, robotics, an internship or a wild startup idea — the channel is open."
            : "Colaboración en investigación, robótica, una pasantía o una idea loca de startup — el canal está abierto."}
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_3fr]">
          {/* Channel info */}
          <div className="space-y-4">
            <Panel className="p-6">
              <HudLabel>{language === "en" ? "DIRECT CHANNEL" : "CANAL DIRECTO"}</HudLabel>
              <a
                href="mailto:f.mesan@uniandes.edu.co"
                className="mono mt-2 block break-all text-sm text-accent hover:underline"
              >
                f.mesan@uniandes.edu.co
              </a>
            </Panel>
            <Panel className="p-6">
              <HudLabel>{language === "en" ? "POSITION" : "POSICIÓN"}</HudLabel>
              <p className="mono mt-2 text-sm text-foreground">Bogotá, Colombia — UTC-5</p>
            </Panel>
            <Panel className="p-6">
              <HudLabel>{language === "en" ? "ELSEWHERE" : "EN OTROS LADOS"}</HudLabel>
              <div className="mt-3 flex gap-4">
                <a
                  href="https://github.com/cantgetpastmesa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="mono inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
                >
                  <GithubIcon className="h-4 w-4" /> GITHUB
                </a>
                <a
                  href="https://linkedin.com/in/felipe-a-mesa-n"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="mono inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
                >
                  <LinkedinIcon className="h-4 w-4" /> LINKEDIN
                </a>
              </div>
            </Panel>
          </div>

          {/* Terminal form */}
          <Panel className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mono mb-2 block text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="text-accent">{">"}</span> {language === "en" ? "name" : "nombre"} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className={FIELD}
                  placeholder={language === "en" ? "your name" : "tu nombre"}
                />
              </div>

              <div>
                <label htmlFor="email" className="mono mb-2 block text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="text-accent">{">"}</span> email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className={FIELD}
                  placeholder={language === "en" ? "you@domain.com" : "tu@dominio.com"}
                />
              </div>

              <div>
                <label htmlFor="message" className="mono mb-2 block text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="text-accent">{">"}</span> {language === "en" ? "message" : "mensaje"} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  maxLength={5000}
                  className={`${FIELD} resize-none`}
                  placeholder={
                    language === "en"
                      ? "what are we building?"
                      : "¿qué vamos a construir?"
                  }
                />
              </div>

              <AnimatePresence mode="wait">
                {submitStatus.type && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`mono border px-4 py-3 text-xs ${
                      submitStatus.type === "success"
                        ? "border-accent/60 text-accent"
                        : "border-red-500/60 text-red-400"
                    }`}
                  >
                    [{submitStatus.type === "success" ? "OK" : "ERR"}] {submitStatus.message}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mono inline-flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-black transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {language === "en" ? "TRANSMITTING…" : "TRANSMITIENDO…"}
                  </>
                ) : (
                  <>$ {language === "en" ? "send --message" : "enviar --mensaje"}</>
                )}
              </button>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  );
}
