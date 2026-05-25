import { getCoinGeckoPrice } from "./coingecko.service";
import { getCoinCapPrice } from "./coincap.service";
import { getBinancePrice } from "./binance.service";
import { getCoinbasePrice } from "./coinbase.service";
import { savePriceHistory } from "./price-history.service";

export async function getAggregatedPrices(symbol = "BTC") {
  const results = await Promise.allSettled([
    getCoinGeckoPrice(symbol),
    getCoinbasePrice(symbol),
    getBinancePrice(symbol),
  ]);

  const prices = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  if (prices.length) {
    try {
      await savePriceHistory(prices);
    } catch (error) {
      console.error("Failed save history:", error.message);
    }
  }

  return prices;
}

export async function getAggregateStatistics(symbol = "BTC") {
  const data = await getAggregatedPrices(symbol);

  const prices = data.map((item) => item.price);

  if (!prices.length) {
    return null;
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  return {
    symbol,
    totalSources: prices.length,
    minPrice,
    maxPrice,
    avgPrice,
    spread: maxPrice - minPrice,
  };
}

export async function getHealthStatus() {
  const results = await Promise.all([
    checkProvider("CoinGecko", () => getCoinGeckoPrice("BTC")),
    checkProvider("Coinbase", () => getCoinbasePrice("BTC")),
    checkProvider("Binance", () => getBinancePrice("BTC")),
  ]);

  return results.reduce((acc, item) => {
    acc[item.provider] = {
      status: item.status,
      responseTime: item.responseTime,
    };

    return acc;
  }, {});
}

async function checkProvider(name, fn) {
  const start = Date.now();

  try {
    await fn();

    return {
      provider: name,
      status: "UP",
      responseTime: Date.now() - start,
    };
  } catch (error) {
    return {
      provider: name,
      status: "DOWN",
      responseTime: Date.now() - start,
      error: error.message,
    };
  }
}
