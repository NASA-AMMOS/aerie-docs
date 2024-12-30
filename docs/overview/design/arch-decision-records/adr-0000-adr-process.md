# ADR-0000 - Establish ADR Process

## Context

Over the past year, the Aerie project team has been tasked by its primary sponsor, the NASA AMMOS program, to incorporate enhanced spacecraft sequencing capabilities into Aerie (this task has been colloquially called SEQ 2.0). The program is interested in ensuring sufficient oversight to preserve stakeholder buy-in on the task as it progresses. In addition, new organizations are contributing to the project (e.g. Goddard Spaceflight Center, Ames Research Center) that have less familiarly with the Aerie project and its history. These drivers have created an increased need to clearly communicate architectural decisions and their rationale.

## Decision

Create an architectural decision record and use it to track architectural decisions. This record will live alongside the rest of the project's documentation in a separate section.

Identifiers for new decisions made after the establishment of this process will begin at 0100 and will tick upward monotonically (numbers below 0100 will be used to document historical decisions the project feels are worth communicating to future contributors). ADRs will be loosely chronological, but are not required to be. If we find the need to document a past decision, it's fine to allocate it the next available number.

A basic template and readme will be available to create new ADRs and briefly describe the content that should be within a record.

## Alternatives Considered

We could use the GitHub PR and issue history to track these decisions, but it can be difficult to traverse those. GitHub Discussions are also a viable home for these records, but that precludes offline editing, and isn't particularly dense or organized. Remaining in GitHub as opposed to documenting these decisions in a different location is preferred to keep these decisions close to the code that ultimately reflects these decisions.

## Consequences

### Positive

- The project will have a clear written record that explains where we are today and how we got here, which currently does not exist
- Records will be tracked in the main repository alongside the source code so that architectural decisions are transparent to the project community and can be authored, reviewed, and approved by community members
- ADR reviews can serve as an opportunity for project stakeholders and sponsors to provide feedback on the direction of the project
- There is a lower barrier of entry to get involved in the projects design process since it can be seen by all members of the community

### Potential Negative

- If not kept up to date, these documents may become misleading and actually be more hurtful than helpful.
- Writing and reviewing these documents will take time on an already resource constrained team
