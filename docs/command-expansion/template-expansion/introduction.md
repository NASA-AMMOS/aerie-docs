# Sequence Templates

:::caution
This is an experimental feature.
:::

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

## Configuration
In order to use sequence templating instead of sequence rules (or "legacy" expansion), some configuration files need to be updated.

:::caution
Sequence templating and legacy expansion are exclusive of each other. They cannot coexist in the same instance of AERIE.
:::

If you are running `aerie-ui` locally, then within the `aerie-ui` directory, navigate to `{aerie-ui path}/.env` and update the variable `PUBLIC_SEQUENCING_MODE` to `templating`, instead of its default (`legacy`). Then redeploy (or refresh) the server.

If you are running `aerie` in docker, then within the `aerie` directory, navigate to `{aerie path}/docker-compose.yml`, and update the variable `PUBLIC_SEQUENCING_MODE` under the `aerie-ui` container's settings to `templating`, instead of its default (`legacy`). Then, redeploy the container.

If you are accessing `aerie` remotely via an externally managed host, please reach out to that system's administrator about changing the deployment configuration.

## Sequence Templates in AERIE
After having enabled sequence templates, you are ready to author your own templates and expand with them. Prior to doing so, however, it might be instructive to provide a brief discussion of how these templates work, and what they require (in terms of a command dictionary, mission models, and such).

Much like legacy expansion's rules, sequence templates require a mission model and some link to command dictionaries. This is so that sequence templates have access to (and can be linked to) activity types as well as any commands in the defined dictionaries. 

That being said, sequence templates do _NOT_ make use of the notion of expansion sets, although the rule of one rule/template per activity type still remains. Therefore, the scope of a template is not expansion-set-wide, but rather mission-model-wide. Similarly, instead of associating a parcel with an expansion set, and then creating expansion rules within that set, with sequence templates we directly associate the parcel with the sequence template. In doing so, we assign to the sequence template a set of commands that it has access to. 

Finally, while to associate legacy sequencing rules with simulation output from a plan one would need to select the expansion set to use, sequence templates are instead implicitly assigned to a plan (and its simulation outputs) based on the mission model. Any plan using a given model will always have the same sequence templates associated with it, as a result.

That being said, anything as far as sequence or sequence filter creation is the same across both the legacy and templating expansion systems.
