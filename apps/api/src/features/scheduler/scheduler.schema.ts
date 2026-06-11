import { z } from 'zod';

export const createTaskSchema = z.object({
  title:    z.string().min(1).max(300),
  priority: z.number().int().min(1).max(10,
    { message: 'priority debe ser entre 1 (más urgente) y 10 (menos urgente)' }),
  dueAt:    z.string().datetime({ message: 'dueAt debe ser ISO 8601' }).optional(),
  tags:     z.array(z.string()).max(5).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
