# Resources and Models

In Aerie a resource is any measurable quantity whose behavior is to be tracked over the course of a simulation. Resources are general-purpose, and can model quantities such as finite resources, geometric attributes, ground and flight events, and more. Aerie provides basic models for three types of quantity:

1. A discrete quantity that can be set (Register)
1. A continuous quantity that can be added to (Counter)
1. A continuous quantity that grows autonomously over time (Accumulator)

A common example of a Register would be a spacecraft or instrument mode, while common Accumulators might be battery capacity or data volume.

Defining a resource is as simple as constructing a model of the appropriate type. The model will automatically register its resources for use from the Aerie UI or Aerie API. Alternatively, a resource may be **derived** or **sampled** from an existing resource.
