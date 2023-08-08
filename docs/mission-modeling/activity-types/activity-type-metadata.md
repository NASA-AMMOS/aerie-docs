# Activity Type Metadata

Metadata of activities are structured such that the Aerie annotation processor can extract this metadata given particular keywords. Currently, the annotation processor recognizes the following tags:

- `brief_description`
- `computedAttribute`
- `contact`
- `resourceName`
- `subsystem`
- `units`
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

The Aerie annotation processer can leverage the `@unit` tag to parse and display units for Parameters, Computed Attributes, and Resource Types.

### Parameters

There are 2 valid locations to parse a parameters units, on the parameter itself if it is a proptery of a class, or on the record defining an activity type. When you define the units as part of a record type you need to include the `@param` you're defining the units for on the previous line.

```java
/**
 * @param duration
 * @unit seconds
 * @param energyConsumptionRate
 * @unit kWh
 */
@ActivityType("RunHeater")
public record RunHeater(long duration, int energyConsumptionRate)
```

```java
@ActivityType("RunHeater")
public class RunHeater {
  /**
   * @unit seconds
   */
  @Paramter
  public long duration;

  /**
   * @unit kWh
   */
  @Parameter
  public int energyConsumptionRate;
}
```

### Computed Attributes

Units can be specified for computed attributes as well, this happens on the record that defines the `ComputedAttributes`. The `@unit` tag here needs a `@computedAttribute` tag on the previous line the annotation processor knows which property to assign the units to.

```java
  /**
   *
   * @computedAttribute durationInSeconds
   * @unit seconds
   * @computedAttribute energyConsumptionRate
   * @unit kWh
   */
  @AutoValueMapper.Record
  record ComputedAttributes(
    long durationInSeconds,
    int energyConsumptionRate
  ) {}
```

### Resource Types

Units for resource types can be defined in two places similar to parameters. The first is on the `Mission` class where resources are registered, alternatively it can be defined on the resource itself. The units defined here need to have a `@resourceName` tag with the name of the resource on a previous line.

```java
/**
 * @resourceName /flag
 * @unit A, B
 */
public final class Mission {
  /**
   * @resourceName /fruit
   * @unit number of fruit
   */
  public final Register<Accumulator> fruit;

  public final Register<Flag> flag;

  public Mission(final Registrar registrar, final Configuration config) {
    registrar.discrete("/flag", this.flag, new EnumValueMapper<>(Flag.class));
    registrar.real("/fruit", this.fruit);
  }
}
```
