import { z } from 'zod';

const numberArray = z
  .array(z.number())
  .min(1)
  .max(100_000, { message: 'Máximo 100,000 elementos' });

export const sortSchema = z.object({
  data:      numberArray,
  algorithm: z.enum(['merge', 'quick', 'both']).default('both'),
});

export const searchSchema = z.object({
  data:      numberArray,
  target:    z.number(),
  algorithm: z.enum(['binary', 'linear', 'both']).default('both'),
});

export const benchmarkSchema = z.object({
  size: z.number().int().min(100).max(100_000).default(10_000),
});
