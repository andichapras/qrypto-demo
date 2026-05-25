import { supabase } from "@/lib/supabase";

export async function savePriceHistory(prices = []) {
  if (!prices.length) {
    return;
  }

  const payload = prices.map((item) => ({
    source: item.source,
    symbol: item.symbol,
    price: item.price,
    fetched_at: item.timestamp,
  }));

  const { error } = await supabase.from("crypto_prices").insert(payload);

  if (error) {
    throw error;
  }
}
