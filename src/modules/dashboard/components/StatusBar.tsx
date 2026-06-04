"use client";
import { useEffect, useState } from "react";
import { candleService } from "@/modules/chart/services/candleService";
import type { IStatus } from "@/modules/chart/types";

export function StatusBar() {
  const [status, setStatus] = useState<IStatus | null>(null);

  useEffect(() => {
    const fetch = () =>
      candleService.getStatus().then(setStatus).catch(() => {});
    fetch();
    const id = setInterval(fetch, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return (
      <div className="text-xs font-mono text-muted">Connecting to engine...</div>
    );
  }

  const lastUpdate = status.last_update
    ? new Date(status.last_update).toLocaleTimeString("en-IN", { hour12: false })
    : "—";

  return (
    <div className="flex items-center gap-4 text-xs font-mono">
      <span className="flex items-center gap-1.5">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            status.feed_live ? "bg-emerald-400" : "bg-rose-500"
          }`}
        />
        <span className={status.feed_live ? "text-emerald-400" : "text-rose-400"}>
          {status.feed_live ? "LIVE" : "STALE"}
        </span>
      </span>
      <span className="text-muted">Updated {lastUpdate}</span>
      <span className="text-muted">{status.signals_today} signals today</span>
    </div>
  );
}
