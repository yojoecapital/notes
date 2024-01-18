## Lists

```haskell
-- lists maybe defined as:
[a] = [] | a : [a]
```

* $\rightarrow$ **a list of type *a* is**
  * an empty list "or"
  * a single value of type *a* "followed by"
  * **a list of type *a*** $\rightarrow$

### The Cons Operator ":"

```haskell
:t (:)
>> (:) :: a -> [a] -> [a]
-- the left side is of type a and right side is a list of type a
1 : 2 : 3 : 4 : []
>> [1, 2, 3, 4]
-- cons is right associative
```

* note that an empty list is a list of *any type*

#### Syntactic Sugar

```haskell
-- [1, 2, 3, 4, 5, 6] == 1:2:3:4:5:6:[]
-- "hello" == ['h', 'e', 'l', 'l', 'o'] == 'h' : 'e' : 'l' : 'l' : 'o' : []
['a' .. 'z']
> "abcdefghijklmnopqrstuvwxyz"
-- for instances of 'Enum' using builtin enumFromTo function
[1 ..]
-- returns an infinite list using enumFrom function
```

### Constructing Lists

Implementing `replicate` function that takes `Int -> a -> [a]` or it takes an `Int` and something of type `a` and returns that many of `a` in a list

```haskell
> replicate' :: Int -> a -> [a]
> replicate' 0 _ = []
> replicate' 1 x = x : []
> replicate' n x = x : replicate' (n - 1) x
```

Implementing `enumFromTo` or the `..` thingy

```haskell
> enumFromTo' :: (Ord a, Enum a) => a -> a -> [a]
> enumFromTo' x y | x > y = []
>                 | x == y = x : []
>                 | otherwise = x : enumFromTo' (succ x) y
```

Implementing infinite lists

```haskell
> ones :: [Int]
> ones = 1 : ones
take 5 ones
>> [1, 1, 1, 1, 1]
-- take function takes the first arg amount in a list
> repeat' :: a -> [a]
> repeat' x = x : repeat' x

> enumFrom' :: Enum a => a -> [a]
> enumFrom' x = x : enumFrom' (succ x)
```

##### List Comprehension

`[ Expression | Generator, ... , Predicate, ... ]`

  - which produces a list of values computed by `Expression`
  - where each `Generator` is of the form "var <- List"
  - and each `Predicate` is a Boolean expression
  - you can also use `let` to create local vars (without `in`)

```
> evens = [2*x | x <- [1..]]
>
> evens' = [x | x <- [1..], x `mod` 2 == 0]
```

```haskell
> (+++) :: [a] -> [a] -> [a]
> [] +++ [] = [] -- case 1
> [] +++ ys = ys -- case 2
> xs +++ [] = xs -- case 3
> (x:xs) +++ ys = x : xs +++ ys -- case 4
-- implementing concat
[1, 2, 3] +++ [4, 5, 6]
1 : ([2, 3] +++ [4, 5, 6])
1 : (2 : ([3] +++ [4, 5, 6]))
1 : (2 : (3 : ([] +++ [4, 5, 6])))
1 : (2 : (3 : [4, 5, 6]))
-- how concat works
```

Many of the examples above are redundant and it can be simplified to:

 ```haskell
> (+++) :: [a] -> [a] -> [a]
> [] +++ ys = ys -- case 2
> (x:xs) +++ ys = x : xs +++ ys -- case 4
 ```

But in this example it becomes very inefficient for the case `[1, 2, 3, 4] +++ []` as it still has to iterate over the entire list. It is best to keep base cases 2 and 3

```haskell
> [] +++ ys = ys -- case 2
> xs +++ [] = xs -- case 3
> (x:xs) +++ ys = x : xs +++ ys -- case 4
```

```haskell
> take' :: Int -> [a] -> [a]
> take' 0 _ = []
> take' _ [] = []
> take' n (x:xs) = x : take' (n-1) xs
-- implementing take
take 3 ones
take 3 (1:ones)
1 : take (3-1) ones
1 : take 2 (1:ones)
1 : 1 : take (2-1) ones
1 : 1 : take 1 (1:ones)
1 : 1 : 1 : take (1-1) ones
1 : 1 : 1 : take 0 ones
1 : 1 : 1 : []
-- how take works
```

```haskell
> splitAt' :: Int -> [a] -> ([a], [a])
> splitAt' _ []     = ([], [])
> splitAt' 0 l      = ([],l)
> splitAt' n (x:xs) = let (ys, zs) = splitAt' (n-1) xs
>                     in (x:ys, zs)
```

```haskell
> break' :: (a -> Bool) -> [a] -> ([a], [a])
```

Break takes a *predicate* and a list then returns a split of the list where the predicate first matches true.

```haskell
> break' :: (a -> Bool) -> [a] -> ([a], [a])
> break' _ [] = ([], [])
> break' p l@(x:xs)
>         | p x = ([], l)
>         | otherwise = let (ys, zs) = break' p xs in (x: ys, zs)
```

