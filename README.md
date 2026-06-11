# structra

> Data Structures & Algorithms — TypeScript · Python · REST API

![CI TypeScript](https://github.com/Jaime-D-Z/structra/actions/workflows/ci-ts.yml/badge.svg)
![CI Python](https://github.com/Jaime-D-Z/structra/actions/workflows/ci-py.yml/badge.svg)

Mono-repo que implementa estructuras de datos y algoritmos clásicos desde cero,
exponiéndolos en una API REST real con Swagger docs.

---

## Estructura

```
structra/
├── packages/
│   ├── dsa-ts/     # Librería TypeScript — estructuras + algoritmos
│   └── dsa-py/     # Librería Python     — estructuras + algoritmos
└── apps/
    └── api/        # REST API (Express) que usa dsa-ts internamente
```

## Estructuras implementadas

| Estructura         | Complejidad acceso | Inserción | Eliminación | Notas                   |
| ------------------ | ------------------ | --------- | ----------- | ----------------------- |
| Stack              | O(n)               | O(1)      | O(1)        | LIFO                    |
| Queue              | O(n)               | O(1)      | O(1)        | FIFO                    |
| Linked List        | O(n)               | O(1)      | O(1)\*      | \*con referencia        |
| Hash Map           | O(1) avg           | O(1) avg  | O(1) avg    | colisiones con chaining |
| Binary Search Tree | O(log n) avg       | O(log n)  | O(log n)    | O(n) worst case         |
| Min Heap           | O(1) min           | O(log n)  | O(log n)    | base del Priority Queue |
| Priority Queue     | O(1) min           | O(log n)  | O(log n)    | sobre Min Heap          |
| LRU Cache          | O(1)               | O(1)      | O(1)        | DLL + HashMap           |
| Graph              | O(V+E)             | O(1)      | O(V+E)      | lista de adyacencia     |

## Algoritmos implementados

| Algoritmo     | Complejidad tiempo | Espacio  | Estable |
| ------------- | ------------------ | -------- | ------- |
| Merge Sort    | O(n log n)         | O(n)     | ✅      |
| Quick Sort    | O(n log n) avg     | O(log n) | ❌      |
| Binary Search | O(log n)           | O(1)     | —       |
| BFS           | O(V+E)             | O(V)     | —       |
| DFS           | O(V+E)             | O(V)     | —       |
| Dijkstra      | O((V+E) log V)     | O(V)     | —       |

## Levantar la API

```bash
# con Docker (recomendado)
docker-compose up

# sin Docker
pnpm install
pnpm build
pnpm --filter @structra/api dev
```

Swagger UI disponible en: `http://localhost:3000/api/docs`

## Endpoints

| Módulo       | Descripción                                    | Estructura interna                 |
| ------------ | ---------------------------------------------- | ---------------------------------- |
| `/cache`     | LRU Cache con TTL y estadísticas               | LRUCache                           |
| `/tasks`     | Scheduler con prioridades                      | PriorityQueue                      |
| `/graph`     | Pathfinder con BFS y Dijkstra                  | Graph                              |
| `/analytics` | Benchmark de algoritmos de sorting y searching | mergeSort, quickSort, binarySearch |

## Correr tests

```bash
# TypeScript
pnpm test:ts

# Python
pnpm test:py

# Todo
pnpm test
```

## Tech stack

- **Mono-repo**: pnpm workspaces + Turborepo
- **TypeScript**: tsup + Vitest
- **Python**: pytest + mypy
- **API**: Express + Zod + Swagger UI
- **CI/CD**: GitHub Actions
- **Container**: Docker + docker-compose
