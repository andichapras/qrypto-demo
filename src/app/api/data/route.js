import { NextResponse } from "next/server";

import { cacheService } from "@/lib/cache";
import { successResponse, errorResponse } from "@/lib/api-response";

import { getAggregatedPrices } from "@/services/aggregator.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol") || "BTC";

    const cacheKey = `crypto-${symbol}`;

    const cachedData = cacheService.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(
        successResponse(cachedData, `${symbol} data fetched successfully`, {
          cached: true,
        }),
      );
    }

    const data = await getAggregatedPrices(symbol);

    cacheService.set(cacheKey, data);

    return NextResponse.json(
      successResponse(data, `${symbol} data fetched successfully`),
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse(
        "Failed to fetch crypto data",
        "AGGREGATOR_ERROR",
        error.message,
      ),
      {
        status: 500,
      },
    );
  }
}
