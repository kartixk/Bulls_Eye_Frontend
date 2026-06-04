export interface IChartCandle {
  timestamp: number;   // unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IStatus {
  feed_live: boolean;
  last_update: string | null;
  signals_today: number;
}
