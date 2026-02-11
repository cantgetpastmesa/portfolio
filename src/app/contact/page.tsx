"use client";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "@/components/TypewriterText";
import { Vortex } from "@/components/ui/vortex";
import { Mail, MapPin, Send, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            language === "en"
              ? "Message sent successfully! I'll get back to you soon."
              : "¡Mensaje enviado con éxito! Te responderé pronto.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            language === "en"
              ? "Failed to send message. Please try again or email me directly."
              : "Error al enviar el mensaje. Inténtalo de nuevo o escríbeme directamente.",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={100}
        baseHue={220}
        className="flex items-center justify-center w-full min-h-screen px-2 md:px-10 py-4"
      >
        <div className="max-w-6xl mx-auto px-4 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <TypewriterText
            text={t("contact.title")}
            as="h1"
            className="google-sans-code text-5xl md:text-7xl font-bold text-white mb-6"
            speed={80}
          />
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            {language === "en"
              ? "Have a project in mind or want to collaborate? Feel free to reach out!"
              : "¿Tienes un proyecto en mente o quieres colaborar? ¡No dudes en contactarme!"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 space-y-8">
            <div>
              <TypewriterText
                text={language === "en" ? "Let's Connect" : "Conectémonos"}
                as="h2"
                className="google-sans-code text-3xl font-bold text-white mb-6"
                speed={60}
                delay={400}
              />
              <p className="text-neutral-300 leading-relaxed mb-8">
                {language === "en"
                  ? "I'm always interested in hearing about new projects, opportunities, and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
                  : "Siempre estoy interesado en escuchar sobre nuevos proyectos, oportunidades y colaboraciones. Ya sea que tengas una pregunta o solo quieras saludar, ¡haré mi mejor esfuerzo para responderte!"}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all">
                <Mail className="w-6 h-6 text-cyan-400 mt-1 shrink-0" />
                <div>
                  <h3 className="bitcount text-lg font-semibold text-white mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:f.mesan@uniandes.edu.co"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    f.mesan@uniandes.edu.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all">
                <MapPin className="w-6 h-6 text-cyan-400 mt-1 shrink-0" />
                <div>
                  <h3 className="bitcount text-lg font-semibold text-white mb-2">
                    {language === "en" ? "Location" : "Ubicación"}
                  </h3>
                  <p className="text-neutral-300">
                    {language === "en"
                      ? "Bogotá, Colombia"
                      : "Bogotá, Colombia"}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="bitcount text-lg font-semibold text-white mb-4">
                {language === "en" ? "Follow Me" : "Sígueme"}
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/cantgetpastmesa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/felipe-a-mesa-n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  {t("contact.name")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder={
                    language === "en" ? "Your name" : "Tu nombre"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  {t("contact.email")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder={
                    language === "en"
                      ? "your.email@example.com"
                      : "tu.email@ejemplo.com"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  {t("contact.message")} <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder={
                    language === "en"
                      ? "Tell me about your project or idea..."
                      : "Cuéntame sobre tu proyecto o idea..."
                  }
                />
              </div>
              {/* Required fields legend */}
              <p className="text-xs text-neutral-400">
                <span className="text-red-400">*</span>{" "}
                {language === "en" ? "Indicates required field" : "Indica campo obligatorio"}
              </p>
              {/* Status Message */}
              <AnimatePresence mode="wait">
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-3 p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/50 text-green-400"
                        : "bg-red-500/10 border border-red-500/50 text-red-400"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 shrink-0" />
                    )}
                    <p className="text-sm">{submitStatus.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {language === "en" ? "Sending..." : "Enviando..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t("contact.send")}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
        </div>
      </Vortex>
    </div>
  );
}
