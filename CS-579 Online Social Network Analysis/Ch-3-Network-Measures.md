# Network Measures

* **Centrality**: who are the most influential individuals (most important node)

## Centrality

#### Degree Centrality

Ranks nodes with more connections higher in terms of centrality
$$
C_d(v_i) = d_i
$$
$d_i$ is degree (number of friends) for node $v_i$ (length 1 paths)

##### Normalizing Degree Centrality

* normalized by maximum *possible* degree

$$
C_d^\text{norm}(v_i) = \frac{d_i}{n-1}
$$

* normalized by maximum degree

$$
C_d^\text{max}(v_i) = \frac{d_i}{\max_jd_j}
$$

* normalized by degree sum

$$
C_d^\text{sum}(v_i) = \frac{d_i}{\sum_j d_j} = \frac{d_i}{2|E|} = \frac{d_i}{m}
$$

#### Eigenvector Centrality

* Having more friends does not by itself guarantee someone is more important but having more *important friends* provides a stronger signal
* Eigenvector centrality generalizes degree centrality by looking at the importance of a node's neighbors

$$
\lambda C_e = A^TC_e
$$

- where $C_e$ is eigenvector of adjacency matrix $A^T$
- $\lambda$ is the corresponding eigenvalue
- Use the largest eigenvalue $\lambda$ to compute $C_e$
  - use $\det(A-\lambda I)=0$ to find $\lambda$
  - use $(A-\lambda I)C_e = \bf0$ to find $C_e$ where $\bf0$ is a vector of zeros

###### Examples 

![image-20230301103534996](images\image-20230301103534996.png)

#### Katz Centrality

* A major problem with eigenvector centrality is with directed graphs
* Centrality only passes over *outgoing* edges and in special cases such as when a node in a directed acyclic graph, the centrality can become zero
* To resolve, we add the bias term $\beta$ to centrality values for all nodes

$$
\bf{C}_\text{Katz}(v_i) = \alpha \sum_{j=1}^{n}A_j, _i \bf{C}_\text{Katz}(v_j) + \beta \\
$$

- Rewrite in vector form and solve for $\bf{C}_\text{Katz}$:

$$
\bf{C}_\text{Katz} = \beta ( \bf{I} - \alpha A^T)^{-1} * \bf{1}
$$

- where $\bf{1}$ is a vector of all ones, $\bf{I}$ is identity matrix

- In practice we chose an $\alpha < 1/\lambda$ where $\lambda$ is the largest eigenvalue for $A^T$
  - Recall eigenvalues are calculated by $|A-\lambda I|=0$ (i.e. the determinant equals $0$) which results in a polynomial where values for $\lambda$ are solved for
- The larger $\alpha$ is, the more the effect of $\beta$ is reduced
  - When $\alpha=0$, the Katz centrality will be $\beta$ for all nodes

###### Examples

![image-20230301104250613](images\image-20230301104250613.png)

#### PageRank

* Problem with Katz Centrality is in directed graphs, when a node has high centrality, it passes **all** its centrality along **all** of its out links
* This is less desirable since not everyone known by a well-known person is well-known

- Solution: divide the value of passed centrality by the number of outgoing links or the out-degree $d_{out}$

$$
C_p(v_i) = \alpha \sum_{j=1}^{n} A_j, _i \frac{C_p(v_j)}{d_j^{out}} + \beta
$$

* Rewrite and solve

$$
\bf{C_p} = \beta (\bf{I} - \alpha A^T D^{-1})^{-1} * \bf{1}
$$

- where $D=\text{daig}(d^\text{out}_1,d^\text{out}_2,...d^\text{out}_n)$ or a diagonal matrix with the sum of all columns on $A$
- again, we choose an $\alpha < 1/\lambda$ but for $A^T D^{-1}$ which always has $\lambda=1$ such that $\alpha < 1$

##### Alternative Approach to PageRank

Use the power method iteratively

1. All nodes have the same centrality at step 0 ($ 1 / n $) where $n$ is the nodes in the graph
2. At the next step take the previous steps centralities and calculate the new centralities as all the sum of all in-neighbor's centralities divided by that neighbor's out degree
3. Iterate until change is very small

#### Betweenness Centrality

* another way of looking at a centrality is by how important nodes are in connected other nodes

$$
C_b(v_i) = \sum_{s \ne t \ne v_i} \frac{\sigma_{st}(v_i)}{\sigma_{st}}
$$

- where $\sigma_{st}$ is the number of shortest paths from vertex $s$ to $t$ (a.k.a. *information paths*)
- $\sigma_{st}(v_i)$ is the number of shortest paths from $s$ to $t$ that *goes through* $v_i$ 

##### Normalizing Betweenness Centrality

- the best case is that $v_i$ is on all shortest paths from every pair of nodes $s, t$ such that

$$
\frac{\sigma_{st}(v_i)}{\sigma_{st}} =1\\
\sum_{s \ne t \ne v_i} 1 = 2 {n-1 \choose 2} = (n-1)(n-2)
$$

Thus the max value is $(n-1)(n-2)$ and 
$$
C^{\text{norm}}_b(v_i) = \frac{C_b(v_i)}{2 {n-1 \choose 2}}
$$

###### Examples

![image-20230206142402534](images\image-20230206142402534.png)

#### Closeness Centrality

* the intuition is that influential nodes can quickly reach other nodes (average shortest path)

$$
C_c(v_i) = \frac{1}{\bar{l}_{v_i}} \\
\bar{l}_{v_i} = \frac{1}{n-1} \sum_{v_j \ne v_i} l_{i,j}
$$

* where $l_{i,j}$ is shortest path length from $i$ to $j$

###### Examples

![image-20230206144925646](images\image-20230206144925646.png)

![image-20230206145202990](images\image-20230206145202990.png)

## Group Centrality

* instead of measuring centrality for a single, these measures can be generalized for a group of nodes
* a simple approach is to replace all nodes in a group with a *super node* 
* let $S$ denote a set of nodes in the group and $V$ is the set of outsiders

###### Examples

Consider $S=\{v_2, v_3\}$

![image-20230206150221249](images\image-20230206150221249.png)

## Friendship Patterns

### Transitivity

> "When a friend of my friend is my friend"

$$
(a \text{ R } b) \and(b \text{ R } c) \rightarrow (a \text{ R } c)
$$

- if $a$ has a transitivity relation $R$ with $b$ and $b$ has a transitivity relation with $c$ then $a$ must have a transitivity relation with $c$

- the higher the transitivity is in a graph, the closer it is to being a complete graph

#### Global Clustering Coefficient

- measures transitivity in an **undirect** graph
- basically, it counts paths of length 2 and checks if the 3rd edge exists

$$
C = \frac{|\text{Closed paths of length 2}|}{|\text{Paths of length 2}|} \\
$$

- or we can count triangles (as every triangle has 6 closed paths of length 2)

$$
C = \frac{(\text{Number of triangles})\times6}{|\text{Paths of length 2}|}
$$

- or we can rewrite as:

$$
C = \frac{(\text{Number of triangles}\times3)}{\text{Number of connected triples of nodes}}
$$

- where a **triple** is an **ordered** set of 3 nodes
  - **open triple**: connected by 2 edges
  - **closed triple**: connected by 3 edges
  - note that $v_i, v_j, v_k$ are different triples than  $v_i, v_k, v_j$ as order matters
    but  $v_i, v_j, v_k$ is the *same* triple as  $v_k, v_j, v_i$ because they allude to the same triangle 

###### Examples

![image-20230222175534170](images\image-20230222175534170.png)
$$
C = \frac{(\text{Number of triangles}\times3)}{\text{Number of connected triples of nodes}}\\
= \frac{2}{2 \times 3 + 2} = 0.75
$$

- where we have 2 triangles
- each triangle then has 3 connected triples
  - for example, the upper triangle has $v_1v_2v_3,v_2v_3v_1,v_3v_1v_2$
- and we have 2 extra connected triples of $v_2v_1v_4, v_2v_3v_4$

#### Local Clustering Coefficient

- measures transitivity at node level
  - *measures how well a node's neighbors are connected*
- commonly used for undirected graph
- computes how strong neighbors of a node $v$ are themselves connected

$$
C(v_i) = \frac{\text{Number of pairs of neighbors of $v_i$ that are connected}}{\text{Number of pairs of neighbors of $v_i$}}
$$

- where in an **undirected graph**, the denominator can be written as

$$
{d_i \choose 2} = d_i(d_i-1)/2
$$

- the numerator can be $3*|\text{Number of triangles containing $v_i$}|$

###### Examples

![image-20230222180523649](images\image-20230222180523649.png)

- where the thin lines are connections *to* neighbors
- solid lines are connected neighbors
- dashed lines are non existent connections

$C(v_1)=1$ when all neighbors are connected

$C(v_1)=0$ when none of the neighbors are connected

### Reciprocity

> "If you become my friend, I'll be yours"

- reciprocity is a simplified version of transitivity that considers closed loops of lengths 2 
- if a node $v$ is connected to node $u$ and $u$ connects to $v$ then $u$ exhibits reciprocity

$$
R = \frac{1}{m} \text{Tr}(A^2)
$$

- where $A$ is an adjacency matrix
- $m$ is number of edges
- $\text{Tr}$ is the trace or sum of all diagonal elements such that

$$
\text{Tr}(A) = A_{1,1} + A_{2,2} + ...+A_{n,n}
$$

- Not that the formula as $A^2$ in $\text{Tr}$


###### Examples

![image-20230222181756551](images\image-20230222181756551.png)

Reciprocal nodes are $v_1,v_2$
$$
A^2 = A \times A =
\begin{bmatrix}
1&1&0\\
0&1&1\\
1&0&0
\end{bmatrix} \\
R = \frac{1}{m}\text{Tr}(A^2) = \frac{1}{4}*2 = \frac{1}{2}
$$

## Balance and Status

### Social Balance Theory

Consistency in friend / foe relationships

> The friend of my friend is my friend
> The friend of my enemy is my enemy
> The enemy of my enemy is my friend
> The enemy of my friend of my enemy

In a network

- positive edges denote friendships $w_{i,j}=1$
- negative edges denote enemies $w_{i,j}=-1$

Triangle of nodes $i,j,k$ is balanced if and only if
$$
w_{i,j}*w_{j,k}*w_{k,j} \ge 0
$$
![image-20230222183240480](images\image-20230222183240480.png)

### Social Status Theory

How consistently individuals are assigning status to their neighbors 

- **Status**: how prestigious an individual is ranked within society

> If $X$ has a higher status than $Y$ and $Y$ has a higher status that $Z$ then $X$ should have a higher status than $Z$

![image-20230222184933293](images\image-20230222184933293.png)

- a directed $+$ edge from $X$ to $Y$ shows $X$ has a higher status that $Y$ and $-$ is opposite

> What I'm thinking: convert all edges to either $+$ or $-$ by changing direction and look for cycles and if a cycle exists, it is unstable

## Similarity

### Structural  Equivalence

- we look at the neighborhood *shared* by 2 nodes
- the size of the neighborhood defined how similar they are

Vertex similarity:
$$
\sigma(v_i,v_j) = |N(v_i) \cap N(v_j) |
$$

- we can normalize in two ways:

Jaccard similarity
$$
\sigma_\text{Jaccard}(v_I,v_j) 
= \frac{|N(v_i) \cap N(v_j) |}{|N(v_i) \cup N(v_j) |}
$$
Cosine similarity
$$
\sigma_\text{Cosine}(v_I,v_j) 
= \frac{|N(v_i) \cap N(v_j) |}{\sqrt{|N(v_i)|| N(v_j) |}}
$$

- the neighbor $N(v)$ often excludes the node $v$ itself 

  - **Issue**: connected nodes not sharing a neighbor will be assigned zero similarity

  - **Solution**: we can assume nodes are included in their neighborhoods

    *Note this is a simplification only related to similarity. If it is note explicitly mentioned, do not make this simplification in the definition of **neighbor*** 

### Similarity Significance

- compare the calculated similarity value with its expected value where vertex pick their neighbors *at random*
-  for vertices $v_i,v_j$ with degrees $d_i,d_j$ this expectation is $d_id_j/n$
- we can rewrite the neighborhood overlap as

$$
\sigma(v_i,v_j) = |N(v_i)\cap N(v_j)| = \sum_k A_{i,k}A_{j,k}
$$

#### Normalized Similarity

$$
\sigma_{\text{significance}}(v_i,v_j)=
\sum_k (A_{i,k}-\bar A_i)(A_{i,k}-\bar A_j) \\
\bar A_i = \frac{1}{n}\sum_k A_{i,k}
$$

- this also measures the covariance of $v_i,v_j$

To normalize to **Pearson correlation coefficient**:
$$
\sigma_{\text{pearson}}(v_i,v_j)=
\frac{\sigma_{\text{significance}}(v_i,v_j)}
{\sqrt{\sum_k (A_{i,k}-\bar A_i)^2}
\sqrt{\sum_k (A_{i,k}-\bar A_j)^2}}
$$

- where the range of $\sigma_\text{pearson} \in [-1,1]$

### Regular Equivalence

- instead of looking at neighbors shared between individuals, look at how neighborhoods themselves are similar

> Athletes are similar not because they know each other in person, but since they know similar individuals, such as coaches, trainers, other players...

- $v_i,v_j$ are similar when their neighbors $v_k$ and $v_l$ are similar

$$
\sigma_\text{regular}(v_i,v_j) = \alpha \sum_{k_,l} A_{i,k}A_{j,l} \sigma_\text{regular}(v_k,v_l)
$$

- the equation is hard to solve since it is recursive so we relax the definition as such

$$
\sigma_\text{regular}(v_i,v_j) = \alpha \sum_k A_{i,k}\sigma_\text{Regular}(v_k,v_j)\\ \implies
\sigma_{regular} = (\bf{I} - \alpha A)^{-1}
$$

- where the second one is in matrix form
- when $\alpha > 1/\lambda_\text{max}$ the matrix is not invertible

###### Examples

![image-20230222192941847](images\image-20230222192941847.png)

- any row / column of this matrix shows the similarity to other vertices
- where vertex 1 is most similar (other than itself) to vertices 2 and 3
- nodes 2 and 3 have the highest similarity (regular equivalence)