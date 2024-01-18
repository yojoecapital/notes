# Search

[toc]

## Motivation

AI is powered by search where we need to consider multiple possibilities and find the optimal one

- Travel from one location to another: find optimal route
- Game playing: find optimal move
- Machine learning: find optimal set of parameters
- Machine translation: find optimal sequence of words
- Constraint satisfaction: find optimal assignment

### Examples

#### Traveling Salesman Problem

Given

- list of N cities
- distance between each pair of cities

Find

- a minimum-cost travel plan where the agents visits each city exactly once and returns to the city of origin 

#### 8 Puzzle

You can only move tiles into the empty slot. The goal state is where the first slot is empty and the rest increment to 8.

![img](images\Capture.png)

#### 8 Queens

Given 8 queens on a chess board, arrange them so none can attack each other

## Best-First Search

### Best-First Search Pseudocode

Given

- the initial state, goal state, available actions, action costs, and maybe a heuristic function
- `frontier` - a priority queue
- `explored` - a set

Initialize `frontier` with the initial state  

```pseudocode
While frontier is not empty  
    Pop the top node n in the frontier  
    Add n to explored  
    If n is the goal state, return the solution
    For each child n’ of n:  
        If n’ is not in explored:  
            If n’ is not in frontier:
            	Add it to frontier  
            Else if the new path to n’ is better than old path:
            	Replace the old n’ with the new n’ in the frontier  
Return failure /* frontier is empty; goal was not found */
```

#### Best-First Search Algorithms

- define $f(n)=h(n)+g(n)$ where
  - $h(n)$ is cost estimate from $n$ to goal (such as Euclidean distance)
  - $g(n)$ is cost from initial state to $n$ 
    - or the summation of edge costs from the initial state to $n$
- assume the optimal path cost is $p^*$

1. **Uniform-cost search**
   - `frontier` is sorted using $g(n)$
   - *optimal* such that is will always find an optimal solution
     - expands all nodes where $g(n) \le p^*$
   - *not informed* as it only used $g(n)$
   
2. **Greedy heuristic search**
   - `frontier` is sorted using $h(n)$
   - *not optimal* as it ignores path cost
   - *informed*
   
3. **A* search**
   - `frontier` is sorted using $f(n)$
   - *optimal* by expanding is sort of ellipses
     A* also does not stop when it finds the goals, but after it *expands* it
     - expands all nodes where $g(n) + h(n) \le p^*$
   - *informed*

#### Admissibility vs Consistency

Recall $h(n)$ is the heuristic to estimate from node $n$ to the goal

$h(n)$ is **Admissible** if

* $h(n)$ is **optimistic** or that it never overestimates the optimal cost
* an example is the Euclidean distance (straight line distance) between any two cities as this distance will *always be less than or equal to* the actual cost to travel

$h(n)$ is  **Consistent** if

* $h(n) \le c(n, n') + h(n')$ where
  * $n'$ is successor of $n$ and $c(n, n')$ is edge cost
* in other words, it never overestimates the *step cost* which is expressed with the **triangle inequality** or $|a+b| \le |a| + |b|$
* to check if $h(n)$ is consistent, we can confirm that every $n$ and $n'$ pair, that the triangle inequality $h(n) \le c(n, n') + h(n')$ holds

#### A* Optimality Proof

1. if $h(n)$ is consistent then $f(n) = h(n) + g(n)$ along any path is non decreasing

   - $h(n)$ is consistent such that $h(n) \le c(n, n') + h(n')$

   - $g(n') = g(n) + c(n, n')$ so $g(n') \ge g(n)$

   - for $f(n)$ to be non decreasing, then $f(n') \ge f(n)$

   - $f(n') = g(n') + h(n')$

     substitute $g(n') = g(n) + c(n, n')$ so
     $f(n') = g(n) + $ ==$c(n, n') + h(n')$==

     $f(n) = g(n) + h(n)$

     recall ==$h(n) \le c(n, n') + h(n')$== when $h(n)$ is consistent

     $\therefore f(n') \ge f(n)$ 

2. when $n$ is expanded, the optimal path to it has been found

### How to Design Heuristic $h(n)$?

Try relaxing the problem constraints

**8-Puzzle Example**

![img](images\Capture.png)

* $h(n):$ number of misplaced tiles
  * how many tiles are misplaced from the goal state (*do not count blank tile*)
* $h(n):$ Manhattan distance or $\Delta x + \Delta y$
  * Euclidean is $\sqrt{(\Delta x)^2 + (\Delta y)^2}$

#### Comparing Heuristics

* $h_i(n)$ dominates $h_j(n)$ iff $h_i(n) \ge h_j(n) \forall n$
* in 8-Puzzle example,  <u>Manhattan distance</u> dominates <u>number of misplaced tiles</u>
* if you have multiple admissible heuristics where  none dominates the other
  * then let $h(n) = \max (h_1(n), h_2(n), ...)$ where $h(n)$ is admissible and dominates the rest
  * how the computation cost of this is also a factor to consider as each heuristic much be compared

#### Effective Branching Factor

- total number of nodes generated is $N$
- the solution depth is $d$
- $b^*$ is the branching factor that a uniform tree of depth $d$ would need to have to contain $N+1$ nodes

$$
N+1 = 1 + b^* + (b^*)^2+...+(b^*)^d
$$

* if A* finds a solution at depth 4 using 40 nodes, then $b^* \approx 2.182$
* to solve, say $N+1 = x$, and solve for branching factor $b^*$

$$
1 + b^* + (b^*)^2 +...+(b^*)^d = x \\
1 + b^*(1 + b^* +...+(b^*)^{d-1}) = x \\
1 + b^*(x - (b^*)^d) = x \\
1 + b^*x -(b^*)^{d+1} = x \\
x = \frac{(b^*)^{d+1}-1}{b^* - 1}
$$



* a *good heuristic* achieves $b^* \approx 1$

## Other Search Algorithms

- **Depth-first search DFS**
  - may not return optimal path
- **Breadth-first search BFS**
  - will return optimal path
- **Iterative deepening search**
  - a version of DFS where a depth limit `d` is defined treating nodes at that depth as leaves
  - at every iteration DFS is ran with `d++` but beginning at `d = 0`
  - at every iteration, the leaf nodes are checked as goal states
  - this will return an optimal path and sometimes quicker than BFS
- **Bidirectional search**
  - expand on both the goal state and start state
  - when the frontiers meet in the middle, combine the two resulting paths

### Comparing Algorithms

* **Time complexity**
* **Space complexity**
* **Completeness**: if a solution exists, will it be found
* **Optimality**: is the found solution optimal
