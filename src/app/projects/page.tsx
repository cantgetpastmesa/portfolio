"use client";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import projectsData from "@/data/projects.json";
import { motion } from "framer-motion";
import { Github, ExternalLink, FileText } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { Vortex } from "@/components/ui/vortex";

type Category = "all" | "aiml" | "crypto" | "robotics" | "webmobile";

export default function ProjectsPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: t("projects.filter.all") },
    { id: "aiml", label: t("projects.filter.aiml") },
    { id: "crypto", label: t("projects.filter.crypto") },
    { id: "robotics", label: t("projects.filter.robotics") },
    { id: "webmobile", label: t("projects.filter.webmobile") },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projectsData.projects 
    : projectsData.projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex items-center justify-center w-full min-h-screen"
      >
        <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <TypewriterText
            text={t("projects.title")}
            as="h1"
            className="google-sans-code text-5xl md:text-7xl font-bold text-white mb-6"
            speed={80}
          />
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#00007F] text-white"
                  : "bg-white/10 text-neutral-300 hover:bg-white/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-colors overflow-hidden"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Title */}
                <h3 className="bitcount text-2xl font-bold text-white mb-3">
                  {project.title[language]}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                  {project.description[language]}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-white/5 text-neutral-300 rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
                      title={t("projects.viewCode")}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#00007F] hover:bg-[#0000A0] text-white text-sm rounded-lg transition-colors"
                      title={t("projects.viewLive")}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                  )}
                  {project.links.paper && (
                    <a
                      href={project.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
                      title={t("projects.viewPaper")}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Paper</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg">No projects found in this category.</p>
          </div>
        )}
        </div>
      </Vortex>
    </div>
  );
}
