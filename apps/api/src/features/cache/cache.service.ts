/**
 * CacheService
 *
 * Wrapper sobre LRUCache de @structra/dsa-ts.
 * Capacidad: 500 entradas. Todas las ops son O(1).
 */
import { LRUCache } from '@structra/dsa-ts';

const CAPACITY = 500;

export class CacheService {
  private readonly cache = new LRUCache<string>(CAPACITY);

  get(key: string): { found: boolean; value?: string } {
    const value = this.cache.get(key);
    return { found: value !== undefined, value };
  }

  set(key: string, value: string, ttlMs?: number): void {
    this.cache.set(key, value, ttlMs);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  stats() {
    return { ...this.cache.stats(), capacity: CAPACITY };
  }

  clear(): void {
    this.cache.clear();
  }
}

// singleton — una sola instancia por proceso
export const cacheService = new CacheService();
