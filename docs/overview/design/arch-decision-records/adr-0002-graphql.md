# ADR-0002 - GraphQL instead of REST API

NOTE: Apollo has been replaced by Hasura as of [0003-hasura-and-postgres](../adr-0003-hasura-and-postgres).

## Status

Retroactive

## Context

#### Aerie API Needs

1. Evolve the internal APIs rapidly and the public APIs slowly.

   The development of the Aerie user interface and application
   internal components proceeds in parallel. As a result, the user
   interface’s data needs imposes constraints on the definition of the
   system’s public API. The evolving nature of the user interface’s
   development makes it difficult to carry out an API design effort,
   as would be the case for a REST API architectural style. Further,
   the structure of resources needed by the highly configurable
   interface components within the user interface, makes defining an
   efficient set of resource endpoints prohibitively difficult. Such
   endpoints would require continuous editing and updating as
   development progressed.

2. Multiple clients and multiple different workflows for clients.

   There exists a category of use cases in which customers develop
   custom Aerie client applications. Such customization requires the
   flexibility to easily define new data projections as simple queries
   constructed by a client. As a result, Aerie benefits from an API
   that supports high query flexibility from both the external client

3. Ability to dynamically reduce/transform response payloads.

   Within the planning, scheduling and sequencing domain are a number
   of common list like data structures/concepts which are often quite
   large in size (number of elements). It is inefficient to impose
   upon any client seeking a particular view/aspect of the data
   structure to request and process the entire structure. For example,
   certain resources can’t be made "smaller" without compromising
   their intent. A Plan can be filtered but not sensibly
   partitioned. It is desirable that any client requesting such data
   structures be provided with an easily accessible means to query the
   data structure for the elements/projection of interest.

4. Custom queries and batch fetching.

   The Aerie stores a number of significant mission data sources
   (E.g. activity plan, simulation results, and constraint violation
   results). Aerie must provide users flexible access to this data to
   support an arbitrary space of use cases for reporting, auditing and
   interfacing with third-party customers.

#### Trade Study

A trade study was conducted to evaluate available API products. A down selection of the tools left both the [Tyk API](https://tyk.io/) gateway product and [Apollo GraphQL Server](https://www.apollographql.com/) product. The primary difference between these two products are their approach to exposing data. The Tyk gateway exposes system queries as [Representational State Transfer(REST)](https://www.codecademy.com/article/what-is-rest) endpoints while the Apollo GraphQL server exposes a single GraphQL query endpoint. The REST and GraphQL architectural styles present different approaches and embody contrasting capabilities. Representational State Transfer is an architectural style for distributed hypermedia systems. GraphQL is a query language for an API, exposed as a typed schema defined by a data graph. Table 3 presents a set of desirable API properties and the manifestation of each property for REST and GraphQL driven APIs.

Table 3 Comparison of REST and GraphQL capabilities

| System Property                                    | REST    | GraphQL            |
| -------------------------------------------------- | ------- | ------------------ |
| Modifiability                                      | ✅      | Runtime inspection |
| Scalability                                        | ✅      | ❌                 |
| Portability                                        | ✅      | ✅                 |
| Reliability                                        | ✅      | ✅                 |
| Simplicity                                         | ✅      | ✅                 |
| Visibility                                         | ✅      | ✅                 |
| Performance                                        | ✅      | ❌                 |
| Discovery and Introspection                        | Limited | ✅                 |
| Consistency                                        | ❌      | ✅                 |
| Ease of Server Development                         | ❌      | ✅                 |
| Ease of Client Development                         | ❌      | ✅                 |
| Over-fetching protection without proper API design | ❌      | ✅                 |
| Active Community                                   | ✅      | ✅                 |
| Tooling Server                                     | ✅      | ✅                 |
| Tooling Client                                     | ✅      | ✅                 |
| Tooling API Management                             | Limited | ❌                 |
| Maturity                                           | ✅      | ❌                 |
| Works with any data representation                 | ✅      | ❌                 |
| Printed Books                                      | ✅      | ✅                 |
| Enterprise Ready                                   | ✅      | ✅                 |

The following is a discussion of the particular API qualities which
provide for Aerie’s needs.

- **Discovery and Introspection** - The GraphQL data graph schema
  provides a contract-like mechanism where requests and replies are
  inherently typed and can be directly validated and resolved based on
  those types. This contract like nature completely describes all
  possible requests/responses where a typed service provider won’t
  compile until it fully implements its contract. A typed service
  consumer will be type-checked at compile time, which helps to catch
  problems before deployment. Finally, it is unreasonable to expect
  that a well-performant API can be developed for every conceivable
  use case. As a result the improved introspection at the per field
  level in GraphQL allows for targeted optimization of common or slow
  queries.

- **Consistency** - The API schema is typed and therefore either
  correct or not. As a result, there is an inherent consistency
  between client and server because both must abide by the generated
  schema.

- **Ease of Server Development** - It is easier (development time,
  complexity) to develop and maintain data source resolvers as part of
  a GraphQL server. Well designed, true REST APIs take time and
  resources and are therefore more difficult to design and
  maintain. GraphQL relieves the project of that unnecessary burden.

- **Ease of Client Development** - A client can develop against the
  exposed contract. A client can develop custom queries targeted to
  its own use cases to limit both over and under fetching. In many
  cases this may reduce latency and increase performance by limiting
  client side data manipulation/filtering.

- **Flexibility of API Design** - User and mission needs are
  constantly evolving. GraphQL decouples the API allowing the Aerie
  team to make adjustments to the API according to evolving customer
  needs. Additionally, the increased granularity and visibility when
  auditing the frequency and combinations with which certain fields
  are queried, allows for clearly validated deprecation, removal, and
  changes of fields available in the API schema.

## Decision

Use Apollo GraphQL. (Later, [[0003-hasura-and-postgres]])

The Aerie GraphQL API presents a consistent application boundary to Aerie users. The API server enables the composition of multiple APIs (internal to the application) as a single API endpoint. The API component additionally provides a location in the system for the following needs:

- Manipulation of data
- Response Caching

## Consequences

By adopting GraphQL we knowingly forgo certain
capabilities/constraints of a REST API. Three cases have been
identified as possible risks and sufficient mitigation options are
identified:

1. **Tooling API Management** - GraphQL is a newer technological approach to APIs (2012).
   **Mitigation:** Aerie has chosen to use Hasura, a major open source contributor to the GraphQL community.
2. **Caching** - REST over HTTP benefits from existing HTTP server caching and browsers client caching mechanisms.
   **Mitigation:** Most GraphQL libraries have caching mechanisms built in. Hasura caching must be handled with annotations/directives on the graph definition.
3. **Client-API Loose Coupling** - Each new client application must make affordance at development time and hardcode custom queries and mutations as made possible by the Aerie GraphQL schema.
   **Mitigation:** None. In the Aerie context this is not considered a benefit.

## Retrospective

Note, since the time of this original decision, the loose coupling of the client API provided by GraphQL has resulted in some challenges for missions using or considering to use Aerie:

- While missions have full flexibility in how they build queries, they must go through the legwork of building a set a queries to perform basic functions that legacy tools provided out of the box (e.g. exporting plans and simulation results). This results in added cost and an increase to the barrier of entry for missions considering Aerie. In fact, the first user of Aerie found it necessary to build a command line tool for Aerie ([aerie-cli](https://github.com/NASA-AMMOS/aerie-cli)), which they graciously provided back to the community and is now maintained by the Aerie project.
- Similarly, since Aerie lives in the greater ground system ecosystem where tools often communicate to each via files, common file formats are especially useful. Missions often don't want to go through the work of creating their own file formats if pre-built ones are sufficient.

In addition to the flexibility provided by GraphQL, there still seems to be a need for Aerie to offer an "out of the box" solution (file formats and standard queries) that works for most use cases and reduces the workload on missions.

## References

- https://tyk.io/
- https://www.apollographql.com/
