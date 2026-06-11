"""BFS — O(V+E). Camino más corto en grafos no ponderados."""
from collections import deque

Graph = dict[str, list[tuple[str, float]]]


def bfs(
    graph: Graph,
    start: str,
    target: str | None = None,
) -> dict[str, object]:
    if start not in graph:
        return {"visited": [], "path": None, "distance": -1}

    visited: list[str]          = []
    queue                        = deque([start])
    seen:    set[str]            = {start}
    parent:  dict[str, str | None] = {start: None}

    while queue:
        node = queue.popleft()
        visited.append(node)

        if node == target:
            return {
                "visited":  visited,
                "path":     _reconstruct(parent, target),
                "distance": len(visited) - 1,
            }

        for neighbor, _ in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                parent[neighbor] = node
                queue.append(neighbor)

    return {"visited": visited, "path": None, "distance": -1}


def _reconstruct(parent: dict[str, str | None], target: str) -> list[str]:
    path: list[str] = []
    current: str | None = target
    while current is not None:
        path.append(current)
        current = parent.get(current)
    return list(reversed(path))
