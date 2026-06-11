"use client"

import { Play } from "lucide-react";
import type { SystemCommand } from "../constants/commands";

export interface CommandCardProps {
  command: SystemCommand;
  onExecute: (command: SystemCommand) => void;
}

export function CommandCard({ command, onExecute }: CommandCardProps) {
  const Icon = command.icon;

  return (
    <button
      onClick={() => onExecute(command)}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.05] transition-all text-left group"
    >
      <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${command.color}15` }}>
        <Icon className="w-4 h-4" style={{ color: command.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 group-hover:text-white transition-colors text-sm">
          {command.label}
        </p>
        <p className="text-white/30 truncate text-xs">{command.desc}</p>
      </div>
      <Play className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
    </button>
  );
}
