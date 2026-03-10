import { logger } from "./logger";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;

export function rateLimit(userId: string): {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
} {
  const now = Date.now();
  const entry = store.get(userId);

  // If no entry or window expired — reset
  if (!entry || now > entry.resetAt) {
    store.set(userId, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    logger.info("RATE_LIMIT", "New window started", {
      userId,
      remaining: MAX_REQUESTS - 1,
    });

    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetInSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  // Window still active
  if (entry.count >= MAX_REQUESTS) {
    const resetInSeconds = Math.ceil((entry.resetAt - now) / 1000);

    logger.warn("RATE_LIMIT", "Rate limit exceeded", {
      userId,
      resetInSeconds,
    });

    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  // Increment count
  entry.count += 1;
  store.set(userId, entry);

  const remaining = MAX_REQUESTS - entry.count;

  logger.info("RATE_LIMIT", "Request allowed", {
    userId,
    count: entry.count,
    remaining,
  });

  return {
    allowed: true,
    remaining,
    resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}