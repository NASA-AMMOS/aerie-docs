# Activity Type Metadata

Metadata of activities are structured such that the Aerie annotation processor can extract this metadata given particular keywords. Currently, the annotation processor recognizes the following tags:

- `brief_description`
- `@aerie.computedAttribute`
- `contact`
- `@aerie.resourceName`
- `subsystem`
- `@aerie.units`
- `verbose_description`

These metadata tags are placed in a [Javadoc](https://en.wikipedia.org/wiki/Javadoc) style comment block above the activity type to which they refer. For example:

```java
/**
 * @subsystem Data
 * @contact camargo
 * @brief_description A data management activity that deletes old files
 */
 @ActivityType("DeleteOldFiles")
```

## Units

The Aerie annotation processor can leverage the `@aerie.unit` tag to parse and display units for Parameters, Computed Attributes, and Resource Types.

### Parameters

There are 2 valid locations to parse a parameters units, on the parameter itself if it is a property of a class, or on the record defining an activity type. When you define the units as part of a record type you need to include the `@param` you're defining the units for on the previous line.

```java
/**
 * @param duration
 * @aerie.unit seconds
 * @param energyConsumptionRate
 * @aerie.unit kWh
 */
@ActivityType("RunHeater")
public record RunHeater(long duration, int energyConsumptionRate)
```

```java
@ActivityType("RunHeater")
public class RunHeater {
  /**
   * @aerie.unit seconds
   */
  @Parameter
  public long duration;

  /**
   * @aerie.unit kWh
   */
  @Parameter
  public int energyConsumptionRate;
}
```

### Computed Attributes

Units can be specified for computed attributes as well, this happens on the record that defines the `ComputedAttributes`. The `@aerie.unit` tag here needs a `@aerie.computedAttribute` tag on the previous line the annotation processor knows which property to assign the units to.

```java
  /**
   *
   * @aerie.computedAttribute durationInSeconds
   * @aerie.unit seconds
   * @aerie.computedAttribute energyConsumptionRate
   * @aerie.unit kWh
   */
  @AutoValueMapper.Record
  record ComputedAttributes(
    long durationInSeconds,
    int energyConsumptionRate
  ) {}
```

### Resource Types

Units for resource types can be defined in two places similar to parameters. The first is on the `Mission` class where resources are registered, alternatively it can be defined on the resource itself. The units defined here need to have a `@aerie.resourceName` tag with the name of the resource on a previous line.

```java
/**
 * @aerie.resourceName /flag
 * @aerie.unit A, B
 */
public final class Mission {
  /**
   * @aerie.resourceName /fruit
   * @aerie.unit number of fruit
   */
  public final Register<Accumulator> fruit;

  public final Register<Flag> flag;

  public Mission(final Registrar registrar, final Configuration config) {
    registrar.discrete("/flag", this.flag, new EnumValueMapper<>(Flag.class));
    registrar.real("/fruit", this.fruit);
  }
}
```
