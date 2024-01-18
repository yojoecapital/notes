# Defining Types and Type Classes

## Summary

```haskell
data Shape = Cirle Float Float Float
```

1. `Shape` is a ==type==
2. `Circle` is a ==value constructor==
3. `Float Float Float` are all ==fields== of value constructor `Circle`

```haskell
data Maybe a = Nothing | Just a
```

1. `Maybe` is *not a type*, it is ==type constructor== with a ==type parameter== `a`
2. `Nothing` is a value constructor
3. `Just` is a value constructor with the field of type `a`

- `Maybe Int` would be a type

```haskell
class Eq a where  
    (==) :: a -> a -> Bool  
    (/=) :: a -> a -> Bool  
    x == y = not (x /= y)  
    x /= y = not (x == y) 
```

- `class` is for defining new typeclasses

```haskell
data TrafficLight = Red | Yellow | Green  
instance Eq TrafficLight where  
    Red == Red = True  
    Green == Green = True  
    Yellow == Yellow = True  
    _ == _ = False  
```

- `instance` is for making our types instances of typeclasses

## Type synonyms

`type` defines type synonyms, i.e., alternative names for existing types. Note that all type names must be capitalized.

```haskell
type Letter = Char
type Word = [Letter]
type Sentence = [Word]
sentences :: [Word] -> [Word] -> [Word] -> [Sentence]
sentences subjs verbs objs = [[s,v,o] | s <- subjs, v <- verbs, o <- objs]
type Point2D = (Double, Double)
distance :: Point2D -> Point2D -> Double
distance (x1,y1) (x2,y2) = sqrt $ (x1-x2)^2 + (y1-y2)^2
```

## Algebraic Data Types

The `data` keyword is used to define new ==types==. A type definition requires one or more ==value constructors== (aka data constructors).

```haskell
data Bool = False | True
-- "Bool" is the new type
-- "False" and "True" are the value constructors
```

>  The `YesOrNo` type below has two value constructors: `Yes` and `No`:

```haskell
data YesOrNo = Yes | No deriving (Show)
not' :: YesOrNo -> YesOrNo
not' Yes = No
not' No = Yes
```

In a type definition, value constructors may be followed by ==field types==.

> Consider the following type (note that type names and value constructor names can be the same):

```haskell
data Box = Box Int Bool String deriving (Show)

{-ghci>-} :t Box
{->>-} Box :: Int -> Bool -> String -> Box
-- Box is a function that takes an Int, Bool, String and returns a type Box
-- Note the difference between the Box constructor and the Box type
b = Box 10 True "Hello"
{-ghci>-} :t b
{->>-} b :: Box
```

- Value constructors are actual functions (where fields are their parameters) that return a value of a data type

This how we can construct Boxes and use their "properties"

```haskell
b1 = Box 5 True "hello"
b2 = Box 100 False "goodbye"

boxStr :: Box -> String
boxStr (Box _ _ s) = "The box's string is = " ++ s
boxCombine :: Box -> Box -> Box
boxCombine (Box n1 b1 s1) (Box n2 b2 s2) = Box (n1 + n2) (b1 && b2) (s1 ++ s2)
```

We can have multiple value constructors with varying numbers of fields. 

> `Shape` has three value constructors, each with one or more fields:

```haskell
data Shape = Circle Double 
             | Triangle Double Double 
             | Rectangle Double Double deriving (Show)
-- where Circle :: Double -> Shape
area :: Shape -> Float
-- notice that we can't put "Circle -> Float" as "Circle" is a value constructor
area (Circle r) = pi * r * r
area (Triangle h b) = b * h / 2
area (Rectangle h b) = h * b
```

### Why do we call them Algebraic Data Types? (Possible Values)

We call these "algebraic" data types because data types defined in this way can be formed from the "sum" and "product" of other types.

```haskell
data T1 = T1V1 | T1V2 | T1V3 -- 1 + 1 + 1 = 3 possible values
data T2 = T2V1 Bool | T2V2 T1 -- 2 + 3 = 5 possible values
data T3 = T3V Bool T1 -- 2 * 3 = 6 possible values
data T4 = T4V1 T1 T2 | T4V2 T2 T3 -- 3*5 + 5*6 = 45 possible values
```

- The *or(s)* `|` indicate the possible values of the constructors are added
- The *fields* of the constructor (curried arguments) are multiplied


### Record Syntax

We may use "record" syntax to define attribute names and automatically generate "getter" functions:

```haskell
-- data Student = Student String String Integer [Char] deriving Show
data Student = Student { firstName :: String
                       , lastName  :: String
                       , studentId :: Integer
                       , grades    :: [Char]
                       } deriving Show
:t Student
>> Student :: String -> String -> Integer -> [Char] -> Student
:t firstName
>> firstName :: Student -> String
```

- Use record syntax when fields are not obvious

#### Using Record Syntax

```haskell
s1 = Student "John" "Doe" 1234 ['A', 'B']
-- we can still create values with fields specified positionally
s2 = Student { lastName = "Doe"
             , firstName = "Jane"
             , grades = ['A', 'C']
             , studentId = 2345 }
-- or we can specify fields by name (order doesn't matter)
s3 = s1 { grades = ['B', 'A', 'D'] }
-- record syntax provides a shortcut for creating a new value from another
```

## Type Constructors

```haskell
data Maybe a = Nothing | Just a  
```

- `Maybe` is not a type but a ==type constructor== as a ==type parameter== `a` is involved

```haskell
{-ghci>-} :t Just "Haha"
{->>-} Just "Haha" :: Maybe [Char]
{-ghci>-} :t Just 21
{->>-} Just 21 :: (Num t) => Maybe t
{-ghci>-} :t Nothing
{->>-} Myabe a
```

- Notice that the type of `Nothing` is `Maybe a` meaning it can act as `Maybe Int` or `Maybe String` or anything; i.e. it is ==polymorphic==
  - This is similar to how `5` can act like an `Int` or a `Double`
  - Or how an empty list is of type `[a]` which can act as a list of anything

### Kinds `:k`

```haskell
{-ghci>-} :k Int  
{->>-} Int :: *  
```

- the *kind* of `Int` is `*` which denotes that it is a ==concrete type==
- the *kind* of `Maybe` is `* -> *` which denotes that it is a ==type constructor== such that it takes one *concrete type* and returns a new *concrete type* (just like how a function takes one value and returns a new value)

## Self Referential Types

```haskell
data RussianDoll = RussianDoll String RussianDoll | EmptyDoll
                   deriving Show
d1 = EmptyDoll
-- an empty doll
d2 = RussianDoll "privyet" EmptyDoll
-- a doll followed by an empty
d3 = RussianDoll "matry" (RussianDoll "osh" (RussianDoll "ka" EmptyDoll))
-- 3 layers of nexted dolls
d4 = RussianDoll "and on and on" d4
-- an infinitely nested doll
```

#### Some Fun Stuff :sunglasses: (List Traversal)

```haskell
reverseMessages :: RussianDoll -> RussianDoll
reverseMessages d = rev d EmptyDoll
      where rev EmptyDoll acc = acc
            rev (RussianDoll m d) acc = rev d (RussianDoll m acc)
```

## Typeclasses

- defines some behavior (like comparing for equality or for ordering)
- types that can behave in that way are are made instances of that ==typeclass==
- the behavior of typeclasses is achieved by defining functions or just type declaration that we then implement
- classes in Haskell are not akin to classes in imperative languages

```haskell
-- this is how the Eq class is defined in the prelude
class Eq a where 
-- "a" is a type variable
    (==) :: a -> a -> Bool  
    (/=) :: a -> a -> Bool  
    x == y = not (x /= y)  
    x /= y = not (x == y)  
```

### Using Instances of Typeclasses

- You can use ==deriving== such as with

```haskell
data TrafficLight = Red | Yellow | Green deriving (Show, Eq)
```

- This will allow the `TrafficLight` type to use the functions of `Show` and `Eq`
- Or we can use ==instance== to redefine how the `Eq` functions are implemented

```haskell
data TrafficLight = Red | Yellow | Green  
instance Eq TrafficLight where
-- "TrafficLight" replaces the role of "a" in the class definition of "Eq"
    Red == Red = True  
    Green == Green = True  
    Yellow == Yellow = True  
    _ == _ = False
```

- To fulfil the minimal complete definition of `Eq` we have to implement either `==` or `/=` as they are mutually defined
- Note that we can define `Eq` with only the type declarations of its functions

### Class Constraints in Typeclasses

```haskell
class (Eq a) => Num a where  
```

This specifies that `a` must be an instance of `Eq` before it can be made an instance of `Num`

```haskell
instance (Eq m) => Eq (Maybe m) where  
	Just x == Just y = x == y  
    Nothing == Nothing = True  
    _ == _ = False  
```

- Note that because `Maybe` is a *type constructor* and *not a type*, we can't do `instance Eq Maybe where`
- To ensure that the type parameter `m` of `Maybe` is a `Eq` instance, we use a class constraint; otherwise, we can't use `==` or `/=` on `Maybe m` type

> Note that if you want to see the instances of a typeclass, use `:info YourTypeClass` in GHCI
