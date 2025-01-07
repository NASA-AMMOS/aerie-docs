# ADR-0101 - Aerie Actions

## Status

Proposed

## Context

Much like an integrated development environment (IDE) for programming, the Phoenix Sequencing Development Environment (SDE) is intended to help spacecraft operators efficiently develop and verify sequences of commands in preparation for sending those commands to a spacecraft or test bed for execution (see [adr-0100](../adr-0100-phoenix-sde)). Given the wide variety of languages used to write sequences and tools used to operate on sequences found across missions (to perform static checking, compilation, and sequence translation), Phoenix must be designed so missions can easily hook in their language and tools of choice.

As a first step in providing mission customization of Phoenix, a sequence adaptation interface was created (see [adr-0006](../adr-0006-phoenix-editor)). This adaptation is written in javascript and can loaded at runtime into the Aerie UI to add or alter the behavior of Phoenix. Over time, the interfaces and capabilities provided by the sequence adaptation have grown. The sequence adaptation currently provides the following:

- Customization of the text editor behavior used to write and view sequences via the use of CodeMirror extensions (there are guardrails here so only some code mirror capabilities are exposed)
- Use parsed command dictionary files (e.g. parameter and telemetry) parsed by Aerie whose contents are used to provide a better sequence authoring experience (e.g. autocompletion of user-friendly names for command arguments instead of numeric values).
- Defining global variables that can be used by multiple sequences
- Parsing and translation between different sequence formats for both import and export
- Hooking up an external static checking service (including the addition of a button in the UI) such that rules can be checked and reported back to the sequence editor.

Since the sequence adaptation already existed, it was natural to continue to grow its capabilities rather than define alternate methods for adaptation. There was also significant pressure to deliver many of these capabilities quickly to a mission customer with tight delivery deadlines.

Additional external services to perform sequence compilation, sequence simulation, and connect to external mission data stores will need to interface and interact with Phoenix. There is a question as to whether the current sequence adaptation design is sufficient to support these additional integrations and provide a good experience for mission adaptation developers and end users (mission operators).

## Alternatives considered

The main questions considered to shape this architectural tradeoff and illuminate options were:

1. Should all customization code live in a single adaptation loaded into Aerie or multiple entities (e.g. multiple adaptations or plugins)
2. Should external service interfaces be prescriptive and well “shaped” (e.g. rigid APIs for compilation, translation, simulation)
3. Do these external service interfaces fit into the same mold as the text editor customizations or should they be a separate concept?

### Option Identification

- Option 1: Continue to grow the sequence adaptation and have a single, "monolith" adaptation interface (single adaptation, non-prescriptive interface, single concept between external services and editor customizations).
- Option 2: Create a modular plugin design that allows for multiple plugins to provide all of the capabilities currently in the sequence adaptation plus the additional external services required to be supported by Phoenix (multiple adaptations, non-prescriptive interface, single concept)
- Option 3: Create new interfaces outside of the sequence adaptation with well-defined interfaces specific to each external service type Phoenix must support (multiple adaptations, prescriptive interface, distinct concepts)
- Option 4: Create a new concept called "actions" for custom processes to be run based on triggers/events that is separate from the sequence adaptation (multiple adaptations, non-prescriptive interface, distinct concepts)

### Key Quality Attributes Considered

- Usability: has consistency and approaches to the design that allow users to anticipate and understand how to interact with the system. Our users in this context are both the developer creating the adaptation and the end user who will use the adaptation (and perhaps "install" it)
- Flexibility/Extensibility: ability to manipulate the system to be able to add/modify capabilities internal to the system and reach out externally to other tools/components.
- Maintainability: ability for capability to be updated over time without onerous or costly changes for core and adaptation developers (reduction of breaking changes)

### Option Evaluation

#### Option 1 - Single Sequence Adaptation

There are some known issues with the adaptation today, which would need to be fixed even if we stick with a single adaptation. Those are:

- Adaptation updates are error prone
  - No workflow for publishing adaptation API so adaptation devs can pull in changes for testing. Because we aren't publishing the type script definition file (API), its hard to catch issues when updates occur

##### Pros

- The adaptation already exists and it would likely cost less time and money to deliver the remaining required service integrations through this interface.
- The adaptation is a "one stop shop" so it is fairly obvious where missions would need to inject their customizations.
- There is also only one adaptation for Phoenix core to worry about (maintainability)

##### Cons

- Encourages a "clone and own" approach to adaptations where missions copy previous adaptations and alter them, but cannot use them without modification. However, this could be mitigated to some extent with a build process made up of multiple files that are merged together (where individual files can be shared) and then provided to Aerie
- Increases learning curve for new developers trying to understand and modify the adaptation because it does so much and serves many purposes.

#### Option 2 - Plugin Architecture

##### Pros

- Plugin architectures are a well known design pattern that both users and developers are familiar with and there are many good examples from which to gain inspiration. For example, the [Obsidian](https://docs.obsidian.md/Home) markdown editor uses a plugin architecture that also leverages CodeMirror extensions.
- Plugins are modular and can be designed to only perform a single function (separation of concerns). This makes plugins easier to understand (usability) and easier to share across missions. This should also make plugins easier to test.
- A single plugin API (as opposed to one API per expected service) gives developers the flexibility to define their plugin to best match any mission-specific external services/tools they may have. A single plugin could be built to represent static checking and simulation, for example (SeqGen is a concrete example of this)
- Plugin architecture allows behavior to be written directly into the plugin as opposed to requiring it to be an external service and communicating over a network protocol
- Many external services/tools we need to connect to Phoenix will require configurable settings. A plugin architecture will allow for a single settings interface instead of duplication of such an interface per service/tool (maintainability)

##### Cons

- A single general plugin interface which subsumes all operations currently handled by the adaptation, and also supports future requirements for interfacing with external services, must necessarily have a large "surface area", allowing plugins to access to many parts of the application and user data at once.
  - This impacts usability, a less-strict interface per service provides lots of opportunity for plugin developers to "shoot themselves in the foot" and do things they did not intend to do. It does not provide a mental model for thinking about when the plugin code will be run.
  - It is also difficult to maintain such a large API from a developer standpoint, as it will need to be validated and kept up to spec as other internal Aerie code changes.
- With multiple plugins, dependency management can become a concern if plugins need to depend on each other. Similarly, multiple plugins may operate on the same user data, potentially causing unexpected behavior.
- Plugin developers will have to do more work to set up the hooks and protocol for calling out to external services and tools (this can be mitigated to some extent by providing examples developers can start from)
- System must be less opinionated about the overall workflow through Aerie and the orchestration/order of operations between plugins/services.

#### Option 3 - Individual Service Interfaces

In this option, services are not bundled in the adaptation at runtime and are uploaded separately via the UI (or perhaps are hooked up during deployment/startup as opposed to dynamically uploaded). Aerie would provide a separate, specific interface for each type of operation that is supported, eg. translation, compilation, static checking, and would have rigid, specific requirements for the shape of the data structures sent to and from these services. Some parts of these services would be configurable via the UI - for example, users would provide a URL and some metadata and Aerie would define what gets sent and returned and the protocol (e.g. via gRPC or HTTP)

##### Pros

- Strictly shaped interfaces would make the development of interface adapters relatively straightforward
- No concern of dependency management or unexpected behavior as the inputs/outputs of each service would be well defined.

##### Cons

- Maintainability - This option leaves the Aerie dev team with the largest number of different APIs to maintain, since it would have specific APIs for each service type we support. Each API is less complicated, but the combined surface area is large.
- Well shaped interfaces provide the least flexibility to match preexisting tools that a mission may want to connect to Aerie (round peg/square hole problem)
- Services would have to use the protocol Aerie prescribe/chooses even if certain services would benefit from alternate protocols.

#### Option 4 - Adaptation Plus Actions

This option keeps the existing sequence adaptation architecture for code editor customizations, but introduces a new concept for interacting with external services, called Actions.

Actions would be custom tasks written by developers which operate on files in the Aerie workspace, and produce predictable outputs when they are run. Aerie would provide a general Actions API which would give actions access to the workspace, without being specific or prescriptive about how they work. Internally, actions may make asynchronous calls to external services using whatever protocol(s) make sense for the application. The API for actions will also expose a way for developers to create settings for the actions that can be configured by the end user within the application for a given workspace

In addition to the API, Aerie would provide an architecture & UI for managing, configuring and running these actions. Actions would be uploaded via the UI, and if they specify configurable settings, the UI would generate a form where the user could configure them. The Aerie UI would provide a clear way to run the actions manually, and view each run's status, inputs and outputs. Actions could also be triggered to run automatically based on events within Aerie (e.g. saving of a file, importing a file). Eventually, these tasks could be assembled together in workflows or pipelines.

##### Pros

- Like plugins, actions are fairly understandable by end users and have precedent in other software systems (e.g. [GitHub actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions))
- The other pros for plugins (option 2) also apply here with an additional pro that the term actions better matches the purpose of the external services, which are to provide translation and validation steps within a mission's uplink process.
- Distinguishing actions and the sequence adaptation helps separate concerns between different customizations you can make to the system within being too prescriptive about how each type of customization is built. Editor customizations will likely be more complex to build as they require some familiarity with CodeMirror while actions could be relatively simple to build.
- Maintainability - there is only one general Actions API to maintain, rather than many specific service APIs.

##### Cons

- There is some risk of proliferation of concepts within Aerie as it relates to customization. With the addition of actions, Aerie has the sequence adaption, timeline plugins, extensions, parser, and grammar plugins.
- Cons are also similar to plugins although Aerie could be more restrictive with when and how actions are run compared to a generic plugin interface.
- Maintainability - while the actions API is simpler than the other proposed APIs, there is additional complexity in the *actions management system* that Aerie will need to build and maintain - specifically, the architecture required for uploading, configuring, running, and reporting results from Actions, as well as any support for "hooks" (triggers) or pipelined actions which we may add, has the potential to be a significantly complex part of Aerie.

### Additional Considerations

#### Scope of the adaptation or plugin API (how much do we expose to developers?)

No matter what option is selected, an API or set of APIs will have to be exposed to developers. There is a question as to how large and expressive to make the API. A large API provides developers opportunities for more customization of Phoenix at the cost of more complexity and potentially interdependencies. A smaller API limits flexibility, but decreases mental load for developers building adaptations/plugins. We see the smaller API is the right approach to begin with as the API can be grown over time.

#### Execution of behavior from the backend?

There is still an open question as to how to execute behavior embedded in adaptations, plugins, or actions from the backend, but we do not feel the answer to this question would help discriminate between these options.

## Decision

We will introduce a new concept to Aerie called "Actions" that is separate and distinct from the sequence adaptation.

Actions, inspired by [GitHub actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions), would be custom tasks that developers can write that are triggered off of events within Aerie (e.g. saving of a file, importing a file) or triggered manually in the UI (exactly how and where they are manually triggered in the UI is still design work to go). Eventually, these tasks could be assembled together in workflows. The API for actions will expose a way for developers to create settings for the actions that can be configured by the end user within the application for a given workspace. We will keep the action API restrictive to try to keep actions constrained to run at predictable times and with predictable inputs/outputs to ensure end user usability and reduce complexity for action developers. Actions give a unified API for external services to work with while keeping them separate from other application customization.

The sequence adaptation will continue to exist and focus on text editor modifications by exposing parts of the CodeMirror extension API (the whole API will not be exposed to limit adaptation complexity). The adaptation will not expose settings to the end user that they can configure at runtime. The workflow for publishing the adaptation API will be improved to improve the adaptation development experience and testability.

We also recognize that with the additional customization interface, it will be imperative to have sufficient error reporting to make end users aware when actions do not run as expected.

## Consequences

Many of the consequences of this decision are noted in the "Cons" section of Option 4 above.

## References

- https://docs.obsidian.md/Home
- https://www.devleader.ca/2023/9/7/plugin-architecture-design-pattern-a-beginners-guide-to-modularity
