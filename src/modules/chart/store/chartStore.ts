"use client";
import { create } from "zustand";
import type { IChartCandle } from "../types";

interface ChartStore {
  selectedSymbol: string;
  symbols: string[];
  candles: IChartCandle[];
  setSelectedSymbol: (s: string) => void;
  setSymbols: (s: string[]) => void;
  setCandles: (c: IChartCandle[]) => void;
  appendCandle: (c: IChartCandle) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  selectedSymbol: "RELIANCE",
  symbols: [],
  candles: [],
  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol, candles: [] }),
  setSymbols: (symbols) => set({ symbols }),
  setCandles: (candles) => set({ candles }),
  appendCandle: (c) =>
    set((state) => ({
      candles: [...state.candles.slice(-299), c],
    })),
}));
