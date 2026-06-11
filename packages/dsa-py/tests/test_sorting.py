from src.algorithms.sorting.merge_sort import merge_sort

UNSORTED = [5, 3, 8, 1, 9, 2, 7, 4, 6]
EXPECTED = [1, 2, 3, 4, 5, 6, 7, 8, 9]


def test_merge_sort() -> None:
    assert merge_sort(UNSORTED) == EXPECTED


def test_does_not_mutate() -> None:
    arr = list(UNSORTED)
    merge_sort(arr)
    assert arr == UNSORTED


def test_empty() -> None:
    assert merge_sort([]) == []


def test_single() -> None:
    assert merge_sort([42]) == [42]
