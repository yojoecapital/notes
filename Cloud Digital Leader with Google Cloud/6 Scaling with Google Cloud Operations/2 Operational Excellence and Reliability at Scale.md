# Operational Excellence and Reliability at Scale

## [Fundamentals of cloud reliability](https://www.youtube.com/watch?v=aptVLHGZWUQ)

- **DevOps** is a software development approach that emphasizes collaboration and communication between development and operations teams to enhance the efficiency, speed, and reliability of software delivery
- **Site Reliability Engineering** (SRE) ensures the reliability, availability, and efficiency of software systems and services deployed in the cloud 
  - Whose job is to ensure the reliability, availability, and efficiency of software systems and services deployed in the cloud?
    - *Site reliability engineer*
- there are “Four Golden Signals” that measure a system’s performance and reliability
  - **latency** measures how long it takes for a particular part of a system to return a result
  - **traffic** is how many requests reach your system
  - **saturation** measures how close to capacity a system is
  - **errors** are events that measure system failures or other issues
- three main concepts in site reliability engineering are 
  - **service-level indicators** (SLIs)
    - measures how well a system or service is performs, such as
      - response time
      - error rate
      - percentage uptime
  - **service-level objectives** (SLOs)
    - goals we set for a system's performance based on SLIs, such as
      - "the system should be available 99.9% of the time in a month"
  - **and service-level agreements** (SLAs)
    - agreements between a cloud provider and its costumers
    - SLAs include the agreed-upon SLOs, performance metrics, uptime guarantees, and any penalties or remedies if the provider fails to meet those commitments

-----

## [Designing resilient infrastructure and processes](https://www.youtube.com/watch?v=iPWUiTXyOyk)

- **high availability** refers to the ability of a system to remain operational and accessible for users even if hardware or software failures
- **disaster recovery** refers to the process of restoring a system to a functional state after a major disruption or disaster
- **redundancy** refers to duplicating critical components or resources to provide backup alternatives
- **replication** involves creating multiple copies of data or services and distributing them across different servers or locations
- cloud service providers offer multiple **regions** or data center locations spread across different geographic areas
- building a **scalable infrastructure** allows organizations to handle varying workloads and accommodate increased demand without compromising performance or availability
  - cloud technologies use dynamic allocation and deallocation of resources based on workload fluctuations
- regular **backups** of critical data and configurations are crucial in case of data loss, hardware failures, or cyber-attacks

----

## [Modernizing operations by using Google Cloud](https://www.youtube.com/watch?v=-fXIWiZnlfo)

- Google’s integrated **observability tools** lets you see what's happening with your server, database, or application
- **Google Cloud Observability** is a comprehensive set of monitoring, logging, and diagnostics tools
  - **Cloud Monitoring** collects metrics, logs, and traces from your applications and infrastructure
    - insights into their performance, health, and availability
    - create alerting policies to notify you when metrics, health check results, and uptime check results meet specified criteria
  - **Cloud Logging** collects and stores all application and infrastructure logs
  - **Cloud Trace** helps identify performance bottlenecks in applications
    - collects latency data
  - **Cloud Profiler** identifies how much CPU power, memory, and other resources an application uses
  - **Error Reporting** counts, analyzes, and aggregates the crashes in running cloud services in real-time

----

## [Google Cloud Customer Care](https://www.youtube.com/watch?v=9jeTKFXHJEM)

- **Basic Support** is free and is included for all Google Cloud customers
  - access to documentation, community support, Cloud Billing Support, and Active Assist recommendations
  - **Active Assist** is the portfolio of tools used in Google Cloud to generate insights and recommendations 
- **Standard Support** is recommended for workloads under development
  - unlimited individual access to English-speaking support representatives during working hours, 5 days a week
- **Enhanced Support** is designed for workloads in production, with fast response times and additional services to optimize your experience with high-quality, robust support
- **Premium Support** is designed for enterprises with critical workloads

----

## [The life of a support case](https://www.youtube.com/watch?v=wozCKh0wOMo)

### Case creation

- customer creates case in Google Cloud console
- only users with **Tech Support Editor** role can do this
- selects priority from P4 to P1 (low to high impact)

### Case triage

- team reviews the case
- team may request additional information

### Case assignment

- the customer care representative resolves the case usually
- complex cases may be assigned to a support engineer

### Troubleshooting and investigation

- analyze the information
- review system logs
- conduct various diagnostic tests
- may need collaboration with other teams & experts

### Communication and updates

- during so, there is regular communication with customers

### Escalation

- escalation is meant for flagging process breaks
- or the rare occasion that a case is stuck because the Customer Care team and customer aren't fully in sync
- *escalation* is not always the best solution and with high-impact issues, escalation may not make it go faster
  - it may disrupt the workflow of the Customer Care team and lead to delays in other cases
  - make sure the priory (P1-P4) is assigned right

### Resolution and mitigation

### Validation and testing

----

## [Sustainability with Google Cloud](https://www.youtube.com/watch?v=zTrgXbZnTE4)

- existing data centers use nearly 2% of the world’s electricity
- Google's data centers were the first to achieve ISO 14001 certification
  - a standard that outlines a framework for an organization to enhance its environmental performance through improving resource efficiency and reducing waste
- in its founding decade, Google became the first major company to be carbon neutral
- in its second decade, Google was the first company to achieve 100% renewable energy
- by 2030, Google aims to be the first major company to operate completely carbon free
- Kaluza is an electric vehicle smart-charging solution. How does it use BigQuery and Looker Studio?
  - it uses BigQuery and Looker Studio to create dashboards that provide granular operational insights.