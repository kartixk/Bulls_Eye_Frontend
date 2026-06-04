import { supabase } from "@/lib/supabaseClient";
import type { ISignal } from "../types";

export const signalService = {
  async list(limit = 100): Promise<ISignal[]> {
    const { data, error } = await supabase
      .from("signals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []) as ISignal[];
  },
  async setOutcome(id: string, outcome: ISignal["outcome"]) {
    const { error } = await supabase.from("signals").update({ outcome }).eq("id", id);
    if (error) throw error;
  },
};
