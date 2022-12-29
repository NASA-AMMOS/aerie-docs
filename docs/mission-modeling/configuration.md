# Configuration

A **mission model configuration** enables mission modelers to set initial mission model values when running a simulation. Configurations are tied to a plan, therefore each plan is able to define its own set of configuration parameters

## Declaration

To use a mission model configuration the `@WithConfiguration` annotation must be used within the mission model's [package-info.java](./introduction.mdx#the-package-infojava-file) to register the configuration with Aerie.

For example, the Aerie mission model template [package-info.java](https://github.com/NASA-AMMOS/aerie-mission-model-template/blob/main/src/main/java/firesat/package-info.java) makes use of this annotation:

```java
@MissionModel(model = Mission.class)
@WithConfiguration(Configuration.class)
package firesat;

import gov.nasa.jpl.aerie.merlin.framework.annotations.MissionModel;
import gov.nasa.jpl.aerie.merlin.framework.annotations.MissionModel.WithConfiguration;
```

In this example `Configuration` is the class class containing all mission model configuration data. When the `@WithConfiguration` annotation is used, the model – defined within the `@MissionModel` annotation – must accept the configuration as the last constructor parameter. See [Mission.java](https://github.com/NASA-AMMOS/aerie-mission-model-template/blob/main/src/main/java/firesat/Mission.java):

```java
public Mission(final Registrar registrar, final Configuration config) {
  // Initialize Mission with 'registrar' and 'config' here.
}
```

If the second argument is an `Instant` denoting plan start time the configuration parameter must still be provided as the last argument. For example:

```java
public Mission(final Registrar registrar, final Instant planStart, final Configuration config) {
  // Initialize Mission with 'registrar', 'planStart', and 'config' here.
}
```

## Parameters

A configuration class should be defined with the same parameter annotations as activities. See [Advanced - Parameters](../advanced-parameters) for a thorough explanation of all possible styles of `@Export` parameter declarations.

Similarly to activities, the annotation processor will take care of all serialization/deserialization of the configuration object. The annotation processor will generate a configuration mapper for the configuration defined within `@WithConfiguration()`.

## Examples

A `Configuration` can be a simple data class. For example:

```java
package firesat;

import gov.nasa.jpl.aerie.merlin.framework.annotations.Export;
import java.nio.file.Path;
import static gov.nasa.jpl.aerie.merlin.framework.annotations.Export.Template;

public record Configuration(Path initialDataPath) {
  public static final Path DEFAULT_DATA_PATH = Path.of("/etc/os-release");

  public static @Template Configuration defaultConfiguration() {
    return new Configuration(DEFAULT_DATA_PATH);
  }
}
```

See the Aerie [mission model examples directory](https://github.com/NASA-AMMOS/aerie/tree/develop/examples) for a demonstration of each possible style of configuration definitions:

1. [foo-missionmodel](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/foo-missionmodel/src/main/java/gov/nasa/jpl/aerie/foomissionmodel/Configuration.java) - Uses standard `@Parameter` configuration annotations
1. [banananation](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/banananation/src/main/java/gov/nasa/jpl/aerie/banananation/Configuration.java) - Uses the `@Template` annotation to define a default Configuration object (shown above)
1. [config-with-defaults](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/config-with-defaults/src/main/java/gov/nasa/jpl/aerie/configwithdefaults/Configuration.java) - Uses `@WithDefaults` to define a default for each parameter
1. [config-without-defaults](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/config-without-defaults/src/main/java/gov/nasa/jpl/aerie/configwithoutdefaults/Configuration.java) - Defined with no default arguments, requires all arguments to be supplied by the planner

The mission model may use a configuration to set initial values of resources, for example:

```java
this.sink = new Accumulator(0.0, config.sinkRate);
```
