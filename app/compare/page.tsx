const pairs = [
  { a: { iso: "USA", score: 12 }, b: { iso: "CHN", score: 6 } },
  { a: { iso: "DEU", score: 7 }, b: { iso: "FRA", score: 5 } }
];

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Head to Head</h1>
      <p className="text-sm text-slate-300">Vergleiche Länder gegeneinander (mocked).</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {pairs.map((p, idx) => (
          <div key={idx} className="card p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{p.a.iso}</span>
              <span className="text-accent">{p.a.score}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-semibold">{p.b.iso}</span>
              <span className="text-accent">{p.b.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
