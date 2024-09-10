# Modernizing Applications in the Cloud

## [The benefits of modern cloud application development](https://www.youtube.com/watch?v=jIBU1SVO1tA)

- the traditional software development approach (a.k.a. **monolithic applications**)
  - required all the components to be developed and deployed as a single, tightly coupled unit, typically using a single programming language
- the benefit of modern cloud applications include 
  - *architecture*
    - modern cloud applications are typically build as a collection of **microservices**
    - **microservices** are independently deployable, scalable and maintainable components that can be used to build a wide range of applications
    - features can be released as they're completed without waiting for the rest of the application to be complete
  - *deployment*
    - modern applications are typically deployed to the cloud and can use **managed** or **partially managed** services
    - **managed services** take care of the day-to-day management of cloud-based infrastructure, such as patching, upgrades, and monitoring
    - **partially managed services** offer a hybrid approach, where businesses manage some aspects of their cloud-based applications and cloud provider manages others
  - *cost*
    - modern cloud applications use a pay-as-you-go model making it cost effective if configured efficiently
  - *scalability*
    - modern cloud applications can easily scale to meet user demands
    - **load balancing** is the process of distributing network traffic evenly across servers that support an application
    - **automatic failover** is the process that allows a cloud application to automatically switch to a backup server if a failure occurs
  - *monitoring and management tools*
    - allows developers to quickly identify and respond to issues

----

## [Rehosting legacy applications in the cloud](https://www.youtube.com/watch?v=y-vN-fFtQpQ)

### Rehosting migrating or "lift and shift"

| **Pros**                                | **Cons**                                   |
| --------------------------------------- | ------------------------------------------ |
| the many benefits of cloud computing... | complexity                                 |
| cost saving                             | risk                                       |
| scalability                             | vendor lock-in (switching providers later) |
| reliability                             |                                            |
| security                                |                                            |

### Google Cloud offers many solutions for rehosting legacy applications

- **Google Cloud VMware Engine**
  - helps migrate existing VMware workloads to the cloud without having to rearchitect the applications
  - organizations can maintain their existing VMware environments while getting benefits of Google Cloud (scalability, security, reliability, etc...) 
  - also access a range of Google Cloud services such as BigQuery, AI/ML
- **Google Bare Metal Solution**
  - fully managed cloud infrastructure solution that lets organizations run their Oracle workloads on dedicated, bare metal servers in the cloud

----

## [Application programming interfaces (APIs)](https://www.youtube.com/watch?v=zmeKd-sHpjU)

- **API** is a set of instructions that lets different software programs communicate with each other
- Google provides many APIs that let developers access its products like APIs that use
  - Google Search
  - Google Maps
  - Google Translate
- the benefits of an organization exposing APIs include\
  - create new products and services (such as with 3rd party apps)
  - generate new revenue if the organization charges to use the API
  - create partnerships

----

## [Apigee API Management](https://www.youtube.com/watch?v=_iaGGBpiKPM)

- **Apigee** is an API management platform 
- helps organizations secure their APIs such as with
  - authentication
  - authorization
  - encryption
- tracks and analyzes API usage
- helps with developing and deploying APIs
- offers API versioning, documentation, and **throttling**
  - throttling limits the number of requests a user can make in a time period

-----

## [Hybrid and multi-cloud](https://www.youtube.com/watch?v=cGFd_Jy9Kv8)

- workloads may remain on-prem due to
  - compliance
  - operational concerns
- hybrid means that some data and applications remain on the Cloud while others are on-prem
- multi-cloud means that an organization uses multiple cloud providers as part of its architecture 
- Google's **GKE Enterprise** is a production ready platform for running Kubernetes applications across multiple cloud environments