"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";

export default function AboutPage() {
  const { t, language } = useLanguage();

  const timeline = [
    {
      year: "2021 - Present",
      title: {
        en: "B.S. Computer Science",
        es: "Licenciatura en Ciencias de la Computación",
      },
      institution: "[University Name]",
      description: {
        en: "Major in Computer Science with focus on AI/ML and Robotics",
        es: "Carrera en Ciencias de la Computación con enfoque en IA/ML y Robótica",
      },
    },
    {
      year: "2023",
      title: {
        en: "Research Assistant",
        es: "Asistente de Investigación",
      },
      institution: "[Lab/Institution Name]",
      description: {
        en: "Conducted research in Deep Reinforcement Learning and Multi-Agent Systems",
        es: "Realicé investigación en Aprendizaje por Refuerzo Profundo y Sistemas Multi-Agente",
      },
    },
    {
      year: "2022",
      title: {
        en: "Software Engineering Intern",
        es: "Practicante en Ingeniería de Software",
      },
      institution: "[Company Name]",
      description: {
        en: "Developed full-stack web applications and cloud infrastructure",
        es: "Desarrollé aplicaciones web full-stack e infraestructura en la nube",
      },
    },
  ];

  const interests = [
    { name: "AI Safety", icon: "🛡️" },
    { name: "Robotics", icon: "🤖" },
    { name: "Cryptography", icon: "🔐" },
    { name: "Machine Learning", icon: "🧠" },
    { name: "Web Development", icon: "💻" },
    { name: "Entrepreneurship", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <TypewriterText
            text={t("about.title")}
            as="h1"
            className="google-sans-code text-5xl md:text-7xl font-bold text-white mb-6"
            speed={80}
          />
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            {language === "en" 
              ? "Software Engineer, AI/ML Researcher, and Robotics Enthusiast"
              : "Ingeniero de Software, Investigador en IA/ML y Entusiasta de la Robótica"
            }
          </p>
        </motion.div>

        {/* Academic Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
            <TypewriterText
              text={t("about.timeline.title")}
              as="h2"
              className="google-sans-code text-4xl font-bold text-white"
              speed={60}
              delay={200}
            />
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500 via-blue-500 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-cyan-500 border-4 border-black" />

                  <div className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
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
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-12">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <TypewriterText
              text={t("about.interests.title")}
              as="h2"
              className="google-sans-code text-4xl font-bold text-white"
              speed={60}
              delay={200}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all text-center cursor-pointer"
              >
                <div className="text-4xl mb-3">{interest.icon}</div>
                <p className="text-white font-medium">{interest.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8"
        >
          <TypewriterText
            text={language === "en" ? "About Me" : "Acerca de Mí"}
            as="h2"
            className="google-sans-code text-3xl font-bold text-white mb-6"
            speed={60}
            delay={200}
          />
          <div className="prose prose-invert max-w-none">
            <p className="text-neutral-300 leading-relaxed mb-4">
              {language === "en" 
                ? "I'm a Computer Science student and researcher passionate about the intersection of artificial intelligence, robotics, and software engineering. My work focuses on developing intelligent systems that can learn, adapt, and operate autonomously in complex environments."
                : "Soy estudiante e investigador de Ciencias de la Computación apasionado por la intersección de la inteligencia artificial, la robótica y la ingeniería de software. Mi trabajo se centra en desarrollar sistemas inteligentes que pueden aprender, adaptarse y operar de forma autónoma en entornos complejos."
              }
            </p>
            <p className="text-neutral-300 leading-relaxed">
              {language === "en"
                ? "Beyond research, I'm interested in building practical applications that leverage cutting-edge AI/ML techniques. I believe in the power of technology to solve real-world problems and am committed to contributing to a future where AI systems are safe, reliable, and beneficial to society."
                : "Más allá de la investigación, me interesa construir aplicaciones prácticas que aprovechen técnicas de IA/ML de vanguardia. Creo en el poder de la tecnología para resolver problemas del mundo real y estoy comprometido a contribuir a un futuro donde los sistemas de IA sean seguros, confiables y beneficiosos para la sociedad."
              }
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
