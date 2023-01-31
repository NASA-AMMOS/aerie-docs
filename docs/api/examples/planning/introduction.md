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

## Create a Single Plan

Here is a mutation that creates a single plan and returns the `id` of the new plan:

```graphql
mutation CreatePlan($plan: plan_insert_input!) {
  insert_plan_one(object: $plan) {
    id
  }
}
```

Here is an example query variable for the mutation above that creates a 24-hour long plan called "New Plan" starting on January 1st, 2030. It is for a model with ID 1:

```json
{
  "plan": {
    "duration": "24:00:00",
    "model_id": 1,
    "name": "New Plan",
    "start_time": "2030-001T00:00:00"
  }
}
```

Notice the `duration` is a [Postgres interval](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-interval/) of the format `hh:mm:ss`.  
The `start_time` is in the [day-of-year](https://nsidc.org/data/user-resources/help-center/day-year-doy-calendar) format `YYYY-DDDThh:mm:ss`.

After you create a plan you should also create an associated [simulation](../introduction#create-a-simulation-for-a-plan) and [scheduling specification](../../scheduling#create-scheduling-specification).

## Create a Simulation for a Plan

Here is a mutation that creates a single simulation and returns the `id` of the new simulation:

```graphql
mutation CreateSimulation($simulation: simulation_insert_input!) {
  insert_simulation_one(object: $simulation) {
    id
  }
}
```

Here is an example query variable for the mutation above that creates a simulation for a plan with ID 1:

```json
{
  "simulation": {
    "arguments": {},
    "plan_id": 1,
    "simulation_template_id": null
  }
}
```

## Query for All Activity Directives (aka Instances) for a Plan

Notice how in this query we get the same `plan` data as the previous query, but also the nested `activity_directives`. If you are familiar with relational databases you can think of this as a join query between the `plan` table and `activity_directive` table (in Hasura these joins are made via [relationships](https://hasura.io/learn/graphql/hasura/relationships/)). This is the secret sauce behind GraphQL. It allows us to query for deeply-nested data across the Aerie system in a single unified way.

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

## Query for Simulation Results

The output of a simulation is stored in a `simulation_dataset`. A `simulation_dataset` has both profiles (aka states or resources), and simulated activities. The following query fetches latest `simulation_dataset` for a given plan:

```graphql
query GetSimulationDataset($planId: Int!) {
  plan_by_pk(id: $planId) {
    simulations(order_by: { id: desc }, limit: 1) {
      simulation_datasets(order_by: { id: desc }, limit: 1) {
        dataset {
          id
          profiles {
            id
            name
            type
            profile_segments {
              profile_id
              dynamics
              start_offset
            }
          }
        }
        id
        reason
        simulated_activities {
          activity_directive {
            id
            metadata
          }
          activity_type_name
          attributes
          directive_id
          duration
          end_time
          id
          parent_id
          start_offset
          start_time
        }
        status
      }
    }
    start_time
  }
}
```

Note for performance it can sometimes be beneficial to request profile segments separately. The profile segments are the actual simulated resource data:

```graphql
query GetProfileSegments($datasetId: Int!) {
  profile_segment(where: { dataset_id: { _eq: $datasetId } }) {
    profile_id
    dynamics
    start_offset
  }
}
```
