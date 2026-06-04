export type SignalAction = "BUY" | "SELL";
export type SignalKind = "EQUITY" | "FNO";
export type SignalOutcome = "WIN" | "LOSS" | "PARTIAL" | "MISSED" | null;

export interface ISignal {
  id: string;
  user_id: string;
  instrument: string;
  kind: SignalKind;
  action: SignalAction;
  entry_price: number;
  target_price?: number | null;
  stop_loss?: number | null;
  confidence: number;
  rsi?: number | null;
  macd?: number | null;
  ema21?: number | null;
  volume_ratio?: number | null;
  strike_price?: number | null;
  expiry_date?: string | null;
  premium?: number | null;
  rationale?: string | null;
  outcome?: SignalOutcome;
  created_at: string;
}
