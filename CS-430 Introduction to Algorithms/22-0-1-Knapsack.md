# 0-1 Knapsack

- a thief is robbing a store with $n$ items
- each item $i$ is worth $z_i$ dollars and has weight $w_i$ where $z_i,w_i$ are integers
- the thief can only carry $W$ weight and can't take fractional amounts of items (i.e. 0-1 or "leave" or "take")
- what items should the thief take to maximize his haul's value?

## Trying Greedy Choice

Using a greedy algorithm will not work for 0-1 knapsack. You'll need DP.

### Max value first

This has easy counter examples.

### Min weight first

This has easy counter examples.

### Max value per weight first 

- this is a.k.a. the unit price
- this has easy counter examples
- however, the *fractional* knapsack problem can be solved using this greedy choice

## Proving the greedy unit price choice works for *fractional* knapsack

- assume we have an optimal solution $A$ to $S$ that doesn't have our greedy choice
- take $a$ that has the maximum unit price in $A$ and replace it with $s$ that has the maximum unit price in $S$
- this gives us 3 possible cases:
  1. $s$'s weight is equal to $a$'s weight in $A$ giving a solution with a greater value 
  2. $s$'s weight is less allowing us to fill the rest of missing weight with a fraction of $a$'s again giving a solution with a greater value 
  3. $s$'s weight is more allowing us to take a fraction of $s$​'s again giving a solution with a greater value 
- all cases lead to a contradiction that $A$ is an optimal solution 