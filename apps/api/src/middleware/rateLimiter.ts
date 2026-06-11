/**
 * Rate Limiter — Sliding Window Algorithm
 *
 * Usa HashMap de @structra/dsa-ts internamente.
 * Complexity: O(1) amortizado por request.
 *
 * Ventaja sobre fixed window:
 * Fixed window tiene el problema del "double burst"
 * al borde de cada ventana. Sliding window lo evita
 * descartando timestamps fuera del rango dinámico.
 */
import type { Request, Response, NextFunction } from 'express';
import { HashMap } from '@structra/dsa-ts';

interface WindowEntry {
  timestamps: number[];
}

// singleton — un solo store por proceso
const store = new HashMap<string, WindowEntry>(256);

export function rateLimiter(maxRequests = 60, windowMs = 60_000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key         = (req.ip ?? 'unknown').replace(/[^a-zA-Z0-9.:]/g, '_');
    const now         = Date.now();
    const windowStart = now - windowMs;

    // recuperar o crear la ventana del IP
    const entry: WindowEntry = store.get(key) ?? { timestamps: [] };

    // descartar timestamps fuera de la ventana — O(n) donde n ≤ maxRequests
    entry.timestamps = entry.timestamps.filter(t => t > windowStart);

    if (entry.timestamps.length >= maxRequests) {
      const oldest   = entry.timestamps[0] ?? now;
      const retryMs  = Math.ceil((oldest + windowMs - now) / 1000);
      res.status(429).json({
        error:      'Too many requests',
        retryAfter: retryMs,
        limit:      maxRequests,
        windowSecs: windowMs / 1000,
      });
      return;
    }

    entry.timestamps.push(now);
    store.set(key, entry);

    res.setHeader('X-RateLimit-Limit',     maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - entry.timestamps.length);
    next();
  };
}
