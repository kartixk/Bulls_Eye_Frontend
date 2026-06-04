const FEATURES = [
  { t: "Nifty 100 + F&O coverage", d: "All Nifty 100 equities plus Nifty/BankNifty options." },
  { t: "Rule-based signal engine", d: "RSI, MACD, EMA, volume — confidence-scored." },
  { t: "Telegram alerts", d: "Instant Buy/Sell notifications with entry, target, stop-loss." },
  { t: "Accuracy tracking", d: "Tag outcomes; tune thresholds as you trade." },
];

export function Features() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-2 gap-6">
      {FEATURES.map((f) => (
        <div key={f.t} className="border border-border bg-surface rounded p-5">
          <h3 className="font-semibold">{f.t}</h3>
          <p className="text-muted text-sm mt-1">{f.d}</p>
        </div>
      ))}
    </section>
  );
}
