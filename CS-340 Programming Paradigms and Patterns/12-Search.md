# Search

<span style="color:red">start on 1:03:50 on 4/14/2023</span>

```haskell
shuffle' = RandomGen g => [a] -> Int -> g -> [a]
-- built-in shuffle doesn't return the generator
getSHuffled l = do g <- get
				   let (g', g'') = split g
				       l' = shuffle' l (lenght l) g'
                   put g''
                   return'
				   
```

