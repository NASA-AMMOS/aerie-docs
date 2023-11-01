# Tags

Tags are metadata that can be used to mark certain things in Aerie, including Plans, Plan Snapshots, Activity Directives, Scheduling Goals, Constraints, and Command Expansion Runs. 
Tags are shared across an Aerie instance.

## Creating a Tag

```graphql
mutation CreateTag($name: String!, $color: String) {
  insert_tags_one(object: {name: $name, color: $color}) {
    id
    name
    color
  }
}
```

The `color` field is optional, however, if specified, it must be a hex color code. 
This field is used to determine what color the tag appears as when displayed in the UI.

## Updating a Tag

```graphql
mutation UpdateTag($tagId: Int!, $set: tags_set_input!) {
  update_tags_by_pk(pk_columns: {id: $tagId}, _set: $set) {
    id
    name
    color
    owner
  }
}
```

The `set` object is a JSON containing any of the following fields:
 - `name`: the new name for the tag
 - `owner`: the new owner of the tag
 - `color`: either `null` or a hex color code

## Deleting a Tag

```graphql
mutation DeleteTag($tagId: Int!) {
  delete_tags_by_pk(id: $tagId) {
    id
    name
    color
    owner
  }
}
```


