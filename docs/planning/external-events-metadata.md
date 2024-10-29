### (Standin Page)

# External Events Definition Files

This page describes the format for the following files:
- Derivation Group Definitions,
- External Source Type Definitions, and
- External Event Type Definitions.

The point of these files is to allow for quick uploading of Derivation Group titles, or the allowed source type/external event formats 
(which specify, for example, legal metadata that can/cannot be included in said files). 

Upload can be used instead of manual creation in the `Create New Groups or Types` tab/modal on the `External-Sources` page.

The formats will now be described.

## Derivation Group

Presently, the only thing that can be specified for a derivation group is a name and a source type (said source type must exist in AERIE).

As such, the format we require is:

```
{
    "entries": [
        {
            "name": string;
            "source_type_name": string;
        },
        ...
    ]
}
```

## External Source Type

These are slightly more intricate, as metadata is allowable.

The format is:

```
{
    "entries": [
        {
            "name": string;
            "metadata": [
                {
                    "isRequired": boolean;
                    "name": string;
                    "schema": { "type": "boolean"|"int"|"string" };
                },
                ...
            ];
        },
        ...
    ]
}
```

## External Event Type

Again, metadata is allowable.

The format is identical to that of source types:

```
{
    "entries": [
        {
            "name": string;
            "metadata": [
                {
                    "isRequired": boolean;
                    "name": string;
                    "schema": { "type": "boolean"|"int"|"string" };
                },
                ...
            ];
        },
        ...
    ]
}
```
