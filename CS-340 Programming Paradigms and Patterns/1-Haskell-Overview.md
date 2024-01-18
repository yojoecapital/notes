# Haskell Overview

## Random

```haskell
:! cls
-- clear screen

:{
	...
:}
-- allows multi-line input in ghci
```

* Haskell assumes all lines of code are indented with the same number of spaces

```haskell
:l file.lhs
-- loads a file as a module
:r
-- reload previous module
```

## Functions

### Function Basics

```haskell
f x = x
f 10
>> 10
-- identity function
f = \ x -> x
(\ x -> x) 10
>> 10
-- identity function using lambda calculus
```

### Pattern Matching

```haskell
fib 0 = 0
fib 1 = 1
fib n = fib (n - 2) + fib (n - 1)
-- Fibonacci sequence
```

### Types Basics

* Haskell has a few built-in types specified in“Prelude”or the standard library

* Tuples with one element are not allowed

* Note that `::` is called "Paamayim Nekudotayim"

```haskell
:set +t
:unset +t
-- force ghci to return the type of it (last accessed variable)
:t x
-- returns the type of variable x
x :: Integer
-- specifies x as an integer
```

### Function Types

```haskell
fib :: Integer -> Integer
-- specifies fib as a function that takes an integer and returns an integer

```

* note without specifying type, Haskell will infer the most generic type

```haskell
:t not
>> not :: Bool -> Bool
```

### Function Application

```haskell
not True
>> False
```

- function application has the highest precedence in Haskell

- functions are also left associative such that `ord chr 65` returns an error as `ord` gets applied to `chr`
- function type declaration is right associative such that functions of multiple arguments are **curried**
  - `f :: Bool -> Char -> Int` $\equiv$ `f :: Bool -> (Char -> Int)`
  - this is different than most imperative languages that take a tuple of arguments and map it to a single return such that `f :: (Bool, Char) -> Int`
  - really what is happening when we have more than one argument, the rest are *curried*

### Operators

operators are also functions whose names start in non-letters and usually used in infix form
```haskell
1 + 1
>> 2
-- infix form
(+) 1 1
>> 2
-- we can use operators in prefix form by putting them in parentheses
 10 `mod` 2
>> 0
-- functions can use infix form if we use backticks 
```

### Polymorphic Functions

Functions that don't care about the specific types of some arguments and return values

```haskell
:t id
>> id :: a -> a
-- identity function 
-- (takes some arg of type 'a' and returns some value of type 'a')
:t const
>> const ::  a -> b -> a
-- takes 2 args, returns the first
:t fst
>> fst :: (a, b) -> a
-- takes 2 element tuple, returns first element
:t snd
>> snd :: (a, b) -> b
-- takes 2 element tuple, returns second element
:t (.)
>> (.) :: (b -> c) -> (a -> b) -> a -> c
-- takes a function that takes arg b return c
-- and a function that takes arg a return b
-- returns a function that takes arg a and return c
-- i.e. function composition (f . g)(x) = f(g(x)) 
:t flip
>> flip :: (a -> b -> c) -> b -> a -> c
-- takes a functions that takes arg's a, b and returns c
-- returns a function that takes arg's b, a and returns c
-- i.e. flips the arguments of a function
```
