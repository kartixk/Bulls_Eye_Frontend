"use client";
import { useEffect, useState } from "react";
import { useSignalStore } from "../store/signalStore";

export function AccuracyStats() {
  const signals = useSignalStore((s) => s.signals);
  const [stats, setStats] = useState({ total: 0, wins: 0, rate: 0 });

  useEffect(() => {
    const closed = signals.filter((s) => s.outcome && s.outcome !== "MISSED");
    const wins = closed.filter((s) => s.outcome === "WIN").length;
    setStats({
      total: closed.length,
      wins,
      rate: closed.length ? (wins / closed.length) * 100 : 0,
    });
  }, [signals]);

  return (
    <div className="text-sm text-muted font-mono">
      Accuracy: <span className="text-accent">{stats.rate.toFixed(1)}%</span> ({stats.wins}/{stats.total})
    </div>
  );
}
