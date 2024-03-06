# Introduction to DBMS Implementation

[toc]

## Core Terminology Review

- **Data** any piece of information that holds value and is worth keeping
- **Database** organized collection of interrelated data that models something
- **Query** operation that retrieves specific data based on some condition(s)
- **Relation** organization of data into a two dimensional table
  - rows (tuples) represent basic entities
  - columns (attributes) represent properties of those entities
- **Schema** a description of the structure of the database often called "metadata"
  - good for syntax error handling
- **DBMS** (Database Management System) is software that allows applications to store & analyze databases

### What do we want from a DBMS

- persistent, keep data around
- answer queries about data
- update data

> Relation → Statements → Results

#### Naïve Implantation (Megatron 3000 DBMS)

- assume out DBMS stores all our data using delimited ASCII files (like CSV)
- potential issues:
  1. ASCII storage is expensive
  2. deletions are expensive- every deletion means a that the file must be rewritten without the deleted rows
  3. searches are expensive - can't find a tuple with a given key quickly (must always read full relation)
  4. no buffer managing - no cache
  5. no concurrency control - several users accessing the data at the same
  6. no reliability - in case of crash, data can be lost
  7. no *fine-grained* security - unable to restrict access to certain fields
  8. no application API - how can a payroll program access the data?
  9. can't interact with other DBMS
