"use client"

import { Send } from "lucide-react";
import type { TFunction } from "@/components/i18n-provider";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  t?: TFunction;
}

export function ChatInput({
  value, onChange, onSend,
  disabled = false,
  placeholder,
  t,
}: ChatInputProps) {
  const ph = placeholder || (t ? t("ai.input_placeholder") : "输入指令... (Enter 发送, Shift+Enter 换行)");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="shrink-0 p-3 border-t border-white/10">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ph}
          rows={1}
          disabled={disabled}
          className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 resize-none disabled:opacity-50 text-sm"
          style={{ maxHeight: "100px" }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
