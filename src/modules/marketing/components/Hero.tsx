export function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Your personal AI trading assistant for NSE/BSE
      </h1>
      <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
        Monitors Nifty 100 and F&amp;O instruments in real time. Sends Buy/Sell signals with
        rationale, strike prices, and expiry recommendations — to your dashboard and Telegram.
      </p>
      <a
        href="/dashboard"
        className="inline-block mt-8 bg-accent text-bg px-6 py-3 rounded font-medium"
      >
        Open dashboard →
      </a>
    </section>
  );
}
