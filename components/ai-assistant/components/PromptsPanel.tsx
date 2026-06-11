"use client"

import type { TFunction } from "@/components/i18n-provider";
import { PROMPT_PRESETS } from "../constants/prompts";
import { PromptCard } from "./PromptCard";

export interface PromptsPanelProps {
  activePrompt: string;
  onSelect: (presetId: string) => void;
  onCustomChange: (prompt: string) => void;
  t: TFunction;
}

export function PromptsPanel({ activePrompt, onSelect, onCustomChange, t }: PromptsPanelProps) {
  const activePreset = PROMPT_PRESETS.find((p) => p.prompt === activePrompt);

  return (
    <div className="min-h-0">
      <h4 className="text-white/80 mb-3 text-sm font-medium">{t("ai.prompts_title")}</h4>
      <div className="space-y-2 mb-4">
        {PROMPT_PRESETS.map((preset) => (
          <PromptCard key={preset.id} preset={preset} isActive={activePreset?.id === preset.id} onSelect={onSelect} />
        ))}
      </div>

      <h4 className="text-white/80 mb-2 text-sm font-medium">{t("ai.prompts_custom")}</h4>
      <textarea
        value={activePrompt}
        onChange={(e) => onCustomChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 resize-none text-xs"
        rows={5}
        placeholder={t("ai.prompts_custom_placeholder")}
      />
      <p className="text-white/25 mt-1 text-xs">
        {t("ai.prompts_word_count")}: {activePrompt.length} | {t("ai.prompts_suggestion")}
      </p>
    </div>
  );
}
