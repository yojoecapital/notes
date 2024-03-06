## Defining Functions

```haskell
> nand :: Bool -> Bool -> Bool
> nand x y = not (x && y)
-- not and
> c2f :: Floating a => a -> a
> c2f c = c * 9/5 + 32
-- Celcius to Fahrenheit
> distance :: Floating a => (a, a) -> (a, a) -> a 
> distance p1 p2 = sqrt ((fst p1 - fst p2)^2 + (snd p1 - snd p2)^2)
-- distance between 2 points (tuples)
```

#### Pattern Matching

```haskell
> greet :: String -> String
> greet "Jill" = "Hey Jill"
> greet "Jack" = "Sup Jack"
> greet _ = "Hello!"
-- where _ is a default case
```

##### Deconstruction

```haskell
> distance' :: (Floating a) => (a, a) -> (a, a) -> a
> distance' (x1, y1) (x2, y2) = sqrt ((x1 - x2)^2 + (y2 - y1)^2)

> mapTup :: (a -> b) -> (a, a) -> (b, b)
> mapTup f t = (f (fst t), f (snd t))

> mapTup' f (a, b) = (f a, f b)
```

##### `@` As-Patterns

```haskell
> foo :: (a, (b, c)) -> ((a, (b, c)), (b, c), (a, b, c))
> foo t1@(a, t2@(b, c)) = (t1, t2, (a, b, c))
```

##### `|` Guards ("such-that")

```haskell
> c2h :: (Floating a, Ord a) => a -> String
> c2h c | c2f c > 90 = "Hot!"
>       | c2f c > 75 = "Comfortable."
>       | c2f c > 45 = "Cold."
>       | otherwise = "Too Cold."
```

##### `where` Clause

```haskell
> c2h' :: (Floating a, Ord a) => a -> String
> c2h' c | f >= hot = "hot"
>        | f >= comfort  = "comfortable"
>        | f >= cold  = "cool"
>        | otherwise    = "cold"
>      where f = c2f c
>            hot = 100
>            comfort = 70
>            cold = 50
```

#### `if-then-else` Expression

```haskell
if e1 then e2 else e3
```

`e1`, `e2`, `e3` all have the same Type

```haskell
> closer :: (Floating a, Ord a) => (a, a) -> (a, a) -> (a, a) -> (a, a)
> closer src dst1 dst2 = if distance src dst1 < distance src dst2
>                        then dst1 else dst2
-- returns the closer coordinate of dst1 and dst2 to src
```

##### Case Expression

```haskell
> quadrantNames :: (Int, Int) -> String
> quadrantNames (x, y) = case quadrant (x, y) of 1 -> "All"
>                                                2 -> "Science"
>                                                3 -> "Teachers"
>                                                4 -> "Crazy"
>                                                _ -> "Origin"
```

#### `let` Clause

```haskell
> quadRoots :: Double -> Double -> Double -> (Double, Double)
> quadRoots a b c = let disc = b^2 - 4*a*c
>                       sqdisc = sqrt disc
>                       r1 = (-b + sqdisc) / (2 * a)
>                       r2 = (b + sqdisc) / (2 * a)
>                   in (r1, r2)
```
