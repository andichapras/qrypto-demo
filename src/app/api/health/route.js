import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api-response";

import { getHealthStatus } from "@/services/aggregator.service";

export async function GET() {
  try {
    const data = await getHealthStatus();

    return NextResponse.json(successResponse(data, "Health check completed"));
  } catch (error) {
    return NextResponse.json(
      errorResponse("Health check failed", "HEALTH_CHECK_ERROR", error.message),
      {
        status: 500,
      },
    );
  }
}
