/**
 * Binary Search Tree
 *
 * Invariant: left.value < node.value < right.value
 *
 * Complexity (árbol balanceado):
 *   insert  O(log n)
 *   search  O(log n)
 *   delete  O(log n)
 *   inOrder O(n)
 */
interface BSTNode<T> {
  value: T;
  left:  BSTNode<T> | null;
  right: BSTNode<T> | null;
}

export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;
  private _size = 0;

  get size(): number { return this._size; }

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  /** Recorrido en orden — devuelve los valores de menor a mayor. */
  inOrder(): T[] {
    const result: T[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  min(): T | null {
    if (this.root === null) return null;
    let node = this.root;
    while (node.left !== null) node = node.left;
    return node.value;
  }

  max(): T | null {
    if (this.root === null) return null;
    let node = this.root;
    while (node.right !== null) node = node.right;
    return node.value;
  }

  private insertNode(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if (node === null) {
      this._size++;
      return { value, left: null, right: null };
    }
    if (value < node.value)      node.left  = this.insertNode(node.left, value);
    else if (value > node.value) node.right = this.insertNode(node.right, value);
    return node;
  }

  private searchNode(node: BSTNode<T> | null, value: T): boolean {
    if (node === null)        return false;
    if (value === node.value) return true;
    if (value < node.value)   return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  private deleteNode(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (node === null) return null;
    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      this._size--;
      if (node.left === null)  return node.right;
      if (node.right === null) return node.left;
      // reemplazar con el mínimo del subárbol derecho
      let minNode = node.right;
      while (minNode.left !== null) minNode = minNode.left;
      node.value = minNode.value;
      node.right = this.deleteNode(node.right, minNode.value);
      this._size++; // compensar el decremento interno
    }
    return node;
  }

  private inOrderTraversal(node: BSTNode<T> | null, result: T[]): void {
    if (node === null) return;
    this.inOrderTraversal(node.left, result);
    result.push(node.value);
    this.inOrderTraversal(node.right, result);
  }
}
