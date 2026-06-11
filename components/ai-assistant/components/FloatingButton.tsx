"use client"

import { Sparkles } from "lucide-react";
import type { TFunction } from "@/components/i18n-provider";

export interface FloatingButtonProps {
  onClick: () => void;
  isMobile?: boolean;
  tooltip?: string;
  t?: TFunction;
}

export function FloatingButton({ onClick, isMobile = false, tooltip, t }: FloatingButtonProps) {
  const tip = tooltip || (t ? t("ai.title") + " (⌘J)" : "AI 智能助理 (⌘J)");
  return (
    <button
      onClick={onClick}
      className="fixed z-[60] group"
      style={{ bottom: isMobile ? "calc(16px + env(safe-area-inset-bottom, 0px))" : 24, right: isMobile ? 16 : 24 }}
    >
      <div
        className="relative rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105 active:scale-95"
        style={{ width: isMobile ? 48 : 56, height: isMobile ? 48 : 56 }}
      >
        <img
          src="/yyc3-dist/yanyu_cloud_128x128.png"
          alt="YYC³ AI"
          className="object-contain rounded-md"
          style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28 }}
          draggable={false}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 animate-ping opacity-20" />
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.5)]">
          <Sparkles className="w-3 h-3 text-black" />
        </div>
      </div>
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-black/95 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span className="text-white/80 text-xs">{tip}</span>
      </div>
    </button>
  );
}
