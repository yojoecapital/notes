# Making Data Useful and Accessible

## [Business intelligence and insights using Looker](https://www.youtube.com/watch?v=Q26rwSsKdDg)

### Google Looker

- Google Cloud BI platform designed to help individuals and teams analyze, visual, and share data
- support BigQuery along with 60+ SQL databases
- provides rich interactive dashboards & reports 
- Looker is fully web-based

---

## [Streaming analytics](https://www.youtube.com/watch?v=rauVGDGY-y8)

- data traditionally is moved in batches
- batch processing analyzes larges batches of data at a time with high latency
- this works for large volume of data 
  - like payroll or billing systems
- is bad for data that was meant to be streamed as data can be stale by the time its processed
  - like equipment sensors
  - click-streams
  - social media feeds
  - stock market quotes
- **streaming analytics** is the processing and analyzing of data records continuously instead of in batches
- Google Cloud offers 2 streaming analytics products

### Google Pub/Sub

- ingests hundreds of millions of events per second

### Google Dataflow

- unifies streaming and batch data analysis 
- and builds cohesive data pipelines

---

## [Pub/Sub and Dataflow](https://www.youtube.com/watch?v=3inmKZBpfdQ)

-  one of the early stages in a data pipeline is **ingestion**
  - large amount of streaming data are received
-  data might not always come from a single structured database
  - could be from a thousand different events happening asynchronously 
-  **Pub/Sub** is a distributed messaging service that can receive messages from various streams
  - short for publisher/subscriber
-  **Dataflow** creates a pipeline to process both streaming data and batch data
  - process refers to steps to extract, transform, and load data or **ETL**
  - a popular solution for pipeline design is **Apache Beam**
    - open source unified programming model to define and execute data processing pipelines, including ETL, batch, and streaming processing
  - Dataflow is fully managed and server-less
    - server-less means software developers can build and provision applications without having to manage back-end infrastructure

