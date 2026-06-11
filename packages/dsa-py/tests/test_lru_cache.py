import pytest
from src.structures.lru_cache import LRUCache


def test_basic_get_set() -> None:
    cache: LRUCache[int] = LRUCache(3)
    cache.set("a", 1)
    cache.set("b", 2)
    assert cache.get("a") == 1
    assert cache.get("missing") is None


def test_evicts_lru() -> None:
    cache: LRUCache[int] = LRUCache(2)
    cache.set("a", 1)
    cache.set("b", 2)
    cache.get("a")      # 'a' se vuelve el más reciente
    cache.set("c", 3)   # 'b' es LRU → evictado
    assert cache.get("b") is None
    assert cache.get("a") == 1
    assert cache.get("c") == 3


def test_invalid_capacity() -> None:
    with pytest.raises(ValueError):
        LRUCache(0)


def test_stats() -> None:
    cache: LRUCache[int] = LRUCache(5)
    cache.set("k", 42)
    cache.get("k")          # hit
    cache.get("k")          # hit
    cache.get("missing")    # miss
    stats = cache.stats()
    assert stats["hits"]   == 2
    assert stats["misses"] == 1
    assert stats["hit_rate"] == 67
