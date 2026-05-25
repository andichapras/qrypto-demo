import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol") || "BTC";

    const limit = Number(searchParams.get("limit") || 100);

    const { data, error } = await supabase
      .from("crypto_prices")
      .select("*")
      .eq("symbol", symbol)
      .order("fetched_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      successResponse(data, "History fetched successfully"),
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse("Failed to fetch history", "SUPABASE_ERROR", error.message),
      {
        status: 500,
      },
    );
  }
}
