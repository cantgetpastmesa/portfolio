"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

export const FloatingNav = ({
  className,
}: {
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { name: t("nav.about"), link: "/#about" },
    { name: t("nav.projects"), link: "/projects" },
    { name: t("nav.research"), link: "/research" },
    { name: t("nav.thesis"), link: "/thesis" },
    { name: t("nav.robotics"), link: "/robotics" },
    { name: "Certifications", link: "/certifications" },
    { name: t("nav.contact"), link: "/contact" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "hidden md:block fixed top-10 inset-x-0 max-w-fit mx-auto z-50",
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

      {/* Mobile Hamburger Button */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.button
            initial={{ opacity: 0, y: -100 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="md:hidden fixed top-10 right-4 z-50 p-3 backdrop-blur-md bg-black/20 border border-white/10 rounded-full shadow-lg"
          >
            <Menu className="w-6 h-6 text-neutral-50" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full pt-24 pb-8">
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-10 right-4 p-3 text-neutral-50 hover:text-neutral-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Items */}
              <nav className="flex flex-col space-y-6 px-6 flex-1">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={`mobile-nav-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative block text-neutral-50 hover:text-neutral-300 transition-colors text-lg font-medium py-2"
                    >
                      <span className="block">{item.name}</span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language Switcher */}
              <div className="px-6 mt-auto">
                <button
                  onClick={() => setLanguage(language === "en" ? "es" : "en")}
                  className="w-full px-4 py-2 text-sm font-medium text-neutral-50 hover:text-neutral-300 border border-white/20 rounded-full hover:border-white/40 transition-all"
                >
                  {language === "en" ? "ES" : "EN"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
