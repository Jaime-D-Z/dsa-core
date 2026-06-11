"""
LRU Cache — O(1) en get, set y delete.
DoublyLinkedList + HashMap.
"""
from __future__ import annotations
from dataclasses import dataclass, field
from typing import Generic, TypeVar

K = TypeVar("K")
V = TypeVar("V")


@dataclass
class _Node(Generic[V]):
    key: str
    value: V
    prev: "_Node[V] | None" = field(default=None, repr=False)
    next: "_Node[V] | None" = field(default=None, repr=False)


class LRUCache(Generic[V]):
    """
    Args:
        capacity: número máximo de entradas
    """

    def __init__(self, capacity: int) -> None:
        if capacity <= 0:
            raise ValueError("capacity debe ser > 0")
        self._capacity = capacity
        self._map: dict[str, _Node[V]] = {}
        # sentinel head y tail para simplificar la lógica
        self._head: _Node[V] = _Node(key="__head__", value=None)  # type: ignore[arg-type]
        self._tail: _Node[V] = _Node(key="__tail__", value=None)  # type: ignore[arg-type]
        self._head.next = self._tail
        self._tail.prev = self._head
        self._hits   = 0
        self._misses = 0

    @property
    def size(self) -> int:
        return len(self._map)

    def get(self, key: str) -> V | None:
        """O(1)"""
        node = self._map.get(key)
        if node is None:
            self._misses += 1
            return None
        self._move_to_front(node)
        self._hits += 1
        return node.value

    def set(self, key: str, value: V) -> None:
        """O(1)"""
        if key in self._map:
            node = self._map[key]
            node.value = value
            self._move_to_front(node)
        else:
            if len(self._map) >= self._capacity:
                self._evict_lru()
            node = _Node(key=key, value=value)
            self._map[key] = node
            self._insert_front(node)

    def delete(self, key: str) -> bool:
        """O(1)"""
        node = self._map.pop(key, None)
        if node is None:
            return False
        self._remove_node(node)
        return True

    def stats(self) -> dict[str, int | float]:
        total = self._hits + self._misses
        return {
            "hits":    self._hits,
            "misses":  self._misses,
            "size":    self.size,
            "hit_rate": round(self._hits / total * 100) if total else 0,
        }

    def _insert_front(self, node: _Node[V]) -> None:
        node.prev = self._head
        node.next = self._head.next
        if self._head.next:
            self._head.next.prev = node
        self._head.next = node

    def _remove_node(self, node: _Node[V]) -> None:
        if node.prev:
            node.prev.next = node.next
        if node.next:
            node.next.prev = node.prev

    def _move_to_front(self, node: _Node[V]) -> None:
        self._remove_node(node)
        self._insert_front(node)

    def _evict_lru(self) -> None:
        lru = self._tail.prev
        if lru and lru is not self._head:
            self._remove_node(lru)
            del self._map[lru.key]
