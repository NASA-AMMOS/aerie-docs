# Introduction

The Aerie API uses [GraphQL](https://graphql.org/) via [Hasura](https://hasura.io/) to allow for complex querying of **any Aerie data**. If this is your first time using GraphQL we recommend the following resources:

1. [Introduction to GraphQL](https://graphql.org/learn/)
1. [GraphQL Basics](https://hasura.io/learn/graphql/intro-graphql/introduction/)
1. [Hasura Basics](https://hasura.io/learn/graphql/hasura/introduction/)

## GraphQL Schema

GraphQL uses a schema to describe the shape of available API data. Aerie employs the [Hasura](https://hasura.io/) GraphQL engine to generate the Aerie GraphQL API schema. The schema is too large to include in our documentation. If you are running Aerie locally the schema for your Aerie installation can be viewed at [http://localhost:8080/console/api/api-explorer](http://localhost:8080/console/api/api-explorer) (open the "< Docs" tab on the right).

It is important to understand the significance and power of a data-graph based API schema. Below are more detailed resources for helping yourself get familiar with the GraphQL schema and querying capabilities.

### Queries & Subscriptions

- [Postgres: GraphQL Queries](https://hasura.io/docs/latest/queries/postgres/index/)
- [Postgres: GraphQL Subscriptions](https://hasura.io/docs/latest/subscriptions/postgres/index/)
- [API Reference - Query / Subscription](https://hasura.io/docs/latest/api-reference/graphql-api/query/)

### Mutations

- [Postgres: GraphQL Mutations](https://hasura.io/docs/latest/mutations/postgres/index/)
- [API Reference - Mutation](https://hasura.io/docs/latest/api-reference/graphql-api/mutation/)

## GraphQL Requests

A round trip usage of the API consists of the following three steps:

1. Composing a request (query, mutation, or subscription)
2. Submitting the request via an [HTTP POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request
3. Receiving the result as [JSON](https://www.json.org/json-en.html)

### HTTP POST Request

A standard GraphQL HTTP POST request should use the `application/json` content type, and include a JSON-encoded body of the following form:

```json
{
  "query": "...",
  "operationName": "...",
  "variables": { "myVariable": "someValue" }
}
```

`operationName` and `variables` are optional fields. The `operationName` field is only required if multiple operations are present in the query.

### HTTP Response

Regardless of the method by which the query and variables are sent, the response is returned in the body of the request in JSON format. A query’s results may include some data and some errors, and those are returned in a JSON object of the form:

```json
{
  "data": {},
  "errors": []
}
```

If there were no errors returned, the `"errors"` field is not present in the response. If no data is returned, the `"data"` field is only included if the error occurred during execution.

## GraphQL Clients

Since a GraphQL API has more underlying structure than a REST API, there are a range of methods by which a client application may choose to interact with the API. A simple usage could use the [curl](https://curl.se/) command line tool, whereas a full featured web application may integrate a more powerful client library like [Apollo Client](https://www.apollographql.com/docs/react/) or [Relay](https://relay.dev/) which automatically handle query building, batching and caching.

### Command Line

One may build and send a query or mutation via any means that enable an HTTP POST request to be made against the API. For example, this can be easily done using the command line tool [graphqurl](https://github.com/hasura/graphqurl).

### GraphQL Console

Aerie uses Hasura to generate it's GraphQL API. You can use the Hasura Console user interface to query the Aerie API directly via GraphQL. It is a great way to start exploring Aerie data and get familiar with GraphQL. If you are running Aerie locally you can view the Hasura Console at [http://localhost:8080/console](http://localhost:8080/console).

### Browser Developer Console

Requests can also be tested using JavaScript from a web-browser (or Node.js). For example the following JavaScript can be used to make a simple query using the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

```js
const response = await fetch('http://localhost:8080/v1/graphql', {
  body: JSON.stringify({ query: 'query { plan { id } }' }),
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
});
const data = await response.json();
console.log(data);
```

Here is an example of a possible shape of the data logged to the console:

```json
{
  "data": {
    "plans": [{ "id": 1 }, { "id": 2 }]
  }
}
```

This JavaScript can then be used as a hard-coded query within a client tool/script. For more complex and dynamic interactions with the Aerie API it is recommended to use a GraphQL client library.

### Client Libraries

When developing a full featured application that requires integration with the Aerie API it is advisable that the tool make use of one of the many powerful GraphQL client libraries like Apollo Client or Relay. These libraries provide an application functionality to manage both local and remote data, automatically handle batching, and caching.

In general, it will take more time to set up a GraphQL client. However, when building an Aerie integrated application, a client library offers significant time savings as the features of the application grow. One might choose to begin using HTTP requests as the client's API integration mechanism and later switch to a client library as the application becomes more complex.

GraphQL clients exist for the following programming languages:

- C# / .NET
- Clojurescript
- Elm
- Flutter
- Go
- Java / Android
- JavaScript
- Julia
- Kotlin
- Swift / Objective-C iOS
- Python
- R

A full description of these clients is found at [https://graphql.org/code/#language-support](https://graphql.org/code/#language-support)
