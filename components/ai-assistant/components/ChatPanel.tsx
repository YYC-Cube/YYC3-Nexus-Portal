"use client"

import type { RefObject } from "react";
import type { ChatMessage as ChatMessageType } from "../types";
import type { TFunction } from "@/components/i18n-provider";
import { ChatInput } from "./ChatInput";
import { ChatMessage as ChatMessageComponent } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

export interface ChatPanelProps {
  messages: ChatMessageType[];
  inputValue: string;
  isTyping: boolean;
  copiedId: string | null;
  chatEndRef: RefObject<HTMLDivElement | null>;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onCopy: (text: string, id: string) => void;
  t: TFunction;
}

export function ChatPanel({
  messages, inputValue, isTyping, copiedId, chatEndRef,
  onInputChange, onSend, onCopy, t,
}: ChatPanelProps) {
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} isCopied={copiedId === msg.id} onCopy={onCopy} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>
      <ChatInput value={inputValue} onChange={onInputChange} onSend={onSend} disabled={isTyping} t={t} />
    </div>
  );
}
