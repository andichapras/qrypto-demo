import { fetchJson } from "@/lib/fetcher";
import { CRYPTO_MAPPING } from "@/constants/crypto";

export async function getCoinGeckoPrice(symbol = "BTC") {
  const coinId = CRYPTO_MAPPING[symbol]?.coingecko;

  const url =
    `https://api.coingecko.com/api/v3/simple/price` +
    `?ids=${coinId}&vs_currencies=usd`;

  const result = await fetchJson(url);

  return {
    source: "CoinGecko",
    symbol,
    price: result[coinId]?.usd || 0,
    timestamp: new Date().toISOString(),
  };
}
