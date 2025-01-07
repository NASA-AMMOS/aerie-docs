# ADR-0004 - TypeScript as the User-Facing Language for Scheduling, Constraints, and Command Expansion

## Status

Retroactive, partially Superseded: 

Command Expansion is still in Typescript, and Scheduling and Constraints checking TypeScript interfaces continue to be supported. Scheduling is now also supported in java.

## Context

Scheduling and Command Expansion were both expected to be delivered around the same time. A user study had just concluded regarding users' preferred syntax, and the conclusion was that JavaScript and Lua were tied for first place. It was suggested that if we do JavaScript, that TypeScript would provide better

## Decision

Describe the decision you made. Refer to references by small number [0] and other decision records as a four-digit number [0000]

## Consequences

Describe how your decision will or has changed the circumstances of the system, stakeholders, and team. Both positive and negative consequences should be included. Update this section as consequences emerge and are understood.

## Alternatives considered

- For Scheduling:
  - Lua
  - JavaScript
  - LISP
- For Constraints:
  - JSON specification (status quo)
- For Command Expansion:
  - Python
- For Sequence Authoring:
  - VSCode extension with custom syntax

## References

- `[0]` http://example.com
