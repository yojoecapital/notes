# Fundamental Cloud Concepts

## Total cost of ownership (TCO)

- organizations will often do a TCO analysis when deciding whether to switching from on-prem to cloud adoption
- for on-prem, TCO is associated with the cost of static resources throughout their lifetime
- due to dynamic nature of the cloud, predicting future costs can be challenging
- a common mistake is to compare the running cost of the cloud to the on-prem system
- the cost of on-prem is dominated by the initial cost of hardware and software
- but cloud computing is a payed-per-use model
- additionally the missed benefits of not switching should be considered

----

## Capital expenditures (CapEx) versus operating expenses (OpEx)

- managing costs change when moving to the cloud
- there's a major change from CapEx to OpEx

### CapEx

- *upfront* business expenses put toward fixed assets
- a organization buys it once and it benefits for many years
- such as buying hardware, cooling systems, etc...

CapEx is determined based on metrics like historic growth to determine the cost for the future.

### OpEx

- *recurring* costs for more immediate benefit
- such as website hosting, domain name, or cloud subscription

The cloud's OpEx (pay-as-you-go) model means budgeting is no long a one-time process done annually. Because it's dynamic, spending most be monitored in an on-going basis.

However, this means businesses don't need to pay for maintenance and aren't depreciating equipment (the cloud provider is), letting them grow organically.

---

## Private cloud, hybrid cloud, and multi-cloud strategies

### Private cloud

- organization has own data centers or through a private cloud provider
- the difference between private cloud and on-prem is that 
  - on-prem runs in a locally environment
  - whereas private cloud is accessed through the internet
- used when organization 
  - already made infrastructure investments or  
  - regulatory (legal) reasons

### Hybrid cloud

- architecture uses a combination of difference environments
  - such as on an on-prem and on Google Cloud

### Multi cloud

- architecture uses multiple cloud providers such as Google Cloud and AWS
- used when organization wants to use strengths of multiple cloud providers
- sometimes companies use both on-prem services as well as multiple cloud providers
  - making them *hybrid + multi cloud*

### Why use hybrid + multi cloud?

1. access to the latest technology
2. modernize at the right pace
3. improved return on investment
   - expand cloud computing capacity without increasing data center expenses 
4. flexibility through choice of tools
   - wider choice of tools and developer talent
   - avoid vendor lock-in
5. improved reliability & resiliency
6. maintain regulatory compliance
   - hybrid solutions allows organization to follow legal guidelines
7. running applications on-prem can still be done
8. running applications at remote edge locations 
   - applications can be run on the network

----

## How a network supports digital transformation 

### How does a network operate?

#### Fiber-optic networks

- **fiber-optic cables** contain 1 or more **optical fires** 
  - which are thin strands made of glass or pastic
  - they transmit data as pulses of light over long distances
- sub-sea fiber-optic cables carry 99% of network traffic
  - the first sub-sea cable was used to transfer telegrams and took 17 hours
  - today, a single cable can deliver 340 Tbit/s
- ISPs (internet service providers) and other companies built this infrastructure
  - Google has a large infrastructure of fire-optic cables to connect their data centers across the globe

### How do different parts recognize and communicate with each other?

#### IP Addresses (internet protocol)

A series of numbers that can identify a network or the location of a particular device on a network.

#### Domain name

 A domain name is a easy to remember name that maps to an IP address or set of IP addresses.

#### DNS (domain name system)

- a DNS server stores a database of domain names mapped to IP addresses that can be used by computers to communicate with each other
- every time you visit a website, your computer does a **DNS lookup** to find the IP address of the server hosting that site with that domain name

----

## [Network performance: Bandwidth and latency](https://www.youtube.com/watch?v=oWJmtTs0gYg)

### Bandwidth

- measure of how much data a network can transfer in a given time
- measure in megabits per second (Mbps) or gigabits per second (Gbps)
- a higher bandwidth allows a computer to download information more quickly

#### Think of bandwidth as a pipe

The wider the pipe, the more water can flow.

### Latency

- the amount of time it takes for data to travel from one point to another
- measured in milliseconds
- describes delay in communication over a network

#### Think of latency as the twists and turns in a pipe

- no matter how much data you can send and receive at once, it can only travel as fast as network latency allows
- for example, it took 10 ms to download an image but the user had to wait 100 ms before getting the first byte of data
- websites run slower for some user because of the user's location

