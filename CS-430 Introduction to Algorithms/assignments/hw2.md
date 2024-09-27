# Homework 2

Yousef Suleiman | Due: Feb 6

## Question 1

*I am assuming by "2k" you mean $2^k$*

###### Claim

We are trying to prove that at level $k$, the number of nodes is $N(k) \le 2^k$.

###### Base Case

When $k=0$ the tree has $N(0)=1$ nodes where $1 \le 2^0$ such that $N(k) \le 2^k$ holds for $k=0$.

###### Inductive Hypothesis

Assume that for some $k=j$ that $N(k) \le 2^k$ holds (binary trees with $j$ levels have less than or equal to $2^j$ nodes).

###### Inductive Step

- take binary trees with levels $k = j+1$ where on level $j$, nodes can have at most 2 children on $j+1$
- thus, the total number of nodes at level $j + 1$ is at most twice the number of nodes on $j$
- based on our hypothesis, $N(j) \le 2^j$
- therefore, at most, the number on $j+1$ is $2 * 2^j$ such that $N(j + 1) \le 2^{j+1}$​ also holds

## Question 2

###### Guess

$T(n) = \Omega(n \text{ lg } n)$ that is $T(k) \ge ck \text{ lg } k$ for $k \le n$

###### Prove $T(k) \ge ck \text{ lg } k$

- $T(k) = 2T(\lfloor \frac k2 \rfloor) + k \ge 2 c \lfloor \frac k2 \rfloor \text{ lg } \lfloor \frac k2 \rfloor + k$

## Question 3



 