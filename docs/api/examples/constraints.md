# Constraints

## Check Constraints

```graphql
query CheckConstraints($planId: Int!, $simulationDatasetId: Int) {
  checkConstraintsResponse: constraintViolations(planId: $planId, $simulationDatasetId: simulationDatasetId) {
    violations
  }
}
```

Returns a list of constraint violations for a given plan by `$planId`. The violations will include the corresponding constraint name, type, and id. An optional `$simulationDatasetId` can be provided which limits the constraint violation checking to a single simulation dataset, which is useful when external datasets are added that only reference a single simulation dataset, as constraint violations would otherwise be reported for every uploaded external dataset.

## Create Constraint

```graphql
mutation CreateConstraint($constraint: constraint_insert_input!) {
  insert_constraint_one(object: $constraint) {
    id
  }
}
```

The `$constraint` query variable has the following type definition:

```ts
type Constraint = {
  definition: string;
  description: string;
  model_id: number | null;
  name: string;
  plan_id: number | null;
  summary: string;
};
```

## Update Single Constraint

```graphql
mutation UpdateConstraint($id: Int!, $constraint: constraint_set_input!) {
  update_constraint_by_pk(pk_columns: { id: $id }, _set: $constraint) {
    id
  }
}
```

The `$constraint` query variable has the same type definition as the [create constraint](#create-constraint) query above, but less strict. You can leave properties out that you do not need to update.

## Delete Constraint

```graphql
mutation DeleteConstraint($id: Int!) {
  delete_constraint_by_pk(id: $id) {
    id
  }
}
```
