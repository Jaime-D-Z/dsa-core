/**
 * Directed Weighted Graph — lista de adyacencia.
 *
 * Complexity:
 *   addNode   O(1)
 *   addEdge   O(1)
 *   neighbors O(1)
 *   hasNode   O(1)
 */
export interface Edge {
  to:     string;
  weight: number;
}

export class Graph {
  private readonly adjacency = new Map<string, Edge[]>();

  /** Agrega un nodo. O(1) */
  addNode(node: string): void {
    if (!this.adjacency.has(node)) {
      this.adjacency.set(node, []);
    }
  }

  /**
   * Agrega una arista dirigida from → to con un peso.
   * Si los nodos no existen los crea automáticamente. O(1)
   */
  addEdge(from: string, to: string, weight = 1): void {
    this.addNode(from);
    this.addNode(to);
    const edges = this.adjacency.get(from) as Edge[];
    // evitar duplicados
    if (!edges.some(e => e.to === to)) {
      edges.push({ to, weight });
    }
  }

  /** Agrega arista en ambas direcciones (no dirigido). */
  addUndirectedEdge(a: string, b: string, weight = 1): void {
    this.addEdge(a, b, weight);
    this.addEdge(b, a, weight);
  }

  neighbors(node: string): Edge[] {
    return this.adjacency.get(node) ?? [];
  }

  hasNode(node: string): boolean {
    return this.adjacency.has(node);
  }

  get nodes(): string[] {
    return [...this.adjacency.keys()];
  }

  get size(): number {
    return this.adjacency.size;
  }
}
