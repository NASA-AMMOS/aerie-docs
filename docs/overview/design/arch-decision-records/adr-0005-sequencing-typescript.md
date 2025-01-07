# ADR-0005 - Typescript Sequence Editor (SUPERSEDED)

## Status

**Superseded** by [ADR-0006](../adr-0006-phoenix-editor)

## Context

In the spring of 2022, the project was under immense pressure from its primary sponsor (MGSS) and its first committed customer, Europa Clipper, to deliver an integrated sequence editing capability within Aerie. Much of the pressure was driven by Clipper's impending launch date and its upcoming verification and validation activities in preparation for launch.

Prior to this time, a VS code extension known as the "Falcon Sequence Editor" had been developed, which allowed users to author and edit sequences in a particular language format and generate corresponding seq-json sequences that could be passed to other tools within a mission's ground system. The Falcon sequence editor was completely separate from Aerie, and thus at the time, there was no way to share information between the editor and Aerie.

TODO: Add some additional context on why the current Falcon Sequence Editor was insufficient to meet needs...

## Alternatives considered

Since a VS code extension already existed, one option was to continue to build upon that extension and provide an integration mechanism between the extension and Aerie. Another option was to abandon the VS code extension and add sequencing capabilities directly into Aerie by using a web-based code editor such a [Monaco](https://github.com/microsoft/monaco-editor), the editor that powers VS Code.

Some pros/cons of these options are shown below:

| Editor            | Pros                                                                                                                                                                          | Cons                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| VS Code Editor    | High-level editor API, general purpose editor, Git integration, local file-system integration, both native and browser-based solutions, rich extension library, offline usage | Browser-based solution requires management server, no sequence deep-linking, clunky user authentication, strict UI/UX dependent on extension API |
| Monaco + Aerie UI | Rich integration with Aerie, plan-sequence deep-linking, fluid authentication, custom UI/UX                                                                                   | Low-level editor API, no offline usage, no Git integration, no native file-system integration, no extension API                                  |

## Decision

Create a sequence editor directly in the Aerie UI using [Monaco](https://github.com/microsoft/monaco-editor). Since Aerie already uses Monaco to support scheduling and constraint authoring, the number of added dependencies should be limited. As with the scheduling and constraint authoring functionality, users will author their sequences via an embedded domain specific language (eDSL) using TypeScript. Since the tech stack to support TypeScript eDSLs already exists, the project feels that this approach is the shortest path to providing an integrated sequence authoring experience. Users will have the ability to generate seq-json sequences from the TypeScript sequences, which can then be used in downstream tools.

## Consequences

- From research, we know that many users are used to writing sequences in bespoke language formats that don't completely align with the TypeScript grammar. For example, sequence language formats often use space-delimited arguments for commands as opposed to comma-delimited arguments as TypeScript. This may impact user's perception on readability and usability of the editor.
- Given how commonplace VS Code extensions are, it is fairly easy for mission developers to understand them and make modifications if required. With the sequence editor embedded in the UI, customizations will be more challenging unless Aerie develops a mechanism that exposes certain editor features without having to modify Aerie core.

## References

- https://github.com/microsoft/monaco-editor
