/**
 * Min Heap — árbol binario completo donde el padre ≤ hijos.
 * Base del PriorityQueue.
 *
 * Complexity:
 *   insert     O(log n)
 *   extractMin O(log n)
 *   peekMin    O(1)
 */
export class MinHeap<T> {
  private readonly heap: T[] = [];

  constructor(private readonly comparator: (a: T, b: T) => number) {}

  get size(): number    { return this.heap.length; }
  get isEmpty(): boolean { return this.heap.length === 0; }

  /** Devuelve el mínimo sin extraerlo. O(1) */
  peekMin(): T | undefined {
    return this.heap[0];
  }

  /** Inserta un elemento y reordena. O(log n) */
  insert(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  /** Extrae y devuelve el mínimo. O(log n) */
  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0] as T;
    const last = this.heap.pop() as T;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index] as T, this.heap[parent] as T) < 0) {
        this.swap(index, parent);
        index = parent;
      } else {
        break;
      }
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      const left  = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;

      if (left < length &&
        this.comparator(this.heap[left] as T, this.heap[smallest] as T) < 0) {
        smallest = left;
      }
      if (right < length &&
        this.comparator(this.heap[right] as T, this.heap[smallest] as T) < 0) {
        smallest = right;
      }
      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }

  private swap(i: number, j: number): void {
    const tmp     = this.heap[i] as T;
    this.heap[i]  = this.heap[j] as T;
    this.heap[j]  = tmp;
  }

  toArray(): T[] {
    return [...this.heap];
  }
}
