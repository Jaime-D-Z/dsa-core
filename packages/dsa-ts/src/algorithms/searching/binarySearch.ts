/**
 * Binary Search — O(log n). El array DEBE estar ordenado.
 * @returns índice del elemento o -1 si no existe.
 */
export function binarySearch<T>(
  arr: T[],
  target: T,
  comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0),
): number {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = (left + right) >>> 1; // evita overflow
    const cmp = comparator(arr[mid] as T, target);
    if (cmp === 0) return mid;
    if (cmp < 0)   left  = mid + 1;
    else            right = mid - 1;
  }
  return -1;
}

/**
 * Linear Search — O(n). No requiere orden.
 * @returns índice del elemento o -1 si no existe.
 */
export function linearSearch<T>(arr: T[], target: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
