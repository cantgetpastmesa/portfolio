"use client";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, Github } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";

export default function RoboticsPage() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(0);

  const roboticsProjects = [
    {
      title: {
        en: "Autonomous Navigation Robot",
        es: "Robot de Navegación Autónoma",
      },
      description: {
        en: "Mobile robot capable of autonomous navigation using SLAM and path planning algorithms. Equipped with LiDAR and camera sensors for environment perception.",
        es: "Robot móvil capaz de navegación autónoma usando SLAM y algoritmos de planificación de rutas. Equipado con sensores LiDAR y cámara para percepción del entorno.",
      },
      technologies: ["ROS", "Python", "C++", "OpenCV", "PCL"],
      images: [
        "/robots/robot1-1.jpg",
        "/robots/robot1-2.jpg",
        "/robots/robot1-3.jpg",
      ],
      videos: ["https://instagram.com/p/example1"],
      github: "https://github.com/username/autonomous-nav",
    },
    {
      title: {
        en: "Robotic Arm with Vision",
        es: "Brazo Robótico con Visión",
      },
      description: {
        en: "6-DOF robotic arm with computer vision for object detection and manipulation. Implements inverse kinematics and trajectory planning.",
        es: "Brazo robótico de 6 grados de libertad con visión por computadora para detección y manipulación de objetos. Implementa cinemática inversa y planificación de trayectorias.",
      },
      technologies: ["ROS", "MoveIt", "OpenCV", "TensorFlow", "Arduino"],
      images: [
        "/robots/robot2-1.jpg",
        "/robots/robot2-2.jpg",
      ],
      videos: ["https://instagram.com/p/example2"],
      github: "https://github.com/username/robotic-arm",
    },
  ];

  const currentProject = roboticsProjects[selectedProject];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 px-4"
      >
        <TypewriterText
          text={language === "en" ? "Robotics" : "Robótica"}
          as="h1"
          className="google-sans-code text-5xl md:text-7xl font-bold text-white mb-6"
          speed={80}
        />
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
          {language === "en"
            ? "Building intelligent machines that interact with the physical world"
            : "Construyendo máquinas inteligentes que interactúan con el mundo físico"
          }
        </p>
      </motion.div>

      {/* Project Selector */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setSelectedProject((selectedProject - 1 + roboticsProjects.length) % roboticsProjects.length)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex gap-3">
            {roboticsProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedProject(index)}
                className={`h-2 rounded-full transition-all ${
                  selectedProject === index 
                    ? "w-12 bg-cyan-500" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setSelectedProject((selectedProject + 1) % roboticsProjects.length)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProject}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-white/10">
                {/* Placeholder for main image */}
                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                  <p>Image Gallery Placeholder</p>
                  <p className="text-sm mt-2">Add your robot images here</p>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-3 gap-4">
                {currentProject.images.map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center text-neutral-700 text-xs"
                  >
                    Img {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <h2 className="bitcount text-4xl font-bold text-white mb-4">
                  {currentProject.title[language]}
                </h2>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  {currentProject.description[language]}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="bitcount text-xl font-semibold text-white mb-3">
                  {language === "en" ? "Technologies" : "Tecnologías"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4">
                {currentProject.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                )}
                {currentProject.videos.length > 0 && (
                  <a
                    href={currentProject.videos[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>

              {/* Embedded Instagram Posts */}
              <div className="pt-6">
                <h3 className="bitcount text-xl font-semibold text-white mb-4">
                  {language === "en" ? "Videos & Demos" : "Videos y Demostraciones"}
                </h3>
                <div className="space-y-4">
                  {currentProject.videos.map((video, i) => (
                    <div
                      key={i}
                      className="aspect-video bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center text-neutral-600"
                    >
                      <div className="text-center">
                        <Instagram className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Instagram embed: {video}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Additional Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 mt-24"
      >
        <TypewriterText
          text={language === "en" ? "Technical Details" : "Detalles Técnicos"}
          as="h2"
          className="google-sans-code text-4xl font-bold text-white mb-12 text-center"
          speed={60}
          delay={200}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8">
            <h3 className="bitcount text-2xl font-bold text-white mb-4">
              {language === "en" ? "Hardware" : "Hardware"}
            </h3>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Raspberry Pi 4 / Jetson Nano</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>LiDAR Sensor (RPLIDAR A1/A2)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Intel RealSense Camera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Motor Controllers & Encoders</span>
              </li>
            </ul>
          </div>

          <div className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8">
            <h3 className="bitcount text-2xl font-bold text-white mb-4">
              {language === "en" ? "Software" : "Software"}
            </h3>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>ROS (Robot Operating System)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>SLAM Algorithms (GMapping, Cartographer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Navigation Stack (move_base)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Computer Vision (OpenCV, TensorFlow)</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
