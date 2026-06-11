import { Router } from 'express';
import { cacheService } from './cache.service.js';
import { setCacheSchema } from './cache.schema.js';
import { AppError } from '../../shared/errors/AppError.js';

export const cacheRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Cache
 *   description: LRU Cache — DoublyLinkedList + HashMap (O(1) todas las ops)
 */

/**
 * @swagger
 * /api/cache/stats:
 *   get:
 *     tags: [Cache]
 *     summary: Estadísticas del cache
 *     responses:
 *       200:
 *         description: hits, misses, size, hitRate, capacity
 */
cacheRouter.get('/stats', (_req, res) => {
  res.json(cacheService.stats());
});

/**
 * @swagger
 * /api/cache/{key}:
 *   get:
 *     tags: [Cache]
 *     summary: Obtiene un valor — O(1) y lo mueve al frente del LRU
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Valor encontrado
 *       404:
 *         description: Key no encontrada o expirada
 */
cacheRouter.get('/:key', (req, res, next) => {
  try {
    const { found, value } = cacheService.get(req.params['key']!);
    if (!found) throw new AppError(404, `Key "${req.params['key']}" not found or expired`);
    res.json({ key: req.params['key'], value });
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/cache:
 *   post:
 *     tags: [Cache]
 *     summary: Inserta un valor — O(1), evicta el LRU si está lleno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key, value]
 *             properties:
 *               key:   { type: string, example: "user:123" }
 *               value: { type: string, example: '{"name":"Jaime"}' }
 *               ttlMs: { type: number, example: 30000, description: "TTL en ms (opcional)" }
 */
cacheRouter.post('/', (req, res, next) => {
  try {
    const { key, value, ttlMs } = setCacheSchema.parse(req.body);
    cacheService.set(key, value, ttlMs);
    res.status(201).json({ key, value, ttlMs: ttlMs ?? null, cached: true });
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/cache/{key}:
 *   delete:
 *     tags: [Cache]
 *     summary: Elimina una key — O(1)
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Eliminado
 *       404:
 *         description: Key no encontrada
 */
cacheRouter.delete('/:key', (req, res, next) => {
  try {
    const deleted = cacheService.delete(req.params['key']!);
    if (!deleted) throw new AppError(404, `Key "${req.params['key']}" not found`);
    res.status(204).send();
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/cache:
 *   delete:
 *     tags: [Cache]
 *     summary: Vacía el cache completo
 *     responses:
 *       204:
 *         description: Cache vaciado
 */
cacheRouter.delete('/', (_req, res) => {
  cacheService.clear();
  res.status(204).send();
});
