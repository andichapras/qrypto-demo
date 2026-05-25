import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api-response";

import { getAggregateStatistics } from "@/services/aggregator.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol") || "BTC";

    const data = await getAggregateStatistics(symbol);

    return NextResponse.json(
      successResponse(data, "Statistics fetched successfully"),
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse(
        "Failed to calculate statistics",
        "AGGREGATOR_ERROR",
        error.message,
      ),
      {
        status: 500,
      },
    );
  }
}
