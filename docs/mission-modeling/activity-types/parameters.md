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

1. Controllable if it is only determined by **one** of the activity parameters
1. Uncontrollable otherwise

By default the duration of an activity is uncontrollable. To specify that the duration of an activity is controllable, the `@ControllableDuration` annotation can be added to the effect model. For example:

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

    durationPowerOff = 100L;
    durationPowerOn = durationInSeconds - durationPowerOff;

    delay(durationPowerOn, Duration.SECONDS);

    // Assumes PowerOffHeater has a controllable duration.
    call(new PowerOffHeater(durationPowerOff));
  }
}
```

Note in this example the `call(new PowerOffHeater(durationPowerOff))` at the end of the effect model: (1) makes the duration of `RunHeater` depend on the duration of the `PowerOffHeater`, and (2) assumes `PowerOffHeater` has a controllable duration parameter. Even though the duration of `RunHeater` depends on the (fixed) duration of `PowerOffHeater`, we know its duration will be equal to `durationInSeconds`, thus making `RunHeater` controllable. For more information on the `call` function, see the [effect model documentation](./effect-model.md).

If `PowerOffHeater` had an uncontrollable duration we would have to remove the `call` since it would make `RunHeater` uncontrollable as well.

The annotation `@ControllableDuration(parameterName = "durationInSeconds")` has no effect other than to tell the scheduler that the duration of an activity can be controlled. It acts like a contract between the mission model and the scheduler ensuring that the duration of an activity will be equal to the parameter specified in the annotation.

After receiving this information the scheduler determines it can control the duration of an activity, thus requiring fewer simulations and significantly improving scheduling performance for the given activity type.
