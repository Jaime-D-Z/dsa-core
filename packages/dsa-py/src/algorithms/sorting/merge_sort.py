"""Merge Sort — O(n log n) en todos los casos. Estable."""
from typing import TypeVar, Callable, Protocol, cast

T = TypeVar("T")
Cmp = TypeVar("Cmp", bound="Comparable")


class Comparable(Protocol):
    def __le__(self, other: object, /) -> bool: ...


def merge_sort(
    arr: list[T],
    key: Callable[[T], Cmp] | None = None,
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
    key: Callable[[T], Cmp] | None,
) -> list[T]:
    result: list[T] = []
    i = j = 0
    def val(x: T) -> Cmp:
        return key(x) if key else cast(Cmp, x)

    while i < len(left) and j < len(right):
        if val(left[i]) <= val(right[j]):
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
