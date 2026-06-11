/**
 * Doubly Linked List
 *
 * Complexity:
 *   prepend / append   O(1)
 *   removeHead / Tail  O(1)
 *   find               O(n)
 *   remove(node)       O(1)  — si tienes referencia al nodo
 */
export class ListNode<T> {
  value: T;
  prev: ListNode<T> | null = null;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  private _size = 0;

  get size(): number { return this._size; }
  get isEmpty(): boolean { return this._size === 0; }

  /** Inserta al inicio. O(1) */
  prepend(value: T): ListNode<T> {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next   = this.head;
      this.head.prev = node;
      this.head   = node;
    }
    this._size++;
    return node;
  }

  /** Inserta al final. O(1) */
  append(value: T): ListNode<T> {
    const node = new ListNode(value);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev   = this.tail;
      this.tail.next = node;
      this.tail   = node;
    }
    this._size++;
    return node;
  }

  /** Elimina el nodo del inicio. O(1) */
  removeHead(): T | undefined {
    if (this.head === null) return undefined;
    const val = this.head.value;
    this.remove(this.head);
    return val;
  }

  /** Elimina el nodo del final. O(1) */
  removeTail(): T | undefined {
    if (this.tail === null) return undefined;
    const val = this.tail.value;
    this.remove(this.tail);
    return val;
  }

  /** Elimina un nodo específico. O(1) — requiere referencia. */
  remove(node: ListNode<T>): void {
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    node.prev  = null;
    node.next  = null;
    this._size--;
  }

  /** Busca el primer nodo con el valor dado. O(n) */
  find(value: T): ListNode<T> | null {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}
