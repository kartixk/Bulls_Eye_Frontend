"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSignalStore } from "../store/signalStore";
import type { ISignal } from "../types";

export function useSignalsRealtime(userId?: string) {
  const addSignal = useSignalStore((s) => s.addSignal);

  useEffect(() => {
    const channel = supabase
      .channel("signals-feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "signals",
          ...(userId ? { filter: `user_id=eq.${userId}` } : {}),
        },
        (payload) => addSignal(payload.new as ISignal)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, addSignal]);
}
