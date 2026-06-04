import { create } from "zustand";
import type { ISignal } from "../types";

type Filter = "ALL" | "BUY" | "SELL" | "FNO";

interface SignalStore {
  signals: ISignal[];
  filter: Filter;
  setSignals: (s: ISignal[]) => void;
  addSignal: (s: ISignal) => void;
  updateOutcome: (id: string, outcome: ISignal["outcome"]) => void;
  setFilter: (f: Filter) => void;
}

export const useSignalStore = create<SignalStore>((set) => ({
  signals: [],
  filter: "ALL",
  setSignals: (signals) => set({ signals }),
  addSignal: (s) => set((state) => ({ signals: [s, ...state.signals].slice(0, 200) })),
  updateOutcome: (id, outcome) =>
    set((state) => ({
      signals: state.signals.map((s) => (s.id === id ? { ...s, outcome } : s)),
    })),
  setFilter: (filter) => set({ filter }),
}));
