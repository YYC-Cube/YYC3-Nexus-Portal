"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Globe, Maximize2, Minimize2, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";

import type { TFunction } from "@/components/i18n-provider";
import type { Locale } from "@/lib/i18n-client";

export interface PanelHeaderProps {
  modelName: string;
  isLoading: boolean;
  isMaximized: boolean;
  isMobile: boolean;
  onClearChat: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  t: TFunction;
  locale: string;
  setLocale: (locale: Locale) => void;
  supportedLocales: string[];
  localeLabels: Record<string, string>;
}

export function PanelHeader({
  modelName,
  isLoading,
  isMaximized,
  isMobile,
  onClearChat,
  onToggleMaximize,
  onClose,
  t,
  locale,
  setLocale,
  supportedLocales,
  localeLabels,
}: PanelHeaderProps) {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  return (
    <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-violet-600/10 to-cyan-600/10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/20 overflow-hidden">
          <img
            src="/yyc3-dist/yanyu_cloud_128x128.png"
            alt="YYC³"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        <div>
          <h3 className="text-white text-sm font-medium">{t("ai.title")}</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/40 text-xs">
              {isLoading ? t("ai.loading") : modelName || t("ai.no_model")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-all"
            title={t("lang.switch")}
          >
            <Globe className="w-4 h-4 text-white/40" />
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full mt-1 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl py-1 min-w-[120px] z-50 shadow-2xl"
              >
                {supportedLocales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setLocale(loc as Locale); setLangOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${loc === locale
                      ? "text-white bg-white/10"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={onClearChat} className="p-1.5 rounded-lg hover:bg-white/10 transition-all" title={t("ai.clear_chat")}>
          <Trash2 className="w-4 h-4 text-white/40" />
        </button>
        {!isMobile && (
          <button onClick={onToggleMaximize} className="p-1.5 rounded-lg hover:bg-white/10 transition-all" title={isMaximized ? "还原" : "最大化"}>
            {isMaximized ? <Minimize2 className="w-4 h-4 text-white/40" /> : <Maximize2 className="w-4 h-4 text-white/40" />}
          </button>
        )}
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all">
          <X className="w-4 h-4 text-white/50" />
        </button>
      </div>
    </div>
  );
}
