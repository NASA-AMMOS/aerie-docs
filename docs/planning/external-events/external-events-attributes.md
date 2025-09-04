# External Event and Source Attributes

This page describes the format for files that define External Source Types and External Event Types. These files detail the attributes that External Sources and External Events corresponding to those types are required or allowed to have. Any additional attributes not specified in these files will be rejected.

Both External Source Types and External Event Types can be defined in the same file, which has the following general outline:

```json
{
  "event_types": {
    "EventTypeName": {
        ...
    },
    "SecondEventTypeName": {
        ...
    },
    ...
  },
  "source_types": {
    "SourceTypeName": {
      ...
    },
    "AdditionalSourceTypeName": {
      ...
    },
    ...
  }
}
```

Any number of source and event types can be provided in a given file. Note that any source can contain events of any type.

## External Types
The full structure of External Source and Event types is detailed below. These are defined as nested JSON Schemas. Refer to JSON Schema docs [here](https://json-schema.org/learn/getting-started-step-by-step).

This is an example of an **External Source Type** definition, nested within `source_types`:

```json
...
"Weather": {
    "type": "object",
    "required": [
        "location",
        "version",
        "changelog"
    ],
    "properties": {
        "location": {
            "type": "string"
        },
        "version": {
            "type": "number"
        },
        "changelog": {
            "type": "string"
        }
    }
}
```

 In this file, following JSON Schema syntax, the attributes of a `Weather` Source are described - it must be an object, with 3 required fields: `location` (a string), `version` (a number), and `changelog` (a string). No other attributes will be allowed. Additional JSON Schema functionality can be added to these properties as well, like a `pattern` specification, which restricts strings for a given field to follow a regex.

**External Event Type** attribute specifications function similarly:

```json
"WeatherReport": {
    "type": "object",
    "required": ["daily_high", "daily_low", "precipitation_lik"],
    "properties": {
        "daily_high": {
            "type": "object",
            "properties": {
                "value": {
                    "type": "number"
                },
                "units": {
                    "type": "string"
                }
            },
            "required": ["units", "value"]
        },
        "daily_low": {
            "type": "object",
            "properties": {
                "value": {
                    "type": "number"
                },
                "units": {
                    "type": "string"
                }
            },
            "required": ["units", "value"]
        },
        "precipitation_lik": {
            "type": "number"
        }
    }
}
```

A complete file looks like the following:

```json
{
  "event_types": {
    "WeatherReport": {
      "type": "object",
      "required": ["daily_high", "daily_low", "precipitation_lik"],
      "properties": {
        "daily_high": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "units": {
              "type": "string"
            }
          },
          "required": ["units", "value"]
        },
        "daily_low": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "units": {
              "type": "string"
            }
          },
          "required": ["units", "value"]
        },
        "precipitation_lik": {
          "type": "number"
        }
      }
    }
  },
  "source_types": {
    "Weather": {
      "type": "object",
      "required": [
        "location",
        "version",
        "changelog"
      ],
      "properties": {
        "location": {
          "type": "string"
        },
        "version": {
          "type": "number"
        },
        "changelog": {
          "type": "string"
        }
      }
    }
  }
}
```

Note that this structure provides the full expressiveness of JSON Schema syntax, allowing users to define attributes as simple primitives or complex nested structures. The full meta-schema used to validate schema files can be found [here](https://github.com/NASA-AMMOS/aerie-gateway/blob/develop/src/schemas/external-event-validation-schemata.ts).