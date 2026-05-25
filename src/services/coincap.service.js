import { fetchJson } from "@/lib/fetcher";
import { CRYPTO_MAPPING } from "@/constants/crypto";

export async function getCoinCapPrice(symbol = "BTC") {
  const asset = CRYPTO_MAPPING[symbol]?.coincap;

  const url = `https://api.coincap.io/v2/assets/${asset}`;

  const result = await fetchJson(url);

  return {
    source: "CoinCap",
    symbol,
    price: Number(result.data.priceUsd),
    timestamp: new Date().toISOString(),
  };
}
