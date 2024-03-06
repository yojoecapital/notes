# Unsupervised sequence labeling

<span style="color:red">I don't get this at all</span>

## 3 Basic POS Computations

- model *m* contains transitions and output probabilities
  1. compute the probability of a text: $P_m(W_{1,N})$
  2. compute maximum probability tag sequence: $\underset{T_{1,N}}{\text{argmax }}P(T_{1,N}|W_{1,N})$
     - use the **Viterbi Algorithm**
     - <span style="color:red">I don't understand it</span>
  3. compute maximum likelihood model: $\underset{m}{\text{argmax }}P_m(W_{1,N})$
     - this is what will be focused on here

## Notation

- $N$: length of corpus
- $N_t$: number of distinct tags
- $\lambda_{ij}$: estimate of $P(t^i \rightarrow t^j)$ 
  - (translation probabilities)
- $\phi_{jk}$: estimate of $P(w^k|t^j)$
  - (emission probabilities)
- $a_k(i) = P(w_{i,k-1}, t_k=t_i)$
  - (forward algorithm)
- $b_k(i)=P(w_{k+1,N}|t_k=t_i)$
  - (backwards algorithm)

## EM for POS Tagging

1. start with some initial model (HMM)
2. compute the probability of each state (tag) for each output symbol, using the current model
3. use this tagging to revise the model, increasing the probability of the most likely transitions and outputs
4. repeat until convergence

**Note**: no labeled training needed!
