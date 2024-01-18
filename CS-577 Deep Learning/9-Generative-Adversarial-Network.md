# Generative Adversarial Network GAN

## Variation Auto Encoder VAE

- a special type of auto-encoder

<img src="images/image-20231206004822022.png" alt="image-20231206004822022" style="zoom:50%;" />

- where the encoder produces <span style="color:red">means</span>, <span style="color:orange">variances</span>, and normal distribution
  - then the exponential of the normal distribution is taken with the <span style="color:orange">variances</span> and added to the <span style="color:red">means</span>
    - $c_i = \text{exp}(\sigma_i) \times e_i + m_i$
  - we want to minimize the error where our loss function is
    <img src="images/image-20231206005120760.png" alt="image-20231206005120760" style="zoom:50%;" />

### Problems of VAE

- it doesn't really try to simulate real images
- the loss function will consider images with one pixel difference as the same quality of generation even though the one pixel can mean the difference between a realistic and fake image

<img src="images/image-20231206005345911.png" alt="image-20231206005345911" style="zoom:50%;" />

### Evolution of Generation

<img src="images/image-20231206005530936.png" alt="image-20231206005530936" style="zoom:25%;" />

- the discriminator is a binary classifier that  predicts if the image is real or fake
- the discriminator & generator get trained side by side in a network

---

