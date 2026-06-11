/**
 * HashMap — implementación propia con separate chaining.
 *
 * Complexity (promedio):
 *   set    O(1)
 *   get    O(1)
 *   delete O(1)
 *   has    O(1)
 *
 * Load factor target: 0.75 — hace rehash automático.
 */

interface Entry<K, V> {
  key: K;
  value: V;
}

export class HashMap<K, V> {
  private buckets: Array<Array<Entry<K, V>>>;
  private _size = 0;
  private readonly LOAD_FACTOR = 0.75;

  constructor(private capacity = 16) {
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  get size(): number { return this._size; }

  private hash(key: K): number {
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash % this.capacity;
  }

  /** Inserta o actualiza un par key-value. O(1) amortizado. */
  set(key: K, value: V): void {
    if (this._size / this.capacity >= this.LOAD_FACTOR) {
      this.resize();
    }
    const index  = this.hash(key);
    const bucket = this.buckets[index] as Array<Entry<K, V>>;
    const found  = bucket.find(e => e.key === key);
    if (found !== undefined) {
      found.value = value;
    } else {
      bucket.push({ key, value });
      this._size++;
    }
  }

  /** Devuelve el valor asociado a la key. O(1) promedio. */
  get(key: K): V | undefined {
    const bucket = this.buckets[this.hash(key)] as Array<Entry<K, V>>;
    return bucket.find(e => e.key === key)?.value;
  }

  /** True si la key existe. O(1) promedio. */
  has(key: K): boolean {
    const bucket = this.buckets[this.hash(key)] as Array<Entry<K, V>>;
    return bucket.some(e => e.key === key);
  }

  /** Elimina una key. O(1) promedio. */
  delete(key: K): boolean {
    const index  = this.hash(key);
    const bucket = this.buckets[index] as Array<Entry<K, V>>;
    const pos    = bucket.findIndex(e => e.key === key);
    if (pos === -1) return false;
    bucket.splice(pos, 1);
    this._size--;
    return true;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity    = this.capacity * 2;
    this.buckets     = Array.from({ length: this.capacity }, () => []);
    this._size       = 0;
    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  keys(): K[] {
    return this.buckets.flat().map(e => e.key);
  }

  values(): V[] {
    return this.buckets.flat().map(e => e.value);
  }

  entries(): Array<[K, V]> {
    return this.buckets.flat().map(e => [e.key, e.value]);
  }
}
