"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/MapView").then((m) => m.MapView), {
  ssr: false
});

const mockScores: Record<string, number> = {
  USA: 12,
  DEU: 7,
  FRA: 5,
  BRA: 3,
  IND: 4
};

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-accent">Make Change, Not War</p>
          <h1 className="text-3xl font-semibold">Weltkarte, Micro-Donations, Live Scores</h1>
          <p className="mt-2 text-sm text-slate-300">
            Zoombare Karte mit verschiedenen Darstellungsmodi. Klicke auf ein Land und unterstütze es mit +1.
          </p>
        </div>
      </header>
      <MapView scores={mockScores} />
    </div>
  );
}
