"use client";
import { useEffect, useState } from "react";
import { watchlistService } from "../services/watchlistService";
import type { IWatchlistItem, InstrumentType } from "../types";
import { Card } from "@/components/ui/Card";

export function WatchlistManager() {
  const [items, setItems] = useState<IWatchlistItem[]>([]);
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState<InstrumentType>("equity");

  const refresh = () => watchlistService.list().then(setItems).catch(console.error);
  useEffect(() => {
    refresh();
  }, []);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol) return;
    await watchlistService.add(symbol.toUpperCase(), type);
    setSymbol("");
    refresh();
  };

  return (
    <Card>
      <h2 className="font-semibold mb-3">Watchlist</h2>
      <form onSubmit={onAdd} className="flex gap-2 mb-3">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="RELIANCE"
          className="flex-1 bg-bg border border-border rounded px-2 py-1 text-sm font-mono"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as InstrumentType)}
          className="bg-bg border border-border rounded px-2 text-sm"
        >
          <option value="equity">EQ</option>
          <option value="index">IDX</option>
          <option value="fno">F&amp;O</option>
        </select>
        <button className="bg-accent text-bg px-3 py-1 rounded text-sm font-medium">Add</button>
      </form>
      <ul className="space-y-1 text-sm">
        {items.map((it) => (
          <li key={it.id} className="flex justify-between font-mono">
            <span>
              {it.instrument} <span className="text-muted text-xs">{it.instrument_type}</span>
            </span>
            <button
              onClick={async () => {
                await watchlistService.remove(it.id);
                refresh();
              }}
              className="text-danger text-xs"
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
