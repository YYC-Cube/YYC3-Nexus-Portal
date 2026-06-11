"use client"

import { Check } from "lucide-react";
import type { PromptPreset } from "../constants/prompts";

export interface PromptCardProps {
  preset: PromptPreset;
  isActive: boolean;
  onSelect: (presetId: string) => void;
}

export function PromptCard({ preset, isActive, onSelect }: PromptCardProps) {
  return (
    <div
      className={`p-3 rounded-xl border cursor-pointer transition-all ${
        isActive
          ? "bg-violet-500/10 border-violet-500/30"
          : "bg-white/[0.02] border-white/[0.05] hover:border-white/20"
      }`}
      onClick={() => onSelect(preset.id)}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm">{preset.name}</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/40 text-xs">
            {preset.category}
          </span>
        </div>
        {isActive && <Check className="w-4 h-4 text-emerald-400" />}
      </div>
      <p className="text-white/30 text-xs leading-relaxed">
        {preset.prompt.slice(0, 80)}...
      </p>
    </div>
  );
}
