# Temporal Subset

Sometimes, it may be desirable to limit the action of the scheduler to a certain time range.
This can be accomplished using [Global Conditions](../global-conditions).

First, you’ll need to define a numeric resource in your mission model that represents time - for example, you could use a [Clock](https://github.com/NASA-AMMOS/aerie/blob/develop/contrib/src/main/java/gov/nasa/jpl/aerie/contrib/models/Clock.java).

```java
Mission(Registrar registrar, Instant planStart) {
  final var clock = new Clock(planStart);
  registrar.realResource("/clock", clock.ticks);
}
```

Then you can write a global scheduling condition based on that resource.
This example says that the scheduler may only place activities between 8 and 12 days after the start of the plan:

```ts
export default (): GlobalSchedulingCondition =>
  GlobalSchedulingCondition.scheduleActivitiesOnlyWhen(
    Real.Resource('/clock')
      .greaterThan(Temporal.Duration.from({ days: 8 }).total('milliseconds'))
      .and(Real.Resource('/clock').lessThan(Temporal.Duration.from({ days: 12 }).total('milliseconds'))),
  );
```
