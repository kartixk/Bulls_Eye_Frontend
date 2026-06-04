"use client";
import { useChartStore } from "../store/chartStore";

export function SymbolSelector() {
  const { selectedSymbol, symbols, setSelectedSymbol } = useChartStore();

  return (
    <select
      value={selectedSymbol}
      onChange={(e) => setSelectedSymbol(e.target.value)}
      className="bg-surface border border-border rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:ring-1 focus:ring-accent"
    >
      {symbols.length === 0 && (
        <option value={selectedSymbol}>{selectedSymbol}</option>
      )}
      {symbols.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
