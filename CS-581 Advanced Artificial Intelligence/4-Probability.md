# Probability

[toc]

Agents often need reason in an uncertain environment. Examples of uncertainty:

- imperfect data (low resolution images)
- imperfect knowledge (medical diagnosis)
- changing data (traffic, flu season)

### Random Variables

Variables have domains

- binary (`True` or `False`)
- categorical (`red`, `green`, `blue`)
- real-valued ($73.2$)

a *possible world* is a an assignment to all variables of interest

#### Notations

- $X$ is a random variable
- $x$ is a particular value of $X$
- $Val(x)$ is the set of values $X$ can take
- $\bf{X}$ is a set of random variables
- $\bf{x}$ is an assignment to all variables in $\bf{X}$

### Probability Model

- associates a numerical probability $P(w)$ with each possible world $w$
- $P(w)$ sums to $1$ over all possible worlds
- an *event* is the set of possible worlds where a given predicate is true
  - "roll two dice" 
  - the possible worlds are $(1,1),(1,2),..., (6,6)$ with 36 possible worlds
  - predicate is "two dice sum to 10"
  - event is ${(4,6), (5,5), (6,4)}$

### Axioms of Probability

1. $P(\alpha)$ for some proposition $\alpha$ is between $[0,1]$
2. $P(\text{true}=1), P(\text{false}=0)$
3. $P(a \or b) = P(a) + P(b) - P(a \and b)$

#### Example: Prove $P(\neg a) = 1 - P(a)$

$$
P(a \or \neg) = P(a) + P(\neg a) - P(a \and \neg a) \\
P(\text{true}) = P(a) + P(\neg a) - P(\text{false}) \\
1 = P(a) + P(\neg a) = 0 \\
P(\neg a) = 1 - P(a)
$$

### Joint Distribution

- we have $n$ random variables $V_1, ..., V_n$
- $P(V_1, ..., V_2)$ associates a probability for each possible world - *joint distribution*
- there are $2^n$ entries there the variables are all binary

<img src="images\image-20230209162554577.png" alt="image-20230209162554577" style="zoom:67%;" />

### Prior and Posterior

* Prior probability is probability of proposition in absence of any other information
* Posterior probability is a conditional probability 

### Marginalization

* given a distribution over $n$ variables, you can calculate the distribution over any subset of the variables by summing out the irrelevant ones 

Given a joint probability distribution of $A, B, C$
$$
P(A) = \sum_B \sum_C P(A, B, C) \\
P(B) = \sum_A \sum_C P(A, B, C) \\
P(C) = \sum_A \sum_B P(A, B, C) \\
$$

### Conditional Probability  

$$
P(A | B) = \frac{P(A,B)}{P(B)}
$$

### Bayes' Rule

$$
P(B|A)=\frac{P(A|B) * P(B)}{P(A)}
$$

$P(\text{cause}|\text{effect}) = P(\text{effect}|\text{cause})*P(\text{cause}) / P(\text{effect})$

in practice it is easier to get probabilities for $P(\text{effect}|\text{cause})$ and $P(\text{cause})$ than for $P(\text{cause}|\text{effect})$

### Chain Rule

$$
P(X_1, X_2, X_3, ..., X_k) = P(X_1) * P(X_2 | X_1) * P(X_3, X_1, X_2) * ... \\
$$

### Marginal Independence $a \perp b$

An event $\alpha$ is independent of $\beta$ in $P$ if

- $P(\alpha | \beta) = P(\alpha)$ or
- $P(\alpha, \beta) = P(\alpha) P(\beta)$

#### Marginal Independence Example

|  $X$  |  $Y$  | $P(X, Y)$ |
| :---: | :---: | :-------: |
| true  | true  |  $0.18$   |
| true  | false |  $0.42$   |
| false | true  |  $0.12$   |
| false | false |  $0.28$   |

$$
P(X) = P(X, Y) + P(X, \neg Y) \\
P(Y) = P(X, Y) + P(\neg X, Y)
$$

After getting the marginal probabilities of $X$ and $Y$ verify this holds for both:
$$
P(\alpha, \beta) = P(\alpha) P(\beta)
$$

### Conditional Independence $a  \perp b | \gamma$

- two events are independent *given* another event
- an event $a$ is independent of event $b$ given event $\gamma$ in $P$ if
  - $P(a | b, \gamma) = P(a | \gamma)$ or
  - $P(b, \gamma) = 0$
- **Proposition**: a distribution $P$ satisfies $a  \perp b | \gamma$ if and only if
  - $P(a, b | \gamma) = P(a | \gamma) P(b | \gamma)$

###  Number of Parameters :star:

- assuming everything in binary
- the number of parameters required for these distributions are:
  - $P(A)$ requires 1 independent parameter 
    for example: store for $A = \text{true}$ and then do 1 minus that for $\text{false}$
  - $P(V_1, V_2, ..., V_n)$ requires $2^n - 1$
  - $P(V_1 | V_2)$ requires 2 independent parameters
  - $P(V_1, ..., V_n | V_{n+1}, ..., V_{n+m})$ requires $2^m * (2^n - 1)$
- assuming everything is *not* binary
  - $P(A) = <x, y, z>$ requires 2 independent parameters
  - $P(X) = <p_1, ..., p_n>$ requires $n-1$ 
  - $P(X_1, X_2)$ where $X_1$ has $n$ possibilist and $X_2$ has $m$, then it requires $n*m -1$
  - $P(\overset{n}{X_1}, \overset{m}{X_2})$ requires $m (n - 1)$
  - $P(\overset{a}{y_1}, \overset{b}{y_2}, \overset{c}{y_3} | \overset{d}{x_1}, \overset{e}{x_2}$ requires $d*e*(a*b*c-1)$

##  Continuous Space

- assume $X$ is continuous and $\text{Val}(X) = [0, 1]$ (the value of $X$ is between $0, 1$)
- then the probability of any real number is $0$ such that $P(X=0.5)=0$

### Probability Density Function

Instead of asking the probability that a random variable is an instance, we can ask:
$$
P(X \leq a) = \int_{-\infin}^a p(x) dx \\
P(a \leq X \leq b) = \int_{a}^b p(x) dx \\
$$

#### Uniform Distribution

over $[a, b]$
$$
p(x) = \frac{1}{b-a} \text{ if } a \leq x \leq b \\
0 \text{ otherwise}
$$

#### Gaussian Distribution

$$
p(x) = \frac{1}{\sqrt{2 \pi} \sigma} e ^{\frac{(x-\mu)^2}{2 \sigma^2}}
$$

- where $\mu$ is mean and $\sigma ^2$ is variance (notice it is squared)
- note the exponent is $\frac{(x-\mu)^2}{2 \sigma^2}$

![image-20230214145622781](images\image-20230214145622781.png)

- note that $p(x)$ can be greater than 1 (but not less than 0) so long as the area equals 1

#### Conditional Probability

- assuming $X$ continuous and $Y$ discrete
- we can't say $P(Y | X = x) = P(Y, X=x) / P(X = x)$ as $P(X = x) = 0$
- instead we say

$$
P(Y|X=x) = \lim_{\epsilon \rightarrow 0} P(Y | x - \epsilon \leq X \leq x + \epsilon)
$$

- assuming $X$ discrete and $Y$ continuous 
  - $P(Y|X=a)$
  - $P(Y|X=b)$
  - ...
  - each of these are their own distributions and sum to 1

### Expectation

$$
E_P[X] = \sum_X xP(x) \\ \\
E_P[X] = \int_X xp(x)dx
$$

#### Expectation Properties

$$
E_P[aX+b] = aE_P[X] + b \\ \\
E_P[X+Y] = E_P[X] + E_P[Y] \\ \\
E_P[X|y] = \sum_X xP(x|y) \\ \\
E_P[X*Y] = E[X] * E[Y] \text{ only if they're independent!}
$$



### Variance

both of these are equivalent and the second can be derived from the first
$$
V_P[X] = E_P[(X - E_P[X]^2)] \\ \\
V_P[X] = E_P[X^2] - (E_P[X])^2
$$

#### Variance Properties

$$
V_P[aX + b] = a^2V_P[X]
$$
