# Binary Search Tree (BST)

- each node contains a quintuple
  - an index
  - a key
  - pointers to its left, right child, and parent
- all keys in the left subtree of $x$ should be less than or equal to that of $x$
  - and all in right subtree should greater than or equal to that of $x$
- search, insert, delete, predecessor, successor, minimum, maximum operations are all $O(h)$ where $h$ is the height of the tree
- in a standard BST, $h$ is determined by the order of inserting $n$ items
  - the best case $h = n \text{ lg } n$
  - the worst case $h = n$

## Tree Traversals

```mermaid
graph
	25 --> 15
	25 --> 50
	15 --> 10
	15 --> 22
	10 --> 4
	10 --> 12
	22 --> 18
	22 --> 24
	50 --> 35
	50 --> 70
	35 --> 31
	35 --> 44
	70 --> 66
	70 --> 90
```

### In Order

`4, 10, 12, 15, 18, 22, 24, ...`

1. left subtree
2. root
3. right subtree

### Pre-Order

`25, 15, 10, 4, 12, 22, 50, 35, 31, 44, 70, 66, 90`

1. root
2. left subtree
3. right subtree

### Post-Order

`4, 12, 10, 18, 24, 22, 15, 32, 44, 35, 66, 90, 70, 50, 25`

1. left subtree
2. right subtree
3. root

## Searching

<img src="images/image-20240306075010682.png" alt="image-20240306075010682" style="zoom:50%;" />

## Successor

<img src="images/image-20240306075242168.png" alt="image-20240306075242168" style="zoom: 40%;" />

## Insert

<img src="images/image-20240306075454205.png" alt="image-20240306075454205" style="zoom:50%;" />

## Delete

1. `z` has no children
   - just remove `z`
2. `z` has 1 child
   - replace `z` with its child
3. `z` has 2 children
   - replace `z` with its successor

## Rotation

![image-20240306080533274](images/image-20240306080533274.png)

```
# Right rotation pseudocode
function rightRotate(y):
    x = y.left
    T = x.right
    # Perform rotation
    x.right = y
    y.left = T
    return x
    
# Left rotation pseudocode
function leftRotate(x):
    y = x.right
    T = y.left
    # Perform rotation
    y.left = x
    x.right = T
    return y
```

