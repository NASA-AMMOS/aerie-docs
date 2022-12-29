# Advanced - Parameters

The Aerie interface offers a variety of ways to define **parameters** for mission model configurations and activities.

Parameters offer a concise way to export information across the mission-agnostic Aerie interface – namely a parameter's type to support serialization and a parameter's "required" status to ensure that parameters without mission-model-defined defaults have an argument supplied by the planner.

In this guide **parent class** refers to the Java class that encapsulates parameters. This class may take the form of either a mission model [configuration](../mission-modeling/configuration.md) or [activity](../mission-modeling/activity-types/introduction.mdx).

Both configurations and activities make use of the same Java annotations for declaring parameters within a parent class. The `@Export` annotation interface serves as the common qualifier for exporting information across the mission-agnostic Aerie interface. The following parameter annotations serve to assist with parameter declaration and validation:

1. `@Export.Parameter`
1. `@Export.Template`
1. `@Export.WithDefaults`
1. `@Export.Validation` and `@Export.Validation.Subject`

The following sections delve into each of these annotations along with examples and suggested use cases for each.

## Without Export Annotations

The first – and perhaps less obvious option – is to not use any parameter annotations. If a parent class contains no `@Export.Parameter`, `@Export.Template`, or `@Export.WithDefaults` annotation it is assumed that every class member variable is a parameter to export to Aerie.

Defining a parent class becomes as simple as `public record Configuration(Integer a, Integer b, Integer c) { }`. However, it is not possible to declare a member variable that is not an exported parameter with this approach.

### Example

In the following example `a`, `b`, and `c` are all parameters that require planner-provided arguments at planning time.

```java
@ActivityType("Simple")
public record SimpleActivity(Integer a, Integer b, Integer c) {
  @EffectModel
  public void run(final Mission mission) {
    mission.count.set(a);
    delay(1, SECOND);
    mission.count.set(b);
    delay(1, SECOND);
    mission.count.set(c);
  }
}
```

### Recommendation

Avoid `@Export.Parameter`, `@Export.Template`, or `@Export.WithDefaults` when every member variable for a parent class should be an exported parameter without a default value.

This approach is great for defining a simple record type parent class without defaults. If defaults are desired then `@Template` or `@WithDefaults` can be used without changing a record type class definition.

### See Also

Aerie's [config-without-defaults](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/config-without-defaults/src/main/java/gov/nasa/jpl/aerie/configwithoutdefaults/Configuration.java) example mission model makes use of this succinct style for declaring mission model configuration parameters. See the [Java documentation on Record classes](https://docs.oracle.com/en/java/javase/19/language/records.html) for more detailed information about the language feature.

## Export Parameter

The `@Parameter` annotation is the most explicit way to define a parameter and its defaults. Explicitly declaring each parameter within a parent class with or without a default value gives the mission modeler the freedom to decide which member variables are parameters and which parameters are required by the planner.

### Example

In the example below the parent class is a mission model configuration. Here’s a close look at each member variable:

1. `a` - A traditional member variable. Not explicitly declared as a parameter and therefore is not considered to be a parameter.
1. `b` - Explicitly declared as a parameter without a default value. A value will be required by the planner.
1. `c` - Explicitly declared as a parameter with a default value. A value will not be required by the planner.

```java
public final class Configuration {
  public Integer a;

  @Export.Parameter
  public Integer b;

  @Export.Parameter
  public Integer c = 3;

  public Configuration(final Integer a, final Integer b, final Integer c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
```

### Recommendation

Declare each parameter with a `@Parameter` when a non-record type parent class is desired.

Some mission modelers may prefer the explicitness provided by individual `@Parameter` annotations. However, this opens the door to subtle mistakes such as an unintentionally absent `@Parameter` annotation or an unintentionally absent default assignment. Those who prefer a more data-oriented approach may also find this style to not be as ergonomic as using a simple record type.

### See Also

Aerie's [foo-missionmodel](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/foo-missionmodel/src/main/java/gov/nasa/jpl/aerie/foomissionmodel/Configuration.java) example mission model makes use of this style when declaring mission model configuration parameters.

## Export Template

The `@Template` annotation decouples parameter definitions and default values, allowing record types to be used as parent classes. When the `@Template` annotation is used every parent class member variable is interpreted as a parameter to export to Aerie. This annotation must be attached to a public static constructor method.

### Example

In the example below `SimpleActivity` is a record type with one constructor parameter called `speed`.

```java
@ActivityType("Simple")
public record SimpleActivity(double speed) {
  @Template
  public static SimpleActivity defaults() {
    return new SimpleActivity(1.0);
  }

  @EffectModel
  public void run(final Mission mission) {
    // Add effect model here. Not relevant to this example.
  }
}
```

### Recommendation

Use `@Template` when every member variable for a parent class should be an exported parameter with a default value.

### See Also

Aerie's [banananation](https://github.com/NASA-AMMOS/aerie/tree/develop/examples/banananation) example mission model uses this style within the [GrowBananaActivity](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/banananation/src/main/java/gov/nasa/jpl/aerie/banananation/activities/GrowBananaActivity.java) and [ThrowBananaActivity](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/banananation/src/main/java/gov/nasa/jpl/aerie/banananation/activities/ThrowBananaActivity.java).

## Export With Defaults

Similarly to `@Template`, the `@WithDefaults` annotation also decouples parameter definitions and default values, allowing record types to be used as parent classes. When the `@WithDefaults` annotation is used every parent class member variable is interpreted as a parameter to export to Aerie. Unlike `@Template`, a sparse set of default values may be supplied.

This annotation must be attached to a nested public static class within the parent class. Each member variable of this nested class must have the same name as a parent class’s member variable. Not every parent class member variable is required to have an associated member variable within the nested class. This allows the mission modeler to selectively choose which parameters must be supplied by the planner.

### Example

In the example below the parent class is a mission model configuration. Here's a close look at each member variable:

1. `a` - A parameter with an associated default value.
1. `b` - A parameter without a default value. A value will be required by the planner.
1. `c` - A parameter with an associated default value.

```java
public record Configuration(Integer a, Double b, String c) {
  @WithDefaults
  public static final class Defaults {
    public static Integer a = 42;
    public static String c = "JPL";
  }
}
```

### Recommendation

Use `@WithDefaults` when every member variable for a parent class should be an exported parameter with an optionally provided default value.

### See Also

Aerie's [config-with-defaults](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/config-with-defaults/src/main/java/gov/nasa/jpl/aerie/configwithdefaults/Configuration.java) example mission model makes use of this style within its mission model configuration. The [banananation](https://github.com/NASA-AMMOS/aerie/tree/develop/examples/banananation) example mission model uses this style in the [BakeBananaBreadActivity](https://github.com/NASA-AMMOS/aerie/blob/develop/examples/banananation/src/main/java/gov/nasa/jpl/aerie/banananation/activities/BakeBananaBreadActivity.java).
