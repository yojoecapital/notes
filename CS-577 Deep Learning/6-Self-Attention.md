# Self-Attention

[toc]

## Sophisticated Input

- input can be a **vector**

<img src="images/image-20231010212526781.png" alt="image-20231010212526781" style="zoom:50%;" />

- input can can also be a **set of vectors**

<img src="images/image-20231010212537495.png" alt="image-20231010212537495" style="zoom:50%;" />

### Vector Set as Input 

- we can represent text as a set of vectors
  - one-hot encoding a lexicon
  - word embedding
- we can also represent audio as set of vectors 
- graphs are also is set of vectors (each node is a vector)
  - adjacency matrix where row is basically an edge vector

### What does output look like?

1. each vector has a corresponding label

<img src="images/image-20231010213123994.png" alt="image-20231010213123994" style="zoom: 50%;" />

<img src="images/image-20231010213202593.png" alt="image-20231010213202593" style="zoom:50%;" />

2. the whole sequence of vectors has a label

<img src="images/image-20231010213228685.png" alt="image-20231010213228685" style="zoom:50%;" />

<img src="images/image-20231010213244613.png" alt="image-20231010213244613" style="zoom:50%;" />

3. the model decides the number of labels itself

<img src="images/image-20231010213356830.png" alt="image-20231010213356830" style="zoom:50%;" />

> The focus of this lecture is (1) "each vector has a corresponding label"

---

## Sequence Labeling

<img src="images/image-20231010215902737.png" alt="image-20231010215902737" style="zoom:50%;" />

- consider this sequence of 4 fully connected networks (the `FC` represents fully connected)
- to consider the context, we can connect the neighbors together 
  - i.e. to distinguish between "I *saw*" and "a *saw*"
- however, this limits our *window* to only the neighbors
- is there a *window* that can cover the whole sequence?

### Self-attention

- a self-attention layer can capture the context information across the entire sequence

<img src="images/image-20231010220140779.png" alt="image-20231010220140779" style="zoom:50%;" />

- how can we find the relevant vectors in a sequence?

<img src="images/image-20231010220251477.png" alt="image-20231010220251477" style="zoom:50%;" />

#### Dot-product

<img src="images/image-20231010220348429.png" alt="image-20231010220348429" style="zoom:50%;" />

- one way to find the relevance between the 2 vectors is through dot product

#### Additive

<img src="images/image-20231010220440238.png" alt="image-20231010220440238" style="zoom:33%;" />

- another is through additive
- because of dot product's simplicity, it is used more often

### Calculating Self-attention

<img src="images/image-20231010220858359.png" alt="image-20231010220858359" style="zoom:50%;" />

- the output of our first node is known as the **query** whereas the others are **keys**
- the dot product between the query is taken between each key to get **attention scores** $\alpha$
- the attention scores $\alpha$ are taken to a SoftMax to get $\alpha'$, which is computed as:

$$
\alpha'_{1,i} = e^{a_{1,i}} / \sum_j e^{a_{1,j}}
$$

- then to extract information based on attention scores $\alpha'$, we can calculate the $b$ with respect to our query

<img src="images/image-20231010221345683.png" alt="image-20231010221345683" style="zoom:50%;" />

- where $b$ is calculate as:

$$
b^1 = \sum_i a'_{1,i}v^i
$$

- the query is taken *with respect to each node*

<img src="images/image-20231010220140779.png" alt="image-20231010220140779" style="zoom:33%;" />

- this entire process can be done through matrices as:

$$
Q = W^q I\\
K = W^k I\\
V = W^v I\\
A = K^\top Q\\
A' = \text{softmax}(A)\\
O = VA'
$$

<img src="images/image-20231010222303004.png" alt="image-20231010222303004" style="zoom:33%;" />

- where $I$ is our input vector
  - weights $W^q,W^k,W^v$ are learned parameters 
  - $O$ is our output vector

---

## Applications

- it is used a lot in NLP

  - transformers
  - BERT

- speech recognition

  - however, speech is often a very large vector sequence $L$
  - so $A'$ is dimension $L \times L$
  - instead, *truncated self-attention* is used where the attention is taken in a smaller *range* instead of the entire sequence

- it could also be used for images

  - consider and image with 3 channels

    <img src="images/image-20231010222852160.png" alt="image-20231010222852160" style="zoom:25%;" />

### Self-attention vs CNN

- **CNN** is a self-attention that can only attend in a *receptive field*
  - i.e. CNN is a *simplified self-attention*
  - Self-attention is the complex version of CNN

<img src="images/image-20231010223045776.png" alt="image-20231010223045776" style="zoom:50%;" />

### Self-attention vs RNN

- layers of RNNs are *nonparallel* whereas the outputs of self-attention are *parallel*
- it is hard for earlier memory cells to be considered in an RNN whereas the nodes in a self-attention are easy 

<img src="images/image-20231010223343691.png" alt="image-20231010223343691" style="zoom:33%;" />

---

## Multi-Head Self-Attention

- we take multiple heads on top $q,k,v$ for different types of relevance

<img src="images/image-20231011071729737.png" alt="image-20231011071729737" style="zoom:50%;" />

---

## Positional Encoding

- no position information is in self-attention
- each position has a unique positional vector $e^i$ which can be
  - hand-crafted or
  - learned from data

<img src="images/image-20231011071525259.png" alt="image-20231011071525259" style="zoom:50%;" />
