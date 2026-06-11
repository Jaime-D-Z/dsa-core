import { describe, it, expect } from 'vitest';
import { Stack } from '../../src/structures/Stack.js';

describe('Stack', () => {
  it('empieza vacío', () => {
    const s = new Stack<number>();
    expect(s.isEmpty).toBe(true);
    expect(s.size).toBe(0);
  });

  it('push y peek', () => {
    const s = new Stack<number>();
    s.push(1); s.push(2); s.push(3);
    expect(s.peek()).toBe(3);
    expect(s.size).toBe(3);
  });

  it('pop en orden LIFO', () => {
    const s = new Stack<number>();
    s.push(1); s.push(2); s.push(3);
    expect(s.pop()).toBe(3);
    expect(s.pop()).toBe(2);
    expect(s.pop()).toBe(1);
    expect(s.pop()).toBeUndefined();
  });

  it('itera de tope a fondo', () => {
    const s = new Stack<number>();
    [1, 2, 3].forEach(n => s.push(n));
    expect([...s]).toEqual([3, 2, 1]);
  });

  it('clear vacía el stack', () => {
    const s = new Stack<string>();
    s.push('a'); s.clear();
    expect(s.isEmpty).toBe(true);
  });
});
