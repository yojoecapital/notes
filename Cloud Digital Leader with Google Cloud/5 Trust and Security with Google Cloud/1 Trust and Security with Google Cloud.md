# Trust and Security with Google Cloud

## [Key security terms and concepts](https://www.youtube.com/watch?v=gUUMKdGGQhY)

### Reducing the risk of unauthorized access to sensitive data

#### Privileged access

- grants specific users access to a broader set of resources than ordinary users
- misuse of privileged access can pose risks

#### Least privilege

- granting users only the access they need to perform their job responsibilities

#### Zero-trust architecture

- assumes that no user or device can be trusted by default
- every user and device must be authenticated and authorized before accessing resources

### How an organization can protect itself from cyber threats

#### Security by default

- principle that emphasizes integrating security measures into systems and applications from the initial stages of development

#### Security posture 

- refers to the overall security status of a cloud environment

#### Cyber resilience 

- refers to an organization's ability to withstand and recover quickly from cyber attacks

### Essential security measures to protect cloud resources from unauthorized access

#### Firewall 

- network device that regulates traffic based on predefined security rules

#### Encryption

- process of converting data into an unreadable format by using an encryption algorithm

#### Decryption

- the reverse process that uses an encryption key to restore encrypted data back to its original form
- safeguarding the encryption key is crucial

-----

## [Cloud security components](https://www.youtube.com/watch?v=b2hMWU2D268)

### CIA triad

#### C Confidentiality

- keeping important information safe and secret
- encryption plays a crucial role in ensuring confidentiality in the cloud

#### I Integrity

- keeping data accurate and trustworthy
- implementing data integrity controls, such as checksums or digital signatures, enables organizations to verify the authenticity and reliability of their data in the cloud

#### A Availability

- making sure that cloud systems and services are always accessible and ready for use by the right people when needed
- Cloud environments must be designed with redundancy, failover mechanisms, and disaster recovery plans to maximize availability and minimize downtime

### Control 

- refers to the measures and processes implemented to manage and mitigate security risks

### Compliance

- adhering to industry regulations, legal requirements, and organizational policies

----

## [Cybersecurity threats](https://www.youtube.com/watch?v=KLRvrLjCOsc)

### Social engineering

- skilled manipulation seeking to extract confidential system information from unsuspecting individuals
- employ “phishing attacks,” which collect personal details about you, your employees, or your students 
- skillfully craft tailored emails and mimic authenticity to deceive their targets

### Physical damage

- damage to hardware components, power disruptions, or natural disasters such as floods or fires

### Malware, viruses, and ransomware

- malicious software, they aim to disrupt operations, inflict damage, or gain unauthorized access to computer systems
- **ransomware** is where crucial files are held hostage until a considerable ransom is paid

### Vulnerable third-party systems

- without adequate security measures and regular evaluations, third-party systems can transform into potential threats, leaving data security vulnerable

### Configuration mishaps

- misconfiguration occurs when errors arise during the setup or configuration of resources, which inadvertently exposes sensitive data and systems to unauthorized access
- surveys consistently identify misconfiguration as the most prominent threat to cloud security
- adopting principles of least privilege and privileged access are imperative