import { Router } from 'express';
import { pathfinderService }                         from './pathfinder.service.js';
import { addNodeSchema, addEdgeSchema, pathQuerySchema, reachableSchema } from './pathfinder.schema.js';
import { AppError } from '../../shared/errors/AppError.js';

export const pathfinderRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Pathfinder
 *   description: Graph Pathfinder — BFS O(V+E) y Dijkstra O((V+E) log V)
 */

/**
 * @swagger
 * /api/graph:
 *   get:
 *     tags: [Pathfinder]
 *     summary: Ver todos los nodos y aristas del grafo
 */
pathfinderRouter.get('/', (_req, res) => {
  res.json(pathfinderService.getGraph());
});

/**
 * @swagger
 * /api/graph/nodes:
 *   post:
 *     tags: [Pathfinder]
 *     summary: Agrega un nodo — O(1)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id: { type: string, example: "Cusco" }
 */
pathfinderRouter.post('/nodes', (req, res, next) => {
  try {
    const { id } = addNodeSchema.parse(req.body);
    pathfinderService.addNode(id);
    res.status(201).json({ message: `Nodo "${id}" agregado`, graph: pathfinderService.getGraph() });
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/graph/edges:
 *   post:
 *     tags: [Pathfinder]
 *     summary: Agrega una arista dirigida con peso — O(1)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [from, to]
 *             properties:
 *               from:      { type: string, example: "Lima" }
 *               to:        { type: string, example: "Arequipa" }
 *               weight:    { type: number, example: 1009 }
 *               undirected: { type: boolean, default: false }
 */
pathfinderRouter.post('/edges', (req, res, next) => {
  try {
    const { from, to, weight } = addEdgeSchema.parse(req.body);
    const undirected = req.body.undirected === true;
    pathfinderService.addEdge(from, to, weight, undirected);
    res.status(201).json({ message: `Arista ${from} → ${to} (peso: ${weight}) agregada` });
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/graph/path:
 *   get:
 *     tags: [Pathfinder]
 *     summary: Encuentra el camino más corto entre dos nodos
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema: { type: string }
 *         example: Lima
 *       - in: query
 *         name: to
 *         required: true
 *         schema: { type: string }
 *         example: Cusco
 *       - in: query
 *         name: algorithm
 *         schema: { type: string, enum: [bfs, dijkstra] }
 *         description: bfs = camino por saltos, dijkstra = camino por peso
 */
pathfinderRouter.get('/path', (req, res, next) => {
  try {
    const { from, to, algorithm } = pathQuerySchema.parse(req.query);
    const result = pathfinderService.findPath(from, to, algorithm);
    if (!result.path) throw new AppError(404, `No existe ruta de "${from}" a "${to}"`);
    res.json(result);
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/graph/reachable:
 *   get:
 *     tags: [Pathfinder]
 *     summary: Todos los nodos alcanzables desde un origen — DFS O(V+E)
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema: { type: string }
 *         example: Lima
 */
pathfinderRouter.get('/reachable', (req, res, next) => {
  try {
    const { from } = reachableSchema.parse(req.query);
    res.json(pathfinderService.reachableFrom(from));
  } catch (e) { next(e); }
});
