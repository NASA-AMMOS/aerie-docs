# Parameters

Activity parameters provide the ability to modulate the behavior of an activity's effect model.
Aside from determining the effects of the activity, these parameters can be used to determine its duration, decomposition into children activities and expansion into commands.

The Aerie annotation processor is used to extract and generate serialization code for parameters of activity types.
The annotation processor also allows authors of a mission model to create mission-specific parameter types, ensuring that they will be recognized by the Aerie framework.

## Validations

A mission model configuration or activity can be validated by providing one or more methods annotated by `@Validation` and `@Validation.Subject`.
The `@Validation` annotation message specifies the message to present to a planner when the validation fails.
The `@Validation.Subject` annotation specifies which parameter(s) the validation is associated with.
These associated parameters are reported from Aerie when querying for activity argument validations to couple validations with parameters.

For example the following function validates that a parameter called `instrumentPower_W` is between `0.0` and `1000.0` inclusive:

```java
@Validation("Instrument power W must be between 0.0 and 1000.0 inclusive")
@Validation.Subject("instrumentPower_W")
public boolean validateInstrumentPower() {
  return (instrumentPower_W >= 0.0) && (instrumentPower_W <= 1000.0);
}
```

To associate a validation function with multiple parameters, the `{"...", "...", ...}` syntax may be used within the `@Validation.Subject` annotation. For example the following function validates that two parameters called `instrumentPower_W` and `instrumentPower_Y` are both between `0.0` and `1000.0` inclusive:

```java
@Validation("Instrument powers W and Y must be between 0.0 and 1000.0 inclusive")
@Validation.Subject({"instrumentPower_W", "instrumentPower_Y"})
public boolean validateInstrumentPowers() {
  return (instrumentPower_W >= 0.0) && (instrumentPower_W <= 1000.0) && (instrumentPower_Y >= 0.0) && (instrumentPower_Y <= 1000.0);
}
```

The annotation processor identifies these methods and arranges for them to be invoked whenever a planner instantiates an instance of the class. A message will be provided to the planner for each failing validation, so the order of validation methods does not matter.

## Duration Types

The [Aerie scheduler](../../../scheduling/introduction) places activities in a plan to try to achieve scheduling goals. Since the effect model of an activity is not accessible to the scheduler, an activities duration can only be computed by simulation. Satisfying temporal constraints associated with the scheduling of an activity (e.g. "activity A must end before activity B") may lead to multiple simulations to compute duration, and thus require more computation time.

However, it is possible to provide information about how the duration of an activity is determined to help the scheduler. The duration of an activity can be one of the following:

1. Controllable if it is equal to one of the activity parameters
2. Fixed if it always has the same duration for all simulation states and arguments
3. Uncontrollable otherwise

It is always better to provide this information if you can, because otherwise the scheduler may have to run extra simulations to find the duration of a possible activity.

### Controllable Duration

By default, the duration of an activity is uncontrollable. To specify that the duration of an activity is controllable, the `@ControllableDuration` annotation can be added to the effect model. For example:

```java
@ActivityType("RunHeater")
public final class RunHeater {
  private static final int energyConsumptionRate = 1000;

  @Parameter
  public long durationInSeconds;

  @EffectModel
  @ControllableDuration(parameterName = "durationInSeconds")
  public void run(final Mission mission) {
    // Spawning another activity does not affect the duration of this activity as they run in parallel.
    spawn(new PowerOnHeater());

    final double totalEnergyUsed = durationInSeconds * energyConsumptionRate;
    mission.batteryCapacity.set(totalEnergyUsed);

    final var durationPowerOff = 100L;
    final var durationPowerOn = durationInSeconds - durationPowerOff;

    delay(durationPowerOn, Duration.SECONDS);

    // Assumes PowerOffHeater has a controllable duration.
    call(new PowerOffHeater(durationPowerOff));
  }
}
```

Note in this example the `call(new PowerOffHeater(durationPowerOff))` at the end of the effect model: (1) makes the duration of `RunHeater` depend on the duration of `PowerOffHeater`, and (2) assumes `PowerOffHeater` has a controllable duration parameter. Even though the duration of `RunHeater` depends on the (fixed) duration of `PowerOffHeater` we know its duration will be equal to `durationInSeconds`, thus making `RunHeater` controllable. For more information on the `call` function, see the [effect model documentation](./effect-model.md).

If `PowerOffHeater` had an uncontrollable duration we would have to remove the `call` since it would make `RunHeater` uncontrollable as well.

The annotation `@ControllableDuration(parameterName = "durationInSeconds")` has no effect other than to tell the scheduler that the duration of an activity can be controlled. It acts like a contract between the mission model and the scheduler ensuring that the duration of an activity will be equal to the parameter specified in the annotation.

### Fixed Duration

If an activity has the same duration for all simulation states, start times, and arguments, you can tell the scheduler this with the `@FixedDuration` annotation. Unlike `@ControllableDuration` which is applied to the effect model method, `@FixedDuration` is applied to either a static `Duration` field or no-argument static method that returns a `Duration`. Both kinds must be public. For example, let's change the above activity to always take 1 hour:

```java
@ActivityType("RunHeater")
public final class RunHeater {
  private static final int energyConsumptionRate = 1000;

  @FixedDuration
  public static final Duration TOTAL_DURATION = Duration.HOUR;

  @EffectModel
  public void run(final Mission mission) {
    // Spawning another activity does not affect the duration of this activity as they run in parallel.
    spawn(new PowerOnHeater());

    final double totalEnergyUsed = durationInSeconds * energyConsumptionRate;
    mission.batteryCapacity.set(totalEnergyUsed);

    final Duration durationPowerOff = Duration.of(100, Duration.SECONDS);
    final Duration durationPowerOn = TOTAL_DURATION.minus(durationPowerOff);

    delay(durationPowerOn);

    // Assumes PowerOffHeater has a controllable duration.
    call(new PowerOffHeater(durationPowerOff));
  }
}
```

Alternatively, if the duration is a more complex calculation (but still constant!) you can use a static method with no arguments:

```java
@FixedDuration
public static Duration totalDuration() {
    return ...; // some calculation
}

// in the effect model
final Duration durationPowerOn = totalDuration().minus(durationPowerOff);
```

Some caveats:

1. In both cases the duration is calculated once statically when the mission model is loaded into the JVM. It is assumed that the duration will never change after that for any reason, and breaking that assumption is undefined behavior.
2. If the actual duration does not match the promised duration, the scheduler will _probably_ notice and cause the goal to fail, but a) you shouldn't depend on it and b) it will not be noticed until after the produced activities have been simulated, which might be expensive.
3. Because of 2, it is recommended to use the promised duration directly in the effect model as shown in the above examples, just to be safe.
