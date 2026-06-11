"use client"

import { Copy, Check } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../types";

export interface ChatMessageProps {
  message: ChatMessageType;
  isCopied: boolean;
  onCopy: (text: string, id: string) => void;
}

export function ChatMessage({ message, isCopied, onCopy }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const bubbleClass = isUser
    ? "bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-white/10 rounded-2xl rounded-br-sm"
    : isSystem
      ? "bg-yellow-500/10 border border-yellow-500/20 rounded-2xl"
      : "bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm";

  const textClass = isUser ? "text-white" : isSystem ? "text-yellow-300" : "text-white/80";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] relative group ${bubbleClass} px-3.5 py-2.5`}>
        <div className={`whitespace-pre-wrap ${textClass} text-sm leading-relaxed`}>
          {message.content}
        </div>
        {message.role === "assistant" && (
          <button
            onClick={() => onCopy(message.content, message.id)}
            className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
          >
            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-white/30" />}
          </button>
        )}
        <div className="text-white/20 mt-1 text-xs">
          {new Date(message.timestamp).toLocaleTimeString("zh-CN")}
        </div>
      </div>
    </div>
  );
}
