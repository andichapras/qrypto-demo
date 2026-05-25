import { fetchJson } from "@/lib/fetcher";

export async function getCoinbasePrice(symbol = "BTC") {
  const url = `https://api.coinbase.com/v2/prices/${symbol}-USD/spot`;

  const result = await fetchJson(url);

  return {
    source: "Coinbase",
    symbol,
    price: Number(result.data.amount),
    timestamp: new Date().toISOString(),
  };
}
