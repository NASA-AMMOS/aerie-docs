# External Event and Source Attributes

This page describes the format for files describing External Source Types and External Event Types. These files detail the allowed attributes that each of these components are required and allowed to have (i.e. the attributes defined in a file, and only those, are eligible to be included in a definition). 

Both External Source Types and External Event Types can be detailed in the same file, which has the following general outline:

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

Any number of source and event types can be provided in a given file. **At present, there is no explicit tying of external event and source types. That is, a given source type doesn't specify what event types are legal to be included yet.**

We will now elaborate on the details of the actual event and source types, to make it clear how to define allowable/required attributes. In any case, a review of [JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) would be instrumental in making sense of the following sections.

## External Types

An external source type definition might look like the following:

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

This is an example of an object nested within `source_types`, and describes the attributes allowed for a `Weather` source. In this file, following JSON Schema syntax, the attributes of a `Weather` object are described - we desire an object, with 3 required fields: `location` (a string), `version` (a number), and `changelog` (a string). Additional JSON Schema functionality can be added to these properties as well, like a `pattern` specification, which restricts strings for a give field to follow a regex. These objects also bear an implied `additionalProperties: false`, meaning only these properties can be provided; any extras will be rejected.

Event type attribute specifications function similarly:

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

For completeness, we can show that a complete file then looks like the following:

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

As can be seen, nested objects are very much fair play in these attribute definitions. The primary requirement is an adherence to JSON Schema syntax. Should a planner fail to do so in creating one of these files, they will be met with a rejection from AERIE as well as a specification of where their attribute specification was wrong.