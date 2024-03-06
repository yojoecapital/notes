# Testing

A *test* verifies that some aspect of a system works to specification.

Testing tools can help:

  - simplify test specification, discovery, execution, and reporting

  - ensure that code changes don't break existing functionality (no regressions)
    - this was the *blame* functionality does in source control; it "blames" the committer 

  - determine code coverage (how much of the codebase is actually run)

  - eliminate code "lint" (aka "dead code")
    - code that never is run and is unneeded

#### TDD Test-Driven Development

1. create the tests *before* you start developing code
2. run the test and make sure they all fail
3. write you code "tackling" each test like a checklist

#### But how to write tests? (How to verify correctness?)

  - *Static tests* are carried out by a compiler, which checks for syntax and type related errors. We write *type signatures* to help the compiler.
    
  - *Unit tests* check that "units" of code (e.g., functions, classes) work as  expected. Their specification/execution is facilitated by test frameworks.
      - *Example-based tests* explicitly declare the expected results (e.g., return value, output, exception) for different inputs and/or state.
        
      - *Property-based tests* declare high-level "properties" (aka invariants)  that must hold true for all inputs and/or state. Specific cases are  automatically generated and checked.
    
  - *Formal verification* may be done at a higher level of abstraction. It is typically done by a theorem prover, which checks for logical errors by proving that the program satisfies a set of logical properties.

## "Hspec" - Haskell Specification Testing Framework

defines a "domain specification language" DSL

note: you need to use `stack ghci <file>` to impot Hspec

```haskell
someSpec :: Spec
someSpec = 
  describe "someFunc" $ do
    it "fulfills some expectation ..." $
      pendingWith "Need to flesh out this test"
    it "fulfills some other expectation ..." $
      pending
-- using pending if the test is yet to be implemented
-- use pendingWith to describe the pending test
```

### Example-Based Testing

```haskell
celsiusConversionSpec :: Spec
celsiusConversionSpec = 
  describe "Celsius conversions" $ do
    describe "c2k" $ do
      it "works for known examples" $ do
        c2k 0 `shouldBe` 273.15
        c2k 100 `shouldBe` 373.15
        c2k (-100) `shouldSatisfy` (=~= 173.15)
      it "fails for sub-abs-zero temperatures" $ do
        pending
    describe "c2f" $ do
      it "works for known examples" $ do
        c2f 0 `shouldBe` 32
        c2f 100 `shouldBe` 212
        c2f (-40) `shouldBe` (-40)
    describe "f2c" $ do
      it "works for known examples" $ do
        f2c 32 `shouldBe` 0
        f2c 212 `shouldBe` 100
        f2c 100.1 `shouldSatisfy` (=~= 37.8333)
        
(=~=) :: (Floating a, Ord a) => a -> a -> Bool
x =~= y = abs (x - y) < 0.001
-- note it is not preferable to use hardcoded values especially in test case
```

```haskell
hspec celsiusConversionSpec
> -- runs tests for celsiusConversionSpec
```

### Property-Based Testing

A property is function that takes test inputs and returns `Bool` or `Property`. 

```haskell
prop_c2f2c :: Double -> Bool
prop_c2f2c c = f2c (c2f c) =~= c
-- after converting c from Celsius to Fahrenheit and back, it should be equal (relatively as the conversion may lose precision)
```

   ```haskell
   quickCheck prop_c2f2c
   > -- test property on 100 random test
   verboseChecl prop_c2f2c
   > -- show the 100 random tests
   ```

##### Generate Arbitrary

How `quickCheck` generates random inputs:

```haskell
generate (arbitrary :: Gen Int)
> -- random Int
generate (arbitrary :: Gen [Int])
> -- random list of Int
sample (arbitrary :: Gen Bool)
> -- sample 10 random Bool
sample (choose ('a', 'z'))
> -- fine tune the sample to Char between 'a' and 'z'
sample (listOf (choose (1, 100)))
```

Specifying the generation of a property:

```haskell
cTemp :: Gen Double
cTemp = choose (-273.15, 1000)
-- creates a generator
prop_c2f2c' :: Property
prop_c2f2c' c = forAll cTemp prop_c2f2c
-- forAll takes a generator for type a and a property (a function that takes a and returns a Bool) then returns a property that gets tested on only that generator
```

Shrinking:


