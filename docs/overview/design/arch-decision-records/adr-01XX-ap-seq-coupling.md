# ADR-01XX - Aerie Planning and Sequencing Coupling

## Status

Proposed

## Context

Uplink planning for spacecraft operations is often described as having two distinct phases: activity planning and sequencing. During activity planning, mission operators work to build up a plan of activities that meet objectives designated by mission users (e.g. scientists) while ensuring spacecraft constraints are not violated (e.g. shared resources like data volume and energy are not oversubscribed). Once a plan has been formulated, mission operators enter the sequencing process where the plan is converted into sequences of commands and other uplink products (e.g. ephemeris files) that will actually be sent to the spacecraft. During sequencing, additional checks are performed to ensure that the sequences and uplink products built will not harm the spacecraft and match the intent of the original plan.

The extent to which missions perform these planning and sequencing steps and the degree to which they are coupled varies considerably from mission to mission. For example, a small cubesat Earth-orbiting mission may do very little planning once they begin operations because their operations are fairly routine and they can get away with performing near real-time sequencing of their spacecraft. However, a complex rover on Mars with significant light time delay with dozens of on-going scientific investigations requires a significant amount of planning to converge on a plan before even thinking about sequencing.

Because of the variability in mission types and complexity, missions may choose different tools to support their planning needs from their sequencing needs. In addition, some missions may want tooling that automates their sequencing from their planning process in order to increase efficiency and reduce manual operator error.

The Aerie system is composed of an activity planning component and a sequencing component (i.e Phoenix) with an activity expansion capability within the planning component that can generate sequences to seed the sequencing process. Currently, these components are all deployed together and mission customers are not presented with an easy way to take either the planning or sequencing component of the system. Moreover, it is non-trivial to update one component without updating the other. At the same time, for those customers who want to use both the activity planning and sequencing components of Aerie, we want to offer a highly integrated experience that makes it easy for users to move between planning and sequencing.

## Key Considerations

For customers using both components of Aerie, the following are key requirements:

- Ability to upgrade components independently. To be useful, these upgrades could not result in breaking changes for the other component.
- Ability to move data between components (e.g. write expanded sequences to Phoenix sequencing workspace or access sequence templates within Phoenix to associate with an activity type)
- Shared authentication end point and definition of user roles between components (note that the permissions may be specific to each component while the role may not be)

In order to support customers that want only the planning or sequencing portions of Aerie and still provide them with a great user experience, we want to do at least the following:

- A customer who only plans on using Aerie for sequencing should only be exposed to UI elements related to sequencing (e.g. pages like the model specification page should not be accessible) and vice versa. This includes hiding data access points between components (e.g. accessing a sequence workspace from activity planning page)
- Data passed between planning and sequencing should be available for export in the UI and programmatically via the API so that data can be shared between the Aerie component and other parts of the mission's ground system

## Planning-Sequencing Interface

In order to support separate upgradability of planning and sequencing components, it is critical to understand the interface between these components (i.e. establish an API contract). Below is a list of data items that need to move between components and a notional interface specification for who produces and consumes each item.

| Data                                          | Producer   | Consumer                | Notes                                                                           |
| --------------------------------------------- | ---------- | ----------------------- | ------------------------------------------------------------------------------- |
| Sequence                                      | Planning   | Sequencing              | produced via activity expansion                                                 |
| Sequence Template                             | Sequencing | Planning                | templates can be authored and stored in a Phoenix workspace                     |
| Activity Dictionary                           | Planning   | Sequencing              | used for template authoring validation                                          |
| Flight Dictionaries (e.g. Command Dictionary) | External   | Planning and Sequencing | primarily used in sequencing but also needed for model-based activity expansion |

Can one component be a dependency of the other where one side of the interface doesn't need to know about the other side?

Note: Looking down the road, eventually sequence simulation (part of sequencing) will produce simulation results, which may be best viewed on a timeline with constraints also visualized on that timeline. Currently, the timeline view exists within the planning component of Aerie, but eventually it may be prudent to pull that out as a dependency for both the planning and sequencing components. However, the decision on what to do with the timeline view is out of scope for this decision.

### Alternatives Considered

Deploy all backend containers even if only one component is desired and have UI configuration flag to hide elements referencing non-used component

Pros:

- Lowest work effort
- Can easily share authentication/roles between components

Cons:

- Mission is getting extra stuff as part of the delivery it really doesn't need.
- API endpoints for non-used components are still exposed and could be subject to vulnerabilities. In fact, mission may need to upgrade to fix a patch to unused code/end points.
- What does it mean to "hide" these UI elements? Could they still be accessible?

Deploy a subset of backend containers and have UI configuration flag to hide elements

- What does it mean to "hide" these UI elements? Could they still be accessible?

Have two completely separate applications

Solutions:

- Separate upgradability
  - versioned interface between components
  - pick a direction for the dependencies (e.g. planning side has no idea about sequencing side vs. sequencing side has no idea about planning side)

What is in the planning/sequencing interface?
| Planning | Direction | Sequencing |
Sequence Expansion | -> | Sequences

- Expanded sequences fro
- sequence traceability back to activity from which it came?

Sequence Template Editor should have access to activity dictionary and command dictionary. Could consider having this as a third component?

- Authentication problem
  - Seen this done with separate service for authentication and roles, but fine grained permissions make this more challenging
  - User management component separate from applications which is integratable with 3rd party solutions

#### Database

Option 1: Shared Database Schema

- Maintain a single PostgreSQL instance with separate schemas for planning and sequencing.
- Access to tables is controlled based on deployment configuration (e.g., if only planning is deployed, sequencing tables are not used).
- Benefits: Easier integration for customers using both components, no need for complex data synchronization.
- Drawbacks: Coupling at the database level still exists.

Option 2: Separate Databases with Data Sync

- Deploy independent PostgreSQL instances for planning and sequencing when needed.
- Use an event-driven data sync mechanism (e.g., Kafka, RabbitMQ) to ensure data consistency when both components are deployed.
- Benefits: True independence of components, reducing risk of schema changes affecting the other.
- Drawbacks: More complexity in data synchronization.

#### Authentication and Authorization

#### UI

Options???

- Dynamic UI Configuration: Implement feature flags or configuration settings that control which UI elements are displayed based on deployment settings.
- API-Driven UI Behavior: The frontend should dynamically adjust based on API responses—if a sequencing API is unavailable, related UI elements should be hidden.

#### Data Exchange and Interoperability

- Exportable Data: Ensure all data exchanged between planning and sequencing can be exported via UI and API for external system integration.
- Standardized Data Format: Define JSON or Protobuf-based standardized formats for activity plans, sequence templates, and other data.
- Inter-Service Communication:
  - When both services are deployed, they communicate via direct API calls.
  - When deployed separately, customers can use batch exports or webhook-based updates.

## Decision

- What do we do with repo organization?

- Should we version planning/sequencing API contract? Probably...

- Likely want to just have a single database for joint deployment

- A&A

  - Use the same gateway service, even if deployed separately?
  - Implement SSO?
  - Use Federated Role-Based Access Control (RBAC)? (global user roles across components)
  - The authentication gateway issues JWT tokens that include role and permission claims, which are validated by the individual services.?????

- What do we do with sequence templates if someone is using one component vs. another...

  - If turn off sequencing, but keep planning, but you can still expand templates
  - If you have sequencing and not planning, you don't have any sequence templates

  Maybe a short term solution vs. long term

  - Be disciplined about what components talk to each other in what ways

## Consequences

## References

-
