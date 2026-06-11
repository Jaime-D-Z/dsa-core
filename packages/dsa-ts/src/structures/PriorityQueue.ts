import { MinHeap } from './MinHeap.js';

export interface PriorityItem<T> {
  value:    T;
  priority: number;   // menor número = mayor prioridad
}

/**
 * Priority Queue sobre Min Heap.
 *
 * Complexity:
 *   enqueue    O(log n)
 *   dequeue    O(log n)   — extrae el de mayor prioridad (menor número)
 *   peek       O(1)
 */
export class PriorityQueue<T> {
  private readonly heap: MinHeap<PriorityItem<T>>;

  constructor() {
    this.heap = new MinHeap<PriorityItem<T>>(
      (a, b) => a.priority - b.priority,
    );
  }

  get size(): number     { return this.heap.size; }
  get isEmpty(): boolean { return this.heap.isEmpty; }

  /** Inserta un elemento con su prioridad. O(log n) */
  enqueue(value: T, priority: number): void {
    this.heap.insert({ value, priority });
  }

  /** Extrae el elemento de mayor prioridad (menor número). O(log n) */
  dequeue(): PriorityItem<T> | undefined {
    return this.heap.extractMin();
  }

  /** Devuelve el elemento de mayor prioridad sin extraerlo. O(1) */
  peek(): PriorityItem<T> | undefined {
    return this.heap.peekMin();
  }

  toArray(): PriorityItem<T>[] {
    return this.heap.toArray();
  }
}
