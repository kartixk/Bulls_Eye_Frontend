"use client";
import { useEffect, useRef } from "react";
import type {
  CandlestickData,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import type { IChartCandle } from "../types";
import { useChartStore } from "../store/chartStore";
import { useCandles } from "../hooks/useCandles";

function toCandlestickItem(c: IChartCandle): CandlestickData {
  return {
    time: c.timestamp as UTCTimestamp,
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
  };
}

export function CandlestickChart() {
  useCandles();
  const candles = useChartStore((s) => s.candles);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi>();
  const seriesRef = useRef<ISeriesApi<"Candlestick">>();

  // Initialise chart once
  useEffect(() => {
    if (!containerRef.current) return;
    let cleanupFn: (() => void) | undefined;

    import("lightweight-charts").then(({ createChart, ColorType }) => {
      if (!containerRef.current) return;
      const chart = createChart(containerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "#0a0e17" },
          textColor: "#94a3b8",
        },
        grid: {
          vertLines: { color: "#1e293b" },
          horzLines: { color: "#1e293b" },
        },
        width: containerRef.current.clientWidth,
        height: 360,
        timeScale: { timeVisible: true, secondsVisible: false },
      });
      const series = chart.addCandlestickSeries({
        upColor: "#22d3ee",
        downColor: "#f43f5e",
        borderVisible: false,
        wickUpColor: "#22d3ee",
        wickDownColor: "#f43f5e",
      });
      chartRef.current = chart;
      seriesRef.current = series;

      const onResize = () => {
        if (containerRef.current) {
          chart.applyOptions({ width: containerRef.current.clientWidth });
        }
      };
      window.addEventListener("resize", onResize);
      cleanupFn = () => {
        window.removeEventListener("resize", onResize);
        chart.remove();
      };
    });

    return () => cleanupFn?.();
  }, []);

  // Update data when candles change
  useEffect(() => {
    if (!seriesRef.current || candles.length === 0) return;
    const sorted = [...candles].sort((a, b) => a.timestamp - b.timestamp);
    // deduplicate by timestamp
    const seen = new Set<number>();
    const unique = sorted.filter((c) => {
      if (seen.has(c.timestamp)) return false;
      seen.add(c.timestamp);
      return true;
    });
    seriesRef.current.setData(unique.map(toCandlestickItem));
  }, [candles]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded overflow-hidden"
      style={{ minHeight: 360 }}
    />
  );
}
