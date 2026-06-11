"use client"

import { SYSTEM_COMMANDS, CMD_CATEGORIES } from "../constants/commands";
import type { SystemCommand } from "../constants/commands";
import type { TFunction } from "@/components/i18n-provider";
import { CommandCard } from "./CommandCard";

export interface CommandsPanelProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onExecute: (command: SystemCommand) => void;
  t: TFunction;
}

export function CommandsPanel({ filter, onFilterChange, onExecute, t }: CommandsPanelProps) {
  const filteredCommands = filter === "all" ? SYSTEM_COMMANDS : SYSTEM_COMMANDS.filter((c) => c.category === filter);
  const catLabels: Record<string, string> = {
    all: t("ai.commands_filter_all"),
    cluster: t("ai.commands_filter_cluster"),
    model: t("ai.commands_filter_model"),
    data: t("ai.commands_filter_data"),
    security: t("ai.commands_filter_security"),
    monitor: t("ai.commands_filter_monitor"),
  };

  return (
    <div className="min-h-0">
      <div className="flex items-center gap-1 mb-3 flex-wrap">
        {CMD_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onFilterChange(cat.key)}
            className={`px-2.5 py-1 rounded-lg transition-all text-xs ${
              filter === cat.key
                ? "bg-violet-500/15 text-violet-300 border border-violet-500/25"
                : "text-white/40 hover:text-white/80 border border-transparent"
            }`}
          >
            {catLabels[cat.key] || cat.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filteredCommands.map((cmd) => (
          <CommandCard key={cmd.id} command={cmd} onExecute={onExecute} />
        ))}
      </div>
    </div>
  );
}
