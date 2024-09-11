# Bucket Sort

## Concept

- can only be used with relatively small ranges (i.e. the values in the array must be in that small range)
- use a second "counting" array with a size of the the number of values in the range. Initialize it with 0
- each element in *counting* array represents the count of the corresponding value
- iterate through the initial array and count up the number of instances
- rebuild the sorted array

## About

- there is no swapping that takes place either so it is unstable

## Time Complexity

$$
O(n)
$$

