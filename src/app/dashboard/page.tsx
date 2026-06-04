export const dynamic = "force-dynamic";

import dynamic from "next/dynamic";
import { SignalsFeed } from "@/modules/signals/components/SignalsFeed";
import { WatchlistManager } from "@/modules/watchlist/components/WatchlistManager";
import { AccuracyStats } from "@/modules/signals/components/AccuracyStats";
import { StatusBar } from "@/modules/dashboard/components/StatusBar";
import { SymbolSelector } from "@/modules/chart/components/SymbolSelector";
import { Card } from "@/components/ui/Card";

const CandlestickChart = dynamic(
  () =>
    import("@/modules/chart/components/CandlestickChart").then(
      (m) => m.CandlestickChart
    ),
  { ssr: false, loading: () => <div className="h-[360px] bg-surface animate-pulse rounded" /> }
);

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-6">
          <StatusBar />
          <AccuracyStats />
        </div>
      </header>

      {/* Chart */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Live Chart</h2>
          <SymbolSelector />
        </div>
        <CandlestickChart />
      </Card>

      {/* Signals + Watchlist */}
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-8">
          <SignalsFeed />
        </section>
        <aside className="col-span-4">
          <WatchlistManager />
        </aside>
      </div>
    </div>
  );
}
