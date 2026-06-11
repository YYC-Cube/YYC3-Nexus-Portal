"use client"

import type { TFunction } from "@/components/i18n-provider";
import type { ModelEntry } from "../hooks/useModelProvider";
import { ApiKeyInput } from "./ApiKeyInput";
import { ModelSelector } from "./ModelSelector";
import { ParameterSlider } from "./ParameterSlider";

export interface SettingsPanelProps {
  apiKey: string;
  showApiKey: boolean;
  onToggleApiKey: () => void;
  onApiKeyChange: (value: string) => void;
  models: ModelEntry[];
  selectedModel: string;
  modelsLoading: boolean;
  onModelSelect: (id: string) => void;
  ollamaUrl: string;
  onRescan: () => Promise<void>;
  onAddModel: (model: Omit<ModelEntry, "id">) => void;
  onRemoveModel: (id: string) => void;
  onOllamaUrlChange: (url: string) => void;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  topP: number;
  onTopPChange: (value: number) => void;
  maxTokens: number;
  onMaxTokensChange: (value: number) => void;
  t: TFunction;
}

export function SettingsPanel(props: SettingsPanelProps) {
  const { t, ...rest } = props;
  return (
    <div className="space-y-4 min-h-0">
      <ApiKeyInput value={rest.apiKey} showValue={rest.showApiKey} onToggleShow={rest.onToggleApiKey} onChange={rest.onApiKeyChange} t={t} />
      <ModelSelector
        models={rest.models} selectedId={rest.selectedModel} loading={rest.modelsLoading}
        onSelect={rest.onModelSelect} ollamaUrl={rest.ollamaUrl} onRescan={rest.onRescan}
        onAddModel={rest.onAddModel} onRemoveModel={rest.onRemoveModel} onOllamaUrlChange={rest.onOllamaUrlChange}
        t={t}
      />
      <ParameterSlider label={t("ai.temperature")} value={rest.temperature} min={0} max={2} step={0.05}
        minLabel={t("ai.temperature_exact")} maxLabel={t("ai.temperature_creative")} onChange={rest.onTemperatureChange} color="#a78bfa" />
      <ParameterSlider label={t("ai.top_p")} value={rest.topP} min={0} max={1} step={0.05}
        minLabel={t("ai.top_p_focused")} maxLabel={t("ai.top_p_diverse")} onChange={rest.onTopPChange} color="#22d3ee" />
      <ParameterSlider label={t("ai.max_tokens")} value={rest.maxTokens} min={256} max={8192} step={256}
        minLabel="256" maxLabel="8192" onChange={rest.onMaxTokensChange} color="#34d399" />
    </div>
  );
}
