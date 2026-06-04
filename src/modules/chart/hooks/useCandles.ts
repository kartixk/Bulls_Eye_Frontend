"use client";
import { useEffect, useCallback } from "react";
import { useChartStore } from "../store/chartStore";
import { candleService } from "../services/candleService";
import { useWebSocket } from "./useWebSocket";
import type { IChartCandle } from "../types";

export function useCandles() {
  const { selectedSymbol, setCandles, setSymbols, appendCandle } = useChartStore();

  // Load instrument list once
  useEffect(() => {
    candleService.getInstruments().then(setSymbols).catch(console.error);
  }, [setSymbols]);

  // Load historical candles whenever symbol changes
  useEffect(() => {
    if (!selectedSymbol) return;
    candleService.getCandles(selectedSymbol).then(setCandles).catch(console.error);
  }, [selectedSymbol, setCandles]);

  const handleNewCandle = useCallback(
    (candle: IChartCandle) => appendCandle(candle),
    [appendCandle]
  );
  useWebSocket(selectedSymbol, handleNewCandle);
}
