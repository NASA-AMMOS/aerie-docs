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

Validations can also be more dynamic if failure reasons are needed for specific cases, rather than using the annotation above the following is supported. The first parameter is the validation result, the second is the subject of the validation, and the third is the message.

If returning a `true` result the subject and message can be `null`.

```java
@Validation
public ValidationResult validateInstrumentPowers() {
  if (instrumentPower_W < 0) {
    return new ValidationResult(false, "instrumentPower_W", "Instrument W's power is below " + 0);
  } else if (instrumentPower_W > 1000.0) {
    return new ValidationResult(false, "instrumentPower_W", "Instrument W's power is above " + 1000.0);
  }

  if (instrumentPower_Y < 0) {
    return new ValidationResult(false, "instrumentPower_Y", "Instrument Y's power is below " + 0);
  } else if (instrumentPower_Y > 1000.0) {
    return new ValidationResult(false, "instrumentPower_Y", "Instrument Y's power is above " + 1000.0);
  }

  return new ValidationResult(true, null, null);
}
```
