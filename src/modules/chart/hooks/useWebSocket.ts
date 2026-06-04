"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { IChartCandle } from "../types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

export function useWebSocket(
  symbol: string,
  onCandle: (candle: IChartCandle) => void
) {
  const socketRef = useRef<Socket | null>(null);
  const prevSymbol = useRef<string>("");

  useEffect(() => {
    if (!WS_URL) return;

    if (!socketRef.current) {
      socketRef.current = io(WS_URL, { transports: ["websocket"] });
    }
    const socket = socketRef.current;

    if (prevSymbol.current && prevSymbol.current !== symbol) {
      socket.emit("watchlist:unsubscribe", { symbols: [prevSymbol.current] });
    }
    socket.emit("watchlist:subscribe", { symbols: [symbol] });
    prevSymbol.current = symbol;

    const handler = (payload: { symbol: string; candle: IChartCandle }) => {
      if (payload.symbol === symbol) onCandle(payload.candle);
    };
    socket.on("candle:update", handler);

    return () => {
      socket.off("candle:update", handler);
    };
  }, [symbol, onCandle]);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);
}
