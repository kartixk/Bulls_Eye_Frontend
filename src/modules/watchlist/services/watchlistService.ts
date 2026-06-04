import { supabase } from "@/lib/supabaseClient";
import type { IWatchlistItem, InstrumentType } from "../types";

export const watchlistService = {
  async list(): Promise<IWatchlistItem[]> {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .order("added_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as IWatchlistItem[];
  },
  async add(instrument: string, instrument_type: InstrumentType) {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) throw new Error("Not signed in");
    const { error } = await supabase
      .from("watchlist")
      .insert({ instrument, instrument_type, user_id: u.user.id });
    if (error) throw error;
  },
  async remove(id: string) {
    const { error } = await supabase.from("watchlist").delete().eq("id", id);
    if (error) throw error;
  },
};
