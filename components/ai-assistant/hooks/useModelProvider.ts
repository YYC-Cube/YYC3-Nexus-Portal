"use client"

import { useState, useEffect, useCallback } from "react";

export interface ModelEntry {
  id: string;
  name: string;
  provider: string;
  isLocal: boolean;
  baseUrl?: string;
}

const STORAGE_KEY = "yyc3_ai_models";
const OLLAMA_DEFAULT_URL = "http://localhost:11434";

const DEFAULT_MODELS: ModelEntry[] = [
  { id: "qwen3:32b", name: "Qwen3:32B", provider: "ollama", isLocal: true, baseUrl: OLLAMA_DEFAULT_URL },
];

function loadModels(): ModelEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch { /* ignore */ }
  return DEFAULT_MODELS;
}

function saveModels(models: ModelEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  } catch { /* ignore */ }
}

async function scanOllamaModels(baseUrl: string): Promise<ModelEntry[]> {
  try {
    const res = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.models || []).map((m: { name: string; model?: string }) => ({
      id: m.name || m.model || "unknown",
      name: m.name || m.model || "Unknown",
      provider: "ollama",
      isLocal: true,
      baseUrl,
    }));
  } catch {
    return [];
  }
}

export function useModelProvider() {
  const [availableModels, setAvailableModels] = useState<ModelEntry[]>([]);
  const [ollamaLoading, setOllamaLoading] = useState(true);
  const [ollamaUrl, setOllamaUrlState] = useState(() => {
    try {
      return localStorage.getItem("yyc3_ollama_url") || OLLAMA_DEFAULT_URL;
    } catch { return OLLAMA_DEFAULT_URL; }
  });

  useEffect(() => {
    async function init() {
      setOllamaLoading(true);
      const saved = loadModels();
      const ollamaModels = await scanOllamaModels(ollamaUrl);
      const remoteModels = saved.filter((m) => !m.isLocal);
      const merged = [...ollamaModels, ...remoteModels];

      if (ollamaModels.length === 0 && saved.some((m) => m.isLocal)) {
        const localSaved = saved.filter((m) => m.isLocal);
        const mergedWithLocal = [...localSaved, ...remoteModels];
        setAvailableModels(mergedWithLocal);
        saveModels(mergedWithLocal);
      } else {
        setAvailableModels(merged);
        saveModels(merged);
      }
      setOllamaLoading(false);
    }
    init();
  }, [ollamaUrl]);

  const rescan = useCallback(async () => {
    setOllamaLoading(true);
    const saved = loadModels();
    const ollamaModels = await scanOllamaModels(ollamaUrl);
    const remoteModels = saved.filter((m) => !m.isLocal);
    const merged = [...ollamaModels, ...remoteModels];
    setAvailableModels(merged);
    saveModels(merged);
    setOllamaLoading(false);
  }, [ollamaUrl]);

  const addModel = useCallback((model: Omit<ModelEntry, "id">) => {
    const id = model.name.toLowerCase().replace(/\s+/g, "-");
    const newModel: ModelEntry = { ...model, id };
    setAvailableModels((prev) => {
      const next = [...prev, newModel];
      saveModels(next);
      return next;
    });
  }, []);

  const removeModel = useCallback((id: string) => {
    setAvailableModels((prev) => {
      const next = prev.filter((m) => m.id !== id);
      saveModels(next);
      return next;
    });
  }, []);

  const setOllamaUrl = useCallback((url: string) => {
    setOllamaUrlState(url);
    try {
      localStorage.setItem("yyc3_ollama_url", url);
    } catch { /* ignore */ }
  }, []);

  return { availableModels, ollamaLoading, ollamaUrl, setOllamaUrl, rescan, addModel, removeModel };
}
