"use client";
import type { ISignal } from "../types";
import { Badge } from "@/components/ui/Badge";
import { signalService } from "../services/signalService";
import { useSignalStore } from "../store/signalStore";

export function SignalCard({ signal }: { signal: ISignal }) {
  const updateOutcome = useSignalStore((s) => s.updateOutcome);
  const onOutcome = async (o: ISignal["outcome"]) => {
    updateOutcome(signal.id, o);
    try {
      await signalService.setOutcome(signal.id, o);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <li className="border border-border rounded p-3 bg-surface">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge tone={signal.action === "BUY" ? "accent" : "danger"}>{signal.action}</Badge>
          <span className="font-mono font-semibold">{signal.instrument}</span>
          {signal.kind === "FNO" && (
            <span className="text-xs text-muted">
              {signal.strike_price} {signal.expiry_date}
            </span>
          )}
        </div>
        <span className="text-xs text-muted">{signal.confidence.toFixed(1)}%</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted font-mono">
        <span>Entry {signal.entry_price}</span>
        {signal.target_price != null && <span>TGT {signal.target_price}</span>}
        {signal.stop_loss != null && <span>SL {signal.stop_loss}</span>}
      </div>
      {signal.rationale && <p className="mt-2 text-xs text-muted">{signal.rationale}</p>}
      <div className="mt-2 flex gap-2 text-xs">
        {(["WIN", "LOSS", "PARTIAL", "MISSED"] as const).map((o) => (
          <button
            key={o}
            onClick={() => onOutcome(o)}
            className={`px-2 py-0.5 rounded border border-border ${
              signal.outcome === o ? "bg-accent/20 text-accent" : "text-muted hover:text-white"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </li>
  );
}
