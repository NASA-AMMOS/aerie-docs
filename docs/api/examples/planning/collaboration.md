# Collaboration

## Branch Plan

```graphql
mutation DuplicatePlan($new_plan_name: String!, $plan_id: Int!) {
  duplicate_plan(args: { new_plan_name: $new_plan_name, plan_id: $plan_id }) {
    new_plan_id
  }
}
```

In order to perform scheduling tasks on a branch, it is necessary to also [create a scheduling specification](../../examples/scheduling.md#create-scheduling-specification).

## Create Merge Request

```graphql
mutation CreateMergeRequest($source_plan_id: Int!, $target_plan_id: Int!) {
  create_merge_request(
    args: {
      target_plan_id: $target_plan_id, 
    	source_plan_id: $source_plan_id
    }) {
    merge_request_id
  }
}
```

## Withdraw Merge Request

You can withdraw a merge request so long as it is in the `pending` state.
A withdrawn merge request cannot be used to begin a merge.

```graphql
mutation WithdrawMergeRequest($merge_request_id: Int!) {
  withdraw_merge_request(args: {_merge_request_id: $merge_request_id}) {
    merge_request_id
  }
}
```

## Begin Merge

You can begin a merge from a `pending` merge request so long as the plan is not currently locked.
Beginning a merge locks the target plan until the merge is either cancelled, denied, or committed.
Once you have a `pending` merge request between two plans, you can use the following mutation to begin the merge:

```graphql
mutation BeginMerge($merge_request_id: Int!) {
  begin_merge(args: {_merge_request_id: $merge_request_id}) {
    merge_request_id
    non_conflicting_activities
    conflicting_activities
  }
}
```

By default, the above mutation will return the list of non-conflicting activities and the list of conflicting activities. If you would like neither, you can instead perform the following mutation:

```graphql
mutation BeginMerge($merge_request_id: Int!) {
  begin_merge(args: {_merge_request_id: $merge_request_id}) {
    merge_request_id
  }
}
```

If you want the list of non-conflicting activities of an in-progress merge at a later point, perform the following query:

```graphql
query GetNonConflictingActivities($merge_request_id: Int!) {
  get_non_conflicting_activities(args: {_merge_request_id: $merge_request_id}) {
    activity_id
    change_type
    source
    target
  }
}
```

If you want the list of conflicting activities of an in-progress merge, perform the following query:

```graphql
query GetConflictingActivities($merge_request_id: Int!) {
  get_conflicting_activities(args: {_merge_request_id: $merge_request_id}) {
    activity_id
    change_type_source
    change_type_target
    resolution
    merge_base
    source
    target
  }
}
```

## Cancel Merge

You can cancel any `in-progress` merge.

```graphql
mutation CancelMerge($merge_request_id: Int!) {
  cancel_merge(args: { _merge_request_id: $merge_request_id }) {
    merge_request_id
  }
}
```

## Resolving Merge Conflicts

Before a merge can be committed, all conflicts must be resolved to either `source` or `target`.

```graphql
mutation ResolveConflict($_activity_id: Int!, $_merge_request_id: Int!, $_resolution: resolution_type!) {
  set_resolution(
    args: { _activity_id: $_activity_id, _merge_request_id: $_merge_request_id, _resolution: $_resolution }
  ) {
    activity_id
    change_type_source
    change_type_target
    resolution
  }
}
```

You can also resolve conflicts in bulk:

```graphql
mutation ResolveConflictBulk($_merge_request_id: Int!, $_resolution: resolution_type!) {
  set_resolution_bulk(args: { _merge_request_id: $_merge_request_id, _resolution: $_resolution }) {
    activity_id
    change_type_source
    change_type_target
    resolution
  }
}
```

## Deny Merge

It is possible to deny an in-progress merge, for example, if a request is outdated. Once a merge has been denied, that request cannot be used to begin a merge.

```graphql
mutation DenyMerge($merge_request_id: Int!) {
  deny_merge(args: { merge_request_id: $merge_request_id }) {
    merge_request_id
  }
}
```

## Commit Merge

Once all conflicts have been resolved, you can commit a merge.

```graphql
mutation CommitMerge($merge_request_id: Int!) {
  commit_merge(args: { _merge_request_id: $merge_request_id }) {
    merge_request_id
  }
}
```
