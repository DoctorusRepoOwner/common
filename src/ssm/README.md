# SSM Module

## Overview

This module provides a typed catalog of AWS Systems Manager Parameter Store keys used across Doctorus stacks, plus helpers to build and inspect SSM paths.

It is intentionally small:

- `SSM_PARAM_KEY` defines the supported parameter keys
- `SSM_PARAM_METADATA` adds a human-readable description for each key
- `getSSMParamDescription()` returns the description for a single key
- path helpers build and parse SSM parameter paths

## Exports

```ts
import {
  SSM_PARAM_KEY,
  SSM_PARAM_METADATA,
  getSSMParamDescription,
  buildSSMPath,
  buildSSMPathWithPrefix,
  buildICalTokenPath,
  extractEnvFromPath,
  extractKeyFromPath,
  isEnvAgnostic,
} from '@doctorus/common';
```

## Key Model

`SSM_PARAM_KEY` is the source of truth for supported parameter names.

```ts
SSM_PARAM_KEY.DB_USER; // "db-user"
SSM_PARAM_KEY.GRAPHQL_API_ID; // "graphql-api-id"
SSM_PARAM_KEY.WEBSITE_DIST_BUCKET_NAME; // "/website/dist-bucket-name"
```

Some keys are environment-scoped and are typically stored under `/{env}/{key}`.
Some keys already include their own prefix such as `/website/...` or `/cicd/...`.

## Parameter Descriptions

Each key has agent-friendly metadata in `SSM_PARAM_METADATA`.

```ts
const description = getSSMParamDescription(SSM_PARAM_KEY.DB_PASSWORD);
// "Database password used by application services."

const metadata = SSM_PARAM_METADATA[SSM_PARAM_KEY.GRAPHQL_HTTP_URL];
// { description: "HTTPS endpoint URL for GraphQL API requests." }
```

This is useful when an agent or UI needs to explain what a parameter means without relying on the raw key name alone.

## Path Helpers

### `buildSSMPath(env, key)`

Builds a parameter path from an optional environment and a key.

```ts
buildSSMPath('prod', SSM_PARAM_KEY.COGNITO_USER_POOL_ID);
// "/prod/user-pool-id"

buildSSMPath(null, SSM_PARAM_KEY.DB_USER);
// "/db-user"
```

### `buildSSMPathWithPrefix(prefix, key)`

Builds a path from any custom prefix and normalizes leading/trailing slashes.

```ts
buildSSMPathWithPrefix('/myapp/prod', SSM_PARAM_KEY.GRAPHQL_API_ID);
// "/myapp/prod/graphql-api-id"

buildSSMPathWithPrefix('/platform', SSM_PARAM_KEY.WEBSITE_DIST_BUCKET_NAME);
// "/platform/website/dist-bucket-name"
```

### `buildICalTokenPath(userId)`

Builds the dedicated iCal token path.

```ts
buildICalTokenPath('user-123');
// "/ical/user-123/token"
```

## Path Inspection

### `extractEnvFromPath(path)`

Returns the first path segment when the path starts with an environment prefix.

```ts
extractEnvFromPath('/prod/user-pool-id');
// "prod"

extractEnvFromPath('/db-user');
// null
```

### `extractKeyFromPath(path)`

Returns the final path segment if it matches a known `SSM_PARAM_KEY` value.

```ts
extractKeyFromPath('/prod/db-password');
// SSM_PARAM_KEY.DB_PASSWORD
```

### `isEnvAgnostic(path)`

Returns `true` when the path has no environment prefix and only contains a single key segment.

```ts
isEnvAgnostic('/db-user');
// true

isEnvAgnostic('/prod/db-user');
// false
```

## Typical Usage

### Build a deployment-time path

```ts
const userPoolPath = buildSSMPath('staging', SSM_PARAM_KEY.COGNITO_USER_POOL_ID);
// "/staging/user-pool-id"
```

### Show a label for an agent or admin UI

```ts
const key = SSM_PARAM_KEY.EMAIL_FROM_ADDRESS;

return {
  key,
  path: buildSSMPath('prod', key),
  description: getSSMParamDescription(key),
};
```

### Work with prefixed website or CI/CD keys

```ts
buildSSMPathWithPrefix('/shared', SSM_PARAM_KEY.CICD_GITHUB_OIDC_PROVIDER_ARN);
// "/shared/cicd/github-oidc-provider-arn"
```

## Notes

- `SSM_PARAM_METADATA` is guaranteed to cover every `SSM_PARAM_KEY`.
- Raw enum values remain unchanged, so existing integrations continue to work.
- Descriptions are intended to explain purpose, not to expose secret values.
