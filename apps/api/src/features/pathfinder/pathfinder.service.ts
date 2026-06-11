/**
 * PathfinderService
 *
 * Usa Graph + BFS + DFS + Dijkstra de @structra/dsa-ts.
 *
 * Complexity:
 *   addNode / addEdge  O(1)
 *   BFS / DFS          O(V+E)
 *   Dijkstra           O((V+E) log V)
 */
import { Graph, bfs, dfs, dijkstra } from '@structra/dsa-ts';
import { AppError } from '../../shared/errors/AppError.js';

export class PathfinderService {
  private readonly graph = new Graph();

  addNode(id: string): void {
    this.graph.addNode(id);
  }

  addEdge(from: string, to: string, weight: number, undirected = false): void {
    if (undirected) {
      this.graph.addUndirectedEdge(from, to, weight);
    } else {
      this.graph.addEdge(from, to, weight);
    }
  }

  findPath(from: string, to: string, algorithm: 'bfs' | 'dijkstra') {
    if (!this.graph.hasNode(from)) throw new AppError(404, `Nodo "${from}" no existe`);
    if (!this.graph.hasNode(to))   throw new AppError(404, `Nodo "${to}" no existe`);

    const start = performance.now();

    if (algorithm === 'bfs') {
      const result   = bfs(this.graph, from, to);
      const elapsed  = performance.now() - start;
      return {
        algorithm:   'BFS',
        complexity:  'O(V+E)',
        note:        'Camino más corto por número de saltos (no por peso)',
        path:        result.path,
        hops:        result.path ? result.path.length - 1 : null,
        visitedNodes: result.visited.length,
        elapsedMs:   +elapsed.toFixed(4),
      };
    }

    const result  = dijkstra(this.graph, from, to);
    const elapsed = performance.now() - start;
    const dist    = result.distances.get(to);
    return {
      algorithm:    'Dijkstra',
      complexity:   'O((V+E) log V)',
      note:         'Camino más corto por peso acumulado',
      path:         result.path,
      totalWeight:  dist === Infinity ? null : dist,
      visitedNodes: result.distances.size,
      elapsedMs:    +elapsed.toFixed(4),
    };
  }

  reachableFrom(from: string) {
    if (!this.graph.hasNode(from)) throw new AppError(404, `Nodo "${from}" no existe`);
    const result = dfs(this.graph, from);
    return {
      from,
      reachable: result.visited,
      count:     result.visited.length,
      hasCycle:  result.hasCycle,
    };
  }

  getGraph() {
    return {
      nodes: this.graph.nodes,
      nodeCount: this.graph.size,
      edges: this.graph.nodes.flatMap(n =>
        this.graph.neighbors(n).map(e => ({ from: n, to: e.to, weight: e.weight }))
      ),
    };
  }

  reset(): void {
    // reemplazar instancia
    Object.assign(this, { graph: new Graph() });
  }
}

export const pathfinderService = new PathfinderService();

// seed de ejemplo al arrancar
pathfinderService.addEdge('Lima',     'Arequipa', 1009, true);
pathfinderService.addEdge('Lima',     'Trujillo',  557, true);
pathfinderService.addEdge('Arequipa', 'Cusco',     521, true);
pathfinderService.addEdge('Trujillo', 'Piura',     280, true);
pathfinderService.addEdge('Cusco',    'Puno',      390, true);
pathfinderService.addEdge('Lima',     'Ica',       306, true);
