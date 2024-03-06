# Transformer

[toc]

## Sequence-to-Sequence (Seq2Seq)

- input a sequence, output a sequence
- the output length is determined by model

<img src="images/image-20231011065640792.png" alt="image-20231011065640792" style="zoom:50%;" />

## Applications of Seq2Seq

- Text-to-Speech (TTS) Synthesis 
- Chatbot
- Syntactic Parsing (where you give a sentence and it returns a tree of POS tags)
- Multi-label Classification (each instance gets labeled with some set of classes)
- Object Detection

---

## What is Seq2Seq

<img src="images/image-20231011070333060.png" alt="image-20231011070333060" style="zoom:50%;" />

### Encoder

<img src="images/image-20231011070402007.png" alt="image-20231011070402007" style="zoom:33%;" />

- the encoder is built up by layers of inputs to blocks like this

<img src="images/image-20231011070728818.png" alt="image-20231011070728818" style="zoom:33%;" />

- each block is a [self-attention](6-Self-Attention.md) layer followed by a fully connected layer

<img src="images/image-20231011070859567.png" alt="image-20231011070859567" style="zoom:33%;" />

- the output of the self attention layer $a$ actually gets added to its original input $b$
  - this is called the *residual* (which is a vector)
  - the residual then goes through a layer *norm*
  
  <img src="images/image-20231011110043767.png" alt="image-20231011110043767" style="zoom:50%;" />

- finally, this norm output goes through the fully connected layer 
  - output also gets added to its original input (for another residual)
  - followed by another layer norm before its final output

<img src="images/image-20231011071219541.png" alt="image-20231011071219541" style="zoom:50%;" />

- the entire encoder looks like this

<img src="images/image-20231011071332976.png" alt="image-20231011071332976" style="zoom:50%;" />

---

### Decoder

- the encoder and decoder are similarly structured

<img src="images/image-20231011072402820.png" alt="image-20231011072402820" style="zoom:50%;" />

#### Decoder Autoregressive (AT)

<img src="images/image-20231011073112969.png" alt="image-20231011073112969" style="zoom:50%;" />

- with autoregressive, we only consider the previous outputs when going back into the decoder instead of all connections
  - this is why we use a [masked self-attention layer](#Masked Self-Attention)

##### Masked Self-Attention

- instead of considering all of the node connections, we only consider the previous connections
  - $b_1$ only connects to $a_1$
  - $b_2$ connects to $a_1,a_2$
  - $b_3$ connects to $a_1,a_2,a_3$...

<img src="images/image-20231011072646977.png" alt="image-20231011072646977" style="zoom:33%;" /> → <img src="images/image-20231011072710737.png" alt="image-20231011072710737" style="zoom:15%;" /> 

##### How do we terminate?

- because autoregressive decoder doesn't know when our sequence terminates, it will continue generating more output indefinitely 
- to solve this, we can include an "END" symbol in our lexicon so the decoder can estimate when a sequence terminates

##### Decoder Non-Autoregressive (NAT)

<img src="images/image-20231011073623528.png" alt="image-20231011073623528" style="zoom:25%;" />

- how do decide output length for NAT decoder?
  - another predictor for output length
  - output a very long sequence and ignore the tokens after the "END" token appears

<img src="images/image-20231011073907439.png" alt="image-20231011073907439" style="zoom:33%;" />

- the **advantages** of NAT include
  - parallel
  - more stable generation (such as in text to speech TTS)

### Decoder: Cross Attention

<img src="images/image-20231011074022922.png" alt="image-20231011074022922" style="zoom:50%;" />

- the <span style="color:blue">blue</span> inputs are from the encoder and the <span style="color:MediumSpringGreen">green</span> are from the decoder itself

<img src="images/image-20231011074211321.png" alt="image-20231011074211321" style="zoom:50%;" />

