"use client";

interface TooltipProps {
  info: {
    iso: string;
    name: string;
    score?: number;
    x: number;
    y: number;
  };
}

export function Tooltip({ info }: TooltipProps) {
  return (
    <div
      className="pointer-events-none absolute rounded-lg bg-slate-900/90 px-3 py-2 text-sm shadow-lg"
      style={{ left: info.x + 12, top: info.y + 12 }}
    >
      <div className="font-semibold">{info.name}</div>
      <div className="text-xs text-slate-300">ISO: {info.iso}</div>
      <div className="text-xs text-accent">Score: {info.score ?? 0}</div>
    </div>
  );
}
