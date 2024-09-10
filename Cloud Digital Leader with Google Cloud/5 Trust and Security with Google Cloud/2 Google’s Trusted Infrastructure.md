# Google’s Trusted Infrastructure

## [Data centers](https://www.youtube.com/watch?v=iS9ZPZ-Hw7I)

- Google's hardware and software are purpose built with features like
  - tamper-evident hardware
  - secure boot
  - hardware-based encryption
- Google's physical security includes
  - robust access control measures
  - biometric authentication
- What metric does Google Cloud use to measure the efficiency of its data centers to achieve cost savings and a reduced carbon footprint?
  - **Power Usage Effectiveness** (PUE)

---

## [Secure storage](https://www.youtube.com/watch?v=QbZMjnslsco)

### Data at rest

- when data is stored on physical devices like computers or servers
- Google Cloud automatically encrypts all costumer content at rest 
- **Cloud Key Management Service** (Cloud KMS) can be used to manage your encryption keys yourself

### Data in use

- data being actively processed by a computer
- Google Cloud used **memory encryption** locking data inside the computer's memory

### Advanced Encryption Standard (AES)

- powerful encryption algorithm trusted by governments and businesses worldwide

----

## [Identity](https://www.youtube.com/watch?v=3EavYtbPiRM)

### 3 A's

#### Authentication

- verifies the identity of users or systems that seek access
- like a gatekeeper, presenting your identification card before entering a restricted area

#### Authorization

- after a user's identity is authenticated, authorization steps in to determine what that user or system is allowed to do within the system

#### Auditing

- monitoring and tracking user activities within a system
- by collecting and analyzing logs of user activity, system events, and other data, auditing helps organizations detect anomalies

### Identity and Access Management (IAM)

- **IAM** provides granular control over who has access to Google Cloud resources and what they can do with those resources.
- with IAM, you can create and manage user accounts, assign roles to users, grant and revoke permissions to resources, audit user activity, and monitor your security position

-----

## [Network security](https://www.youtube.com/watch?v=CiSfy-DuZMw)

- with Google Cloud's **BeyondCorp Enterprise**, you can implement a zero trust security model
- Google Cloud offers various methods to help secure your perimeter, including firewalls and **Virtual Private Cloud**
- **Shared VPC** is like having a large fence that separates each Google Cloud Project, so they can work independently and safely
- **DDoS**  (distributed denial-of-service) is a cyber attack that uses multiple compromised computer systems to flood
  - **Google Cloud Armor** comes to the rescue by providing robust DDoS protection

----

## [Security operations (SecOps)](https://www.youtube.com/watch?v=XvD_Z-tmbXU)

- is all about protecting your organization's data and systems in the cloud
- **vulnerability management** is the process of identifying and fixing security vulnerabilities in cloud infrastructure and applications
  - regularly checking castle walls for weak spots
  - **Google Cloud's Security Command Center** (SCC) provides a centralized view of your security posture
- Google Cloud offers **Cloud Logging**, a service to collect and analyze security logs from your entire Google Cloud environment
- Google Cloud has expert incident responders across various domains, who are equipped with the knowledge and tools to tackle any security incident