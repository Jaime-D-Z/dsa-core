"""
Binary Search — O(log n). Array DEBE estar ordenado.
"""
from typing import TypeVar

T = TypeVar("T")


def binary_search(arr: list[T], target: T) -> int:
    """Devuelve el índice o -1."""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) >> 1
        if arr[mid] == target:    return mid
        if arr[mid] < target:     left  = mid + 1  # type: ignore[operator]
        else:                     right = mid - 1
    return -1


def linear_search(arr: list[T], target: T) -> int:
    """O(n). No requiere orden."""
    for i, item in enumerate(arr):
        if item == target:
            return i
    return -1
