import { describe, it, expect } from 'vitest';
import { Queue } from '../../src/structures/Queue.js';

describe('Queue', () => {
  it('enqueue y dequeue FIFO', () => {
    const q = new Queue<number>();
    q.enqueue(1); q.enqueue(2); q.enqueue(3);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.size).toBe(1);
  });

  it('front no retira el elemento', () => {
    const q = new Queue<string>();
    q.enqueue('a');
    expect(q.front()).toBe('a');
    expect(q.size).toBe(1);
  });

  it('dequeue en cola vacía devuelve undefined', () => {
    const q = new Queue<number>();
    expect(q.dequeue()).toBeUndefined();
  });
});
