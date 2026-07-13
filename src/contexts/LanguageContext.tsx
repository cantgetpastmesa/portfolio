"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

/**
 * Detects the user's preferred language from the browser
 * @returns "en" or "es" based on browser language, defaults to "en"
 */
const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  // Get browser language (e.g., "en-US", "es-ES", "es-419", "en-GB")
  const browserLang = navigator.language.toLowerCase();
  
  // Check if it starts with "es" (Spanish)
  if (browserLang.startsWith("es")) {
    return "es";
  }
  
  // Default to English for all other languages
  return "en";
};

/**
 * Gets the initial language from localStorage or browser detection
 * Priority: localStorage > browser language > "en" default
 */
const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  try {
    // Check localStorage first (user's previous choice)
    const savedLang = localStorage.getItem("preferred-language");
    if (savedLang === "en" || savedLang === "es") {
      return savedLang;
    }
    
    // If no saved preference, detect from browser
    return detectBrowserLanguage();
  } catch {
    // Fallback if localStorage is not available
    return detectBrowserLanguage();
  }
};

/**
 * Shared UI strings (navigation). Page copy lives next to each page as
 * inline { en, es } objects — easier to keep both languages in sync.
 */
const translations = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.research": "Research",
    "nav.thesis": "Thesis",
    "nav.contact": "Contact",
    "nav.robotics": "Robotics",
    "nav.certifications": "Certifications",
  },
  es: {
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.research": "Investigación",
    "nav.thesis": "Tesis",
    "nav.contact": "Contacto",
    "nav.robotics": "Robótica",
    "nav.certifications": "Certificaciones",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with "en" to ensure SSR/client consistency
  const [language, setLanguageState] = useState<Language>("en");

  // After hydration, detect and apply user's language preference.
  // Deferred to a task so hydration completes with the SSR value first.
  useEffect(() => {
    const id = setTimeout(() => {
      const detectedLang = getInitialLanguage();
      if (detectedLang !== "en") {
        setLanguageState(detectedLang);
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Wrapper to save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("preferred-language", lang);
    } catch {
      console.warn("Could not save language preference to localStorage");
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
