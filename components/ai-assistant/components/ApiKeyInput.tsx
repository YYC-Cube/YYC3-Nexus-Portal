"use client"

import { Key } from "lucide-react";
import type { TFunction } from "@/components/i18n-provider";

export interface ApiKeyInputProps {
  value: string;
  showValue: boolean;
  onToggleShow: () => void;
  onChange: (value: string) => void;
  t: TFunction;
}

export function ApiKeyInput({ value, showValue, onToggleShow, onChange, t }: ApiKeyInputProps) {
  return (
    <div>
      <h4 className="text-white/80 mb-2 flex items-center gap-2 text-sm font-medium">
        <Key className="w-4 h-4 text-yellow-400" />
        {t("ai.api_key_title")}
      </h4>
      <div className="relative">
        <input
          type={showValue ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("ai.api_key_placeholder")}
          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 font-mono text-xs"
        />
        <button
          onClick={onToggleShow}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10"
        >
          <span className="text-white/40 text-xs">{showValue ? "隐藏" : "显示"}</span>
        </button>
      </div>
      <p className="text-white/25 mt-1 text-xs">
        {value ? t("ai.api_key_configured") : t("ai.api_key_not_configured")}
        {" · "}{t("ai.api_key_local_only")}
      </p>
    </div>
  );
}
