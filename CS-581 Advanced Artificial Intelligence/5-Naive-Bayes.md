# Naïve Bayes

[toc]

## Classification

Given a dataset $D=\{\textlangle\vec{X}[m], Y[m] \textrangle\}$ where

- $\vec{X}$ is input
- $Y$ is the discrete-values output

Learn a function $f(\vec{X}) \rightarrow Y$

### Algorithms 

(the ones we will learn in this course)

- Naïve Bayes
- Logistic Regression
- Neural Networks

## Bayes' Classifier

### Bayes' Rule in Application to Classifier

- input $\vec X = \textlangle X_1, X_2, ..., X_n \textrangle$
- output $Y = \{y_1, y_2, ..., y_k\}$

$$
P(Y|\vec X) = \frac{P(\vec X | Y) P(Y)}{P(\vec X)} = \frac{P(Y)P(X_1, X_2,..., X_n | Y)}{P(X_1, X_2, ..., X_n)} \\
P(X_1, X_2,..., X_n) = \sum_Y P(Y = y)P(X_1, X_2,...,X_n|Y=y)
$$

- note that the second equation is the denominator of the first
- in general, the above probability distribution is used as such:

$$
P(Y|\vec X) = \textlangle \frac{P(\vec X|y_1)}{\sum}, \frac{P(\vec X|y_2)}{\sum},..., \frac{P(\vec X|y_k)}{\sum} \textrangle
$$

- where $\sum$ is the summation of all the above terms
- assuming all variables are, how many independent parameters are needed for the Bayes' classifier 
  - $2^{n+1} - 1$
  - where there are $1+(2^n-1)*2$ for the numerator and none for the denominator as you can calculate without estimating from data

### Naïve Bayes' Assumption

$$
P(X_1, X_2,..., X_n|Y) = P(X_1|Y)*P(X_2|X_1, Y)*...*P(X_n|X_1,...,X_{n-1}, Y) \\
= P(X_1|Y) * P(X_2|Y) * ... * P(X_n|Y) \\
= P(Y) * \prod_{i=1}^n P(X_i|Y)
$$

- Note $\prod$ is the product of the expressions in terms of each $X$
- As we assume all $\vec X$ are independent given $Y$

$$
P(Y|\vec X) \propto P(\vec X | Y)P(X) = P(Y) * \prod_{i=1}^n P(X_i|Y)
$$

- Thus Naïve Bayes' uses:

$$
P(Y|\vec X) \propto P(Y) * \prod_{i=1}^n P(X_i|Y)\\ \\
$$

- Note that this is "proportional to" meaning after calculating right hand side, the probabilities must be then normalized to equal to $1$
- The number of independent parameters are $2n+1$ which is a lot less than Bayes' $2^{n+1} - 1$

### Example 1 of Naïve Bayes

$$
Y=\{A, R\}, P(Y) = \textlangle 0.3, 0.7\textrangle
$$

- where 30% are accepted and 70% are rejected for a loan

$$
CS = \{L, H\} \\
P(CS|A) = \textlangle0.2, 0.8\textrangle \\
P(CS|R) = \textlangle0.9, 0.1\textrangle
$$

- where the credit score is either low or high then the probabilities of each credit score given $Y$

$$
INC = \{L,M,H\} \leftarrow\text{ income is low, middle, high}\\
P(INC|A) = \textlangle 0.2,0.3,0.5 \textrangle\\
P(INC|R) = \textlangle 0.4,0.4,0.2 \textrangle \\ \\
MP = {T,F} \leftarrow \text{ missed payment is true, false} \\
P(MP|A) = \textlangle 0.25,0.75 \textrangle\\
P(MP|T) = \textlangle 0.8,0.2 \textrangle\\ \\
ST = {T,F} \leftarrow \text{ student is true, false} \\
P(ST|A) = \textlangle 0.9,0.1 \textrangle\\
P(ST|R) = \textlangle 0.8,0.3 \textrangle\\
$$

- [Number of Independent Parameters](4-Probability.md#Number-of-Parameters)
  - $P(Y)$ requires $1$
  - $P(CS|Y)$ requires $2$
  - $P(INC|Y)$ requires $2*(3-1)=4$
  - $P(MP|Y)$ requires $2$
  - $P(ST|Y)$ requires $2$

Say we get an instance with $\textlangle CS=L,INC=L,MP=T, ST=T \textrangle $, find the distribution for $Y$ given that instance:
$$
P(Y=A|L,L,T,T) \propto P(Y) * P(CS=L|Y)* P(INC=L|Y)* P(MP=T|Y)* P(ST=T|Y) \\
= 0.3 \times 0.2 \times 0.2 \times 0.25 \times 0.9 = 0.0027 \\ 
P(Y=R|L,L,T,T) \propto P(Y) * P(CS=L|Y)* P(INC=L|Y)* P(MP=T|Y)* P(ST=T|Y) \\
= 0.7 \times 0.9 \times 0.4 \times 0.8 \times 0.8 = 0.16128 \\
(0.0027n + 0.16128n) = 1 \rightarrow n \approx 6.098 \\
\bf{P}(Y|L,L,T,T) = \textlangle0.0027n, 0.16128n \textrangle =  \textlangle0.0165, 0.9825 \textrangle
$$

### Example 2 of Naïve Bayes

Find the Probabilities for being Cold and Brown

| Temperature $T$ | Color $C$ | Yes $Y$ | No $Y$ |
| :-------------: | :-------: | :-----: | :----: |
|       Hot       |  Orange   |    7    |   6    |
|       Hot       |   Green   |    9    |   5    |
|       Hot       |   Brown   |    4    |   7    |
|      Cold       |  Orange   |    9    |   3    |
|      Cold       |   Green   |    2    |   12   |
|      Cold       |   Brown   |    ?    |   ?    |

$$
\bf P(Y) = \textlangle \frac{31}{64}_\text{Yes},\frac{33}{64}_\text{No} \textrangle\\
\bf P(C | Y = \text{Yes}) =  \textlangle 
\frac{16}{31}_\text{Orange},
\frac{4}{31}_\text{Brown},
\frac{11}{31}_\text{Green} \textrangle\\
\bf P(C | Y = \text{No}) =  \textlangle 
\frac{9}{33}_\text{Orange},
\frac{7}{33}_\text{Brown},
\frac{17}{33}_\text{Green} \textrangle\\
\bf P(T | Y = \text{Yes}) =  \textlangle 
\frac{20}{31}_\text{Hot},
\frac{11}{31}_\text{Cold} \textrangle\\
\bf P(T | Y = \text{No}) =  \textlangle 
\frac{18}{33}_\text{Hot},
\frac{15}{33}_\text{Cold} \textrangle\\\\
\bf P(Y=\text{Yes} | \text{Cold},\text{Brown}) \propto 
P(\text{Yes}) P(\text{Cold}|\text{Yes})P(\text{Brown}|\text{Yes}) \\
= \frac{31}{64}\times\frac{11}{31}\times\frac{4}{31} \approx 0.022\\
P(\text{No}) P(\text{Cold}|\text{No})P(\text{Brown}|\text{No}) \\
= \frac{33}{64}\times\frac{15}{33}\times\frac{7}{33} \approx 0.049
\\ \text{Remember to normalize} \\
\bf P(Y | \text{Cold},\text{Brown}) = \textlangle0.022, 0.049n \textrangle =  \textlangle0.309, 0.691 \textrangle
$$

## Zero Probabilities

The Problem

- Lets say you have 1000 binary features $X_i$ and 1 binary class label $Y$ `{Yes, No}` (2001 parameters)
- For each $X_i$ you have $P(X_i|Y=\text{Yes}) = \textlangle a,b\textrangle$ for some $a,b > 0$ as well as for $P(X_i|Y=\text{No})$ having the same non-zeros
- Except there is one $X_{420}$ that has $P(X_{420}|Y=\text{Yes}) = \textlangle 0,1\textrangle$ but a $P(X_{420}|Y=\text{No})$ that is non-zero 
- Now for any $P(\text{Yes}) P(X_i|\text{Yes})...P(X_{1000}|\text{Yes}) = ...\times0\times...=a$ where $a=0$
- $P(\text{No}) P(X_i|\text{No})...P(X_{1000}|\text{No}) = b$
- **Normalizing will give $\frac{a}{a+b} = 0,\frac{b}{a+b}=1$**
- Such the zero probability feature with make it zero `Yes` for all instances
- Now imagine that $X_{420}$ also had $P(X_{420}|Y=\text{No}) = \textlangle 0,1\textrangle$
- **Normalizing will give $\frac{a}{a+b} = \text{NaN},\frac{b}{a+b}=\text{NaN}$**

## Bayesian Estimation

- We begin with a *prior* (guess or prior knowledge) distribution $P(\theta)$ and adjust it to a *posterior* (given data $\mathcal D$) distribution $P(\theta|\mathcal D)$ 
- We can find $P(\theta|\mathcal D) \propto P(\mathcal D|\theta) P(\theta)$
- **For example**, given $P(\theta)$ and the data $\mathcal{D}$ of $a$ heads and $b$ tails, then

$$
P(\theta | \mathcal D) \propto \theta^a(1-\theta)^b P(\theta)
$$

- Recall summation and condition rules

$$
P(x) = \sum_y P(x,y)\\
P(x|y) = \frac{P(x,y)}{P(y)}
$$



- Next, every time a new instance $X_\text{next}$ comes in, we can continue to adjust the distribution to a *predictive* distribution

$$
P(X_\text{next}|\mathcal D)=\int_0^1 P(X_\text{next},\theta|\mathcal D)d\theta \\
= \int_0^1  P(X_\text{next}|\theta,\mathcal D)P(\theta|\mathcal D)d\theta\\
= \int_0^1 P(X_\text{next}|\theta)P(\theta|\mathcal D)d\theta\\
\propto \int_0^1 P(X_\text{next}|\theta) \theta^a (1-\theta)^b P(\theta) d\theta
$$

1. Using summation rule over $\theta$ but with integral for continuous distribution
2. Using conditional rule
3. Remove $\mathcal D$ from 1st term as the next instance is independent of previous data
4. Substitute for posterior probability

- Now what is $P(X_\text{next}|\theta)$? It is $\theta$ if heads, and $1-\theta$ else

$$
\bf P(X_\text{next}|\mathcal D) \\
\propto \textlangle \int_0^1 \theta * \theta^a (1-\theta)^b P(\theta)d\theta,
\int_0^1  (1- \theta )*\theta^a (1-\theta)^b P(\theta)d\theta\textrangle \\
 = \textlangle \int_0^1 \theta^{a+1} (1-\theta)^b P(\theta)d\theta,
 \int_0^1 \theta^a (1-\theta)^{b+1} P(\theta)d\theta\textrangle
$$

- Remember to normalize

### Uniform Prior $P(\theta) = 1 = \text{Beta}(1,1)$

- Say $P(\theta)$ has a uniform distribution where $P(\theta) = 1$ on $\theta \in [0,1]$ and $0$ otherwise
- Then we can drop $P(\theta)$ as it equals to 1 in the integral and get this

$$
\bf P(X_\text{next}|\mathcal D)  \propto \textlangle \int_0^1 \theta^{a+1} (1-\theta)^b d\theta,
\int_0^1  \theta^a (1-\theta)^{b+1} d\theta\textrangle
$$

- After integrating, you'll find

$$
\int_0^1 \theta^{a} (1-\theta)^bd\theta = \frac{a!b!}{(a+b+1)!}
$$

- Or for the distribution it is

$$
\bf P(X_\text{next}|\mathcal D)  \propto \textlangle 
\frac{(a+1)!b!}{(a+1+b+1)!},
\frac{a!(b+1)!}{(a+b+1+1)!}
\textrangle
$$

- **And for normalizing we get** (*Laplace Smoothing*) **(Predictive)**

$$
\bf P(X_\text{next}|\mathcal D)  \propto \textlangle 
\frac{a+1}{a+b+2},
\frac{b+1}{a+b+2}
\textrangle
$$

- To calculate posterior distribution

$$
P(\theta|\mathcal D) = \gamma * \theta^a(1-\theta)^b
$$

- Adding a normalization constant $\gamma$ then integrate

$$
\int \gamma * \theta^a(1-\theta)^b d\theta = 1 \\
\gamma \int \theta^a(1-\theta)^b d\theta = 1 \\
\gamma \frac{a!b!}{(a+b+1)!}= 1 \\
\gamma = \frac{(a+b+1)!}{a!b!} \\
$$

- **And putting it together we get** (*Beta distribution*) **(Posterior)**

$$
P(\theta|\mathcal D) = \frac{(a+b+1)!}{a!b!} * \theta^a(1-\theta)^b
$$

- where a beta distribution looks like this

$$
\text{Beta}(a,b) = \gamma * \theta^{a-1}(1-\theta)^{b-1}
$$

### Nonuniform Prior $\text{Beta}(\alpha,\beta)$

- Now say prior $P(\theta) = \text{Beta}(\alpha,\beta)$
- **You will find (Predictive)**

$$
\bf P(X_\text{next}|\mathcal D) = 
\textlangle
\frac{a+\alpha}{a+b+\alpha + \beta},
\frac{b+\beta}{a+b+\alpha + \beta}
\textrangle
$$

- Note that $\text{Beta}(1,1)$ is the uniform distribution
- **And (Posterior)**

$$
\bf P(\theta|\mathcal D) \propto \theta^{a+\alpha-1}(1-\theta)^{b+\beta-1} = \text{Beta}(a+\alpha,b+\beta)
$$

### Some Properties of Beta Distribution

$$
\text{Beta}(a,b) = \gamma * \theta^{a-1}(1-\theta)^{b-1}
$$

- Mean: $a/(a+b)$
- Mode: $(a-1)/(a+b-2)$
- Note that the mode is closer to the mean when $a,b$ are both large

> We look at the mean of the distribution for predictions

## Multiplying Several Probability Values

**Racall**: say we have $X_1, X_2, ..., X_n, Y$

- Using a Bayes' Classifier, to find the distribution of $P(Y|\vec X) \propto P(Y) \Pi_i P(X_i|Y)$ such that

$$
P(Y=\text{Yes})\Pi_iP(X_i|Y=\text{Yes}) = a \\
P(Y=\text{No})\Pi_iP(X_i|Y=\text{No}) = b \\
P(Y|\vec X) = \textlangle \frac{a}{a+b}, \frac{b}{a+b} \textrangle
$$

- The first issue was with **Zero Probabilities** which was resolved with **Bayesian Estimation**
- However when we are doing many products $\Pi$ over many small values, we can run into underflow problems causing the entire evaluation to be `0` 
- The solution is to use *logarithmic values* similar to [Parameter Estimation](6-Parameter-Estimation.md) with a couple more math tricks
  - We have a product $\Pi$ of probabilities $p_i$
  - We take the log of the product and then take the sum of each log


$$
\ln[P(\text{Yes})\Pi_iP(X_i|\text{Yes})] = \ln P(\text{Yes}) + \sum_i\ln P(X_i|\text{Yes}) = \ln a \\
\ln[P(\text{No})\Pi_iP(X_i|\text{No})] = \ln P(\text{No}) + \sum_i\ln P(X_i|\text{No}) = \ln b \\
\frac{a}{a+b} = e^{\ln\frac{a}{a+b}}=e^{\ln (a)-\ln(a+b)} \\
\frac{b}{a+b} = e^{\ln\frac{b}{a+b}}=e^{\ln (b)-\ln(a+b)}
$$

- Now we need to calculate $\ln(a+b)$ using $\ln a,\ln b$

$$
\ln(a+b) = \ln(e^{\ln a}+e^{\ln b}) \\
= \ln[(e^{\ln (a)+z}+e^{\ln (b)+z})/e^z]\\
= \ln(e^{\ln (a)+z}+e^{\ln (b)+z}) - z
$$

- where $z$ is some constant, large values. It should be close to the values of $\ln a, \ln b$

