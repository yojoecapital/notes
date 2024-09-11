# Binary Search

## Concept

- the array must be sorted
- starting with `left = 0` and `right = len(array) - 1`, calculate `mid` as their average
  1. while `left <= mid`
  2. if `array[mid] == target` then return `mid`
  3. else if `array[mid] < target`, search the left subarray (`left = mid + 1`)
  4. else search the right subarray (`right = mid - 1`)

## Time Complexity

$$
O(\log n)
$$

