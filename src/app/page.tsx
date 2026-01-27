"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Bot, Globe, ChevronDown } from "lucide-react";

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
        className="border border-white/20 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-120 rounded-2xl"
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
          <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
            {icon}
          </div>
          <h2 className="bitcount text-white text-2xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:-translate-y-2 transition duration-200">
            {title}
          </h2>
          <p className="text-neutral-400 text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-2 transition duration-200">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const { t } = useLanguage();

  const highlights = [
    {
      title: t("home.highlights.aiml"),
      description: "Deep Learning, Reinforcement Learning, Neural Networks",
      colors: [[0, 127, 255], [127, 255, 127]],
      link: "/research#aiml",
      icon: <Brain className="h-20 w-20 text-white" />,
      animationSpeed: 3,
      containerClassName: "bg-blue-900",
    },
    {
      title: t("home.highlights.robotics"),
      description: "Autonomous Systems, SLAM, Path Planning",
      colors: [[255, 127, 0], [127, 0, 0]],
      link: "/robotics",
      icon: <Bot className="h-20 w-20 text-white" />,
      animationSpeed: 4,
      containerClassName: "bg-orange-900",
    },
    {
      title: t("home.highlights.webmobile"),
      description: "Full Stack Development, Mobile Apps, Cloud Solutions",
      colors: [[0, 0, 127], [0, 127, 255]],
      link: "/projects#webmobile",
      icon: <Globe className="h-20 w-20 text-white" />,
      animationSpeed: 3.5,
      containerClassName: "bg-cyan-900",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen relative">
        <WavyBackground className="w-full h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="google-sans-code text-2xl md:text-4xl lg:text-6xl text-white">
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
                href="#contact"
                className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full transition-all"
              >
                {t("home.hero.cta.contact")}
              </Link>
            </div>
          </div>
        </WavyBackground>
        
        {/* Animated Scroll Down Arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={() => {
            document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/80 hover:text-white transition-colors" />
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="google-sans-code text-4xl md:text-6xl font-bold text-center text-white mb-16">
            {t("home.highlights.title")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div className="mt-16">
            <Link href="/research#crypto">
              <div className="max-w-md mx-auto">
                <h3 className="bitcount text-2xl font-bold text-white text-center mb-4">
                  {t("home.highlights.crypto")}
                </h3>
                <EvervaultCard text="CRYPTO" />
                <p className="text-neutral-400 text-sm text-center mt-4">
                  Post-Quantum Cryptography, Encryption, Security
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}