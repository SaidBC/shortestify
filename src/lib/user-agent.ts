// Simple bot detection utility
export function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /headless/i,
    /scraper/i,
    /phantom/i,
    /puppeteer/i,
    /selenium/i,
    /chrome-lighthouse/i,
    /pingdom/i,
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
}

// Get client IP from request
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  
  if (forwardedFor) {
    // Get the first IP in case of multiple IPs
    return forwardedFor.split(',')[0].trim();
  }
  
  return '0.0.0.0'; // Fallback
}