# Software Architecture and Design

Below are brief descriptions of the various documents the project provides to learn about Aerie's software architecture and design

## Architectural Decision Records (ADRs)

ADRs are a growing list of key architectural decisions made throughout the project. Architectural decisions are those that have far-reaching, significant impact on the design and have a strong influence on quality attributes of the project. The primary purpose of these records are to capture the rationale behind decisions made over the course of the project. If a decision is modified later, one should create a new record that supersedes the previous record, but should not remove the old record in order to preserve the decision history over time.

Records will be configuration managed along with the source code so that architectural decisions are transparent to the project community and can be authored, reviewed, and approved by community members. This practice helps democratize the product design to the whole community, especially developers, as they can participate in the design process and be aware of design decisions that may affect their work.

In the [Divio](https://docs.divio.com/documentation-system/) documentation model, this documentation would be considered "understanding-oriented" or explanatory documentation intended to clarify and illuminate decisions made by the project.

## Software Design Description (SDD)

The SDD is a document of moderate length, but sufficiently detailed to capture the main aspects of the software design. The document intends to capture a rough overview of the landscape in which the product is being built and the main goals/objectives of the software. However, this document does not detail out all product requirements (linking to a requirements document is sufficient). After an initial description of context and objectives, the document breaks down the product into components and discuss these components and their interfaces in detail.

This document is a descriptive, [information-oriented](https://docs.divio.com/documentation-system/reference/) reference for those interested in how the software product is put together. Decisions made to come to the design described in this document should be captured in ADRs and can be linked to the design document for those interested in more in-depth explanations of design tradeoffs and consequences of design choices.
