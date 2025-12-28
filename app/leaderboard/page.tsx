const mock = [
  { iso: "USA", name: "United States", score: 12 },
  { iso: "DEU", name: "Germany", score: 7 },
  { iso: "FRA", name: "France", score: 5 },
  { iso: "IND", name: "India", score: 4 }
];

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <p className="text-sm text-slate-300">Top Länder nach Score (mocked).</p>
      <div className="mt-6 divide-y divide-slate-800 rounded-2xl border border-slate-800/80 bg-slate-900/60">
        {mock.map((row, idx) => (
          <div key={row.iso} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-400">#{idx + 1}</span>
              <span className="font-semibold">{row.name}</span>
              <span className="text-slate-400">({row.iso})</span>
            </div>
            <span className="text-accent">{row.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
