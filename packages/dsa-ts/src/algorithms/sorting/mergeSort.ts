/**
 * Merge Sort — O(n log n) en todos los casos. Estable.
 * Divide y vencerás: divide el array, ordena cada mitad, fusiona.
 */
export function mergeSort<T>(
  arr: T[],
  comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0),
): T[] {
  if (arr.length <= 1) return arr;

  const mid   = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid), comparator);
  const right = mergeSort(arr.slice(mid), comparator);

  return merge(left, right, comparator);
}

function merge<T>(left: T[], right: T[], cmp: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (cmp(left[i] as T, right[j] as T) <= 0) {
      result.push(left[i++] as T);
    } else {
      result.push(right[j++] as T);
    }
  }
  while (i < left.length)  result.push(left[i++]  as T);
  while (j < right.length) result.push(right[j++] as T);
  return result;
}
