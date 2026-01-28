"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import researchData from "@/data/research.json";
import { motion } from "framer-motion";
import { Github, FileText, ExternalLink } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";

const ResearchSection = ({ 
    title, 
    items, 
    id,
    language 
  }: { 
    title: string; 
    items: typeof researchData.research; 
    id: string;
    language: "en" | "es";
  }) => (
    <section id={id} className="mb-32 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <TypewriterText
          text={title}
          as="h2"
          className="google-sans-code text-4xl md:text-5xl font-bold text-white"
          speed={60}
        />
      </motion.div>

      <motion.div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
            className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
          >
            {/* Title */}
            <h3 className="bitcount text-2xl md:text-3xl font-bold text-white mb-4">
              {item.title[language]}
            </h3>

            {/* Abstract */}
            <p className="text-neutral-300 text-base leading-relaxed mb-6">
              {item.abstract[language]}
            </p>

            {/* Papers */}
            {item.papers && item.papers.length > 0 && (
              <div className="mb-6">
                <h4 className="bitcount text-lg font-semibold text-white mb-3">Publications</h4>
                <div className="space-y-3">
                  {item.papers.map((paper, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <FileText className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{paper.title}</p>
                        {paper.venue && (
                          <p className="text-sm text-neutral-400 mt-1">{paper.venue}</p>
                        )}
                      </div>
                      {paper.pdf && (
                        <a
                          href={paper.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm rounded-lg transition-all flex items-center gap-2"
                        >
                          <ExternalLink className="w-3 h-3" />
                          PDF
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Link */}
            {item.code && (
              <a
                href={item.code}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );

export default function ResearchPage() {
  const { language, t } = useLanguage();

  const researchByCategory = {
    aiml: researchData.research.filter(r => r.category === "aiml"),
    crypto: researchData.research.filter(r => r.category === "crypto"),
    robotics: researchData.research.filter(r => r.category === "robotics"),
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <TypewriterText
            text={t("research.title")}
            as="h1"
            className="google-sans-code text-5xl md:text-7xl font-bold text-white mb-6"
            speed={80}
          />
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Exploring frontiers in AI, Cryptography, and Robotics
          </p>
        </motion.div>

        {/* Research Sections */}
        <ResearchSection
          id="aiml"
          title={t("research.aiml.title")}
          items={researchByCategory.aiml}
          language={language}
        />

        <ResearchSection
          id="crypto"
          title={t("research.crypto.title")}
          items={researchByCategory.crypto}
          language={language}
        />

        <ResearchSection
          id="robotics"
          title={t("research.robotics.title")}
          items={researchByCategory.robotics}
          language={language}
        />
      </div>
    </div>
  );
}
