# Recursion

## Iteration

### Basics

```haskell
-- a classic!
factorial :: Integer -> Integer
factorial 1 = 1
factorial n = traceShow n (n * factorial (n - 1))
-- sum up the elements of a list
sumList :: (Show a, Num a) => [a] -> a
sumList [] = 0
sumList (x:xs) = x + sumList xs
-- we pick off the first element of the list and add it to whatever sumList returns next
```

Notice that we do the work on the way out of the recursion

```haskell
sumList 1:2:3:[]
1 + sumList 2:3:[]
1 + (2 + sumList 3:[])
1 + (2 + (3 + sumList []))
1 + (2 + (3 + 0))
1 + (2 + 3)
1 + 5
6
```

### Iterate over lists in parallel

```haskell
-- sometimes we iterate over lists in parallel
weightedSum :: (Show a, Num a) => [a] -> [a] -> a
weightedSum [] [] = 0
weightedSum (v:vs) (w:ws) = v*w + weightedSum vs ws
-- sometimes we process more than one "item" at a time
-- with swapLetters we swap all adjacent letters as "howdy" -> "ohdwy"
swapLetters :: String -> String
swapLetters "" = ""
swapLetters [x] = [x]
swapLetters (x1:x2:xs) = x2 : x1 : swapLetters xs
-- implement this using append (++)
cycle' :: [a] -> [a]
cycle' l = l ++ cycle' l
-- without using (++) - is this more efficient?
cycle'' :: [a] -> [a]
cycle'' l = cyc l 
    where cyc [] = cyc l
          cyc (x:xs) = x : cyc xs
-- we use a helper function to hold onto the original value of the list
```

Fibonacci sequence

```haskell
-- we'll need to pass values into subsequent iterations to track progress
fibs :: [Integer]
fibs = f 0 1
  where f f0 f1 = f0 : f f1 (f0 + f1)
-- if we trace it we can see
fibs = f 0 1
f 0 1 = 0 : f 1 1
		0 : 1 : f 1 2
		0 : 1 : 1 : f 2 3
		0 : 1 : 1 : 2 : f 3 5
```

### Filtering

Filtering is the process of iterating over a list and processing only those elements that satisfy a given condition. 

```haskell
-- sum only the positive numbers in a list
sumPositives :: Integral a => [a] -> a
sumPositives [] = 0
sumPositives (x:xs) = (if x > 0 then x else 0) + sumPositives xs
-- palindromes are strings that read the same forwards as backwards
-- given a list of strings, return a list of all the palindroms in the list
palindromes :: [String] -> [String]
palindromes [] = []
palindromes (w:ws) | w == reverse w = w : palindromes ws
                   | otherwise = palindromes ws
```

Another way of doing palindromes using `if-then-else` syntax is

```haskell
palindromes :: [String] -> [String]
palindromes [] = []
palindromes (w:ws) = (if w == reverse w then (w:) else id) (palindromes ws)
```

- where the `if-then-else` expression returns a functions; either `(w:)` or the identity function `id`
- this gets applied to `(palindromes ws)`

## Combinations and Permutations

Combinations and permutations are classic problems in combinatorics that arise in many different problems.

### Combinations

Given the list $[1, 2, 3]$, the combinations include
$$
[[1, 2, 3],[1, 2], [1,3],[1], [2, 3], [2], [3], []]
$$
where the number of combinations should be $2^n$

```haskell
-- generate all combinations (order doesn't matter -- how many are there?)
combinations :: [a] -> [[a]]
combinations [] = [[]]
combinations (x:xs) = [ x:ys | ys <- combinations xs ] ++ combinations xs
```

- where we half of the combinations are composed of the first element combined with the combinations of all other elements

```haskell
-- generate all combinations of a given size (nCr = n!/(r!(n-r)!))
-- for example, cominations' 3 [1..5] should return all the 3 itemed cominations in [1,2,3,4,5]
combinations' :: Int -> [a] -> [[a]]
combinations' 0 _ = [[]] -- we reached the max amount of combinations requested
combinations' _ [] = []  -- we have no more possible combinations to return
combinations' n (x:xs) = [ x:ys | ys <- combinations' (n-1) xs ] ++ combinations' n xs
```

#### Some applications

###### `change`

```haskell
-- the "making change" problem
-- how many ways can we make up 17 cents given available denominations?
change :: (Ord a, Num a) => a -> [a] -> [[a]]
change 0 _ = [[]]
-- how many ways can we make change for 0 cents?
-- the answer is 1 way which is []
change _ [] = []
-- how many ways can we make change for x cents with no denomations?
-- the answer is 0 ways
change amt den@(d:ds)
      | amt < d = change amt ds
      -- this denomination is larger than the amount
      | otherwise = [d:es | es <- change (amt - d) den ] ++ change amt ds
```

###### `knapsack` and `knapsack'`

Note that the knapsack problem is particular difficult because there is no greedy solution

```haskell
-- the knapsack problem: given a list of items (value,weight) and a weight 
-- capacity, find the maximum value that can be carried
knapsack :: (Ord a, Num a) => a -> [(a,a)] -> a
knapsack _ [] = 0
knapsack wcap ((v, w): is)
  | w > wcap = knapsack wcap is
  | otherwise = max (v + knapsack (wcap - w) is) (knapsack wcap is)

-- find the actual set of items that maximizes value (under the weight cap)
knapsack' :: (Ord a, Num a) => a -> [(a,a)] -> [(a,a)]
knapsack' _ [] = []
knapsack' wcap ((v, w): is)
  | w > wcap = knapsack' wcap is
  | otherwise = let r1 = knapsack' (wcap - w) is
                    r2 = knapsack' wcap is
                in if v + value r1 > value r2 then (v,w):r1 else r2
        where value [] = 0
              value ((v,w):is) = v + value is
```

### Permutations

...

## Divide and Conquer

...

Look at `Lect06.lhs` to finish notes

## Tail recursion and Accumulation

- **Tail recursion** is a special case of recursion where the recursive call is the last thing done in the function
- In non-lazy languages, it is important because it allows the compiler to optimize the code because it doesn't need a stack frame
- In Haskell (and other lazy languages), tail recursion does *not* quite have the same importance, but it is still a useful technique. 

- **Accumulation** is a technique for solving problems by passing an extra parameter to the recursive call that accumulates the solution.

```haskell
-- are all elements even?
allEven :: [Integer] -> Bool
allEven [] = True
allEven (x:xs) | even x = allEven xs
               | otherwise = False
-- utilizing short circuit
--allEven (x:xs) = even x && allEven xs
```

```haskell
-- tail recursive factorial with explicit accumulator
factorial' :: Integer -> Integer -> Integer
factorial' 1 acc = acc
factorial' n acc = factorial' (n-1) (acc * n)
-- tail recursive factorial with hidden accumulator
factorial'' :: Integer -> Integer
factorial'' n = f 1 1
    where f m r | m == n = r * n
                | otherwise = f (m+1) (r*m)
```

- tail end recursion in Haskell actually passes down `(1 * 2 * ... * acc)` instead of evaluating it as Haskell is lazy  

```haskell
-- reverse a list using an accumulator
reverse' ::Show a => [a] -> [a]
reverse' l = rev l []
      where rev [] r = r
            rev (x:xs) r = traceShow r (rev xs (x:r))
```

```haskell
enumFromTo' :: Integer -> Integer -> [Integer]
enumFromTo' n m | m > n = []
                | m == n = [m]
                | otherwise = m : enumFromTo' (m+1) n
-- enumerate the integers from m to n (with an accumulator)
enumFromTo'' :: Integer -> Integer -> [Integer]
enumFromTo'' m n = eft m []
  where eft i r | i == n = reverse (n : r)
                | otherwise = eft (i+1) (i:r)
```

- note that we have to `reverse` as we cons to the start of the list so without it, the list is backwards
  - this is not too bad as it is still linear
- another option is to subtract from `n` to `m`

```haskell
enumFrom' :: Integer -> [Integer]
enumFrom' n = n : enumFrom' (n+1)
-- can we write the infinite list version using an accumulator?
enumFrom'' :: Integer -> [Integer]
enumFrom'' n = ef n []
    where ef i r = ef (i+1) (i:r)
```

- notice that we **cannot** use tail recursion for infinite lists
- if we try to use `take` on it, it will never end evaluating
- this is because when we use an accumulator, we actually end up with an infinite *expression* instead of an infinite *list*
