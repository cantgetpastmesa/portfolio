"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon} from "@/components/icons/BrandIcons";

export const Footer = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link on the current page
    if (href.startsWith("/#")) {
      e.preventDefault();
      const hash = href.substring(2); // Remove "/#" to get the id
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const socialLinks = [
    { 
      name: "GitHub", 
      url: "https://github.com/cantgetpastmesa", 
      icon: GithubIcon 
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com/in/felipe-a-mesa-n", 
      icon: LinkedinIcon 
    },
  ];

  const displayedText =
    { 
      bio1: {
      en: "Software Engineer & AI/ML Researcher",
      es: "Ingeniero de Sistemas y Computación",
    },
    bio2: {
      en: "Minor in Machine Learning",
      es: "Opción en Machine Learning",},
    copyright: {
      en: "All rights reserved.",
      es: "Todos los derechos reservados.",},
    connect: {
      en: "Let's connect",
      es: "Conectémos",},
    quickLinks: {
      en: "Quick Links",
      es: "Enlaces Rápidos",},}
;

  const pageLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.research"), href: "/research" },
    { name: t("nav.thesis"), href: "/thesis" },
    { name: t("nav.robotics"), href: "/robotics" },
    { name: t("nav.certifications"), href: "/certifications" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 py-12 bg-[#00007F]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Section - Bio and Contact */}
          <div className="space-y-4 lg:min-w-75">
            <h3 className="text-2xl font-bold text-white">Felipe A. Mesa N.</h3>
            <p className="text-sm text-white/80">
              {displayedText.bio1[language]}
            </p>
            <p className="text-sm text-white/80">
              {displayedText.bio2[language]}
            </p>
            
            {/* Social Links and Email */}
            <div className="space-y-3 pt-2">
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-500 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              <a
                href="mailto:f.mesan@uniandes.edu.co"
                className="flex items-center space-x-2 text-white hover:text-cyan-500 transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">f.mesan@uniandes.edu.co</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-40 bg-white/20"></div>

          {/* Right Section - Navigation Links */}
          <nav className="flex-1 flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white hover:text-cyan-500 transition-colors font-medium text-base"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/60">
            © {currentYear} Felipe A. Mesa N. {displayedText.copyright[language]}
          </p>
        </div>
      </div>
    </footer>
  );
};
