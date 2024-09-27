# Homework 1

Yousef Suleiman | Due: Jan 23

## Question 1

$$
42n \text{ lg } n < 6n^2 \\
42(1) \text{ lg } (1) = 0 < 6(1)^2  = 6 \\
42(2) \text{ lg } (2) = 84 \cancel < 6(2)^2  = 24 \\
42(10) \text{ lg } (10) = 1395.5 \cancel < 6(10)^2  = 600 \\
42(20) \text{ lg } (20) = 3630.4 \cancel < 6(20)^2  = 2400 \\
42(30) \text{ lg } (30) = 6182.7 \cancel < 6(30)^2  = 5400 \\
42(40) \text{ lg } (40) = 8940.8 < 6(40)^2  = 9600 \\
$$

Excluding $n=1$, the inequality doesn't hold until $n$ is more than some value between $30$ and $40$. 
$$
42(35) \text{ lg } (35) = 7540 \cancel < 6(35)^2  = 7350 \\
42(37) \text{ lg } (37) = 8095.5 < 6(37)^2  = 8214 \\
42(36) \text{ lg } (36) = 7816.9 \cancel < 6(36)^2  = 7776 \\
$$
The inequality doesn't hold for values of $n$ in $[1, 36]$ meaning insertion sort beats merge sort for input sizes between 1 and 36.

## Question 2

### (1)

`count` will increment as follows:
$$
\text{count}: [1, 1*3, 3^2, 3^3, 3^4, ..., 3^k]
$$
where $3^k \ge n$ and $k$ would be the number of times the statement is executed.
$$
k = \log_3n \\
T(n) = O(\log_3n)
$$

### (2)

For this problem, I am going to assume the initial assignment is `j = 1` as `j = 0` will result in an infinite loop.

Focusing on the inner loop, `j` will increment as follows:
$$
j: [1, 1*2, 2^2, 3^3, ..., 2^k]
$$
where $2^k \ge n$ and $k = \text{ lg } n$ such that the inner loop has a time complexity of $O(\text{ lg } n)$. The outer loop will have a time complexity of $O(n * \text{ lg } n)$ as it runs the inner loop $n$​ times.
$$
T(n) = O(n \text{ lg } n)
$$


### (3) 

The inner loop can only execute once each iteration of the outer loop as the initial value of `j = i` and the condition is `j <= i` so when `j++` is executed, the inner loop breaks after its first iteration.

The outer loops iterates $O(n)$
$$
T(n) = O(n)
$$

## Question 3

|              | $n$      | $n^2$    | $2^n$    |
| ------------ | -------- | -------- | -------- |
| $n^n$        | $\Omega$ | $\Omega$ | $\Omega$ |
| $n \log n^4$ | $\Omega$ | $O$      | $O$      |
| $(n-2)!$     | $\Omega$ | $\Omega$ | $\Omega$ |
| $2^{\log n}$ | $O$      | $O$      | $O$      |

### Explanation 

- $n^n$ grows faster than all 3
- $n \log n^4$ grows faster than only $n$
- $(n-2)!$ grows faster than all 3
- $2^{\log n}$ grows slower than all 3

## Question 4

```pseudocode
Merge(A, p, q, r)
	n1 = q - p + 1
	n2 = r - q
	let L[1 .. n1] and R[1 .. n2] be new arrays
	
	/* copy A subarrays to L and R */
	for i = 1 to n1
		L[i] = A[p + i - 1]
    for j = 1 to n2
    	R[j] = A[q + j]
    
    /* compare into A */
    l = 1
    r = 1
    a = 1
    while l < length(L) and r < length(B)
    	if L[l] < R[r]
    		A[a] = L[l]
    		l++
        else
        	A[a] = R[r]
        	r++
        a++
        
    /* this will only run if either L or R have any left */
    while l < length(L)
        A[a] = L[l]
        l++
        a++
    while r < length(R)
        A[a] = R[r]
        r++
        a++
```

