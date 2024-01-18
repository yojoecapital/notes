# Introduction

## Administrative

- [Textbook](http://learnyouahaskell.com/chapters)

#### Grading

* 50% Machine Problems (4-6)
* 25% Midterm Exam
* 25% Final Exam

#### Late Policy

- 7 day late pool

## Programming Paradigms and Patterns PPP's

### Paradigms

a model for how a program is organized / executed

- imposes syntactic conventions
- creates a behavior limit such as:
  - procedural paradigm imposing entry and exit points
  - imperative paradigm imposes every statement to cause a change in the machine state
  - object-oriented paradigm OOP imposes polymorphism which is where behaviors vary on the object that is performing them (cat and dogs both sleep but the way they sleep maybe different)
  - functional paradigm is what this class focuses on

#### Functional Paradigm

- there are no state mutations (referential transparency) unlike imperative paradigm
  - no assignment statements
- arguably easier to reason about rigorously in some contexts

#### Imperative and OOP Patterns

- loops / iterators 
- encapsulation with getter and setter methods
- singleton and factory patterns
  - singleton patterns is where a class is only meant to have a single instance

#### Functional Patterns

- structural and generative recursion
- higher order functions HOF
- functors and monads
- monoids and foldables

## Haskell

- **pure:** purely functional, no imperative nature
- **strongly typed:** types are checked / enforced at compile time
- **lazy:** expressions aren’t evaluated until absolutely necessary

#### What is Functional Programming?

- programing with pure functions such that given some set of inputs, a function will always yield the same output
- functions can be replaced with its previous call’s result (referentially transparent)

#### Functional Programming vs Imperative Programming

- there are symbols or identifiers such that we can write `a = 10`
- but there are no “variables” or assignment statements per se, we can’t write `a = a + 1`
- values are immutable
- no “side effects” such that calling a function one time won’t effect it later

#### New Kinds of Glue

- Higher Order Functions HOF
- Lazy evaluation

#### $\lambda$ Lambda Calculus

[review](https://docs.google.com/document/d/1zTDDIwiadYjlI10easVbRe8Ba9b4d1wfuiUTrDNxNAM/edit)

- identity function: $\lambda x.x$
- application ($\beta$-Reduction)
  $\lambda x.x \ 10 \rightarrow_\beta 10$
  $(\lambda x.x \ y \ x \ b) \ z \rightarrow_\beta z \ y \ z \ b$
- examples of HOF
  - $(\lambda x.\lambda y.\lambda xy) \ a \ b \rightarrow_\beta (\lambda y.a \ y) \ b \rightarrow_\beta a \ b$
  - $(\lambda x.x \ x)(\lambda x.x \ x) \rightarrow (\lambda x.x \ x)(\lambda x.x \ x)$
    this beta reduction does not terminate
  - $Y \equiv \lambda f.(\lambda x.f(x \ x) \lambda x.f(x \ x))$
    $Y g \rightarrow (\lambda x.g(x \ x)\lambda x.g(x \ x))$
    $(\lambda x.g(x \ x)\lambda x.g(x \ x)) \rightarrow g (\lambda x.g(x \ x)\lambda x.g(x \ x))$
    this expresses regular recursion that will terminate if it is evaluated lazily

##### What exactly is lazy evaluation?

$(\lambda x.y)((\lambda x.x \ x)(\lambda x.x \ x)) \rightarrow y$

* with **eager evaluation**  $W \equiv (\lambda x.x \ x)(\lambda x.x \ x)$ would be evaluation before being passed to $(\lambda x.y)$ but $W$ never terminates its evaluation such that the machine will crash
* with **lazy evaluation**, $W$ never actually gets evaluated before $y$ is returned

