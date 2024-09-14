# Binary Search Trees

## Concept

BSTs are binary trees with the property that every node in the left subtree is smaller than the root and every node in the right subtree is large.

## Motivation

If a BST is balanced, search is in $O(\log n)$ as each iteration cuts the search space in half.

## Code

### Search

```py
def searchBST(root, val):
    """
    :type root: TreeNode
    :type val: int
    :rtype: TreeNode
    """
    if root.val == val:
        return root
    elif root.left and root.val > val:
        return searchBST(root.left, val)
    elif root.right:
        return searchBST(root.right, val)
    else:
        return None
```

### Insert

- search for the value you're inserting
- once you fall out of the tree, attach the node to that leaf

### Remove

#### Case 1: Node to be removed has 0 or 1 child

Just replace the node with its child.

#### Case 2: Node to be removed has 2 children

- replace the node with either
  1. the smallest value in its right subtree
  2. the largest value in its left subtree

```py
def minValueNode(root):
    curr = root
    while curr and curr.left:
        curr = curr.left
    return curr

def remove(root, val):
    if not root:
        return None
    
    if val > root.val:
        root.right = remove(root.right, val)
    elif val < root.val:
        root.left = remove(root.left, val)
    else:
        if not root.left:
            return root.right
        elif not root.right:
            return root.left
        else:
            minNode = minValueNode(root.right)
            root.val = minNode.val
            root.right = remove(root.right, minNode.val)
    return root
```

### Traversal

```py
def inorder(root):
    if not root:
        return    
    inorder(root.left)
    print(root.val)
    inorder(root.right)
    
def postorder(root):
    if not root:
        return    
    postorder(root.left)
    postorder(root.right)
    print(root.val)

def preorder(root):
    if not root:
        return    
    print(root.val)
    preorder(root.left)
    preorder(root.right)

```

#### BFS i.e. "level order traversal"

