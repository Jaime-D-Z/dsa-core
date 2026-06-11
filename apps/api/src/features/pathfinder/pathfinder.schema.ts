import { z } from 'zod';

export const addNodeSchema = z.object({
  id: z.string().min(1).max(100),
});

export const addEdgeSchema = z.object({
  from:   z.string().min(1),
  to:     z.string().min(1),
  weight: z.number().positive().default(1),
});

export const pathQuerySchema = z.object({
  from:      z.string().min(1),
  to:        z.string().min(1),
  algorithm: z.enum(['bfs', 'dijkstra']).default('dijkstra'),
});

export const reachableSchema = z.object({
  from: z.string().min(1),
});
