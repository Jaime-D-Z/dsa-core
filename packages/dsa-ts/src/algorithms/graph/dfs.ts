import type { Graph } from '../../structures/Graph.js';

export interface DFSResult {
  visited: string[];
  hasCycle: boolean;
}

/**
 * Depth-First Search — O(V+E).
 * Detecta ciclos y explora en profundidad.
 */
export function dfs(graph: Graph, start: string): DFSResult {
  const visited   = new Set<string>();
  const inStack   = new Set<string>();
  const order:    string[] = [];
  let   hasCycle  = false;

  function explore(node: string): void {
    visited.add(node);
    inStack.add(node);
    order.push(node);

    for (const { to } of graph.neighbors(node)) {
      if (!visited.has(to)) {
        explore(to);
      } else if (inStack.has(to)) {
        hasCycle = true;
      }
    }
    inStack.delete(node);
  }

  if (graph.hasNode(start)) explore(start);
  return { visited: order, hasCycle };
}
