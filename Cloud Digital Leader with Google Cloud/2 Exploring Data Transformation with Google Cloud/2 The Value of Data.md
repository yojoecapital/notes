# The Value of Data

## [How data creates value](https://www.youtube.com/watch?v=z6UKQbNLz-M)

- the most valuable insights no longer come from just sales, inventory, and personnel data
- they're often hidden in unstructured data points across different systems
- 68% of organizations are unable to realize tangible and measurable value from data

---

## [Unlocking business value from data](https://www.youtube.com/watch?v=7dn8R1i5qy4)

Data can be categorized in 3 ways.

### Structured data

- highly organized & well defined
- usually stored in a table
- examples include table or database
- easy to analyze

### Semi-structured data

- organized in a hierarchy
- without full differentiation or order
- examples include emails, HTML, JSON, XML
- doesn't have a formal structure
- contains tags for easier analysis

### Unstructured data

- examples include
  - text like documents
  - data files like images, audio, video
  - infrastructure activity and performance data
- represents 80 to 90% of all enterprise data
- difficult to analyze but cloud technology gives tools to make it possible such as with APIs
  - i.e. Google Cloud Vision APIs to get product data from an image

----

## [Data management concepts](https://www.youtube.com/watch?v=nThMEdgYUBA)

A **database** is an organized collection of data stored electronically.

### Relational database

- stores and provides access to data points that are related to one another
- has clearly defined schema's
- can establish links (i.e. relationships) by joining tables
- SQL can query and manipulate data
- best for large amount of structured data

### Non-relational database (NoSQL)

- doesn't use tabular format
- follow a flexible data model
- ideal for data with changing organization
- ideal for applications with diverse data types

### Data warehouse

- a **data warehouse** is an enterprise system used for analysis and reporting of structured and semi structured data from multiple sources
- can help analyze sales and identify trends
- not typically the answer for unstructured data
- Google Cloud’s modern and serverless data warehousing solution is **BigQuery**
- users include 
  - business intelligence analysts
- the goal is to 
  - use the data to answer questions

### Data lake

- a repository designed to ingest, store, explore, process, and analyze any type of volume of *raw data*
- unlike the clean data in data warehouses
- users include 
  - business intelligence analysts
  - data engineers
  - data scientists
- the goal is to
  - explore, mine, and experiment with raw data

---

## [The role of data in digital transformation](https://www.youtube.com/watch?v=ihGk5vJ3Pcs)

### First-party data

- the proprietary customer datasets that a business collects from customer transactions and interactions

### Second-party data

- first-party data from another organization that can easily be deployed to augment a company's internal datasets
- organizations don't directly own this data but it's relevant to their business 

### Third-party data

- datasets collected and managed by organizations that don't directly interact with an organization's business
- these can come from government, nonprofit, academic sources, or analyst reports
- often shared on marketplaces like the Google Cloud Marketplace

---

## [The role of data in digital transformation](https://www.youtube.com/watch?v=ihGk5vJ3Pcs)

Imagine data going down an assembly line. The line adds parts and value to the data as it goes down. Eventually it turns into actions we can take.

### Data genesis

- initial creation of a unit of data
- for example, a swipe of a credit card or a sensory device

### Data collection

- data is ingested into a new system

### Data processing

- data is adjusted such as merging datasets together

### Data storage

- where the data stores and is ready for analysis and action
- different types of data can be stored in different ways
  - NoSQL for fast reads and writes
  - data warehousing for fast access to analysis
  - object storage for unstructured data

### Data analysis

- provides direction for business oriented action

### Data activation

- when an analysis is made, it needs to be pushed to the relevant decision makers

----

## [Data governance](https://www.youtube.com/watch?v=m27rFmBegAA)

- setting internal standards for how data is managed
- granting access permissions
- complying with external standards
- without an effective data governance program, businesses will suffer
  - fines
  - poor data quality
  - challenges in finding data
  - poorly trained data models for AI

