import pytest
from src.structures.stack import Stack


def test_empty_stack() -> None:
    s: Stack[int] = Stack()
    assert s.is_empty
    assert s.size == 0


def test_push_peek() -> None:
    s: Stack[int] = Stack()
    s.push(1); s.push(2); s.push(3)
    assert s.peek() == 3
    assert s.size == 3


def test_pop_lifo() -> None:
    s: Stack[int] = Stack()
    s.push(1); s.push(2); s.push(3)
    assert s.pop() == 3
    assert s.pop() == 2
    assert s.pop() == 1
    assert s.pop() is None


def test_clear() -> None:
    s: Stack[str] = Stack()
    s.push("a"); s.clear()
    assert s.is_empty
