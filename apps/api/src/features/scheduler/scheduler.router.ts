import { Router } from 'express';
import { schedulerService } from './scheduler.service.js';
import { createTaskSchema  } from './scheduler.schema.js';
import { AppError }          from '../../shared/errors/AppError.js';

export const schedulerRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Scheduler
 *   description: Task Scheduler — Priority Queue sobre Min Heap (O(log n) enqueue/dequeue)
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags: [Scheduler]
 *     summary: Crea una tarea — O(log n) insert en Min Heap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, priority]
 *             properties:
 *               title:    { type: string, example: "Fix critical bug in prod" }
 *               priority: { type: integer, minimum: 1, maximum: 10, example: 1 }
 *               dueAt:    { type: string, format: date-time }
 *               tags:     { type: array, items: { type: string } }
 */
schedulerRouter.post('/', (req, res, next) => {
  try {
    const { title, priority, dueAt, tags } = createTaskSchema.parse(req.body);
    const task = schedulerService.create(title, priority, dueAt, tags);
    res.status(201).json(task);
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: [Scheduler]
 *     summary: Lista todas las tareas pendientes ordenadas por prioridad
 */
schedulerRouter.get('/', (_req, res) => {
  res.json({
    pending: schedulerService.listPending(),
    count:   schedulerService.pendingCount,
  });
});

/**
 * @swagger
 * /api/tasks/next:
 *   get:
 *     tags: [Scheduler]
 *     summary: Ve la siguiente tarea sin extraerla — O(1) peekMin
 */
schedulerRouter.get('/next', (_req, res, next) => {
  try {
    const task = schedulerService.peekNext();
    if (!task) throw new AppError(404, 'No hay tareas pendientes');
    res.json(task);
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/tasks/dequeue:
 *   post:
 *     tags: [Scheduler]
 *     summary: Extrae y completa la tarea de mayor prioridad — O(log n) extractMin
 */
schedulerRouter.post('/dequeue', (_req, res, next) => {
  try {
    const task = schedulerService.dequeueNext();
    if (!task) throw new AppError(404, 'No hay tareas pendientes');
    res.json({ message: 'Tarea completada', task });
  } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/tasks/done:
 *   get:
 *     tags: [Scheduler]
 *     summary: Lista tareas completadas
 */
schedulerRouter.get('/done', (_req, res) => {
  res.json({
    done:  schedulerService.listDone(),
    count: schedulerService.doneCount,
  });
});

/**
 * @swagger
 * /api/tasks/stats:
 *   get:
 *     tags: [Scheduler]
 *     summary: Estadísticas del scheduler
 */
schedulerRouter.get('/stats', (_req, res) => {
  res.json({
    pending: schedulerService.pendingCount,
    done:    schedulerService.doneCount,
    next:    schedulerService.peekNext(),
  });
});
