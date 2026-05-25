import { NextResponse } from "next/server";

import { getAggregatedPrices } from "@/services/aggregator.service";

export async function GET() {
  const data = await getAggregatedPrices("BTC");

  return NextResponse.json(data);
}
