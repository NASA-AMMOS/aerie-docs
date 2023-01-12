# Constraints

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
