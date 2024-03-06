## Type Classes

- a *type* consists of values
- a *type class* consists of related types i.e. *instances*
- type classes defines functions known as *methods* supported by all instances
- types can be an instance of multiple classes and classes can inherit from other classes

```haskell
-- use ':i' to get info on a class
:i Eq
>> type Eq :: * -> Constraint
>> class Eq a where
>>   (**) :: a -> a -> Bool  
>>   (/=) :: a -> a -> Bool 
-- the 'equitable' class
:i Ord
>> type Ord :: * -> Constraint
>> class Eq a => Ord a where
>>   compare :: a -> a -> Ordering
>>   (<) :: a -> a -> Bool
>>   (<=) :: a -> a -> Bool
>>   (>) :: a -> a -> Bool
>>   (>=) :: a -> a -> Bool
>>   max :: a -> a -> a
>>   min :: a -> a -> a
-- the 'orderly' class inherits from Eq class
```

#### Context Matters

```haskell
:i Bounded
>> type Bounded :: * -> Constraint
>> class Bounded a where
>>   minBound :: a
>>   maxBound :: a
-- the bounded class defines symbols minBound and maxBound
minBound
>> ()
-- by default, evaluates in the context of a tuple
minBound :: Int
>> -9223372036854775808
-- but we can specify a context i.e. a type class
:t read
>> read :: Read a => String -> a
read "True"
>> *** Exception: Prelude.read: no parse
-- complains it doesn't no what to read
read "True" :: Bool
>> True
read "123" :: Int
>> 123
```

#### Class Constraints

Polymorphic function type declarations may include *class constrains* for specific classes

```haskell
:t (^)
>> (^) :: (Num a, Integral b) => a -> b -> a
-- specifies a as an instance of Num and b as Integral
:t (**)
>> (**) :: Floating a => a -> a -> a
```
