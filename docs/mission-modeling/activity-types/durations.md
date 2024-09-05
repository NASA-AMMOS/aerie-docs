# Duration Types

The [Aerie scheduler](../../scheduling-and-constraints/declarative/scheduling/introduction.mdx) places activities in a plan to try to achieve scheduling goals, and to do that it must know the activity's duration. Since an activity's effect model is a black box, without more information the scheduler has to simulate the activity to see how long it lasts. This can be very expensive and best to avoid if possible. Satisfying temporal constraints associated with the scheduling of an activity (e.g. "activity A must end before activity B") may lead to multiple simulations to compute duration, and thus require even more computation time.

However, it is possible to provide information about how the duration of an activity is determined to help the scheduler. The duration of an activity can be one of the following:

1. `Controllable` if it is equal to one of the activity parameters.
2. `Parametric` if it is completely determined by its parameters.
    - Controllable durations are a special case of Parametric. Since you can only give the activity one duration type, it is better to be more specific and use Controllable when it applies.
3. `Fixed` if it always has the same duration for all simulation states and parameters.
4. `Uncontrollable` otherwise, meaning the duration depends on simulation state and cannot be known without simulating.
    - This option will incur simulations. For some models this might be prohibitively slow, so it is best to use any of the above options if possible; or in the worst case scenario, try to avoid scheduling uncontrollable duration activities.

It is always better to provide this information if you can, because otherwise the scheduler may have to run extra simulations to find the duration of a possible activity.

## Controllable Duration

To specify that the duration of an activity is "controllable" (directly equal to one of its parameters), the `@ControllableDuration` annotation can be added to the effect model. For example:

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

This has a special behavior above and beyond the other duration annotations: the others inform the scheduler what the duration is, but `Controllable` allows the scheduler to decide the duration. This makes it a more powerful and more desirable option than `ParametricDuration`, if it applies.

## Parametric Duration

`ParametricDuration` is a more general version of `ControllableDuration`, which indicates that the duration depends solely on the activity's parameters, not on simulation state or start time. Instead of applying it to the effect model, it is applied to a public getter method that returns the duration. For example, lets change the above activity to use an enum parameter that determines duration:

```java
@ActivityType("RunHeater")
public final class RunHeater {
    
  public enum Length {
    Short,
    Medium,
    Long
  }

  @Parameter
  public Length length = Length.Medium;

  private static final int energyConsumptionRate = 1000;

  @ParametricDuration
  public Duration duration() {
    return switch (this.connection) {
      case Short -> Duration.of(5, Duration.MINUTE);
      case Medium -> Duration.HOUR;
      case Long -> Duration.DAY;
    };
  }

  @EffectModel
  @ControllableDuration(parameterName = "durationInSeconds")
  public void run(final Mission mission) {
    // Spawning another activity does not affect the duration of this activity as they run in parallel.
    spawn(new PowerOnHeater());
    
    final long durationInSeconds = duration().dividedBy(Duration.SECOND);

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

The scheduler will create an instance of this activity and call the annotated `duration()` function. This is not the same instance of the class created during simulation (since the whole purpose is to avoid simulation), so the effect model will not be run. If the effect model makes any internal state changes to the activity instance object, those changes will not be present when `duration()` is called.

## Fixed Duration

If an activity has the same duration for all simulation states, start times, and parameters, you can tell the scheduler this with the `@FixedDuration` annotation. Unlike `@ControllableDuration` which is applied to the effect model method, `@FixedDuration` is applied to either a static `Duration` field or no-argument static method that returns a `Duration`. Both kinds must be public. For example, let's change the above activity to always take 1 hour:

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

## Uncontrollable Duration

There is no annotation to indicate "uncontrollable"; just don't apply any annotation if none fit your activity. In this case, you can assume the scheduler will invoke at least one extra simulation for any goal that creates the activity; sometimes the scheduler might invoke a simulation *per uncontrollable duration activity* that it places. In the worst case, when your scheduling goal places an uncontrollable activity such that it ends at a specific time, the scheduler might do *many* simulations per activity. For heavyweight mission models this can become unusable very quickly.

## Caveat

All of these annotations are essentially non-binding promises. If the actual duration does not match the promised duration, the scheduler will _probably_ notice and cause the goal to fail, but a) this will not happen if `SimulateAfter` is not selected in the scheduling UI, so you shouldn't depend on it, and b) it will not be noticed until after the produced activities have been simulated, which might be expensive. Because of this, it is recommended to use the promised duration directly in the effect model as shown in the above examples, just to be safe.
