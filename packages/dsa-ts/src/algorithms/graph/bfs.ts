import type { Graph } from '../../structures/Graph.js';

export interface BFSResult {
  visited:  string[];
  path:     string[] | null;   // null si no hay ruta
  distance: number;
}

/**
 * Breadth-First Search — O(V+E).
 * Encuentra el camino más corto en grafos no ponderados.
 */
export function bfs(graph: Graph, start: string, target?: string): BFSResult {
  if (!graph.hasNode(start)) return { visited: [], path: null, distance: -1 };

  const visited  = new Set<string>();
  const queue:   string[]            = [start];
  const parent   = new Map<string, string | null>([[start, null]]);
  const order:   string[]            = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift() as string;
    order.push(node);

    if (node === target) {
      return {
        visited:  order,
        path:     reconstructPath(parent, start, target),
        distance: order.length - 1,
      };
    }

    for (const { to } of graph.neighbors(node)) {
      if (!visited.has(to)) {
        visited.add(to);
        parent.set(to, node);
        queue.push(to);
      }
    }
  }

  return { visited: order, path: null, distance: -1 };
}

function reconstructPath(
  parent: Map<string, string | null>,
  _start: string,
  target: string,
): string[] {
  const path: string[] = [];
  let current: string | null | undefined = target;
  while (current !== null && current !== undefined) {
    path.unshift(current);
    current = parent.get(current);
  }
  return path;
}
