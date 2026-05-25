import NodeCache from "node-cache";

const ttl = Number(process.env.CACHE_TTL || 30);

const cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: ttl * 2,
});

export const cacheService = {
  get(key) {
    return cache.get(key);
  },

  set(key, value, customTtl = ttl) {
    return cache.set(key, value, customTtl);
  },

  del(key) {
    return cache.del(key);
  },

  has(key) {
    return cache.has(key);
  },

  flush() {
    return cache.flushAll();
  },
};
