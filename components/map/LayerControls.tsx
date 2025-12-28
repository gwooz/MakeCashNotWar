"use client";

import { MapMode } from "./MapView";

interface Props {
  mode: MapMode;
  onChange: (mode: MapMode) => void;
}

const modes: Array<{ key: MapMode; label: string }> = [
  { key: "palette", label: "Palette" },
  { key: "flag", label: "Flaggen" },
  { key: "heatmap", label: "Heatmap" }
];

export function LayerControls({ mode, onChange }: Props) {
  return (
    <div className="absolute left-4 top-4 z-10 flex gap-2 rounded-xl bg-slate-900/80 px-3 py-2 backdrop-blur">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`rounded-lg px-3 py-1 text-sm transition ${
            mode === m.key ? "bg-accent text-slate-900" : "bg-slate-800 hover:bg-slate-700"
          }`}
          aria-pressed={mode === m.key}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
