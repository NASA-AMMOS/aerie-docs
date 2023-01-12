# Glossary

This is an alphabetized glossary of common term definitions used throughout the Aerie ecosystem and related domains.

## A

1. **Activity Directive** - A modeled unit of mission system behavior to be utilized for simulations during planning. Activities emit events which can have various effects on modeled resources, and these effects can be modulated through input parameters.
1. **Argument** - A value given to a function or assigned to an Activity Parameter.

## C

1. **Call** - A function in the [Merlin simulation modeling API](../mission-modeling/activity-types/effect-model/). `Call()` executes a provided task and blocks until that task has completed. Typically `Call()` is used by a mission modeler who wants to execute an activity and wait for its completion before continuing execution of their modeling code. `Call()` has a few function signatures so that it can be used to call an activity type and arguments or a Java lambda/Runnable.
1. **Cell** - Allows a mission model to express time-dependent state in a way that can be tracked and managed by the host system.
1. **Common Access Manager (CAM)** - A [NASA AMMOS](https://ammos.nasa.gov/) utility which provides application layer access control capabilities, including single sign-on (SSO), federation, authorization management, authorization checking & enforcement, identity data retrieval, and associated logging.
1. **Constraint** - An expression built up with the [Aerie constraints](../constraints/introduction) eDSL, which evaluates to a set of windows during which the condition(s) defined by the expression is true or false.

## D

1. **Decomposition** - A method for modeling the behavior of an activity (root activity) by composing a set of activities. Each composed activity describes some smaller aspect of behavior. The root activity orchestrates the execution of each child activity by interleaving function calls to `spawn()`, `delay()`, and `call()`. The goal of decomposition is to allow mission modelers to modularize their activity modeling code and to provide greater visibility into the simulated behavior of an activity. For example, consider an activity which models taking an observation with a particular spacecraft instrument. The process of taking an observation may include the distinct phases of instrument startup, take observation, and instrument shutdown. The mission modeler can decide to modularize their modeling and use decomposition to model each of the three phases separately and then compose them with a root activity called "observation" which orchestrates the execution of each of the three activities.
1. **Delay** - A function in the [Merlin simulation modeling API](../mission-modeling/activity-types/effect-model/). A modeler can delay (pause) an activity’s execution during simulation effectively modeling some passage of simulated time, before resuming further modeling.
1. **Deployment** - We refer to a particular configuration of the Aerie system as an "Aerie Deployment", in the context of a broader [ground data system (GDS)](https://www.nasa.gov/smallsat-institute/sst-soa/ground-data-systems-and-mission-operations) deployment.
1. [Docker](https://www.docker.com/) - A set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers.

## G

1. [GraphQL](https://graphql.org/) - An open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.

## H

1. [Hasura](https://hasura.io/) - A GraphQL schema compiler and GraphQL API server. As a compiler, Hasura parses a PostgresDB schema and generates a GraphQL schema defining a data graph of Queries, Mutation, and Subscriptions. Aerie utilizes a Hasura component to expose select database tables as the Aerie GraphQL API.

## J

1. [JUnit](https://junit.org/junit5/) - A unit testing framework for the Java programming language.

## M

1. **Mission Model** - The modeling code written in Java, packaged as a JAR, which is consulted by the simulator.

## P

1. **Parameter** - A named variable (and data type) in a function description or Activity definition, utilized within the function/Activity definition.
1. **Plan** - A collection of Activity Directives scheduled and simulated against a mission model.
1. **Planner** - A person responsible for deciding how to concretely achieve a set of mission objectives over the course of a span of time, formalized as a plan, with the expectation that this plan will be executed by other mission elements, including (and especially) by a spacecraft’s onboard system. The planner’s concern is with achieving those objectives while balancing reward against risk. Planners iteratively perform scheduling and simulation in a feedback loop to refine their plans. Automated schedulers may themselves utilize simulation artifacts to inform their decisions.
1. [PostgreSQL](https://www.postgresql.org/) - Also known as Postgres. A free and open-source relational database management system emphasizing extensibility and SQL compliance.
1. **Profile** - The time-dependent behavior of a resource.

## R

1. **Register** - A [model of a resource](../mission-modeling/resources-and-models/) which can have its value set and this value remains until it is set with a different value. The term register here is used to clearly indicate the semantics of this resource; the semantics of setting a memory register.
1. **Resource** - Expresses the time-dependent evolution of quantities of interest to the mission.
1. **Resource Types** - The schema describing the structure of data in a resource.

## S

1. [SPICE](https://naif.jpl.nasa.gov/naif/toolkit.html) - NASA's Navigation and Ancillary Information Facility (NAIF) offers NASA flight projects and NASA funded researchers the “SPICE” observation geometry information system to assist scientists in planning and interpreting scientific observations from space-based instruments aboard robotic planetary spacecraft. In the Merlin context SPICE is most commonly incorporated to a mission model as a Java library. The library is configured with data files called “kernels” and then a mission model will query the library for an assortment of mission specific geometric data.
1. **Simulation** - Plan simulation is the act of predicting the usage and behavior of mission resources, over time, under the influence of planned activities. Put differently, simulation is an analysis of the effects of a plan upon mission resources.
1. **Simulation Results** - The output of a simulation run. The simulation results include, simulated activity spans, their arguments (root activities and those arising from decomposition), resource profiles, and events.
1. **State** - The value of a resource/variable at an instant in time (e.g. "The state of the radioMode resource is ON").

## T

1. **Task** - Allows a mission model to describe time-dependent processes that affect mission state.

## W

1. **Window** - The output of constraints checking. A boolean-type profile describing at what times a given constraint is violated. True means the state is nominal; false means the state is a violation.
1. **Worker** - Aerie provides a multi-tenancy capability so that many users can run simulations concurrently. Simulation multi-tenancy is achieved by configuring Aerie to launch multiple simulation worker containers. Each simulation worker can execute a sand-boxed simulation run.
