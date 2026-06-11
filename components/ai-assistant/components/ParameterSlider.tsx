"use client"

import { Slider } from "@/components/ui/slider";
import type { TFunction } from "@/components/i18n-provider";

export interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
  color?: string;
  t?: TFunction;
}

export function ParameterSlider({
  label, value, min, max, step, minLabel, maxLabel, onChange, color = "#a78bfa",
}: ParameterSliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white/80 text-sm font-medium">{label}</h4>
        <span className="text-sm font-mono" style={{ color }}>{value.toFixed(2)}</span>
      </div>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={([v]) => onChange(v)} className="w-full" />
      <div className="flex justify-between mt-1">
        <span className="text-white/25 text-xs">{minLabel}</span>
        <span className="text-white/25 text-xs">{maxLabel}</span>
      </div>
    </div>
  );
}
