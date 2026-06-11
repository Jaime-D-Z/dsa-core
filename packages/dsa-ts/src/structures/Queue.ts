/**
 * Queue — FIFO (First In, First Out)
 *
 * Implementada con un índice de cabeza para evitar el O(n)
 * de Array.shift(). Enqueue y dequeue son O(1) amortizado.
 *
 * Complexity:
 *   enqueue  O(1)
 *   dequeue  O(1) amortizado
 *   front    O(1)
 *   size     O(1)
 */
export class Queue<T> {
  private readonly items: Record<number, T> = {};
  private headIndex = 0;
  private tailIndex = 0;

  /** Agrega un elemento al fondo. O(1) */
  enqueue(item: T): void {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  /** Retira y devuelve el elemento del frente. O(1) */
  dequeue(): T | undefined {
    if (this.isEmpty) return undefined;
    const item = this.items[this.headIndex];
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  /** Devuelve el frente sin retirarlo. O(1) */
  front(): T | undefined {
    return this.items[this.headIndex];
  }

  get size(): number {
    return this.tailIndex - this.headIndex;
  }

  get isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    for (let i = this.headIndex; i < this.tailIndex; i++) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.items[i];
    }
    this.headIndex = 0;
    this.tailIndex = 0;
  }
}
