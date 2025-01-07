# ADR-0006 - Phoenix Editor with SeqN Language

NOTE: This ADR supersedes [ADR-0005](../adr-0005-sequencing-typescript)

## Status

Retroactive

## Context

The Aerie sequence editor currently provides users with the ability to author and edit sequences in a TypeScript embedded Domain Specific Language (eDSL). As this capability has been rolled out, the feedback from users has been far from positive. Below are some of the issues that have been identified:

- While part of the goal of the sequence editor was to not require the user to write seq-json, users feel writing a sequence in TypeScript is just as bad as json. Note that a large portion of sequencers may not be programmers by background, so things that look like code can be scary for them.
- The sequence editor has major issues with readability and review
  - The editor does not enforce one command per line, which makes it easy to miss commands during a review
  - No automatic indentation or support for proper indentation
  - No checking that ifs and loops are closed by the proper commands
- Setting up a new sequence is not intuitive and requires typescript structures to be defined that have no meaning to sequence developers (e.g. `export default () => Sequence.New()`)
- "User-friendly" names for telemetry channels cannot be used, so one must use IDs, which is not preferable to sequencers
- The use of sequence variables and input arguments is cumbersome and not well documented
- Autocomplete feature is nice, but does not support certain cases well (e.g. does not auto complete for arguments that have defined/enumerated values)

The issues with the editor have been significant enough for our first committed customer, Europa Clipper, to reconsider using the editor altogether and revert back to writing sequences in COTs editors, which do not offer out of the box linting support for its sequencing formats. This obviously does not bode well for future customer adoption of the Aerie sequence editor. A major architectural change or alternate solution is needed if we want to keep Clipper as a customer of our sequencing capabilities and garner additional adoption in the future.

Another important note is that at the time of this decision (early 2024), Europa Clipper decided to more widely embrace a sequencing format called "seqN", which was originally developed to perform sequencing in the test bed for verification and validation activities. Therefore, supporting SeqN became a requirement if we wanted wide adoption of our editor on Clipper. Also, there was significant time pressure from Clipper to deliver an alternate solution as they needed to firm up their ground system tooling in the next few months.

## Alternatives considered

Providing a more usable and desirable sequence editor to Clipper was paramount to reestablishing a positive reputation with the project as many members of the project already or will support other target mission customers. Therefore, delivery of an editor that worked for Clipper had to take priority at the expense of ensuring the editor was designed with full multi-mission support.

A standalone prototype web-based editor using [CodeMirror](https://codemirror.net/) had already been developed as a proof of concept that used a custom Domain-Specific Language (DSL) that could provide analogous semantics to seq-json, but in a more compact syntax. The compact syntax was defined as a [Lezer](https://lezer.codemirror.net/) grammar, which enables quick implementation of features such as highlighting, syntax-aware selection, auto-indentation, and code folding.

Given the time pressure to deliver something workable for Clipper, it was an obvious choice to start with the prototype, especially since many developers on the team were already familiar with CodeMirror and Lezer. Moreover, the prototype was demoed to users and feedback was very positive.

While the prototype was standalone, there was a question as to whether it should remain standalone or be integrated into Aerie much like the current eDSL sequence editor. The primary benefit of integrating the new sequence editor into Aerie was to take advantage of the Authentication and Authorization features already available there, which would significantly reduce the time to delivery. However, tying the editor to Aerie's activity planning capabilities meant that a project could not update the editor without also taking updates to activity planning capabilities.

## Decision

The project will create a new sequence editor called Phoenix that is fully integrated into Aerie and will deprecate the TypeScript sequence editor. The editor will use CodeMirror and will provide a seqN grammar (defined in Lezer) out of the box that can be exported in seq-json, a more machine friendly sequencing syntax.

Although delivering a working editor for Clipper is of highest priority, the development team will try to keep Clipper-specific functionality out of the core Aerie code by developing an adaptation interface that allows custom behavior to be injected into the editor via CodeMirror extensions.

Upon initial evaluation, we believe the sequencing constructs defined within seqN are sufficiently generic that the language could be used to support a variety of different missions and flight softwares, so providing this language out of the box could add value for potential mission users who have not selected a sequence language to use. However, we must also ensure support for other sequencing languages since there is no standard language used by all missions. Fortunately, additional sequencing grammars can be defined and supported (even simultaneously) in CodeMirror.

## Consequences

- We will inevitably incur some technical debt as we rush to deliver something for Clipper, but this should in part be mitigated by establishing an adaptation interface.
- Tying Phoenix to the activity planning portion of Aerie could cause issues if a mission wants to take Phoenix updates without taking activity planning updates, especially if those updates include breaking changes.
- Adds a new dependency (CodeMirror) to Aerie so that Aerie will now depend on two code editors (Monaco for scheduling, constraint, and expansion eDSLs and CodeMirror for sequencing). This will likely increase maintenance costs.
- The activity expansion capability within Aerie will expand sequences into seq-json as opposed to seqN, so developers of expansions will have to be familiar with two separate languages instead of one.

## References

- https://codemirror.net/
- https://lezer.codemirror.net/
