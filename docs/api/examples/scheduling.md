# Scheduling

## Create Scheduling Specification

A scheduling specification is required by the scheduler to execute scheduling goals.

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
