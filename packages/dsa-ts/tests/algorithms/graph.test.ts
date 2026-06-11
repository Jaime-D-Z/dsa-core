import { describe, it, expect } from 'vitest';
import { Graph }    from '../../src/structures/Graph.js';
import { bfs }      from '../../src/algorithms/graph/bfs.js';
import { dfs }      from '../../src/algorithms/graph/dfs.js';
import { dijkstra } from '../../src/algorithms/graph/dijkstra.js';

function buildGraph(): Graph {
  const g = new Graph();
  g.addUndirectedEdge('A', 'B', 4);
  g.addUndirectedEdge('A', 'C', 2);
  g.addUndirectedEdge('B', 'D', 5);
  g.addUndirectedEdge('C', 'D', 1);
  g.addUndirectedEdge('D', 'E', 3);
  return g;
}

describe('BFS', () => {
  it('encuentra camino existente', () => {
    const { path } = bfs(buildGraph(), 'A', 'E');
    expect(path).not.toBeNull();
    expect(path?.[0]).toBe('A');
    expect(path?.[path.length - 1]).toBe('E');
  });
  it('devuelve null si no hay ruta', () => {
    const g = new Graph();
    g.addNode('X'); g.addNode('Y');
    const { path } = bfs(g, 'X', 'Y');
    expect(path).toBeNull();
  });
});

describe('DFS', () => {
  it('visita todos los nodos alcanzables', () => {
    const { visited } = dfs(buildGraph(), 'A');
    expect(visited).toContain('E');
  });
  it('detecta ciclos', () => {
    const g = new Graph();
    g.addEdge('A', 'B'); g.addEdge('B', 'C'); g.addEdge('C', 'A');
    expect(dfs(g, 'A').hasCycle).toBe(true);
  });
});

describe('Dijkstra', () => {
  it('encuentra la distancia más corta', () => {
    const { distances } = dijkstra(buildGraph(), 'A');
    expect(distances.get('E')).toBe(6); // A→C(2)→D(1)→E(3)
  });
  it('construye el path correcto', () => {
    const { path } = dijkstra(buildGraph(), 'A', 'E');
    expect(path).toEqual(['A', 'C', 'D', 'E']);
  });
});
