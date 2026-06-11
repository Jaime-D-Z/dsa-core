"""
Stack — LIFO (Last In, First Out)

Complexity:
  push   O(1)
  pop    O(1)
  peek   O(1)
"""
from typing import Generic, TypeVar

T = TypeVar("T")


class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        """Agrega un elemento al tope. O(1)"""
        self._items.append(item)

    def pop(self) -> T | None:
        """Retira y devuelve el elemento del tope. O(1)"""
        return self._items.pop() if self._items else None

    def peek(self) -> T | None:
        """Devuelve el tope sin retirarlo. O(1)"""
        return self._items[-1] if self._items else None

    @property
    def size(self) -> int:
        return len(self._items)

    @property
    def is_empty(self) -> bool:
        return len(self._items) == 0

    def clear(self) -> None:
        self._items.clear()
