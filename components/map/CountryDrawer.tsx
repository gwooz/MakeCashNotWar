"use client";

interface CountryDrawerProps {
  iso: string;
  name: string;
  score: number;
  onClose: () => void;
}

export function CountryDrawer({ iso, name, score, onClose }: CountryDrawerProps) {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-20 rounded-t-2xl bg-slate-900/95 p-4 shadow-2xl backdrop-blur md:left-auto md:w-96 md:rounded-l-2xl md:rounded-tr-2xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400">{iso}</div>
          <div className="text-xl font-semibold">{name}</div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200" aria-label="Close drawer">
          ×
        </button>
      </div>
      <div className="mt-3 text-sm text-accent">Score: {score}</div>
      <div className="mt-4 text-sm text-slate-300">
        Kommt noch: Mini-Verlauf, letzte Spenden, CTA „Support +1“.
      </div>
    </aside>
  );
}
