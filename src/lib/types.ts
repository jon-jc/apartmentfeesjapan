export type Layout = "1K" | "1LDK" | "2LDK";

export const LAYOUTS: Layout[] = ["1K", "1LDK", "2LDK"];

export const LAYOUT_LABELS: Record<Layout, string> = {
  "1K": "1R / 1K studio",
  "1LDK": "1LDK / 2K",
  "2LDK": "2LDK / 3K",
};

export interface WardInfo {
  id: string;
  nameEn: string;
  nameJa: string;
  blurb: string;
  blurbJa: string;
  access: string;
  accessJa: string;
  /** Baseline average monthly rent in yen, by layout */
  baseline: Record<Layout, number>;
}

/** Per-ward market rates served by /api/rates */
export interface WardRates {
  wardId: string;
  /** Estimated average monthly rent in yen, by layout */
  rents: Record<Layout, number>;
  /** Raw live studio average from SUUMO in yen, if the live fetch succeeded */
  suumoStudio?: number;
  /** Cross-check aggregate average from LIFULL HOME'S in yen, if available */
  homesAverage?: number;
}

export type RatesSource = "live" | "baseline";

export interface RatesPayload {
  source: RatesSource;
  /** Which upstream sites responded on the last refresh */
  liveSources: string[];
  /** ISO timestamp of when this data was assembled */
  updatedAt: string;
  /** Data refreshes at most once per this many seconds */
  refreshSeconds: number;
  rates: WardRates[];
}
