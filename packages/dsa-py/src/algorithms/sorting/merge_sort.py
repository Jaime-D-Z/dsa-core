"""Merge Sort — O(n log n) en todos los casos. Estable."""
from typing import TypeVar, Callable

T = TypeVar("T")


def merge_sort(
    arr: list[T],
    key: Callable[[T], int | float | str] | None = None,
) -> list[T]:
    if len(arr) <= 1:
        return arr[:]

    mid   = len(arr) // 2
    left  = merge_sort(arr[:mid], key)
    right = merge_sort(arr[mid:], key)
    return _merge(left, right, key)


def _merge(
    left: list[T],
    right: list[T],
    key: Callable[[T], int | float | str] | None,
) -> list[T]:
    result: list[T] = []
    i = j = 0
    def val(x: T) -> int | float | str:
        return key(x) if key else x  # type: ignore[return-value]

    while i < len(left) and j < len(right):
        if val(left[i]) <= val(right[j]):
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
