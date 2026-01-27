"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export const FloatingNav = ({
  className,
}: {
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: t("nav.home"), link: "/" },
    { name: t("nav.projects"), link: "/projects" },
    { name: t("nav.research"), link: "/research" },
    { name: t("nav.thesis"), link: "/thesis" },
    { name: t("nav.robotics"), link: "/robotics" },
    { name: t("nav.about"), link: "/about" },
  ];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-10 inset-x-0 max-w-fit mx-auto z-50",
            className
          )}
        >
          <div className="flex items-center justify-center space-x-4 px-8 py-4 backdrop-blur-md bg-black/20 border border-white/10 rounded-full shadow-lg">
            {navItems.map((item, idx) => (
              <Link
                key={`nav-${idx}`}
                href={item.link}
                className={cn(
                  "relative text-neutral-50 hover:text-neutral-300 transition-colors text-sm font-medium"
                )}
              >
                <span className="block">{item.name}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
            
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="ml-4 px-3 py-1 text-xs font-medium text-neutral-50 hover:text-neutral-300 border border-white/20 rounded-full hover:border-white/40 transition-all"
            >
              {language === "en" ? "ES" : "EN"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
