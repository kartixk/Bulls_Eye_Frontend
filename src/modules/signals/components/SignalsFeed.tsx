"use client";
import { useEffect } from "react";
import { useSignalStore } from "../store/signalStore";
import { signalService } from "../services/signalService";
import { useSignalsRealtime } from "../hooks/useSignalsRealtime";
import { SignalCard } from "./SignalCard";
import { Card } from "@/components/ui/Card";

const FILTERS = ["ALL", "BUY", "SELL", "FNO"] as const;

export function SignalsFeed() {
  const { signals, setSignals, filter, setFilter } = useSignalStore();
  useSignalsRealtime();

  useEffect(() => {
    signalService.list().then(setSignals).catch(console.error);
  }, [setSignals]);

  const filtered = signals.filter((s) => {
    if (filter === "ALL") return true;
    if (filter === "FNO") return s.kind === "FNO";
    return s.action === filter;
  });

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Live Signals</h2>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded ${
                filter === f ? "bg-accent text-bg" : "bg-surface text-muted hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-2">
        {filtered.length === 0 && (
          <li className="text-muted text-sm py-8 text-center">No signals yet.</li>
        )}
        {filtered.map((s) => (
          <SignalCard key={s.id} signal={s} />
        ))}
      </ul>
    </Card>
  );
}
