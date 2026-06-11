import { Router } from 'express';
import { analyticsService }  from './analytics.service.js';
import { sortSchema, searchSchema, benchmarkSchema } from './analytics.schema.js';

export const analyticsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Sorting & Searching — benchmarks comparativos en tiempo real
 */

/**
 * @swagger
 * /api/analytics/sort:
 *   post:
 *     tags: [Analytics]
 *     summary: Ordena un array y compara mergeSort vs quickSort
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [data]
 *             properties:
 *               data:      { type: array, items: { type: number }, example: [5,3,8,1,9,2] }
 *               algorithm: { type: string, enum: [merge, quick, both], default: both }
 */
analyticsRouter.post('/sort', (req, res, next) => {
  try {
    const { data, algorithm } = sortSchema.parse(req.body);
    const results = analyticsService.sort(data, algorithm);
    res.json({ inputSize: data.length, results });
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/analytics/search:
 *   post:
 *     tags: [Analytics]
 *     summary: Busca un target y compara binarySearch vs linearSearch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [data, target]
 *             properties:
 *               data:      { type: array, items: { type: number }, example: [1,3,5,7,9,11] }
 *               target:    { type: number, example: 7 }
 *               algorithm: { type: string, enum: [binary, linear, both], default: both }
 */
analyticsRouter.post('/search', (req, res, next) => {
  try {
    const { data, target, algorithm } = searchSchema.parse(req.body);
    const results = analyticsService.search(data, target, algorithm);
    res.json({ inputSize: data.length, target, results });
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/analytics/benchmark:
 *   post:
 *     tags: [Analytics]
 *     summary: Benchmark automático con dataset aleatorio — el más impresionante
 *     description: Genera un array random del tamaño pedido y corre todos los algoritmos, devolviendo tiempos de ejecución comparativos.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size: { type: integer, minimum: 100, maximum: 100000, default: 10000 }
 */
analyticsRouter.post('/benchmark', (req, res, next) => {
  try {
    const { size } = benchmarkSchema.parse(req.body);
    res.json(analyticsService.benchmark(size));
  } catch (e) { next(e); }
});
