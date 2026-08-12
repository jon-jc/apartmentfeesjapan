import { unstable_cache } from "next/cache";
import { WARDS, WARD_BY_JA, BASELINE_DATE } from "@/data/wardInfo";
import type { Layout, RatesPayload, WardRates } from "@/lib/types";

/** Refresh live market data at most once per day */
export const REFRESH_SECONDS = 60 * 60 * 24;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

/** Minimum wards a parse must yield before we trust a live source */
const MIN_WARDS = 20;

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, "accept-language": "ja,en;q=0.8" },
      // Revalidate upstream at most daily; keeps us a polite, low-volume client
      next: { revalidate: REFRESH_SECONDS },
      signal: AbortSignal.timeout(15000),
    });
    // must be a real 200 — HOME'S serves empty 202 challenge responses to bots
    if (res.status !== 200) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Extract 「◯◯区 … N.N万円」 pairs from a market-rate page */
function parseWardPrices(html: string): Map<string, number> {
  const out = new Map<string, number>();
  // allow markup like </span> between the number and 万円 (HOME'S wraps the digits)
  const re = /([一-鿿]+区)[\s\S]{0,250}?([0-9]+(?:\.[0-9]+)?)\s*(?:<\/span>)?\s*万円/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const ward = WARD_BY_JA[m[1]];
    if (ward && !out.has(ward.id)) {
      out.set(ward.id, Math.round(parseFloat(m[2]) * 10000));
    }
  }
  return out;
}

/**
 * SUUMO 賃貸相場 for Tokyo — per-ward average rent for studio-class
 * (1R/1K/1DK) listings. This is the daily live anchor.
 */
async function fetchSuumoStudio(): Promise<Map<string, number> | null> {
  const html = await fetchHtml("https://suumo.jp/chintai/soba/tokyo/");
  if (!html) return null;
  const parsed = parseWardPrices(html);
  return parsed.size >= MIN_WARDS ? parsed : null;
}

/**
 * LIFULL HOME'S 家賃相場 for Tokyo — per-ward aggregate average across
 * layouts. Used as a cross-check figure shown in the UI.
 */
async function fetchHomesAverage(): Promise<Map<string, number> | null> {
  const html = await fetchHtml(
    "https://www.homes.co.jp/chintai/tokyo/city/price/"
  );
  if (!html) return null;
  const parsed = parseWardPrices(html);
  return parsed.size >= MIN_WARDS ? parsed : null;
}

/**
 * Assemble per-ward rates. Live SUUMO studio averages anchor the 1K figure;
 * 1LDK/2LDK are estimated by scaling the live anchor with each ward's
 * baseline layout ratios. Any ward or layout without live data falls back
 * to the curated baseline.
 */
async function assembleRates(): Promise<RatesPayload> {
  const [suumo, homes] = await Promise.all([
    fetchSuumoStudio(),
    fetchHomesAverage(),
  ]);

  const liveSources: string[] = [];
  if (suumo) liveSources.push("SUUMO");
  if (homes) liveSources.push("LIFULL HOME'S");

  const rates: WardRates[] = WARDS.map((w) => {
    const live1K = suumo?.get(w.id);
    const rents = {} as Record<Layout, number>;
    if (live1K) {
      // Scale the live studio anchor by this ward's baseline layout ratios,
      // rounded to the nearest 1000 yen.
      rents["1K"] = live1K;
      rents["1LDK"] =
        Math.round((live1K * w.baseline["1LDK"]) / w.baseline["1K"] / 1000) *
        1000;
      rents["2LDK"] =
        Math.round((live1K * w.baseline["2LDK"]) / w.baseline["1K"] / 1000) *
        1000;
    } else {
      rents["1K"] = w.baseline["1K"];
      rents["1LDK"] = w.baseline["1LDK"];
      rents["2LDK"] = w.baseline["2LDK"];
    }
    return {
      wardId: w.id,
      rents,
      suumoStudio: live1K,
      homesAverage: homes?.get(w.id),
    };
  });

  return {
    source: suumo ? "live" : "baseline",
    liveSources,
    updatedAt: suumo ? new Date().toISOString() : `${BASELINE_DATE}T00:00:00Z`,
    refreshSeconds: REFRESH_SECONDS,
    rates,
  };
}

/**
 * Daily-cached market rates. The whole assembled payload is cached for 24h
 * so every visitor sees the same day's figures and upstream sites are hit
 * at most once per day per source.
 */
export const getMarketRates = unstable_cache(assembleRates, ["market-rates"], {
  revalidate: REFRESH_SECONDS,
});
