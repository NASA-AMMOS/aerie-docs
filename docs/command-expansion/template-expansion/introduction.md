# Sequence Templates

:::danger
Template Expansion is an *experimental feature* as of Aerie v3.4.0.
Development is active, and the API may be subject to further change. Please let us know if you have feedback
on its future development!
:::

Sequence templates introduce an alternative way to expand activities into a set of commands, using templates instead of [Typescript rules](../../expansion-rules). They make use of the <a href="https://mustache.github.io/mustache.5.html">Mustache</a> templating language.

This feature was introduced with the goal of providing users with a more straightforward and intuitive tool for expansion, for simpler rules which do not require the power of a procedural programming language. For example, using traditional [expansion rules](../../expansion-rules), the `ThrowBanana` activity might have its expansion defined like this:

```
export default function MyExpansion(props: {
    activityInstance: ActivityType
}): ExpansionReturn {
    const { activityInstance } = props;
    return [
        C.BOOT_COPY_NOR_IMAGE("ZONE_0", "ZONE_1"),
        A('2024-123T00:00:00').AVS_PCE_MEMORY_POKE(activityInstance.attributes.arguments.quantity, "string"),
        C.EP_XFC_LV_CLOSE("XFC_A"),
        C.DP_PRIORITIZE("STRING", activityInstance.attributes.arguments.quantity)
    ];
}
```

Sequence template expansion allows users to instead specify the `ThrowBanana` expansion using the following _template_:

```
C BOOT_COPY_NOR_IMAGE "ZONE_0" "ZONE_1"
A2024-123T00:00:00 AVS_PCE_MEMORY_POKE {{ attributes.arguments.quantity }} "string"
C EP_XFC_LV_CLOSE "XFC_A"
C DP_PRIORITIZE "STRING" {{ attributes.arguments.quantity }}
```

These both produce the following sequence (assuming `quantity` is equal to `5`):

```
C BOOT_COPY_NOR_IMAGE "ZONE_0" "ZONE_1"
A2024-123T00:00:00 AVS_PCE_MEMORY_POKE 5 "string"
C EP_XFC_LV_CLOSE "XFC_A"
C DP_PRIORITIZE "STRING" 5
```

## Configuration
In order to use sequence templates instead of the existing Typescript EDSL sequence expansion rules, you need to make a configuration change to your `aerie-ui` container.

:::caution
Sequence templating and EDSL rules are exclusive of each other. They cannot coexist in the same instance of Aerie.
:::

If you are running `aerie-ui` locally, then within the `aerie-ui` directory, navigate to `{aerie-ui path}/.env` and update the variable `PUBLIC_COMMAND_EXPANSION_MODE` to `templating`, instead of its default (`legacy`). Then restart the server process.

If you are running `aerie` in docker, then within the `aerie` directory, navigate to `{aerie path}/docker-compose.yml`, and update the variable `PUBLIC_COMMAND_EXPANSION_MODE` under the `aerie-ui` container's settings to `templating`, instead of its default (`legacy`). Then, redeploy the container.

If you are accessing `aerie` remotely via an externally managed host, please reach out to that system's administrator about changing the deployment configuration.

## Sequence Templates in Aerie
After having enabled sequence templates, you are ready to author your own templates and expand with them. Prior to doing so, however, it might be instructive to provide a brief discussion of what these templates require and how they differ from Typescript expansion rules:

* Like Typescript rules, sequence templates must be associated with a [**mission model**](/mission-modeling/introduction) and **a command dictionary/dictionaries** (via a [**parcel**](/sequencing/editor/#parcel)), since they directly refer to activity types defined in the model, and commands in the dictionaries.
* Like Typescript rules, you should only define **one template per activity type** in your model.
* Sequence templates **do not use [expansion sets](../../expansion-sets)** - instead they are *directly* associated with a mission model and a parcel, and their scope is mission-model-wide instead of expansion-set wide.
* As a result, instead of explicitly assigning an expansion set to a plan, sequence templates are **implicitly assigned to a plan** (and its simulation outputs) based on the **mission model**. Any plan using a given model will have the same sequence templates associated with it.

All other concepts related to sequences and sequence filter creation are the same in both systems.
