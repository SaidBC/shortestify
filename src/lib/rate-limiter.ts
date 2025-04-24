// Simple in-memory rate limiter (would use Redis in production)
type RateLimitRecord = {
  count: number;
  timestamp: number;
};

const rateLimitStore: Map<string, RateLimitRecord> = new Map();

export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  // If no record exists or record has expired
  if (!record || now - record.timestamp > windowMs) {
    rateLimitStore.set(identifier, { count: 1, timestamp: now });
    return false; // Not rate limited
  }
  
  // Check if limit exceeded
  if (record.count >= limit) {
    return true; // Rate limited
  }
  
  // Increment count
  record.count += 1;
  rateLimitStore.set(identifier, record);
  return false; // Not rate limited
}

// Periodically clean up expired records
if (typeof window !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((record, key) => {
      if (now - record.timestamp > 3600000) { // 1 hour
        rateLimitStore.delete(key);
      }
    });
  }, 300000); // Clean up every 5 minutes
}