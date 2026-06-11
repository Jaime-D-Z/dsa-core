import { z } from 'zod';

export const setCacheSchema = z.object({
  key:   z.string().min(1).max(200),
  value: z.string(),
  ttlMs: z.number().positive().optional(),
});

export type SetCacheInput = z.infer<typeof setCacheSchema>;
