# Sequence Templates

:::caution
This is an experimental feature.
:::

<!-- What are sequence templates -->
Sequence templates introduce an alternative way to expand activity types into a set of commands, using templates, instead of typescript rules. They make use of the <a href="https://mustache.github.io/mustache.5.html">Mustache</a> templating language.

This feature was introduced with the goal of providing users with a more straightfoward and intuitive tool for expansion, that's both easier to use and to trace to the expanded sequence. 

For example, using traditional expansion rules, the `ThrowBanana` activity might have its expansion defined as such:

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

We propose a method that allows users to instead specify the `ThrowBanana` expansion using the following _template_:

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

<!-- Switching to sequence template mode (configuration) -->
## Configuration
In order to use sequence templating instead of sequence rules (or "legacy" expansion), some configuration files need to be updated. 

If you are running `aerie-ui` locally, then within the `aerie-ui` directory, navigate to `{aerie-ui path}/.env` and update the variable `PUBLIC_SEQUENCING_MODE` to `templating`, instead of its default (`legacy`). Then redeploy (or refresh) the server.

If you are running `aerie` in docker, then within the `aerie` directory, navigate to `{aerie path}/docker-compose.yml`, and update the variable `PUBLIC_SEQUENCING_MODE` under the `aerie-ui` container's settings to `templating`, instead of its default (`legacy`). Then, redeploy the container.

If you are accessing `aerie` remotely via an externally managed host, please reach out to that system's administrator about changing the deployment configuration.

<!-- How do sequence templates relate to activities/parcels/etc. -->
## Sequence Templates in AERIE
After having enabled sequence templates, you are ready to author your own templates and expand with them. Prior to doing so, however, it might be instructive to provide a brief discussion of how these templates work, and what they require (in terms of a command dictionary, mission models, and such).
<!-- TODO: discuss how they relate to parcels and such, NO expansion sets, etc.-->

- sequence_templates associate with a parcel, just for authoring purposes. so that they have access to the commands in the parcel.
- sequence templates are pulled into a plan by mission model though. nothing more than that, very straightfoward
