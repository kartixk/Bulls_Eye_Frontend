import { api } from "@/lib/api";
import type { IChartCandle, IStatus } from "../types";

export const candleService = {
  async getCandles(symbol: string, limit = 60): Promise<IChartCandle[]> {
    return api<IChartCandle[]>(`/api/candles/${symbol}?limit=${limit}`);
  },
  async getStatus(): Promise<IStatus> {
    return api<IStatus>("/api/status");
  },
  async getInstruments(): Promise<string[]> {
    return api<string[]>("/api/instruments");
  },
};
