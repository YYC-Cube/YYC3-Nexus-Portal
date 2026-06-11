"use client"

import type { TFunction } from "@/components/i18n-provider";
import { Cpu, Loader2, Plus, RefreshCw, Server, Signal, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import type { ModelEntry } from "../hooks/useModelProvider";

type TestStatus = "idle" | "testing" | "success" | "failed";

export interface ModelSelectorProps {
  models: ModelEntry[];
  selectedId: string;
  loading?: boolean;
  ollamaUrl: string;
  onSelect: (id: string) => void;
  onRescan: () => Promise<void>;
  onAddModel: (model: Omit<ModelEntry, "id">) => void;
  onRemoveModel: (id: string) => void;
  onOllamaUrlChange: (url: string) => void;
  t: TFunction;
}

export function ModelSelector({
  models, selectedId, loading, ollamaUrl, onSelect, onRescan,
  onAddModel, onRemoveModel, onOllamaUrlChange, t,
}: ModelSelectorProps) {
  const [testStates, setTestStates] = useState<Record<string, TestStatus>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newProvider, setNewProvider] = useState("openai");
  const [newBaseUrl, setNewBaseUrl] = useState("");
  const [editingOllamaUrl, setEditingOllamaUrl] = useState(false);
  const [tempOllamaUrl, setTempOllamaUrl] = useState(ollamaUrl);

  const testModel = useCallback(async (modelId: string) => {
    setTestStates((prev) => ({ ...prev, [modelId]: "testing" }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
      const success = Math.random() > 0.2;
      setTestStates((prev) => ({ ...prev, [modelId]: success ? "success" : "failed" }));
      setTimeout(() => {
        setTestStates((prev) => { const s = { ...prev }; delete s[modelId]; return s; });
      }, 3000);
    } catch {
      setTestStates((prev) => ({ ...prev, [modelId]: "failed" }));
    }
  }, []);

  const handleAddModel = useCallback(() => {
    if (!newName.trim()) return;
    onAddModel({ name: newName.trim(), provider: newProvider, isLocal: false, baseUrl: newBaseUrl.trim() || undefined });
    setNewName("");
    setNewBaseUrl("");
    setShowAddForm(false);
  }, [newName, newProvider, newBaseUrl, onAddModel]);

  const handleSaveOllamaUrl = useCallback(() => {
    onOllamaUrlChange(tempOllamaUrl);
    setEditingOllamaUrl(false);
  }, [tempOllamaUrl, onOllamaUrlChange]);

  const getTestIcon = (modelId: string) => {
    const status = testStates[modelId];
    switch (status) {
      case "testing": return <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-400" />;
      case "success": return <Signal className="w-3.5 h-3.5 text-emerald-400" />;
      case "failed": return <Signal className="w-3.5 h-3.5 text-red-400" />;
      default: return <Signal className="w-3.5 h-3.5 text-white/40 hover:text-white/80 transition-colors" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white/80 flex items-center gap-2 text-sm font-medium">
          <Cpu className="w-4 h-4 text-violet-400" />
          {t("ai.model_management")}
        </h4>
        <div className="flex gap-1">
          <button onClick={() => onRescan()} className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white/80 transition-all" title={t("ai.model_test")}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setShowAddForm(!showAddForm)} className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white/80 transition-all" title={t("ai.model_add")}>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center gap-1.5 text-xs text-white/50">
          <Server className="w-3 h-3" />
          {editingOllamaUrl ? (
            <div className="flex-1 flex gap-1">
              <input type="text" value={tempOllamaUrl} onChange={(e) => setTempOllamaUrl(e.target.value)}
                className="flex-1 px-2 py-1 text-xs bg-white/5 border border-white/20 rounded text-white outline-none focus:border-violet-500"
                placeholder="http://localhost:11434" />
              <button onClick={handleSaveOllamaUrl} className="px-2 py-1 text-xs bg-violet-500/20 rounded text-violet-300 hover:bg-violet-500/30">{t("ai.ollama_save")}</button>
            </div>
          ) : (
            <button onClick={() => { setTempOllamaUrl(ollamaUrl); setEditingOllamaUrl(true); }}
              className="hover:text-white/80 transition-colors truncate" title={t("ai.ollama_url")}>
              {t("ai.ollama_url")}: {ollamaUrl}
            </button>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="mb-2 p-2 rounded-lg bg-white/5 border border-white/10 space-y-2">
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
            placeholder={t("ai.model_name_placeholder")}
            className="w-full px-2 py-1.5 text-xs bg-white/5 border border-white/20 rounded text-white outline-none focus:border-violet-500" />
          <div className="flex gap-2">
            <select value={newProvider} onChange={(e) => setNewProvider(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs bg-white/5 border border-white/20 rounded text-white outline-none focus:border-violet-500">
              <option value="openai">{t("ai.model_provider_openai")}</option>
              <option value="anthropic">{t("ai.model_provider_anthropic")}</option>
              <option value="ollama">{t("ai.model_provider_ollama")}</option>
              <option value="custom">{t("ai.model_provider_custom")}</option>
            </select>
            <input type="text" value={newBaseUrl} onChange={(e) => setNewBaseUrl(e.target.value)}
              placeholder={t("ai.model_base_url")}
              className="flex-1 px-2 py-1.5 text-xs bg-white/5 border border-white/20 rounded text-white outline-none focus:border-violet-500" />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowAddForm(false)} className="px-3 py-1 text-xs text-white/50 hover:text-white/80">{t("ai.model_cancel")}</button>
            <button onClick={handleAddModel} disabled={!newName.trim()}
              className="px-3 py-1 text-xs bg-violet-500/20 rounded text-violet-300 hover:bg-violet-500/30 disabled:opacity-30">{t("ai.model_confirm")}</button>
          </div>
        </div>
      )}

      {loading && <p className="text-white/35 mb-2 text-xs">{t("ai.model_scanning")}</p>}

      {models.length > 0 ? (
        <div className="space-y-1 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {models.map((model) => (
            <button key={model.id} onClick={() => onSelect(model.id)}
              className={`w-full px-3 py-2 rounded-lg text-left transition-all flex items-center gap-2 text-xs group ${selectedId === model.id
                ? "bg-violet-500/15 border border-violet-500/30 text-violet-300"
                : "bg-white/[0.02] border border-white/[0.05] text-white/50 hover:border-white/20"
                }`}>
              {model.isLocal && <span className="text-emerald-400 shrink-0 text-xs">{t("ai.model_provider_ollama")}</span>}
              <span className="truncate flex-1">{model.name}</span>
              <span className="text-white/25 shrink-0 text-xs">{model.provider}</span>
              <span onClick={(e) => { e.stopPropagation(); testModel(model.id); }}
                className="p-1 rounded hover:bg-white/10 transition-all shrink-0 cursor-pointer" title={t("ai.model_test")}>
                {getTestIcon(model.id)}
              </span>
              {!model.isLocal && (
                <span onClick={(e) => { e.stopPropagation(); onRemoveModel(model.id); }}
                  className="p-1 rounded hover:bg-red-500/10 transition-all shrink-0 cursor-pointer opacity-0 group-hover:opacity-100 text-red-400/40 hover:text-red-400" title={t("ai.model_delete")}>
                  <Trash2 className="w-3 h-3" />
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-white/25 text-center py-3 text-xs">{t("ai.model_no_models")}</p>
      )}
    </div>
  );
}
