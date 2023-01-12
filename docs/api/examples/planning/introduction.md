# Planning

## Query for All Plans

```graphql
query {
  plan {
    duration
    id
    model_id
    name
    start_time
  }
}
```

## Query a Single Plan

```graphql
query GetPlan($id: Int!) {
  plan_by_pk(id: $id) {
    duration
    id
    model_id
    name
    start_time
  }
}
```
