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

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.research": "Research",
    "nav.thesis": "Thesis",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.robotics": "Robotics",
    "nav.certifications":"Certifications",
    
    // Home
    "home.hero.title": "Felipe A. Mesa N.",
    "home.hero.subtitle": "Software Engineering · Computer Science · AI & ML, Robotics Researcher",
    "home.hero.cta.projects": "View Projects",
    "home.hero.cta.contact": "Contact Me",
    "home.about.title": "About Me",
    "home.about.bio.p1": "I'm a Computer Science student and researcher passionate about the intersection of artificial intelligence, robotics, and software engineering. My work focuses on developing intelligent systems that can learn, adapt, and operate autonomously in complex environments.",
    "home.about.bio.p2": "Beyond research, I'm interested in building practical applications that leverage cutting-edge AI/ML techniques. I believe in the power of technology to solve real-world problems and am committed to contributing to a future where AI systems are safe, reliable, and beneficial to society.",
    "home.timeline.title": "Experience",
    "home.timeline.academic": "Academic",
    "home.timeline.professional": "Professional",
    "home.interests.title": "Special Interests",
    "home.certifications.title": "Certifications & Achievements",
    "home.certifications.viewAll": "View All Certifications",
    "home.highlights.title": "What I Do",
    "home.highlights.aiml": "AI & ML Research",
    "home.highlights.aiml.description": "Deep Learning, Reinforcement Learning, Neural Networks",
    "home.highlights.robotics": "Robotics",
    "home.highlights.robotics.description": "Autonomous Systems, SLAM, Path Planning",
    "home.highlights.crypto": "Cryptography",
    "home.highlights.crypto.description": "Post-Quantum Cryptography, Encryption, Security",
    "home.highlights.webmobile": "Web & Mobile Apps",
    "home.highlights.webmobile.description": "Full Stack Development, Mobile Apps, Cloud Solutions",
    
    // Projects
    "projects.title": "Projects",
    "projects.filter.all": "All",
    "projects.filter.aiml": "AI / ML / RL",
    "projects.filter.crypto": "Cryptography",
    "projects.filter.robotics": "Robotics",
    "projects.filter.webmobile": "Web & Mobile Apps",
    "projects.viewCode": "View Code",
    "projects.viewLive": "Live Demo",
    "projects.viewPaper": "View Paper",
    
    // Research
    "research.title": "Research",
    "research.subtitle": "Exploring frontiers in AI, Cryptography, and Robotics",
    "research.aiml.title": "Artificial Intelligence & Machine Learning",
    "research.crypto.title": "Cryptography",
    "research.robotics.title": "Robotics",
    "research.publications": "Publications",
    
    // Thesis
    "thesis.title": "Undergraduate Thesis",
    "thesis.wip": "Work in Progress",
    "thesis.supervisor": "Supervisor",
    "thesis.university": "University",
    "thesis.viewPdf": "View Full Thesis",
    
    // About
    "about.title": "About Me",
    "about.timeline.title": "Academic Timeline",
    "about.interests.title": "Special Interests",
    
    // Certifications
    "certifications.title": "Certifications & Achievements",
    "certifications.subtitle": "A collection of my professional certifications, online courses, and hackathon achievements.",
    "certifications.issued": "Issued by",
    "certifications.date": "Date",
    "certifications.credentialId": "Credential ID",
    "certifications.viewCredential": "View Credential",
    "certifications.skills": "Skills",
    "certifications.allButton": "All",
    "certifications.featuredTag": "Featured",
    "certifications.featuredButton": "Featured",
    "certifications.noCerts": "No certifications found in this category.",
    
    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Have a project in mind or want to collaborate? Feel free to reach out!",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.connect": "Let's Connect",
    "contact.description": "I'm always interested in hearing about new projects, opportunities, and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    "contact.location": "Location",
    "contact.follow": "Follow Me",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.research": "Investigación",
    "nav.thesis": "Tesis",
    "nav.about": "Acerca",
    "nav.contact": "Contacto",
    "nav.robotics": "Robótica",
    "nav.certifications":"Certificaciones",
    
    // Home
    "home.hero.title": "Felipe A. Mesa N.",
    "home.hero.subtitle": "Ingeniería de Software · Ciencias de la Computación · Investigador en IA, ML y Robótica",
    "home.hero.cta.projects": "Ver proyectos",
    "home.hero.cta.contact": "Contáctame",
    "home.about.title": "Acerca de Mí",
    "home.about.bio.p1": "Soy estudiante e investigador de Ciencias de la Computación apasionado por la intersección de la inteligencia artificial, la robótica y la ingeniería de software. Mi trabajo se centra en desarrollar sistemas inteligentes que pueden aprender, adaptarse y operar de forma autónoma en entornos complejos.",
    "home.about.bio.p2": "Más allá de la investigación, me interesa construir aplicaciones prácticas que aprovechen técnicas de IA/ML de vanguardia. Creo en el poder de la tecnología para resolver problemas del mundo real y estoy comprometido a contribuir a un futuro donde los sistemas de IA sean seguros, confiables y beneficiosos para la sociedad.",
    "home.timeline.title": "Mi trayectoria",
    "home.timeline.academic": "Académico",
    "home.timeline.professional": "Profesional",
    "home.interests.title": "Intereses especiales",
    "home.certifications.title": "Certificaciones y logros",
    "home.certifications.viewAll": "Ver todas las certificaciones",
    "home.highlights.title": "Lo que hago",
    "home.highlights.aiml": "Investigación en IA y ML",
    "home.highlights.aiml.description": "Aprendizaje profundo, aprendizaje por refuerzo, redes neuronales",
    "home.highlights.robotics": "Robótica",
    "home.highlights.robotics.description": "Sistemas Autónomos, SLAM, Planificación de Rutas",
    "home.highlights.crypto": "Criptografía",
    "home.highlights.crypto.description": "Criptografía post-cuántica, cifrado, seguridad",
    "home.highlights.webmobile": "Aplicaciones web y móviles",
    "home.highlights.webmobile.description": "Desarrollo Full Stack, aplicaciones móviles, soluciones en la nube",
    
    // Projects
    "projects.title": "Proyectos",
    "projects.filter.all": "Todos",
    "projects.filter.aiml": "IA / ML / RL",
    "projects.filter.crypto": "Criptografía",
    "projects.filter.robotics": "Robótica",
    "projects.filter.webmobile": "Aplicaciones web y móviles",
    "projects.viewCode": "Ver código",
    "projects.viewLive": "Demo en vivo",
    "projects.viewPaper": "Ver artículo",
    
    // Research
    "research.title": "Investigación",
    "research.subtitle": "Explorando las fronteras de la IA, criptografía y robótica",
    "research.aiml.title": "Inteligencia artificial y aprendizaje automático",
    "research.crypto.title": "Criptografía",
    "research.robotics.title": "Robótica",
    "research.publications": "Publicaciones",

    // Thesis
    "thesis.title": "Tesis de pregrado",
    "thesis.wip": "Trabajo en progreso",
    "thesis.supervisor": "Supervisor",
    "thesis.university": "Universidad",
    "thesis.viewPdf": "Ver tesis completa",
    
    // About
    "about.title": "Acerca de Mí",
    "about.timeline.title": "Línea de tiempo académica",
    "about.interests.title": "Intereses especiales",
    
    // Certifications
    "certifications.title": "Certificaciones y Logros",
    "certifications.subtitle": "Una colección de mis certificaciones profesionales, cursos en línea y logros en hackathons.",
    "certifications.issued": "Emitido por",
    "certifications.date": "Fecha",
    "certifications.credentialId": "ID de la credencial",
    "certifications.viewCredential": "Ver credencial",
    "certifications.skills": "Habilidades",
    "certifications.allButton": "Todas",
    "certifications.featuredTag": "Destacada",
    "certifications.featuredButton": "Destacadas",
    "certifications.noCerts": "No se encontraron certificaciones para esta categoría.",
    
    // Contact
    "contact.title": "Ponte en Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente o quieres colaborar? ¡No dudes en contactarme!",
    "contact.name": "Nombre",
    "contact.email": "Correo electrónico",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.connect": "Conectémonos",
    "contact.description": "Siempre estoy interesado en escuchar sobre nuevos proyectos, oportunidades y colaboraciones. Ya sea que tengas una pregunta o solo quieras saludar, ¡haré mi mejor esfuerzo para responderte!",
    "contact.location": "Ubicación",
    "contact.follow": "Sígueme",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with "en" to ensure SSR/client consistency
  const [language, setLanguageState] = useState<Language>("en");

  // After hydration, detect and apply user's language preference
  useEffect(() => {
    const detectedLang = getInitialLanguage();
    if (detectedLang !== "en") {
      setLanguageState(detectedLang);
    }
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
