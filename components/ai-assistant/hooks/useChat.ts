"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { PROMPT_PRESETS } from "../constants/prompts";
import type { ChatMessage } from "../types";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "你好！我是 YYC³ AI 智能助理。\n\n我可以帮你：\n- 💬 回答问题和提供建议\n- 📊 查看系统状态和报告\n- 🚀 执行快捷命令\n\n请输入指令或选择快捷操作开始。",
  timestamp: Date.now(),
};

export interface UseChatReturn {
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
  systemPrompt: string;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  sendMessage: (content: string) => Promise<void>;
  setInputValue: (value: string) => void;
  clearChat: () => void;
  setSystemPrompt: (prompt: string) => void;
  applyPreset: (presetId: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(PROMPT_PRESETS[4].prompt);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Try real API call, fallback to mock
    setIsTyping(true);
    let assistantContent = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: content.trim() },
          ],
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            accumulated += parsed.content;
            // Update last message in realtime
            setMessages((prev) => {
              const next = [...prev];
              const lastIdx = next.length - 1;
              if (next[lastIdx]?.role === "assistant" && next[lastIdx].id.startsWith("stream-")) {
                next[lastIdx] = { ...next[lastIdx], content: accumulated };
              }
              return next;
            });
          } catch { /* skip parse errors */ }
        }
      }
      assistantContent = accumulated;
    } catch {
      assistantContent = generateMockResponse(content.trim());
    }

    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now()}-resp`,
      role: "assistant",
      content: assistantContent,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  }, [messages, systemPrompt]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: "welcome-new",
      role: "assistant",
      content: "对话已清空。请输入新的指令开始操作。",
      timestamp: Date.now(),
    }]);
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = PROMPT_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSystemPrompt(preset.prompt);
      const sysMsg: ChatMessage = {
        id: `sys-${Date.now()}`,
        role: "system",
        content: `✅ 已切换系统角色为「${preset.name}」`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, sysMsg]);
    }
  }, []);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => { });
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  return {
    messages, inputValue, isTyping, systemPrompt, chatEndRef,
    sendMessage, setInputValue, clearChat, setSystemPrompt,
    applyPreset, copyToClipboard, copiedId,
  };
}

function generateMockResponse(userMsg: string): string {
  const lower = userMsg.toLowerCase();
  if (lower.includes("状态") || lower.includes("总览") || lower.includes("节点")) {
    return `## 集群状态报告\n\n**时间**: ${new Date().toLocaleString("zh-CN")}\n\n| 节点 | 状态 | GPU | 温度 |\n|------|------|-----|------|\n| GPU-A100-01 | 🟢 正常 | 87% | 68°C |\n| GPU-A100-02 | 🟢 正常 | 92% | 74°C |\n| GPU-A100-03 | 🟡 预警 | 98% | 82°C |\n| GPU-H100-01 | 🟢 正常 | 65% | 55°C |\n\n**建议**: GPU-A100-03 负载过高，建议将部分任务迁移到 GPU-H100-01。`;
  }
  if (lower.includes("部署") || lower.includes("模型")) {
    return `## 模型部署方案\n\n**目标模型**: DeepSeek-V3\n**推荐节点**: GPU-H100-03（当前空闲）\n\n**部署步骤**:\n1. 检查节点可用显存 → 80GB 可用 ✅\n2. 加载模型权重 → 预计 3 分钟\n3. 初始化推理引擎 → KV-Cache 预热\n4. 健康检查 → 验证推理准确率\n\n**预计时间**: 5-8 分钟`;
  }
  return `收到您的请求："${userMsg}"\n\n我正在分析系统当前状态...\n\n**系统概览**:\n- 集群运行正常\n- 当前 QPS: ~3,800，推理延迟: ~48ms\n- GPU 平均利用率: 82.4%\n\n请问需要我执行具体操作还是查看更多详情？`;
}
