# Convolutional Neural Networks

[toc]

<img src="images/image-20231128155818152.png" alt="image-20231128155818152" style="zoom:50%;" />

## Convolution Operation

<img src="images/image-20231128160028749.png" alt="image-20231128160028749" style="zoom:75%;" />

- this is an example of a 1D **convolution operation** with a *kernel size* $l=3$ and a *stride* $s=2$ 
- the result would usually be fed through a nonlinear activation function before going to the next hidden layer (not shown)

## Convolution and Pattern Recognition

- consider the MINST dataset

<img src="images/image-20231128160313092.png" alt="image-20231128160313092" style="zoom:50%;" />

- encoding an example image `9` would be

<img src="images/image-20231128160353232.png" alt="image-20231128160353232" style="zoom:50%;" />

- and our template (i.e. gold-standard) `9` is

<img src="images/image-20231128160800487.png" alt="image-20231128160800487" style="zoom:50%;" />

- the convolution would be

<img src="images/image-20231128161307837.png" alt="image-20231128161307837" style="zoom:50%;" />

- an issue is that scores for the bright instances (i.e. simply having a value close to 1) would be inflated
  - the solution is to use cosine distance instead of just dot product

### Padding

- what if only *part of the pattern* is present on the image?

<img src="images/image-20231128161534155.png" alt="image-20231128161534155" style="zoom:50%;" />

- pad the input with zeros so that our kernel can match on part of the input
  - usually part of the image is enough to provide sufficient detail such as how a human can recognize that square contains *part* of a car in  captcha
    <img src="images/image-20231128161706901.png" alt="image-20231128161706901" style="zoom:67%;" />

### Pooling

<img src="images/image-20231128161751170.png" alt="image-20231128161751170" style="zoom:50%;" />

- we do not expect our pattern to appear multiple times in overlaps
- we are consolidating information about the region via pooling
- pooling aggregates a set of adjacent units
  - like convolution, it has a kernel & stride size
  - unlike convolution, weights are fixed (not learned)
-  examples of pooling:
  - average pooling
  - max pooling

<span style="color:red">go over examples</span>
