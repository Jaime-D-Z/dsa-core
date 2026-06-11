/**
 * Stack — LIFO (Last In, First Out)
 *
 * Complexity:
 *   push   O(1)
 *   pop    O(1)
 *   peek   O(1)
 *   size   O(1)
 */
export class Stack<T> {
  private readonly items: T[] = [];

  /** Agrega un elemento al tope. O(1) */
  push(item: T): void {
    this.items.push(item);
  }

  /** Retira y devuelve el elemento del tope. O(1) */
  pop(): T | undefined {
    return this.items.pop();
  }

  /** Devuelve el tope sin retirarlo. O(1) */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /** Cantidad de elementos. O(1) */
  get size(): number {
    return this.items.length;
  }

  /** True si no hay elementos. O(1) */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Elimina todos los elementos. O(1) */
  clear(): void {
    this.items.length = 0;
  }

  /** Itera de tope a fondo. */
  [Symbol.iterator](): Iterator<T> {
    let index = this.items.length - 1;
    const items = this.items;
    return {
      next(): IteratorResult<T> {
        if (index >= 0) {
          return { value: items[index--] as T, done: false };
        }
        return { value: undefined as unknown as T, done: true };
      },
    };
  }
}
