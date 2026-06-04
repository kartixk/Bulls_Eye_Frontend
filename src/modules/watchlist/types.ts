export type InstrumentType = "equity" | "index" | "fno";

export interface IWatchlistItem {
  id: string;
  user_id: string;
  instrument: string;
  instrument_type: InstrumentType;
  added_at: string;
}
