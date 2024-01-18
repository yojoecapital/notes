# Data Mining Essentials

- Data production rate has increased dramatically and we are able store much more data than before (**Big Data**)
- Businesses and customers need useful knowledge and gain insight from raw data

### Knowledge Discovery in Databases KDD Process

![Capture (5)](images\Capture (5).png)

1. **Selection**: we have a lot of data so we select a relevent subset
2. **Preprocessing**: raw data maybe noisy or unclean (usually least elegant but most time consuming)
3. **Transformation**: originally the data may be continuous and analysis requires it to be discrete
4. **Data Mining**: apply different types of algorithms to discover patterns
5. **Evaluation**

### Data Instances

In the KDD process, data is represented in a tabular format

* A collection of **features** related to an object or person
* **Instances** are also called points, data points, or observations

![Capture (6)](images\Capture (6).png)

### Data Types

- **Nominal** (categorical)
  - Operations: Mode (most common feature value), Frequency, Equality Comparison
  - `{dog, cat, snake, bird}`
- **Ordinal**
  - Feature values have an intrinsic order to them, but the difference is not defined
  - Operations: same as nominal, feature value rank
  - `{small, medium, large, x-large}`
- **Interval**
  - Operations: Addition and subtractions are allowed whereas divisions and multiplications are not
  - `year, temperature (F/C)`
- **Ratio**
  - *Meaningful zero point*
  - Operations: divisions and multiplications are allowed
  - `height, weight, money quantities, humidity` 

### Text Representation

Documents are modeled by tranfroming them to sparce numeric vectors or **"Bag of Words"** 

* bag of word methods does not consider order

#### Bag of Words Methods

##### Vector space model

* we have a set of documents $\bf{D}$
* each document is a set of words
* the goal is to convert these text documents to vectors
  $\vec{d_i}=\{w_{1,i}, w_{2,i}, ..., w_{N,i}\}$
  where $\vec{d_i}$ is a document $i$ and $w_{j, i}$ is the weight for $j$^th^ word in $i$
* **design choices:**
  * weights can be set to 1 or 0 if specific vocabulary exists in the document 
  * weights can represent the frequencies of specific vocabulary

##### Term Frequency-Inverse Document Frequency TF-IDF

The TF-IDF of term $t$, document $d$, and document corpus $D$ is calculated is as follows
$$
w_{j,i} = tf_{j,i} \times idf_j
$$

- where $tf_{j,i}$ is the frequency of word $j$ in document $i$ and 

$$
idf_j = \log_2 \frac{|D|}{|\{\text{document } \in D|j \in \text{ document}\}|}
$$

- where $|D|$ is number of documents in corpus and
- denominator is number of documents where the term $j$ appears

###### TF-IDF Example 1

Consider the words "apple"and "orange"

- "apple"appears 10 times in document 1 $d_1$
- "orange" appears 20 in $d_1$
- The corpus contains 20 documents
- "apple"only appears in d1
- "orange" appears in all 20 documents

$$
\text{tf-idf}(\text{apple}, d_1) = 10 \times \log_2 \frac{20}{1} \approx 43.22 \\
\text{tf-idf}(\text{orrange}, d_1) = 20 \times \log_2 \frac{20}{20} = 0.
$$

- even though "apple" appears less than orange in $d_1$ it is more representative of $d_1$ that "orange" as "orange" is also in every other document

###### TF-IDF Example 2

* $d_1:$ ` social media mining`
* $d_2:$ ` social media data`
* $d_3:$ ` finanical market mining`

**TF-IDF Values**

![Capture (8)](images\Capture (8).png)

**IDF Values**

![Capture (10)](images\Capture (10).png)

**TF-IDF Values**

![Capture (9)](images\Capture (9).png)

### Data Quality

When making data ready for data mining algorithms, data quality needs to be assured

* **Noise**: distortion of data
* **Outliers**: data points that are considerably different from other data points in the dataset
* **Missing values**: missing feature values in data instances, we can solve with:
  - remove instances that have missing values
  - impute missing values (approximate them)
  - ignore missing values when running data mining algorithms
* **Duplicate data**

### Data Preprocessing

- **Aggregation**
  - multiple features need to be combined into a single one or when the scale of the features change
  - `image width , image height ` $\rightarrow$`image area (width * height)`
- **Discretization**
  - from continuous values to discrete values
  - `money spent ($) ` $\rightarrow$ ` {low, normal, high}`
- **Feature Selection**
  - choose relevant features
- **Feature Extraction**
  - creating new features from original features
- **Sampling**

## Data Mining Algorithms

### Supervising Learning Algorithm

Class attribute *is available*

* we are given a set of labeled examples in the format $(\vec{x}, y)$ where $\vec{x}$ is a vector and $y$ is a class attribute (scalar)
* the supervised learning task is to find a mapping $m(\vec{x})=y$ to compute unlabeled instance

* **Classification** (class attribute is discrete)
  * assign data into predefined classes
  * **Examples**:
    * classify twitter as "bot" or "human"
    * classify post as "spam"
    * decide we should "do" something or "not do"
* **Regression** (class attribute takes real values)
  * predict a real value for a given data instance

#### $k$-Nearest Neighbor Classifier kNN

* $k$ nearest neighbors are the closest $k$ instances to what is being classified
* the instance being classified is assigned the label that majority of its $k$ neighbors are assigned

![image-20230126142311156](images\Capture (12).png)

![image-20230126141601003](images\Capture (11).png)

* when $k = 5$, predicted label is `triangle`
* when $k = 9$, predicted label is `square`

#### Decision Tree

- Decision trees are constructed recursively from training data using **top-down greedy approach** where features are selected sequentially

##### Entropy

- **purity**  (certainty) can be used to measure the quality of leaves along a split
- in a pure subset *all instances have the same class attribute*
- to measure purity we can use **entropy** (measure of disorder) where a pure subset has entropy of $0$ and not pure has $1$.

$$
\text{entropy}(\bf{T}) = -p_+ \log(p_+) - p_- \log(p_-)
$$

where $p_+$ is proportion of positive examples and $p_-$ is proportion of negative

###### Entropy Example

Subset $\bf{S}$ has 10 instances `[7+, 3-]` . Find entropy $H$:
$$
H(\bf{S}) = -\frac{7}{10}\log\frac{7}{10}-\frac{3}{10}\log\frac{3}{10} \approx 0.881
$$

##### Information Gain IG

tells how much of our knowledge improved after a split (reduction in entropy)
$$
\text{IG}(A, S) = H(S) - \sum_{v \in \text{Values(A)}}\frac{|S_v|}{|S|}H(S_v)
$$
where $A$ is an attribute, $H(S)$ is entropy without splitting node, summation is entropy with split.

###### IG Example

![image-20230126145329690](images\Capture (13).png)

Find $IG$ for the attribute outlook $O$ where play golf is the label:
$$
H(S) = -\frac{4}{7}\log\frac{4}{7}-\frac{3}{7}\log\frac{3}{7} \approx 0.99 \\
IG(O, S) = H(S) - [\frac{3}{7}H(O = \text{sunny}) + \\ \frac{2}{7}H(O = \text{overcast}) + \frac{2}{7}H(O = \text{rain})] \approx 0.31
$$
If we calculate $IG$ for all attributes $O, T, H$ we'll find:
$$
IG(O, S) \approx 0.31 \\
IG(T, S) \approx 0.03 \\
IG(H, S) \approx 0.03
$$
Thus the attribute $O$ will has highest $IG$ and we select that attribute for our first split:

![image-20230126150544696](images\Capture (14).png)

*Repeat* this process recursively until until we have all leaf nodes.

#### Naïve Bayes Classifier

##### Bayes Theorem

$$
P(A \cup B) = P(A)P(B|A) \\
P(A \cup B) = P(B)P(A|B) \\
P(A|B) = \frac{P(B|A)P(A)}{P(B)}
$$

######  Bayes Theorem Example

![image-20230126152017419](images\Capture (15).png)

Probability of selecting an apple:
$$
P(\text{apple}) = P(\text{red}) * P(\text{apple} | \text{red}) + \\ P(\text{blue}) * P(\text{apple} | \text{blue}) + P(\text{green}) * P(\text{apple} | \text{green})
$$
We selected an orange. What is the probability it came from the green box:
$$
P(\text{green}|\text{orange}) = \frac{P(\text{orange}|\text{green})}{P(\text{orange})} P(\text{green}) \\
\\ P(\text{orange}) = P(\text{red}) * P(\text{orange} | \text{red}) + \\ P(\text{blue}) * P(\text{orange} | \text{blue}) + P(\text{green}) * P(\text{orange} | \text{green}) =
\\ 0.2 * (4 / 10) + 0.2 * (1/2) + 0.6  (3 / 10) = 0.36
\\
\\ P(\text{green}|\text{orange})
= \frac{3 / 10}{0.35} * 0.6 = 0.5
$$

##### Naïve Bayes Classifier NBC

Use Bayes Theorem $P(Y|X)=\frac{P(X|Y)P(Y)}{P(X)}$ where $X$ is class variable and $P(Y)$ is the instance features.

###### NBC Example

![image-20230126155324233](images\image-20230126155324233.png)

Find the probability distribution of instance 8 for $\bf{P}(PG | i_8)$:
$$
P(PG=\text{Y}|i_8) = \frac{P(i_8|PG=\text{Y})P(PG=\text{Y})}{P(i_8)} = \\
P(O=\text{sunny}, T=\text{mild}, H=\text{high}|PG=\text{Y}) * \frac{P(PG=\text{Y})}{P(i_8)} = \\
P(O=\text{sunny} | PG = \text{Y}) * P(T=\text{mild} | PG = \text{Y}) * P(H=\text{high} | PG = \text{Y}) * \frac{P(PG=\text{Y})}{P(i_8)} = \\
\frac{1}{4} * \frac{1}{4} * \frac{2}{4}*\frac{4/7}{P(i_8)} = \frac{1}{56P(i_8)} \\ \\
P(PG=\text{N}|i_8) = \frac{2}{3} * \frac{1}{3} * \frac{2}{3}*\frac{3/7}{P(i_8)} = \frac{4}{63P(i_8)}
$$
Because $\frac{1}{56}<\frac{4}{63}$, $i_8$ would be labeled as $PG=\text{N}$.

#### Weighted-vote Relational-Neighbor wvRN

<span style="color:red">need to take notes on this...</span>

#### Regression 

<span style="color:red">need to take notes on this...</span>

#### Evaluating Supervised Learning

<span style="color:red">need to take notes on this...</span>

#### Evaluating Classification

$$
\text{Accuracy} = \frac{C}{N} \\
\text{Error rate} = 2 - \text{Accuracy} \\
P = \frac{TP}{TP+FP} \\
R = \frac{TP}{TP+FN}
F_1 = \frac{2PR}{P+R}
$$

where $C$ is correctly labeled predictions, $N$ is total predictions, $P$ is precisions, $R$ is recall or *sensitivity*

* **Accuracy** is only a good measure only if you have symmetric datasets - F1 is better otherwise
* **Precision** is how sure we are of our true positives while **Recall** is how sure we are they are not missing any positives
* **F1** is best if you have uneven class distributions

### Unsupervised Learning Algorithm

Class attribute *is not available* 

* **Clustering**
  * group similar items together
  * detect communities in a given social network

#### Measuring Distance / Similarity in Clustering

![image-20230130142754781](images\Capture (16).png)

##### Cluster Centroids

an abstract notation to represent a cluster (mean or center of cluster)

#### k-Means Clustering

<img src="images\image-20230130143208422.png" alt="image-20230130143208422" style="zoom:33%;" />

##### k-Means Algorithm:

```pseudocode
consider k random points as the initial cluster centroids
while the centroids do not converge:
    assign each datapoint to the cluster which has the closest centroid
    if all data points have been assigned then:
    	recalculate the cluster centroid by averaging the datapoints inside each cluster
```

##### When to Stop (When is Convergence)?

* the most common criterion is to check whether centroids no longer change (*stabilize*)
* we can do this in practices when the Euclidean distance between centroids in two consecutive steps is bounded by some small positive

###### k-Means Example

Perform 1 iteration of k-Means where initially ID's [1, 6] are the centroids

| ID   | Feature 1 | Feature 2 | Distance to Cluster {1, 2} | Cluster |
| ---- | --------- | --------- | -------------------------- | ------- |
| 1    | 3.0       | 3.5       | {0, ...}                   | 1       |
| 2    | 4.5       | 4.6       | {3.46, 9.54}               | 1       |
| 3    | 3.8       | 4.7       | {2.08, 8.48}               | 1       |
| 6    | 3.0       | 1.9       | {..., 0}                   | 2       |

#### Evaluation

Cohesiveness: instances inside the cluster are close to each other

* this means having a small standard divation or being close to the mean value (the centroid)
* we want to minimize the cohesiveness

$$
\text{cohesiveness} = \sum_{i=1}^k\sum_{j=1}^{n(i)}\text{distance}(x_j^i, c_i)^2
$$

where $x$ is an instance, $c$ is centroid

Separateness: clusters are well separated from one another

* we want to maximize the separateness

$$
\text{seperateness} = \sum_{i=1}^k\text{distance}(c,c_i)^2
$$

Silhouette Index: combines separateness and cohesiveness

* compares the average distance value between instances in the same cluster and the average distance value between instances in different clusters

