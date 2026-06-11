import { describe, it, expect } from 'vitest';
import { LRUCache } from '../../src/structures/LRUCache.js';

describe('LRUCache', () => {
  it('get y set básicos', () => {
    const cache = new LRUCache<number>(3);
    cache.set('a', 1);
    cache.set('b', 2);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBeUndefined();
  });

  it('evicta el LRU cuando está lleno', () => {
    const cache = new LRUCache<number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a');         // 'a' se vuelve el más reciente
    cache.set('c', 3);      // 'b' es el LRU → evictado
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
  });

  it('TTL expira correctamente', async () => {
    const cache = new LRUCache<string>(10);
    cache.set('x', 'valor', 50); // 50ms de vida
    expect(cache.get('x')).toBe('valor');
    await new Promise(r => setTimeout(r, 60));
    expect(cache.get('x')).toBeUndefined();
  });

  it('stats registran hits y misses', () => {
    const cache = new LRUCache<number>(5);
    cache.set('k', 42);
    cache.get('k');          // hit
    cache.get('k');          // hit
    cache.get('missing');    // miss
    const { hits, misses, hitRate } = cache.stats();
    expect(hits).toBe(2);
    expect(misses).toBe(1);
    expect(hitRate).toBe(67);
  });

  it('lanza error si capacity <= 0', () => {
    expect(() => new LRUCache(0)).toThrow(RangeError);
  });
});
