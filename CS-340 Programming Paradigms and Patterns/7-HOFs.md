# Higher Order Functions

- A higher-order function (HOF) is a function that takes a function as a parameter or returns a function. (Non-HOFs are called first-order functions).
- They are a fundamental tool in functional programming.
- The term "combinator" is often used to refer to HOFs that combine or apply argument functions to do all their work.

## Basic Combinators

### 1. Application `$`

```haskell
($) :: (a -> b) -> a -> b
infixr 0 $
($) f x = f x
-- we can also write it in infix form as
--f $ x = f x
```

- `$` allows us to explicitly indicate function application as it has higher precedence
- for example, instead of using nested parenthesis was can use the `$` as such

```haskell
take 5 (drop 10 (zip [1..] (repeat 'a')))
>> [(11,'a'),(12,'a'),(13,'a'),(14,'a'),(15,'a')]
-- is the same as
take 5 $ drop 10 $ zip [1..] $ repeat 'a'
>> [(11,'a'),(12,'a'),(13,'a'),(14,'a'),(15,'a')]
```

### 2. Composition `.`

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
infixr 9 .
(.) f g = \x -> f $ g x
```

- note that the right function is called first and the result of that is applied to the left just as $f \circ g$
- here is an example of using it in the `even'` function

```haskell
even' :: Integral a => a -> Bool
--even' x = 0 == (x `rem` 2)
even' = (== 0) . (`rem` 2)
```

- which now even' returns a function which takes an `Integral` that goes into the composition  

```haskell
strip :: String -> String
--strip s = reverse $ dropWhile isSpace $ reverse $ dropWhile isSpace s
strip = let f = reverse . dropWhile isSpace in f . f
```

- this function removes the spaces in the beginning and end of a string

## Recursive Patterns via HOFs

### 1. `map`

```haskell
map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = f x : map f xs
```

#### Some Fun Examples :smile:

```haskell
map ($ " the sea") $ map (++) $ words "on over under across"
>> ["on the sea","over the sea","under the sea","across the sea"]
map ($ "jump ") $ map (flip (++)) $ words "on over under across"
>> ["jump on","jump over","jump under","jump across"]
```

<hr>

### 2. `filter`

```haskell
filter :: (a -> Bool) -> [a] -> [a]
filter _ [] = []
filter p (x:xs) = (if p x then (x:) else id) $ filter p xs
--filter p (x:xs) | p x = x : filter p xs
--                | otherwise = filter p xs
```

<hr>

### 3. `all` & `any`

- `all` returns true if *all* elements in the list match the predicate
- `any` returns true if *any* element in the list match the predicate

```haskell
all :: (a -> Bool) -> [a] -> Bool
all _ [] = True
all p (x:xs) = p x && all p xs

any :: (a -> Bool) -> [a] -> Bool
any _ [] = False
any p (x:xs) = p x || any p xs
```

<hr>

### 4. HOF Versions of `sort`

> these are implementations of *Quick Sort*
>
> Quick Sort takes a pivot `x` in a list `(x:xs)` (can be any element but, in this implementation, is the first)
>
> then it sorts all the elements less than `x` is the left sublist and all the elements greater than `x` in the right sublist
>
> it recursively does Quick Sort again on these two sublists
>
> then it concatenates the sub lists
>
> it has an average-case time complexity of $O(n \log n)$ making it very efficient for large lists (it is $O(n^2)$ in its worst-case) 

```haskell
sort :: Ord a => [a] -> [a]
sort [] = []
sort (x:xs) = sort [y | y <- xs, y < x] 
              ++ [x] 
              ++ sort [y | y <- xs, y >= x]

sortBy :: (a -> a -> Ordering) -> [a] -> [a]
sortBy _ [] = []
sortBy cmp (x:xs) = sortBy cmp [y | y <- xs, cmp x y == LT] 
                        ++ [x] 
                        ++ sortBy cmp [y | y <- xs, cmp x y /= LT]
```

<hr>

### 5. `foldr`

Take this example of `and` (which is basically equivalent to the `all` function)

```haskell
and :: [Bool] -> Bool
and [] = True
and (x:xs) = (&&) x $ and xs
```

- the input type is a list `[a]`
- the return type is something else, `b`
- i.e., we have `[a] -> b`
- the base case returns some fixed value of type `b`
- the recursive case applies a "combiner function" to the first element of
  the list (of type `a`), and then to the return value of the recursive call (`b`)
- i.e. the combiner function has type `(a -> b -> a)`

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ v []     = v
foldr f v (x:xs) = f x $ foldr f v xs
```

Here is an example of the trace of `foldr (+) 0 [1..5]`

```haskell
foldr (+) 0 (1 : (2 : (3 : (4 : (5 : [])))))
= 1 + (foldr (+) 0 (2 : (3 : (4 : (5 : [])))))
= 1 + (2 + (foldr (+) 0 (3 : (4 : (5 : [])))))
= 1 + (2 + (3 + foldr (+) 0 (4 : (5 : []))))
= 1 + (2 + (3 + (4 + foldr (+) 0 (5 : []))))
= 1 + (2 + (3 + (4 + (5 + foldr (+) 0 []))))
= 1 + (2 + (3 + (4 + (5 + 0))))
= 1 + (2 + (3 + (4 + 5)))
= 1 + (2 + (3 + 9))
= 1 + (2 + 12)
= 1 + 14
= 15
```

#### Some Cool Examples :sunglasses:

#### `++` Implementation

```haskell
(+++) :: [a] -> [a] -> [a]
l1 +++ l2 = foldr (:) l2 l1
-- this copies the first list `l1` then cons onto that the rest of `l2`
```

#### `map` With `foldr`

```haskell
-- recall our previous definition for map
map :: (a -> b) -> [a] -> [b]
map _ [] = []
--map f (x:xs) = f x : map f xs
map f (x:xs) = ((:) . f) x $ map f xs -- <- rewriting previous line:
-- rewritten with foldr
map' :: (a -> b) -> [a] -> [b]
map' f = foldr ((:) . f) []
```

#### `filter` With `foldr`

```haskell
filter' :: (a -> Bool) -> [a] -> [a]
filter' p = foldr f []
    where f x r | p x = x : r
                | otherwise = r
```

<hr>

### 6. `foldl`

- I need to go over this
- **try to take notes on the difference between `foldr` and `foldl`**

<hr>

```haskell
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ acc [] = acc
foldl f acc (x:xs) = foldl f (f acc x) xs
```

Here is a trace of `foldl (+) 0 [1..5]`

```haskell
  foldl (+) 0 (1 : (2 : (3 : (4 : (5 : [])))))
= foldl (+) (0 + 1) (2 : (3 : (4 : (5 : []))))
= foldl (+) ((0 + 1) + 2) (3 : (4 : (5 : [])))
= foldl (+) (((0 + 1) + 2) + 3) (4 : (5 : []))
= foldl (+) ((((0 + 1) + 2) + 3) + 4) (5 : [])
= foldl (+) (((((0 + 1) + 2) + 3) + 4) + 5) []
= (((((0 + 1) + 2) + 3) + 4) + 5)
= ((((1 + 2) + 3) + 4) + 5)
= (((3 + 3) + 4) + 5)
= ((6 + 4) + 5)
= (10 + 5)
= 15
```

## When to fold left or right?

- typically, right is right!

  - if dealing with infinite lists, use right fold

  - if the combining function may short circuit, use right fold

  - if the combining function is naturally right associative, use right fold

- Left (strict), when:

  - the function is left associative (and the list isn't infinite)
  
  - The function is cumulative (or left-associative), and the entire list needs to be processed to get the result - this takes advantage of the accumulator pattern
  
- Very rarely is the non-strict left fold the right one

> Note that the folds are available in the prelude as `foldr`, `foldl`, and `foldl'` where `foldl` is non-strict and `foldl'` is strict

