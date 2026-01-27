"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: "GitHub", 
      url: "https://github.com/cantgetpastmesa", 
      icon: Github 
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com/in/yourprofile", 
      icon: Linkedin 
    },
    { 
      name: "Instagram", 
      url: "https://instagram.com/yourprofile", 
      icon: Instagram 
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 py-12 bg-[#00007F]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bio Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Felipe A. Mesa N.</h3>
            <p className="text-sm text-white/80">
              {t("footer.bio")}
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#007FFF]">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#007FFF] transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#007FFF]">Email</h3>
            <a
              href="mailto:your.email@example.com"
              className="flex items-center space-x-2 text-white hover:text-[#007FFF] transition-all duration-300 text-sm group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>your.email@example.com</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/60">
            © {currentYear} Felipe A. Mesa N. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
