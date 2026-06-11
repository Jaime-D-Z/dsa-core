import { describe, it, expect } from 'vitest';
import { mergeSort, quickSort } from '../../src/algorithms/sorting/index.js';

const unsorted  = [5, 3, 8, 1, 9, 2, 7, 4, 6];
const expected  = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('mergeSort', () => {
  it('ordena correctamente', () => {
    expect(mergeSort(unsorted)).toEqual(expected);
  });
  it('no muta el array original', () => {
    const arr = [...unsorted];
    mergeSort(arr);
    expect(arr).toEqual(unsorted);
  });
  it('array vacío', () => expect(mergeSort([])).toEqual([]));
  it('un elemento', () => expect(mergeSort([42])).toEqual([42]));
});

describe('quickSort', () => {
  it('ordena correctamente', () => {
    expect(quickSort(unsorted)).toEqual(expected);
  });
  it('no muta el array original', () => {
    const arr = [...unsorted];
    quickSort(arr);
    expect(arr).toEqual(unsorted);
  });
});
