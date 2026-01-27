"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

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
    
    // Home
    "home.hero.title": "Felipe A. Mesa N.",
    "home.hero.subtitle": "Software Engineering · Computer Science · AI & ML, Robotics Researcher",
    "home.hero.cta.projects": "View Projects",
    "home.hero.cta.contact": "Contact Me",
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
    "research.aiml.title": "Artificial Intelligence & Machine Learning",
    "research.crypto.title": "Cryptography",
    "research.robotics.title": "Robotics",
    
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
    
    // Footer
    "footer.bio": "Software Engineer & AI/ML Researcher",
    "footer.copyright": "All rights reserved.",
    
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
    
    // Home
    "home.hero.title": "Felipe A. Mesa N.",
    "home.hero.subtitle": "Ingeniería de Software · Ciencias de la Computación · Investigador en IA, ML y Robótica",
    "home.hero.cta.projects": "Ver Proyectos",
    "home.hero.cta.contact": "Contáctame",
    "home.highlights.title": "Lo Que Hago",
    "home.highlights.aiml": "Investigación en IA y ML",
    "home.highlights.aiml.description": "Aprendizaje Profundo, Aprendizaje por Refuerzo, Redes Neuronales",
    "home.highlights.robotics": "Robótica",
    "home.highlights.robotics.description": "Sistemas Autónomos, SLAM, Planificación de Rutas",
    "home.highlights.crypto": "Criptografía",
    "home.highlights.crypto.description": "Criptografía Post-Cuántica, Encriptación, Seguridad",
    "home.highlights.webmobile": "Aplicaciones Web y Móviles",
    "home.highlights.webmobile.description": "Desarrollo Full Stack, Aplicaciones Móviles, Soluciones en la Nube",
    
    // Projects
    "projects.title": "Proyectos",
    "projects.filter.all": "Todos",
    "projects.filter.aiml": "IA / ML / RL",
    "projects.filter.crypto": "Criptografía",
    "projects.filter.robotics": "Robótica",
    "projects.filter.webmobile": "Aplicaciones Web y Móviles",
    "projects.viewCode": "Ver Código",
    "projects.viewLive": "Demo en Vivo",
    "projects.viewPaper": "Ver Artículo",
    
    // Research
    "research.title": "Investigación",
    "research.aiml.title": "Inteligencia Artificial y Aprendizaje Automático",
    "research.crypto.title": "Criptografía",
    "research.robotics.title": "Robótica",
    
    // Thesis
    "thesis.title": "Tesis de Pregrado",
    "thesis.wip": "Trabajo en Progreso",
    "thesis.supervisor": "Supervisor",
    "thesis.university": "Universidad",
    "thesis.viewPdf": "Ver Tesis Completa",
    
    // About
    "about.title": "Acerca de Mí",
    "about.timeline.title": "Línea de Tiempo Académica",
    "about.interests.title": "Intereses Especiales",
    
    // Footer
    "footer.bio": "Ingeniero de Software e Investigador en IA/ML",
    "footer.copyright": "Todos los derechos reservados.",
    
    // Contact
    "contact.title": "Ponte en Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente o quieres colaborar? ¡No dudes en contactarme!",
    "contact.name": "Nombre",
    "contact.email": "Correo Electrónico",
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
  const [language, setLanguage] = useState<Language>("en");

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
