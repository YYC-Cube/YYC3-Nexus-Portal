"use client"

import { useState, useCallback } from "react";

interface SettingsValues {
  aiApiKey: string;
  aiModel: string;
  aiTemperature: string;
  aiTopP: string;
  aiMaxTokens: string;
  aiBaseUrl: string;
}

const DEFAULT_VALUES: SettingsValues = {
  aiApiKey: "",
  aiModel: "",
  aiTemperature: "0.7",
  aiTopP: "0.9",
  aiMaxTokens: "2048",
  aiBaseUrl: "",
};

const STORAGE_KEY = "yyc3_ai_settings";

export function useSettingsStore() {
  const [values, setValues] = useState<SettingsValues>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_VALUES, ...JSON.parse(stored) } : DEFAULT_VALUES;
    } catch {
      return DEFAULT_VALUES;
    }
  });

  const updateValue = useCallback((key: keyof SettingsValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  return { values, updateValue };
}
