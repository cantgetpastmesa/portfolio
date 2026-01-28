"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { TypewriterText } from "@/components/TypewriterText";

export default function ThesisPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center pt-20">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 mask-[radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      
      <div className="relative z-20 text-center px-4">
        <TypewriterText
          text={t("thesis.title")}
          as="h1"
          className={cn("google-sans-code md:text-7xl text-4xl text-white font-bold mb-6")}
          speed={80}
        />
        
        <div className="inline-block px-6 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-full text-sm font-medium mb-8">
          {t("thesis.wip")}
        </div>
        
        <p className="bitcount text-center mt-4 text-neutral-300 text-xl max-w-2xl mx-auto">
          {language === "en" 
            ? "This page is currently under construction. Check back soon for updates on my undergraduate thesis research."
            : "Esta página está actualmente en construcción. Vuelve pronto para actualizaciones sobre mi investigación de tesis de pregrado."}
        </p>
      </div>
    </div>
  );
}

{/* 
// ORIGINAL THESIS PAGE - COMMENTED OUT FOR FUTURE USE
"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { FileText, User, Building } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";

export default function ThesisPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <TypewriterText
            text={t("thesis.title")}
            as="h1"
            className="google-sans-code text-5xl md:text-7xl font-bold text-white mb-6"
            speed={80}
          />
          <div className="inline-block px-6 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-full text-sm font-medium">
            {t("thesis.wip")}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h2 className="bitcount text-3xl font-bold text-white mb-6">
            [Your Thesis Title Here]
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-cyan-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-400">{t("thesis.supervisor")}</p>
                <p className="text-white">Dr. [Supervisor Name]</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-cyan-400 mt-1" />
              <div>
                <p className="text-sm text-neutral-400">{t("thesis.university")}</p>
                <p className="text-white">[University Name]</p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="bitcount text-xl font-semibold text-white mb-3">Abstract</h3>
            <p className="text-neutral-300 leading-relaxed">
              [Your thesis abstract will go here. This section should provide a comprehensive overview 
              of your research topic, methodology, key findings, and contributions to the field.]
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-linear-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="bitcount text-2xl font-bold text-white">Full Document</h3>
            <button className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all">
              <FileText className="w-5 h-5" />
              {t("thesis.viewPdf")}
            </button>
          </div>

          <div className="aspect-[8.5/11] bg-neutral-800/50 rounded-lg flex items-center justify-center border border-white/10">
            <div className="text-center">
              <FileText className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-500">PDF viewer will be embedded here</p>
              <p className="text-sm text-neutral-600 mt-2">
                Use react-pdf or similar library for PDF rendering
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h3 className="bitcount text-2xl font-bold text-white mb-6">Key Figures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-neutral-800/50 rounded-lg p-4 border border-white/10 aspect-video flex items-center justify-center"
              >
                <p className="text-neutral-500">Figure {i} placeholder</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
*/}
