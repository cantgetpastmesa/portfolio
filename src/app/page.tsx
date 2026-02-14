"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { Vortex } from "@/components/ui/vortex";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Brain,
  Bot,
  Computer,
  ChevronDown,
  Lock,
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
  ExternalLink,
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import certificationsData from "@/data/certifications.json";

const HighlightCard = ({
  title,
  description,
  icon,
  children,
  link,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  link: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link href={link}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="border border-white/20 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-110 rounded-3xl bg-black"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full w-full absolute inset-0"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 text-center px-4">
          <div className="text-center group-hover/canvas-card:-translate-y-4 transition duration-200 w-full mx-auto flex flex-col items-center justify-center">
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {icon}
            </motion.div>
            <h2 className="bitcount text-white text-xl font-bold mt-4">
              {title}
            </h2>
          </div>
          <p className="text-neutral-400 text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 transition duration-200">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const { t, language } = useLanguage();
  const [timelineView, setTimelineView] = React.useState<
    "academic" | "professional"
  >("academic");

  const academicTimeline = [
      {
      year: "2022 - Present",
      title: {
        en: "B.S. Electronic Engineering",
        es: "Ingeniería Electrónica",
      },
      institution: "Universidad de Los Andes",
      description: {
        en: "Major in Electronic Engineering",
        es: "Pregrado en Ingeniería Electrónica",
      },
    },
    {
      year: "2023 - Present",
      title: {
        en: "B.S. Computer Science & Software Engineering",
        es: "Ingeniería de Sistemas y Computación",
      },
      institution: "Universidad de Los Andes",
      description: {
        en: "Major in Computer Science & Software Engineering with focus in ML/AI and Robotics.",
        es: "Pregrado en Ingeniería de Sistemas y Computación con enfoque en ML/IA y robótica.",
      },
    },
    {
      year: "2024",
      title: {
        en: "Minor in Machine Learning",
        es: "Opción en Machine Learning (aprendizaje automático)",
      },
      institution: "Universidad de los Andes",
      description: {
        en: "Specialized in identifying opportunities for ML applications, designing solutions using appropriate ML techniques, and evaluating AI systems with an ethical and socially responsible approach",
        es: "Especializado en identificar oportunidades para aplicaciones de ML, diseñar soluciones usando técnicas apropiadas de ML, y evaluar sistemas de IA con un enfoque ético y socialmente responsable",
      },
    },
  ];

  const professionalTimeline = [
    {
      year: "2022 - 2023",
      title: {
        en: "Software Engineering Intern",
        es: "Practicante en Ingeniería de Software",
      },
      institution: "Tech Company",
      description: {
        en: "Developed full-stack web applications and cloud infrastructure",
        es: "Desarrollé aplicaciones web full-stack e infraestructura en la nube",
      },
    },
    {
      year: "2021 - 2022",
      title: {
        en: "Freelance Developer",
        es: "Desarrollador Independiente",
      },
      institution: "Self-Employed",
      description: {
        en: "Built custom web solutions for various clients",
        es: "Construí soluciones web personalizadas para varios clientes",
      },
    },
  ];

  const interests = [
    {
      name: {
        en: "Hardware",
        es: "Hardware",
      },
      icon: "🛰️",
    },
    {
      name: {
        en: "Robotics",
        es: "Robótica",
      },
      icon: "🤖",
    },
    {
      name: {
        en: "Cryptography",
        es: "Criptografía",
      },
      icon: "🔐",
    },
    {
      name: {
        en: "Machine Learning",
        es: "Aprendizaje automático",
      },
      icon: "🧠",
    },
    {
      name: {
        en: "Mobile & Web Development",
        es: "Desarrollo de aplicaciones móviles y web",
      },
      icon: "💻",
    },
    {
      name: {
        en: "Entrepreneurship",
        es: "Emprendimiento",
      },
      icon: "🚀",
    },
  ];

  const featuredCertifications = certificationsData.certifications.filter(
    (cert) => cert.featured,
  );

  const highlights = [
    {
      title: t("home.highlights.aiml"),
      description: t("home.highlights.aiml.description"),
      colors: [
        [0, 127, 255],
        [127, 255, 127],
      ],
      link: "/research#aiml",
      icon: <Brain className="h-20 w-20 text-white" />,
      animationSpeed: 3,
      containerClassName: "bg-blue-900 rounded-3xl overflow-hidden",
    },
    {
      title: t("home.highlights.robotics"),
      description: t("home.highlights.robotics.description"),
      colors: [
        [255, 255, 0],
        [255, 200, 0],
      ],
      link: "/robotics",
      icon: <Bot className="h-20 w-20 text-white" />,
      animationSpeed: 4,
      containerClassName: "bg-yellow-900 rounded-3xl overflow-hidden",
    },
    {
      title: t("home.highlights.webmobile"),
      description: t("home.highlights.webmobile.description"),
      colors: [
        [255, 127, 0],
        [127, 0, 0],
      ],
      link: "/projects#webmobile",
      icon: <Computer className="h-20 w-20 text-white" />,
      animationSpeed: 3.5,
      containerClassName: "bg-orange-900 rounded-3xl overflow-hidden",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen relative z-20">
        <WavyBackground className="w-full h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="google-sans-code text-4xl md:text-6xl lg:text-6xl text-white">
              <EncryptedText
                text="Felipe A. Mesa N."
                encryptedClassName="text-neutral-500"
                revealedClassName="dark:text-white text-white"
                revealDelayMs={70}
              />
            </p>
            <p className="bitcount text-xl md:text-2xl mt-8 text-white max-w-2xl mx-auto">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex gap-4 mt-12 justify-center flex-wrap">
              <Link
                href="/projects"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm"
              >
                {t("home.hero.cta.projects")}
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-full transition-all font-medium"
              >
                {t("home.hero.cta.contact")}
              </Link>
            </div>
          </div>
        </WavyBackground>

        {/* Animated Scroll Down Arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-50"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/80 hover:text-white transition-colors" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-12 px-4 bg-black">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={100}
          baseHue={220}
          baseSpeed={0.1}
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full"
        />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* About Me Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <TypewriterText
              text={t("home.about.title")}
              as="h2"
              className="google-sans-code text-4xl md:text-6xl font-bold text-center text-white mb-12"
              speed={70}
            />
            <div className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="prose prose-invert max-w-none">
                <p className="text-neutral-300 leading-relaxed mb-4">
                  {t("home.about.bio.p1")}
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  {t("home.about.bio.p2")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* What I Do Section */}
        </div>
      </section>

      <section className="relative py-12 px-4 bg-black">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={100}
          baseHue={220}
          baseSpeed={0.1}
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <TypewriterText
              text={t("home.highlights.title")}
              as="h2"
              className="google-sans-code text-4xl md:text-6xl font-bold text-center text-white mb-16"
              speed={70}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {highlights.map((highlight, index) => (
                <HighlightCard
                  key={index}
                  title={highlight.title}
                  description={highlight.description}
                  icon={highlight.icon}
                  link={highlight.link}
                >
                  <CanvasRevealEffect
                    animationSpeed={highlight.animationSpeed}
                    containerClassName={highlight.containerClassName}
                    colors={highlight.colors}
                    dotSize={3}
                  />
                </HighlightCard>
              ))}
            </div>

            {/* Cryptography Card with Evervault */}
            <div className="mt-8 flex justify-center">
              <Link href="/research#crypto">
                <div className="border border-white/20 group flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-96 rounded-3xl bg-black">
                  <div className="absolute inset-0 h-full w-full">
                    <EvervaultCard text="" />
                  </div>

                  <div className="relative z-20 text-center px-4">
                    <div className="text-center group-hover:-translate-y-4 transition duration-200 w-full mx-auto flex flex-col items-center justify-center">
                      <Lock className="h-20 w-20 text-white" />
                      <h2 className="bitcount text-white text-xl font-bold mt-4">
                        {t("home.highlights.crypto")}
                      </h2>
                    </div>
                    <p className="text-neutral-400 text-sm opacity-0 group-hover:opacity-100 relative z-10 mt-4 transition duration-200">
                      {t("home.highlights.crypto.description")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-12 px-4 bg-black">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={100}
          baseHue={220}
          baseSpeed={0.1}
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full"
        />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <TypewriterText
                text={t("home.timeline.title")}
                as="h2"
                className="google-sans-code text-3xl md:text-4xl font-bold text-white"
                speed={60}
              />
            </div>

            {/* Timeline Toggle */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-neutral-900 border border-white/10 rounded-full p-1">
                <button
                  onClick={() => setTimelineView("academic")}
                  className={`bitcount px-6 py-2 rounded-full transition-all ${
                    timelineView === "academic"
                      ? "bg-cyan-500 text-black"
                      : "text-white hover:text-cyan-400"
                  }`}
                >
                  <GraduationCap className="inline w-5 h-5 mr-2" />
                  {t("home.timeline.academic")}
                </button>
                <button
                  onClick={() => setTimelineView("professional")}
                  className={`bitcount px-6 py-2 rounded-full transition-all ${
                    timelineView === "professional"
                      ? "bg-cyan-500 text-black"
                      : "text-white hover:text-cyan-400"
                  }`}
                >
                  <Briefcase className="inline w-5 h-5 mr-2" />
                  {t("home.timeline.professional")}
                </button>
              </div>
            </div>

            {/* Timeline Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={timelineView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-3xl mx-auto"
              >
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500 via-blue-500 to-transparent" />

                <div className="space-y-8">
                  {(timelineView === "academic"
                    ? academicTimeline
                    : professionalTimeline
                  ).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative pl-20"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-cyan-500 border-4 border-black" />

                      <div className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-[border-color]">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-sm text-cyan-400 font-medium mb-1">
                              {item.year}
                            </p>
                            <h3 className="bitcount text-xl font-bold text-white">
                              {item.title[language]}
                            </h3>
                            <p className="text-neutral-400 text-sm mt-1">
                              {item.institution}
                            </p>
                          </div>
                        </div>
                        <p className="text-neutral-300">
                          {item.description[language]}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-12 px-4 bg-black">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={100}
          baseHue={220}
          baseSpeed={0.1}
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full"
        />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-12">
              <Award className="w-8 h-8 text-cyan-400" />
              <TypewriterText
                text={t("home.certifications.title")}
                as="h2"
                className="google-sans-code text-3xl md:text-4xl font-bold text-white"
                speed={60}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuredCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-[border-color] group"
                >
                  <h3 className="bitcount text-lg font-bold text-white mb-2">
                    {cert.title[language]}
                  </h3>
                  <p className="text-cyan-400 text-sm mb-3">{cert.issuer}</p>
                  <p className="text-neutral-400 text-sm mb-4">
                    {cert.description[language]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {cert.credentialUrl !== "#" && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                    >
                      View Credential
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                {t("home.certifications.viewAll")}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interests */}
      <section className="relative py-12 px-4 bg-black">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={100}
          baseHue={220}
          baseSpeed={0.1}
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full"
        />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-12">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <TypewriterText
                text={t("home.interests.title")}
                as="h2"
                className="google-sans-code text-3xl md:text-4xl font-bold text-white"
                speed={60}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-[border-color] text-center cursor-pointer"
                >
                  <div className="text-4xl mb-3">{interest.icon}</div>
                  <p className="text-white font-medium">{interest.name[language]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
