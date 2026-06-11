import { DoublyLinkedList, ListNode } from './LinkedList.js';

interface CacheEntry<V> {
  key:       string;
  value:     V;
  expiresAt: number | null;   // null = sin TTL
}

interface CacheStats {
  hits:    number;
  misses:  number;
  size:    number;
  hitRate: number;
}

/**
 * LRU Cache (Least Recently Used)
 *
 * Combina DoublyLinkedList + HashMap para lograr O(1) en todas las ops.
 * El nodo más recientemente usado va al frente de la lista.
 * Cuando se llena, se evicta el nodo al final (menos usado).
 *
 * Complexity:
 *   get    O(1)
 *   set    O(1)
 *   delete O(1)
 */
export class LRUCache<V> {
  private readonly list = new DoublyLinkedList<CacheEntry<V>>();
  private readonly map  = new Map<string, ListNode<CacheEntry<V>>>();
  private hits   = 0;
  private misses = 0;

  constructor(private readonly capacity: number) {
    if (capacity <= 0) throw new RangeError('capacity debe ser > 0');
  }

  /**
   * Recupera un valor. Mueve el nodo al frente (más reciente). O(1)
   * @returns el valor o undefined si no existe / expiró
   */
  get(key: string): V | undefined {
    const node = this.map.get(key);
    if (node === undefined) {
      this.misses++;
      return undefined;
    }

    const entry = node.value;

    // comprobar TTL
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.evict(key, node);
      this.misses++;
      return undefined;
    }

    // mover al frente (más reciente)
    this.list.remove(node);
    const fresh = this.list.prepend(entry);
    this.map.set(key, fresh);
    this.hits++;
    return entry.value;
  }

  /**
   * Inserta o actualiza un valor. Evicta el LRU si está lleno. O(1)
   * @param ttlMs milisegundos de vida — undefined = sin expiración
   */
  set(key: string, value: V, ttlMs?: number): void {
    const existing = this.map.get(key);
    if (existing !== undefined) {
      this.list.remove(existing);
      this.map.delete(key);
    } else if (this.list.size >= this.capacity) {
      // evictar el LRU (tail = menos usado)
      const lruNode = this.list.tail;
      if (lruNode !== null) {
        this.evict(lruNode.value.key, lruNode);
      }
    }

    const entry: CacheEntry<V> = {
      key,
      value,
      expiresAt: ttlMs !== undefined ? Date.now() + ttlMs : null,
    };
    const node = this.list.prepend(entry);
    this.map.set(key, node);
  }

  /** Elimina una clave explícitamente. O(1) */
  delete(key: string): boolean {
    const node = this.map.get(key);
    if (node === undefined) return false;
    this.evict(key, node);
    return true;
  }

  has(key: string): boolean {
    return this.map.has(key) && this.get(key) !== undefined;
  }

  get size(): number { return this.list.size; }

  /** Estadísticas de uso */
  stats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      hits:    this.hits,
      misses:  this.misses,
      size:    this.size,
      hitRate: total === 0 ? 0 : Math.round((this.hits / total) * 100),
    };
  }

  clear(): void {
    this.list.head = null;
    this.list.tail = null;
    this.map.clear();
    this.hits   = 0;
    this.misses = 0;
  }

  private evict(key: string, node: ListNode<CacheEntry<V>>): void {
    this.list.remove(node);
    this.map.delete(key);
  }
}
