import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("crypto_prices")
    .insert([
      {
        source: "TEST",
        symbol: "BTC",
        price: 12345,
        fetched_at: new Date().toISOString(),
      },
    ])
    .select();

  return NextResponse.json({
    data,
    error,
  });
}
