# @doctorus/common

Common TypeScript building blocks shared across the Doctorus platform.

This package centralizes:

- operations and permission primitives
- status enums with metadata and translations
- audit event types
- AWS SSM parameter keys and path helpers

## Installation

```bash
pnpm add @doctorus/common
```

## Exports

```ts
import {
  // Operations
  Action,
  Operation,
  Resource,
  getActionLabel,
  getOperationLabel,

  // Status
  MedicalServiceStatus,
  MembershipStatus,
  getStatusLabel,
  getStatusMetadata,

  // Audit
  AuditEvent,

  // SSM
  SSM_PARAM_KEY,
  SSM_PARAM_METADATA,
  getSSMParamDescription,
  buildSSMPath,
} from '@doctorus/common';
```

## Modules

### Operations

Defines typed actions, resources, and `Operation` pairs used for authorization, labeling, and audit context.

```ts
import { Action, Operation, Resource, getOperationLabel } from '@doctorus/common';

const operation = new Operation(Resource.PRESCRIPTION, Action.CREATE);

getOperationLabel(operation, 'us-EN'); // "Create Prescription"
getOperationLabel(operation, 'fr-FR'); // "Creer Ordonnance"
```

[Operations documentation](src/operations/README.md)

### Status

Provides reusable status enums and metadata with labels, descriptions, colors, and icons.

```ts
import { MedicalServiceStatus, MembershipStatus, getStatusLabel, getStatusMetadata } from '@doctorus/common';

const serviceStatus = MedicalServiceStatus.IN_PROGRESS;
getStatusLabel(serviceStatus, 'us-EN'); // "In Progress"
getStatusMetadata(serviceStatus).icon; // e.g. "medical_services"

const membershipStatus = MembershipStatus.ACTIVE;
getStatusLabel(membershipStatus, 'us-EN'); // "Active"
getStatusMetadata(membershipStatus).color; // "#4CAF50"
```

[Status documentation](src/status/README.md)

### Audit

Contains audit event types shared by services that log user or system activity.

```ts
import { AuditEvent, Action, Resource } from '@doctorus/common';

const event: AuditEvent = {
  id: 'evt-123',
  timestamp: new Date(),
  action: Action.CREATE,
  resource: Resource.PATIENT,
  result: 'success',
};
```

[Audit documentation](src/audit/README.md)

### SSM

Defines known SSM parameter keys and utilities to build, inspect, and describe parameter paths.

```ts
import { SSM_PARAM_KEY, getSSMParamDescription, buildSSMPath, extractKeyFromPath } from '@doctorus/common';

const key = SSM_PARAM_KEY.DB_PASSWORD;

buildSSMPath('prod', key); // "/prod/db-password"
getSSMParamDescription(key); // "Database password used by application services."
extractKeyFromPath('/prod/db-password'); // SSM_PARAM_KEY.DB_PASSWORD
```

[SSM documentation](src/ssm/README.md)

## Internationalization

User-facing labels in this package use the shared locale shape:

- `'us-EN'`
- `'fr-FR'`

This applies to operations and status metadata APIs.

## Development

- `pnpm test` runs Jest and lint checks via Projen
- `pnpm build` compiles the library
- `pnpm projen` regenerates project files from [.projenrc.ts](.projenrc.ts)

## Notes

- The root `README.md` is generated from `.projenrc.ts`
- Edit Projen configuration first, then re-run `pnpm projen` when documentation changes
