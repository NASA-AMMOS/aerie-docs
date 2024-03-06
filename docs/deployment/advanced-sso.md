# Advanced - SSO Authentication

Aerie is able to interoperate with external auth providers like JPL CAM, [Auth0](https://auth0.com/), [AWS Cognito](https://aws.amazon.com/cognito/), etc in order to provide single-sign on (SSO) support. Due to Aerie's open source and flexible nature, the SSO implementation is very extensible, and while this allows for organizations of many types to use Aerie, it will require some configuration on the deployment side.

This is achieved through the use of several environment variables as well as "Auth Adapters", that read these environment variables, communicate with external auth providers, and translate their response to work with Aerie's existing auth.

## Enabling SSO Authentication

The following environment variables will need to be set in conjunction for SSO auth to work correctly.

### Aerie Gateway variables

#### AUTH_URL
- Description: URL that the Gateway will make auth API requests to. Likely found in auth provider docs.
- Accepted values: Any URL
- Example: `https://your-auth-provider-api-endpoint`
- Default: `https://atb-ocio-12b.jpl.nasa.gov:8443/`

#### AUTH_URL
- Description: Login UI URL that the Gateway will redirect the UI to if SSO auth fails. Likely found in auth provider docs.
- Accepted values: Any URL
- Example: `https://your-auth-provider-login-screen`
- Default: `https://atb-ocio-12b.jpl.nasa.gov:8443/cam-ui`

#### AUTH_SSO_TOKEN_NAME
- Description: Name of the cookie(s) that the Gateway will parse for SSO token(s)
- Accepted values: List of strings
- Example: `["my_sso_token_cookie_name"]`
- Default: `["iPlanetDirectoryPro"]`

#### AUTH_TYPE
- Description: Enum value that determines which Auth Adapter is loaded.
- Accepted values: `cam` or `none`
- Default: `none`

### Aerie UI variables

#### PUBLIC_AUTH_SSO_ENABLED
- Description: Boolean flag that enables the SSO-based auth flow instead of the JWT-only flow
- Accepted values: `true` or `false`
- Example: `true`
- Default: `false`

## Sensible configurations

Three main use cases exist for auth within Aerie, each with their own configuration and combination of env vars:

### CAM API auth + Aerie login UI

User is forwarded to Aerie UI /login page if no valid Aerie JWT is found. Credentials passed in here will be tested against the CAM API for validity.

```sh
# Gateway vars
AUTH_TYPE=cam
AUTH_UI_URL="https://localhost.jpl.nasa.gov/login" # example Aerie UI /login URL
AUTH_URL="https://atb-ocio-12b.jpl.nasa.gov:8443/cam-api" # example SSO API URL

# UI var
PUBLIC_AUTH_SSO_ENABLED=false # use /login prompt instead of SSO
```

### Aerie login UI without authentication

User is forwarded to Aerie UI `/login` page if no valid Aerie JWT is found. Validity of username / password is never checked; automatically signed in as username with admin privileges. Useful for testing / dev environments

```sh
# Gateway vars
AUTH_TYPE=none
AUTH_UI_URL="https://localhost.jpl.nasa.gov/login" # Aerie UI /login URL

# UI var
PUBLIC_AUTH_SSO_ENABLED=false # use /login prompt instead of SSO
```

### SSO token-based authentication using external auth providers.

User is forwarded to SSO login UI page if no valid Aerie JWT or SSO token is found.

```sh
# Gateway vars
AUTH_TYPE=cam
AUTH_UI_URL="https://atb-ocio-12b.jpl.nasa.gov:8443/cam-ui" # example SSO login UI
AUTH_URL="https://atb-ocio-12b.jpl.nasa.gov:8443/cam-api" # example SSO API
AUTH_SSO_TOKEN_NAME="iPlanetDirectoryPro" # example name of SSO token cookie

# UI var
PUBLIC_AUTH_SSO_ENABLED=true # use SSO login page instead of Aerie's `/login`
```

## Mapping auth provider groups to Aerie roles

:::info

This feature was introduced in Aerie 2.5.0

:::

:::note

This is an optional feature. If `AUTH_GROUP_ROLE_MAPPINGS` isn't set (or is set to an empty JSON: `{}`), the Gateway will not use auth provder group membership and instead use `DEFAULT_ROLE` and `ALLOWED_ROLES` as the source of truth for assigning roles, as described in the [Password Authentication docs](../advanced-permissions/#configuring-roles-for-new-users)

:::

When authenticating with external auth providers like CAM, Aerie provides the ability to map auth groups (e.g. LDAP groups) to roles within Aerie (e.g. `user`, `viewer`). This is facilitated with the `AUTH_GROUP_ROLE_MAPPINGS` environment variable. When authenticating users, the loaded Auth Adapter within Aerie Gateway can query the external auth provider for available group membership (e.g. LDAP group membership in the CAM SSO case).

The authentication role-mapping algorithm is roughly as follows:

- Get all groups the user is a member of from external auth provider
- Take the intersection of user's groups and the groups that have mappings defined in `AUTH_GROUP_ROLE_MAPPINGS`
- Map these groups to Aerie roles using the defined mapping
- Take the union of all allowed roles, this becomes `allowed_roles` for the user
- Iterate through `DEFAULT_ROLE` list. The first role that is contained within the user's `allowed_roles` becomes the user's `default_role`

In other words, `AUTH_GROUP_ROLE_MAPPINGS` is an unordered mapping that defines which roles are granted to users in a specific auth group. `DEFAULT_ROLE` is an ordered priority list, where the default role for a user is the first match. This means that each group -> role mapping in `AUTH_GROUP_ROLE_MAPPINGS` _must_ contain at least one of the roles in the `DEFAULT_ROLE` list, since a user must always have a default role defined. An error will be thrown from the Gateway on bootup if this constraint is not satisfied.

### Creating an `AUTH_GROUP_ROLE_MAPPINGS`

The `AUTH_GROUP_ROLE_MAPPINGS` environment variable must be valid JSON in the following format:

```json
{
  "some_auth_group_name": ["aerie_admin", "user", "viewer"],
  "another_auth_group_name": ["viewer"]
}
```

:::info
This variable will be run through `JSON.parse()` in the Auth Adapters, so it must be valid JSON (e.g. double quotes, no trailing comma, etc). An error will be thrown from the Gateway on boot if the environment variable is invalid JSON.
:::

### Setting `DEFAULT_ROLE`'s

:::tip
You'll need to be cognizant on how environment variables are set in your Aerie deployment (e.g. docker-compose.yml file v.s. .env file). Some ways of setting environment variables will escape or strip quotes, which can lead to invalid JSON being passed to Aerie services.

e.g. in a docker-compose.yml file:

```yaml
aerie_gateway:
  environment:
    DEFAULT_ROLE: "[\"viewer\"]" # won't work
```

DEFAULT_ROLE will be stripped of quotes, and passed to the Gateway as the literal ["viewer"], which isn't valid JSON.

Instead, pass literal values when possible, like in the following docker-compose.yml example.

```yaml
aerie_gateway:
  environment:
    DEFAULT_ROLE: |
      ["viewer"]
```
:::

## Writing custom Auth Adapters

The SSO-based auth flow is roughly as follows:

- A user request is made from the client (e.g. navigate to `/plans/1`)
- The Aerie UI server intercepts this request, and forwards cookies to the Gateway
- The Gateway reads `AUTH_TYPE` to determine which auth adapter to load (CAM, Auth0, etc)
- The Gateway executes the `validate` function of the loaded auth adapter
    - Cookies named within `AUTH_SSO_TOKEN_NAME` are read as SSO token(s)
    - Authentication requests are made to `AUTH_URL` that determine token validity
    - If the user has a valid SSO token, `validate` returns a JWT for use within Aerie
    - Otherwise, `validate` returns a redirection to `AUTH_UI_URL`
- The Aerie UI server reads the response, and either redirects the user to the SSO login UI, or continues with the original request, using the returned JWT for authorization

This architecture was chosen so that the Gateway can be easily extended with custom auth adapters that implement this interface for any arbitrary auth provider. The interface for the Auth Adapter is as follows (defined in `auth/types.ts` in the Gateway repo):

```typescript
export interface AuthAdapter {
  validate(req: Request): Promise<ValidateResponse>;
  logout(req: Request): Promise<boolean>;
}
```

Advanced Aerie users can easily create their own e.g. `Auth0Adapter.ts` that implements this interface and runs a custom version of the previously defined algorithm, that will validate any existing SSO token cookies, and return a `ValidateResponse` that can be used downstream by Aerie UI.

More docs to come as this custom implementation feature is fleshed out.
