# Some Monads

## `Logger` Monad Example

```haskell
data Logger a = Logger {
    loggerVal  :: a,
    loggerMsgs :: [String]
} deriving (Show)
```

Note that this is making use of [Record Syntax](8-Defining-Types-and-Type-Classes.md#Record-Syntax)

```haskell
instance Functor Logger where
    fmap :: (a -> b) -> Logger a -> Logger b
    fmap f (Logger x m) = Logger (f x) m
instance Applicative Logger where
    pure :: a -> Logger a
    pure x = Logger x []
    (<*>) :: Logger (a -> b) -> Logger a -> Logger b
    Logger f m1 <*> Logger x m2 = Logger (f x) (m1 ++ m2)
    
{-ghci>-} (*) <$> Logger 5 ["mssage 1"] <*> Logger 5 ["message 2"]
{->>-} Logger {loggerVal = 25, loggerMsgs = ["mssage 1","message 2"]}

instance Monad Logger where
    (>>=) :: Logger a -> (a -> Logger b) -> Logger b
    Logger x m >>= f = let Logger y m' = f x
    				   in Logger y (m ++ m')
    				   
-- some functions that produce Logger values:
recordLog :: a -> String -> Logger a
recordLog x s = Logger x [s]
logVal :: Show a => a -> Logger a
logVal x = recordLog x $ "Got " ++ show x
logOp :: Show a => String -> a -> Logger a
logOp op x = recordLog x $ "Performing " ++ op ++ " => " ++ show x
logAppend :: String -> Logger ()
logAppend = recordLog ()

-- using our monads
logeg = do
    a <- logVal 5
    b <- logVal 10
    c <- logOp "Sub" $ a - b
    d <- logOp "Square" $ c^2
    return d
{-ghci>-} logeg
{->>-} Logger {loggerVal = 25, loggerMsgs = ["Got 5","Got 10","Performing Sub => -5","Performing Square => 25"]}
```

## `State` Monad

- Haskell does not have *stateful* function; that is a function with side-effects
- However we can *pretend* to have stateful functions by using this model
  - `s -> (s, a)`
  - a stateful function takes a state `s` and returns an updated state `s` with a computed value `a`

```haskell
-- State is a container of a stateful function accessed by "runState"
data State s a = State { runState :: s -> (s, a) }
```

- We're calling the accessor `runState` as usually when access this function, we intend to *run* it

### Stack Operations

```haskell
pop :: State [a] a
pop = State $ \(x:xs) -> (xs, x)
-- pop is a stateful function
-- to actually access the function, use:
{-ghci>-} runState pop [1..10]
{->>-} ([2..10], 1)
push :: a -> State [a] () -- note empty tuples represent a "void" return
push x = State $ \xs -> (x:xs, ())
{-ghci>-} runState (push 5) []
{->>-} ([5], ())
peek :: State [a] a
peek = State $ \l@(x:_) -> (l, x)
```

### `State` as a Functor

```haskell
instance Functor (State s) where
	fmap :: (a -> b) -> State s a -> State s b
	-- we are returning a new state context so we use the value constructor "State"
	fmap f st = State $ \s -> let (s', x) = runState st s 
							  in (s', f x)
  	-- OR we can pattern match on the stateful function:
  	fmap f (State sf) = State $ \s -> let (s', x) = sf s 
							  in (s', f x)
```

> - `State` is a container for a stateful function
> - `fmap` takes a function then applies it to the value that is returned by the stateful computation contained in a`State` and puts it into a new `State`
> - to get the value of of the stateful computation, we need to pass a new state `s` to `runState`
> - we are still waiting for this new state `s` that's why its in a lambda

### `State` as an Applicative

```haskell
instance Applicative (State s) where
	pure :: a -> State s a
	pure x = State $ \s -> (s, x)
	(<*>) :: State s (a -> b) -> State s a -> State s b
	stf <*> stx = State $ \s -> let (s', f) = runState stf s
    							--	(s'', x) = runState stx s'
                                --in (s'', f x) 
                                in runState (f <$> stx) s' -- we can use fmap here
```

### `State` as a Monad

- the *monad* takes a state context $x$ (which contains a function that is awaiting a state), an impure state function that returns its own state context $y$
- then runs that function on the return of $x$
- finally, it *binds* the state contexts $x$ and $y$

```haskell
instance Monad (State s) where
-- where "stx" is the state context x and "imf" is the impure function
    (>>=) :: State s a -> (a -> State s b) -> State s b
    -- context x is awaiting a state "s"
    stx >>= imf = State $ \s -> let (s', x) = runState stx s
    							-- "imf x" returns a new state context y ("State s b")
								in runState (imf x) s'
-- the "State" value constructor takes a function "s -> (s, a)" so we need the lambda to return "(s, a)"
-- we can use runState on the context "State s b" from "imf x" chaining "s'"
-- to get a (s, a) back
	
```

Now we can use our monadic machinery:

```haskell
stackArith :: State [Int] ()
stackArith = do
    w <- pop
    x <- pop
    let wx = w * x
    y <- pop
    z <- pop
    let yz = y * z
    push $ wx + yz
{-ghci>-} ghci> runState stackArith [3,4,2,8]
{->>-} ([28],())
```

## Monad Utility Functions

It is useful to have "control structure" like mechanisms for expressing common patterns

A handy utility function for carrying out a bunch of monadic "actions" (as represented by `State` monad values) is `sequence`:

```haskell
sequence :: Monad m => [m a] -> m [a]
sequence [] = return []
sequence (m:ms) = d x <- m
                  xs <- sequence ms
                  return $ x:xs
--sequence (m:ms) = m >>= \x -> 
--				  sequence ms >>= \xs ->
--				  return $ x:xs
```

> This basically transforms a list of `Monad a` into single `Monad [a]` or a monad containing a list of the "results"

```haskell
action1 = sequence [pop, pop, pop, pop, pop]
action2 = sequence [push 1, push 2, push 3, push 4, push 5]
{-ghci>-} runState action1 [1..6]
{->>-} ([6],[1,2,3,4,5])
-- where the second list is the results of each state function
{-ghci>-} runState action2 []
{->>-} ([5,4,3,2,1],[(),(),(),(),()])
```

if we don't care about the return we can use `sequence_`

```haskell
sequence_ :: Monad m => [m a] -> m ()
sequence_ [] = return ()
sequence_ (m:ms) = do m ; sequence_ ms -- ; return () -- <- this line is redundant
action3 = sequence_ $ map push [1..5]
{-ghci>-} runState action3 []
{->>-} ([5,4,3,2,1],())
```

Because mapping functions that returns monads (impure functions) onto a list is pretty common, we have these:

```haskell
mapM :: Monad m => (a -> m b) -> [a] -> m [b]
mapM f = sequence . map f
mapM_ :: Monad m => (a -> m b) -> [a] -> m ()
mapM_ f = sequence_ . map f
action4 = mapM_ push [1..5]
{-ghci>-} runState action4 []
{->>-} ([5,4,3,2,1],())
```

If we `flip` the arguments, we get:

```haskell
forM :: Monad m => [a] -> (a -> m b) -> m [b]
forM = flip mapM
forM_ :: Monad m => [a] -> (a -> m b) -> m ()
forM_ = flip mapM_
-- which looks like a for loop:
action5 = forM_ [1..5] $ \x -> do
              push x
              push $ x*2
              push $ x^2
{-ghci>-} runState action5 []
{->>-} ([25,10,5,16,8,4,9,6,3,4,4,2,1,2,1],())
```

 
