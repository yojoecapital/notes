# Financial Governance and Managing Cloud Costs

## [Fundamentals of cloud financial governance](https://www.youtube.com/watch?v=pib0YvqIVPo)

- **cloud financial governance** is a set of controls that organizations use to manage cloud spend
- the variable nature of cloud costs impacts people, process, and technology

### People

- people refers to the different roles involved in managing cloud costs
- large organizations will use 
  - a finance team 
    - however they may struggle to manage & monitor cloud spend on a daily, monthly, weekly basis
  - technology and business teams can advise on how cloud resources are being used to meet the organization's business strategy and what additional resources might be needed
    - however they may not incorporate costs in their decision making
  - thus a partnership must exist between the finance, technology, and business teams
    - **Cloud center of excellence**

### Process

- on a daily or weekly basis, organizations should monitor their cloud usage & costs
- then on a weekly or monthly basis, the finance team should analyze the results 
- having a culture of accountability in place across teams helps organizations recognize waste, quickly act to eliminate it, and ensure they're maximizing their cloud investment

### Technology

- Google Cloud provides built-in tools to monitor and manage cost

-----

## [Cloud financial governance best practices](https://www.youtube.com/watch?v=Q718ZsvAB6U)

- identify who manages cloud costs
  - define clear ownerships for projects
  - share cost views with the departments and teams that are using cloud resources
  - **Google Budges** notify key stakeholders based on your actual or forecasted cloud costs
- understand invoice vs cost management tools
  - an **invoice** is a document sent by a cloud service provider to a costumer to request payment for services
  - a **cost management tool** is a software to track, analyze, and optimize cloud spend
    - also helps answer *why* this much was spent
- use Google Cloud's cost management tools
  - **Google Cloud Pricing Calculator** lets you estimate how changes to cloud usage will effect cost

----

## [Using the resource hierarchy to control access](https://www.youtube.com/watch?v=4i3HydEbM_M)

- Google Cloud's resource hierarchy has 4 levels
  1. resources
     - represents VMs, Cloud Storage buckets, tables in BigQuery, etc...
  2. projects
     - resources are organized into projects
  3. folders
     - projects can be organized into folders (or subfolders)
  4. organization node 
     - encompasses everything else
- a **policy** is a set of rules that define who can access a resource and what they can do with it
  - policies can be defined on projects, folders, and organization node levels
  - some Google Cloud services can also apply policies to individual resources 
- the hierarchy follows inheritance and propagation rules

----

## [Controlling cloud consumption](https://www.youtube.com/watch?v=NosiGyQIZm0)

- Google Cloud offers several tools to help control cloud consumption, including 
  - **Resource quota policies**
    - let you set limits on the amount of resources that can be used by a project or user
    - prevents overspending
  - **Budget threshold rules**
    -  let you set alerts to be informed when your cloud costs exceed a certain threshold
    - acts as an early warning
  - **Cloud Billing reports**
    - help you track and understand what you’ve already spent on Google Cloud resources and provide ways to help optimize your costs
    - after analyzing how you're spending on cloud resources, you might realize that your organization can optimize costs through **committed use discounts** (CUDs)
    - gives you discounted prices in exchange for your commitment to use a minimum level of resources for a term
- both resource quota policies and budget threshold rules are set in the Google Cloud console