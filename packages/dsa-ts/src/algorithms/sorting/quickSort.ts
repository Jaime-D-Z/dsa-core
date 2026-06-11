/**
 * Quick Sort — O(n log n) promedio, O(n²) peor caso.
 * In-place. Pivote: mediana de tres para reducir worst case.
 */
export function quickSort<T>(
  arr: T[],
  comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0),
): T[] {
  const copy = [...arr];
  qs(copy, 0, copy.length - 1, comparator);
  return copy;
}

function qs<T>(arr: T[], lo: number, hi: number, cmp: (a: T, b: T) => number): void {
  if (lo >= hi) return;
  const p = partition(arr, lo, hi, cmp);
  qs(arr, lo, p - 1, cmp);
  qs(arr, p + 1, hi, cmp);
}

function partition<T>(arr: T[], lo: number, hi: number, cmp: (a: T, b: T) => number): number {
  // pivote: mediana de tres
  const mid = Math.floor((lo + hi) / 2);
  if (cmp(arr[mid] as T, arr[lo] as T) < 0) swap(arr, mid, lo);
  if (cmp(arr[hi]  as T, arr[lo] as T) < 0) swap(arr, hi,  lo);
  if (cmp(arr[mid] as T, arr[hi] as T) < 0) swap(arr, mid, hi);
  const pivot = arr[hi] as T;

  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (cmp(arr[j] as T, pivot) <= 0) {
      swap(arr, ++i, j);
    }
  }
  swap(arr, i + 1, hi);
  return i + 1;
}

function swap<T>(arr: T[], i: number, j: number): void {
  const tmp = arr[i] as T;
  arr[i] = arr[j] as T;
  arr[j] = tmp;
}
