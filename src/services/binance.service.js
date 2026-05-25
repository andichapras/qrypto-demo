import { fetchJson } from "@/lib/fetcher";
import { CRYPTO_MAPPING } from "@/constants/crypto";

export async function getBinancePrice(symbol = "BTC") {
  const pair = CRYPTO_MAPPING[symbol]?.binance;

  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${pair}`;

  const result = await fetchJson(url);

  return {
    source: "Binance",
    symbol,
    price: Number(result.price),
    timestamp: new Date().toISOString(),
  };
}
