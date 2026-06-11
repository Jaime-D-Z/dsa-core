"""
Min Heap — árbol binario completo donde padre ≤ hijos.

Complexity:
  insert      O(log n)
  extract_min O(log n)
  peek_min    O(1)
"""
from typing import Generic, TypeVar, Callable

T = TypeVar("T")


class MinHeap(Generic[T]):
    def __init__(self, comparator: Callable[[T, T], int] | None = None) -> None:
        self._heap: list[T] = []
        self._cmp  = comparator or (lambda a, b: -1 if a < b else (1 if a > b else 0))  # type: ignore[operator]

    @property
    def size(self) -> int:
        return len(self._heap)

    @property
    def is_empty(self) -> bool:
        return len(self._heap) == 0

    def peek_min(self) -> T | None:
        return self._heap[0] if self._heap else None

    def insert(self, value: T) -> None:
        self._heap.append(value)
        self._bubble_up(len(self._heap) - 1)

    def extract_min(self) -> T | None:
        if not self._heap:
            return None
        minimum = self._heap[0]
        last    = self._heap.pop()
        if self._heap:
            self._heap[0] = last
            self._sink_down(0)
        return minimum

    def _bubble_up(self, i: int) -> None:
        while i > 0:
            parent = (i - 1) // 2
            if self._cmp(self._heap[i], self._heap[parent]) < 0:
                self._heap[i], self._heap[parent] = self._heap[parent], self._heap[i]
                i = parent
            else:
                break

    def _sink_down(self, i: int) -> None:
        n = len(self._heap)
        while True:
            smallest = i
            for child in (2 * i + 1, 2 * i + 2):
                if child < n and self._cmp(self._heap[child], self._heap[smallest]) < 0:
                    smallest = child
            if smallest == i:
                break
            self._heap[i], self._heap[smallest] = self._heap[smallest], self._heap[i]
            i = smallest
