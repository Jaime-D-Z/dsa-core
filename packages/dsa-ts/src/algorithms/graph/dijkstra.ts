import { MinHeap } from '../../structures/MinHeap.js';
import type { Graph } from '../../structures/Graph.js';

export interface DijkstraResult {
  distances: Map<string, number>;
  path:      string[] | null;
}

interface HeapItem {
  node:     string;
  distance: number;
}

/**
 * Dijkstra — O((V+E) log V).
 * Camino más corto en grafos con pesos no negativos.
 */
export function dijkstra(graph: Graph, start: string, target?: string): DijkstraResult {
  const distances = new Map<string, number>();
  const previous  = new Map<string, string | null>();
  const heap      = new MinHeap<HeapItem>((a, b) => a.distance - b.distance);

  for (const node of graph.nodes) {
    distances.set(node, Infinity);
    previous.set(node, null);
  }
  distances.set(start, 0);
  heap.insert({ node: start, distance: 0 });

  while (!heap.isEmpty) {
    const { node, distance } = heap.extractMin() as HeapItem;
    if (distance > (distances.get(node) ?? Infinity)) continue;

    for (const edge of graph.neighbors(node)) {
      const newDist = distance + edge.weight;
      if (newDist < (distances.get(edge.to) ?? Infinity)) {
        distances.set(edge.to, newDist);
        previous.set(edge.to, node);
        heap.insert({ node: edge.to, distance: newDist });
      }
    }
  }

  const path = target !== undefined ? buildPath(previous, start, target) : null;
  return { distances, path };
}

function buildPath(
  previous:  Map<string, string | null>,
  _start:    string,
  target:    string,
): string[] | null {
  const path: string[] = [];
  let current: string | null | undefined = target;
  while (current !== null && current !== undefined) {
    path.unshift(current);
    current = previous.get(current);
  }
  return path.length > 0 ? path : null;
}
