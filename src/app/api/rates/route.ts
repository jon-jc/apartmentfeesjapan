import { NextResponse } from "next/server";
import { getMarketRates, REFRESH_SECONDS } from "@/lib/rates";

export const revalidate = 86400; // refresh at most daily

export async function GET() {
  const payload = await getMarketRates();
  return NextResponse.json(payload, {
    headers: {
      "cache-control": `public, s-maxage=${REFRESH_SECONDS}, stale-while-revalidate=3600`,
    },
  });
}
