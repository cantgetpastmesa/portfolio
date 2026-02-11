"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, FileCheck } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { Vortex } from "@/components/ui/vortex";
import certificationsData from "@/data/certifications.json";

export default function CertificationsPage() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = React.useState<"all" | "featured">("all");

  const filteredCertifications =
    filter === "all"
      ? certificationsData.certifications
      : certificationsData.certifications.filter((cert) => cert.featured);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={100}
        baseHue={220}
        baseSpeed={0.1}
        className="flex items-center justify-center w-full min-h-screen"
      >
        <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <TypewriterText
            text={t("certifications.title")}
            as="h1"
            className="google-sans-code text-5xl md:text-7xl font-bold text-white mb-6"
            speed={80}
          />
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            {t("certifications.subtitle")}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          <button
            onClick={() => setFilter("all")}
            className={`bitcount px-6 py-2 rounded-full transition-all ${
              filter === "all"
                ? "bg-cyan-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t("certifications.allButton")}
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`bitcount px-6 py-2 rounded-full transition-all ${
              filter === "featured"
                ? "bg-cyan-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t("certifications.featuredButton")}
          </button>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
              className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-[border-color] group relative overflow-hidden"
            >
              {/* Featured Badge */}
              {cert.featured && (
                <div className="absolute top-4 right-4 bg-cyan-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  {t("certifications.featuredTag")}
                </div>
              )}

              {/* Award Icon */}
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-cyan-400" />
              </div>

              {/* Title */}
              <h3 className="bitcount text-xl font-bold text-white mb-2">
                {cert.title[language]}
              </h3>

              {/* Issuer */}
              <p className="text-cyan-400 text-sm mb-4 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                {cert.issuer}
              </p>

              {/* Date */}
              <p className="text-neutral-400 text-sm mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {cert.date}
              </p>

              {/* Description */}
              <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                {cert.description[language]}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                  {t("certifications.skills")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-neutral-300 hover:border-cyan-500/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credential Info */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-xs text-neutral-500 mb-2">
                  {t("certifications.credentialId")}: {cert.credentialId}
                </p>
                
                {/* View Credential Link */}
                {cert.credentialUrl !== "#" && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 text-sm hover:text-cyan-300 transition-colors font-medium"
                  >
                    {t("certifications.viewCredential")}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Award className="w-20 h-20 text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-500 text-lg">
              {t("certifications.noCerts")}
            </p>
          </motion.div>
        )}
        </div>
      </Vortex>
    </div>
  );
}
