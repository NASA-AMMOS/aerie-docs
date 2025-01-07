# ADR-0001 - Java as a mission modeling language

## Status

Retroactive

## Context

APGen, Aerie's predecessor, used a Domain-Specific Language (DSL) for defining activities and resources.

From a paper on Blackbird (see [References](#references)), a key source of inspiration for the Aerie project:

> Much of Blackbird’s ease of use derives directly from how adapters write code directly in an industry-standard programming language. Features such as an integrated development environment (IDE) with debugging, static code analysis, performance profiling, ease of calling external libraries, online reference resources, native test frameworks, formal dependency management, and more have all reduced development time and uncaught errors. Java has been GitHub’s second most-used language since 2013 [13] and the first most-used on the TIOBE index since 2015 [14], so new developers may already be familiar with it, and all adapters benefit from an active community and helpful resources. To create an activity in Blackbird, only a small subset of the full Java language is required, so even new adapters can make contributions quickly, then add more complex behavior as their proficiency grows. Blackbird adapters typically become proficient in about two weeks full-time. Blackbird adaptations listed in later sections all required people working only part-time for limited commitments, whereas traditionally missions need to dedicate at least one full-time person for years. If a project decides that they want to use another language to write their activities, they can seamlessly incorporate Python-like Groovy, JavaScript-like Kotlin, or Lisp-like Clojure, which can all inherit Blackbird’s Java base classes. Groovy and Kotlin proofs of concept were built which motivated multiple projects using Blackbird to consider partially switching to one of these other languages to further improve the new adapter experience. Based on experience training more than 10 people to use Blackbird, the largest impediments to ease of use are not the language syntax, but the use of an IDE for adapters without prior experience, and understanding when their adaptation code will execute as part of the simulation. One is not forced to use an IDE to develop in Blackbird, but the initial investment to learn to use one is often worth the reduced risk and improved productivity afterwards. Stepping through code in the debugger has greatly helped adapters understand when their code will be called, which will always be non-trivial for any complex system. There is a detailed adapter’s guide which walks new users through defining and deploying an adaptation.

13. "Projects", The State of the Octoverse, [online] Available: https://octoverse.github.com/projects.html
14. TIOBE Index, [online] Available: https://www.tiobe.com/tiobe-index/.

## Decision

Based on much of the same rationale provided by Blackbird, we choose to use Java as the language that users will use to define mission models

## Alternatives considered

Python is another very popular language within the aerospace and scientific communities. When providing demonstrations of Aerie's Java mission modeling language to various organizations, there have been many requests for a Python framework in addition or in lieu of a Java on. Adding or replacing the Java mission model framework with a Python one would likely help product adoption. However, there are technical challenges to hosting Python. It has a history of breaking changes, and has no notion of an "interface". It is not designed for multi-tenancy, has no JIT-compiler, and has a largely architecture-specific ecosystem (e.g. key python libraries are often written in C to improve performance and cannot easily be ported between different compute architectures). We also felt strongly that the mission model should be written in the same language as the simulator itself, and Python was not considered an appropriate implementation language for the performance-critical or complex parts of the application.

## Consequences

- Missions have been able to push Java quite far, pulling in frameworks like Guava, and Dagger.
- Potentially lower adoption rates from mission users whose personnel and ground systems are primarily built on python

## References

- C. R. Lawler, F. L. Ridenhour, S. A. Khan, N. M. Rossomando and A. Rothstein-Dowden, "Blackbird: Object-Oriented Planning, Simulation, and Sequencing Framework Used by Multiple Missions," 2020 IEEE Aerospace Conference, Big Sky, MT, USA, 2020, pp. 1-20, doi: 10.1109/AERO47225.2020.9172680.
