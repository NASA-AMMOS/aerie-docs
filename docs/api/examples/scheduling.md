# Scheduling

## Create Scheduling Specification

A scheduling specification is required by the scheduler to execute scheduling goals. If you want to run scheduling for a plan you need to create a specification for the plan using the following mutation:

```graphql
mutation CreateSchedulingSpec($spec: scheduling_specification_insert_input!) {
  insert_scheduling_specification_one(object: $spec) {
    id
  }
}
```

The `$spec` query variable has the following type definition:

```ts
type SchedulingSpec = {
  analysis_only: boolean;
  horizon_end: string;
  horizon_start: string;
  plan_id: number;
  plan_revision: number;
  simulation_arguments: { [name: string]: any };
};
```

Here is an example query variable that implements the `SchedulingSpec` type above:

```json
{
  "spec": {
    "analysis_only": false,
    "horizon_end": "2030-002T00:00:00",
    "horizon_start": "2030-001T00:00:00",
    "plan_id": 1,
    "plan_revision": 1,
    "simulation_arguments": {}
  }
}
```
