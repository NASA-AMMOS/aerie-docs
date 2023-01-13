# Planning

## Query for All Plans

This example queries for all plans in the Aerie database's `plan` table with some common columns. It also demonstrates the [order_by](https://hasura.io/docs/latest/queries/postgres/sorting/#the-order_by-argument) query filter, and using an [alias](https://hasura.io/docs/latest/queries/postgres/variables-aliases-fragments-directives/#using-aliases) to rename `plan` to `plans` since the query returns a list of plans.

```graphql
query GetPlans {
  plans: plan(order_by: { id: desc }) {
    duration
    id
    model_id
    name
    revision
    start_time
  }
}
```

## Query a Single Plan

```graphql
query GetPlan($id: Int!) {
  plan: plan_by_pk(id: $id) {
    duration
    id
    model_id
    name
    start_time
  }
}
```

## Query for All Activity Directives (aka Instances) for a Plan

Notice how in this query we get the same `plan` data as the previous query, but also the nested `activity_directives`. If you are familiar with relational databases you can think of this as a join query between the `plan` table and `activity_directive` table (in Hasura these joins are made via [relationships](https://hasura.io/learn/graphql/hasura/relationships/)). This is the sweet sauce behind GraphQL. It allows us to query for deeply-nested data across the Aerie system in a single unified way.

```graphql
query GetActivityDirectivesForPlan($id: Int!) {
  plan_by_pk(id: $id) {
    activity_directives {
      arguments
      created_at
      id
      last_modified_arguments_at
      last_modified_at
      metadata
      name
      plan_id
      source_scheduling_goal_id
      start_offset
      tags
      type
    }
    duration
    id
    model_id
    name
    start_time
  }
}
```

## Query the Mission Model of a Plan

```graphql
query GetMissionModelForPlan($id: Int!) {
  plan_by_pk(id: $id) {
    mission_model {
      id
      mission
      name
      owner
      version
    }
    name
  }
}
```

## Query for All Activity Types within a Mission Model of a Plan

This query is using the relationship between the `plan` table, the `mission_model` table, and the `activity_type` table to return one object with the activity type properties requested.

```graphql
query GetActivityTypesForPlan($id: Int!) {
  plan_by_pk(id: $id) {
    mission_model {
      activity_types {
        computed_attributes_value_schema
        name
        parameters
        required_parameters
      }
    }
  }
}
```

## Run Simulation

```graphql
query Simulate($planId: Int!) {
  simulate(planId: $planId) {
    reason
    simulationDatasetId
    status
  }
}
```
