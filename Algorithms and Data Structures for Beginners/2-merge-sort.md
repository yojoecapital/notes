# Merge Sort

## Concept

- usually done recursively using divide and conquer
  1. the base case is that there is one element in the array. It's already sorted so just return
  2. split the array in 2 halves
  3. use **merge sort** recursively on both halves so that they're *sorted*
  4. **merge** the halves
- what does **merge** do? 
  1. it takes 2 *sorted* arrays `a` and `b`
  2. it iterates through both arrays and merges them in sorted order 

## About

- merge sort is stable so long as `merge` preserves the relative ordering by using the condition
  - `while ai < len(a) and bi <= len(b)`

## Time Complexity

$$
O(n\log n)
$$

- think of it as "how many times can we divide $n$ by 2 until we hit the base case"
- so $n/2^x = 1$ where the height of our binary tree is $x = \log n$ 
- at each level, we use `merge` which is $O(n)$ giving `mergeSort` $O(n\log n)$
