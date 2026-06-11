/**
 * AnalyticsService
 *
 * Usa mergeSort, quickSort, binarySearch, linearSearch
 * de @structra/dsa-ts y expone benchmarks comparativos.
 */
import {
  mergeSort, quickSort,
  binarySearch, linearSearch,
} from '@structra/dsa-ts';

interface SortResult {
  algorithm:  string;
  complexity: string;
  stable:     boolean;
  sorted:     number[];
  elapsedMs:  number;
}

interface SearchResult {
  algorithm:  string;
  complexity: string;
  index:      number;
  found:      boolean;
  elapsedMs:  number;
}

export class AnalyticsService {

  sort(data: number[], algorithm: 'merge' | 'quick' | 'both'): SortResult[] {
    const results: SortResult[] = [];

    if (algorithm === 'merge' || algorithm === 'both') {
      const t0     = performance.now();
      const sorted = mergeSort(data);
      results.push({
        algorithm:  'Merge Sort',
        complexity: 'O(n log n) — todos los casos',
        stable:     true,
        sorted,
        elapsedMs:  +(performance.now() - t0).toFixed(4),
      });
    }

    if (algorithm === 'quick' || algorithm === 'both') {
      const t0     = performance.now();
      const sorted = quickSort(data);
      results.push({
        algorithm:  'Quick Sort',
        complexity: 'O(n log n) promedio — O(n²) peor caso',
        stable:     false,
        sorted,
        elapsedMs:  +(performance.now() - t0).toFixed(4),
      });
    }

    return results;
  }

  search(data: number[], target: number, algorithm: 'binary' | 'linear' | 'both'): SearchResult[] {
    const sorted  = [...data].sort((a, b) => a - b);
    const results: SearchResult[] = [];

    if (algorithm === 'binary' || algorithm === 'both') {
      const t0    = performance.now();
      const index = binarySearch(sorted, target);
      results.push({
        algorithm:  'Binary Search',
        complexity: 'O(log n) — requiere array ordenado',
        index,
        found:      index !== -1,
        elapsedMs:  +(performance.now() - t0).toFixed(4),
      });
    }

    if (algorithm === 'linear' || algorithm === 'both') {
      const t0    = performance.now();
      const index = linearSearch(data, target);
      results.push({
        algorithm:  'Linear Search',
        complexity: 'O(n) — no requiere orden',
        index,
        found:      index !== -1,
        elapsedMs:  +(performance.now() - t0).toFixed(4),
      });
    }

    return results;
  }

  benchmark(size: number) {
    // generar array aleatorio del tamaño pedido
    const data    = Array.from({ length: size }, () => Math.floor(Math.random() * size * 10));
    const target  = data[Math.floor(Math.random() * data.length)] ?? 0;

    // sorting benchmark
    const t1    = performance.now();
    mergeSort(data);
    const mergeMs = +(performance.now() - t1).toFixed(4);

    const t2    = performance.now();
    quickSort(data);
    const quickMs = +(performance.now() - t2).toFixed(4);

    // searching benchmark (sobre sorted)
    const sorted = mergeSort(data);

    const t3      = performance.now();
    binarySearch(sorted, target);
    const binMs   = +(performance.now() - t3).toFixed(4);

    const t4      = performance.now();
    linearSearch(data, target);
    const linMs   = +(performance.now() - t4).toFixed(4);

    return {
      inputSize: size,
      target,
      sorting: {
        mergeSort: { elapsedMs: mergeMs, complexity: 'O(n log n)', stable: true  },
        quickSort: { elapsedMs: quickMs, complexity: 'O(n log n) avg', stable: false },
        winner:    mergeMs <= quickMs ? 'mergeSort' : 'quickSort',
      },
      searching: {
        binarySearch: { elapsedMs: binMs, complexity: 'O(log n)', requiresSorted: true  },
        linearSearch: { elapsedMs: linMs, complexity: 'O(n)',     requiresSorted: false },
        speedup:      linMs > 0 ? +(linMs / Math.max(binMs, 0.0001)).toFixed(1) : null,
        note:         'Binary Search es O(log n) vs O(n). La diferencia crece con el tamaño.',
      },
    };
  }
}

export const analyticsService = new AnalyticsService();
