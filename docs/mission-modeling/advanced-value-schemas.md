# Advanced - Value Schemas

As a Mission Modeler sooner or later you will want to define a parameter type, or resource type, that is specifically tailored to your needs. This section describes how to declare the structure of that type so that it can be understood by downstream client tools.

## Value Schema Basics

A value schema is a description of the structure of some value. Using value schemas users can tell Aerie how to work with arbitrarily complex types of values, so long as they can be described using the value schema constructs provided by Aerie.

### Elementary Value Schemas

At a fundamental level a value schema is no more than a combination of elementary value schemas. Aerie defines the elementary value schemas as follows:

- `BOOLEAN` - A boolean value
- `DURATION` - A duration value
- `INT` - An integer
- `PATH` - A file path
- `REAL` - A real number
- `STRING` - A string of characters
- `VARIANT` - A string value constrained to a set of acceptable values

If you're trying to write a value schema for an integer value, all you have to do is use the `INT` value schema. But of course values can quickly take on more complex structures, and for that we must examine the remaining value schema constructs.

Note the `VARIANT` value schema is a little unique among the elementary value schemas in that it requires input, the set of acceptable values. The way to provide input depends on the context in which you are creating a value schema and will be addressed in the corresponding sections below.

### Combinatory Value Schemas

In order to combine elementary value schemas we provide two main constructs:

- `SERIES` - Denotes a list of values of a single type
- `STRUCT` - Denotes a structure of independent values of varying types

The `SERIES` schema allows a straightforward declaration of a list of values that fall under the same schema, while the `STRUCT` schema opens things up, allowing you to create any combination of different values, each labeled by some string name.

Now that you’ve seen the basics, let’s talk about the two different ways to create value schemas – in Java code, and in JSON (serialized value schemas).

## Value Schemas in Java

Creating a value schema in Java is straightforward as each of the elementary value schemas is accessible via the `ValueSchema` class. For example, a `REAL` is given by `ValueSchema.REAL`. The one exception is that to create a `VARIANT` type value schema you need to call `ValueSchema.ofVariant(Class<? extends Enum> enum)`, providing an enum to specify the acceptable variants.

Like the `VARIANT` element, the `SERIES` and `STRUCT` constructs are created by calling their corresponding methods `ValueSchema.ofSeries(ValueSchema value)` and `ValueSchema.ofStruct(Map<String, ValueSchema> map)`.

### Examples

Below are a few examples of how to create a `ValueSchema`. In each, a Java type and its corresponding `ValueSchema` are compared.

- `Integer` is described by `ValueSchema.INT`
- `List<Double>` is described by `ValueSchema.ofSeries(ValueSchema.REAL)`
- `Float[]` is described by `ValueSchema.ofSeries(ValueSchema.REAL)`

Note that the second and third examples are entirely different Java types, but are represented by the same `ValueSchema`. It is also important to take a look at a `Map` type, as it can be confusing at first how to represent its structure:

- `Map<String, Integer>` is described by:

  ```java
  ValueSchema.ofStruct(
    Map.of(
      "keys": ValueSchema.ofSeries(ValueSchema.STRING),
      "values": ValueSchema.ofSeries(ValueSchema.INT)
    )
  );
  ```

Here we are taking note of the fact that a `Map` is really just a list of keys and a list of values. As a final example, consider the custom type below:

```java
public class CustomType {
  public int foo;
  public boolean bar;
  public List<String> baz
}
```

A variable of type `CustomType` has structure described by:

```java
ValueSchema.ofStruct(
  Map.of(
    "foo": ValueSchema.INT,
    "bar": ValueSchema.BOOLEAN,
    "baz": ValueSchema.ofSeries(ValueSchema.STRING)
  )
);
```

## Value Schemas in JSON

Creating value schemas in [JSON](https://www.json.org/json-en.html) is a little less straightforward since your IDE won’t be able to help you with hinting or autocompletion. A value schema is created by declaring an object with a `type` property that tells which type of schema is being created. The values allowed in this property are:

- "boolean" corresponds to `BOOLEAN`
- "duration" corresponds to `DURATION`
- "int" corresponds to `INT`
- "path" corresponds to `PATH`
- "real" corresponds to `REAL`
- "series" corresponds to `SERIES`
- "string" corresponds to `STRING`
- "struct" corresponds to `STRUCT`
- "variant" corresponds to `VARIANT`

### Simple Examples

#### Boolean

```json
{
  "type": "boolean"
}
```

#### Duration

```json
{
  "type": "duration"
}
```

#### Int

```json
{
  "type": "int"
}
```

#### Path

```json
{
  "type": "path"
}
```

#### Real

```json
{
  "type": "real"
}
```

#### Series

For the "series" type, a second property called `items` must be included as well that provides the value schema for the items in the series. For example here is a value schema for a list (series) of integers:

```json
{
  "type": "series",
  "items": {
    "type": "int"
  }
}
```

#### String

```json
{
  "type": "string"
}
```

#### Struct

For the "struct" type, a second property called `items` must be included that provides the actual structure of the struct, mapping string keys to their corresponding value schema. For example here is a value schema for a struct with a string-valued `label` property, real-valued `position` property, and boolean-valued `on` property:

```json
{
  "type": "struct",
  "items": {
    "label": { "type": "string" },
    "position": { "type": "real" },
    "on": { "type": "boolean" }
  }
}
```

#### Variant

For the "variant" type, you’ll need to include a second property called `variants` whose value is a list of objects specifying the string-valued `key` and `label` properties of each variant like this:

```json
{
  "type": "variant",
  "variants": [
    {
      "key": "ON",
      "label": "ON"
    },
    {
      "key": "OFF",
      "label": "OFF"
    }
  ]
}
```

### Complex Examples

#### Series of Series of Booleans

```json
{
  "type": "series",
  "items": {
    "type": "series",
    "items": {
      "type": "boolean"
    }
  }
}
```

#### Struct with Series

This is a value schema for a structure containing a list of integers labeled `lints`, and a boolean labeled `active`:

```json
{
  "type": "struct",
  "items": {
    "lints": {
      "type": "series",
      "items": { "type": "int" }
    },
    "active": {
      "type": "boolean"
    }
  }
}
```
