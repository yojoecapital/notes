# Modernizing Infrastructure in the Cloud

## [The benefits of running compute workloads in the cloud](https://www.youtube.com/watch?v=NHWu5le3tMM)

- **total cost of ownership** (TCO)
  - measure of the total cost of a system or solution over its lifetime
- scalability
- reliability
- security
- flexibility
- **abstraction**
  - removes the needs for customers to understand the lower level details of implementation

----

## [Virtual machines](https://www.youtube.com/watch?v=tHPBKBN_-Uo)

- **virtualization** is a form of resource optimization that lets multiple systems run on the same hardware
- these system are called VMs
- **Google Compute Engine** is a IaaS solution that lets users run VMs
  - can be created through the Google Cloud console
  - or the Google Cloud CLI
- Compute Engine
  - bills by the second
  - 1 minute minimum
  - *sustained-use discounts* 
- say a workload doesn't need a human to sit and wait for it to finish
  - costs can be reduced in some cases by up to 90% by choosing preemptable or spot VMs to run the job
  - these VMs can be *terminated* by Compute Engine if their resources are needed elsewhere
  - spot VMs have more features than preemptable such as
    - no maximum runtime vs 24 hours

-----

## [Containers](https://www.youtube.com/watch?v=0-wG960v34Y)

- similar to VMs, **containers** provide isolated environments to run software services and optimize resources from one piece of hardware
- however they're more efficient
  - VMs virtualize down to the hardware layers
  - containers only virtualize software layers above the OS level
- containers start faster and use a fraction of the memory
- a container is packaged with your application and all of its dependencies, so it has everything it needs to run
- well suited for a microservice-based architecture
  - this architecture is made up of smaller individual services that run containerized applications, that communicate with each other through APIs or other lightweight communication methods

----

## [Managing containers](https://www.youtube.com/watch?v=ZtRqJ1_xwBk)

- containers
  - improve agility
  - enhance security (through isolation)
  - optimize resources
  - simplify managing applications
- organizations often use both containers and VMs
  - as their infrastructure becomes more complex, they often need a way to manage their services and machines
- **Kubernetes**, originally developed by Google, is an open-source platform for managing containerized workloads and services
- **Google Kubernetes Engine** (GKE) is a Google hosted, managed Kubernetes service in the Cloud
  - GKE environment consists of multiple machines (Compute Engine instances) grouped to form a cluster
  - GKE makes it easy to deploy applications by provided an API and a web console
- **Google Cloud Run** is a fully managed serverless platform to deploy and run containerized applications without needing to worry about the underlying infrastructure

----

## [Serverless computing](https://www.youtube.com/watch?v=hXSejFDQBhI)

- doesn't mean there's no server
  - it means that resources like compute power are automatically provisioned in the background as needed
- organizations won't pay for compute power unless they're running a query or application

### Function as a service

- some functions are a response to specific events, like file uploads to Cloud storage, or changes to database records
- you write the code that responds to those events and the Cloud does the rest

### Google's serverless computing products

- **Cloud Run**
- **Cloud function**
  - platform for hosting simple single purpose functions that are attached to events emitted from your Cloud infrastructure and services
  - for example, sending a notification to a mobile device when a new order is placed on a website
- **App engine**
  - service to build an deploy web applications