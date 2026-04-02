# Operations Module

## Overview

The operations module gives Doctorus a shared vocabulary for authorization, audit logging, and UI labels.

It is built from three pieces:

- `Resource`: the thing being acted on
- `Action`: the kind of intent or behavior
- `Operation`: the pair of `resource + action`

An operation is always serialized as:

```ts
RESOURCE:ACTION
```

Example:

```ts
PATIENT:RETRIEVE
MEDICAL_SERVICE_STATUS:CHECK_IN
CALENDAR_SYNC:ENABLE_CALENDAR_SYNC
```

## Design Logic

### 1. Resources follow the GraphQL domain

Resources are aligned with the domain exposed by the schema and its business concepts.
That means we model things like:

- `ACCOUNT`
- `ACCOUNT_LOCATION`
- `PATIENT`
- `PATIENT_PROFILE`
- `MEDICAL_SERVICE`
- `MEDICAL_SERVICE_STATUS`
- `PRESCRIPTION`
- `DOCUMENT_LAYOUT`
- `CALENDAR_TOKEN`

The important rule is:

- resources should describe domain objects or subdomains
- resources should not try to mirror every resolver name one-to-one
- related mutations can target the same resource when they affect the same domain concern

For example:

- `setMedicalServiceStatus`
- `checkInMedicalService`
- `startMedicalService`
- `completeMedicalService`

all belong to the same general area, so they can be expressed through resources like:

- `MEDICAL_SERVICE`
- `MEDICAL_SERVICE_STATUS`

### 2. Actions stay richer than the schema enum

The GraphQL schema contains an `ActionType`, but this package does **not** use that enum as the source of truth.

That is intentional.

The schema enum is too small for application-level needs. We still need expressive actions for:

- authorization
- audit logging
- admin tooling
- UI labels
- workflow-specific permissions

So the action model includes both generic actions and domain-specific ones, such as:

- generic: `CREATE`, `READ`, `RETRIEVE`, `UPDATE`, `DELETE`, `PUT`, `LIST`
- search/display: `SEARCH`, `VIEW`
- medical workflows: `CHECK_IN`, `START_SERVICE`, `COMPLETE_SERVICE`, `CORRECT_TIMESTAMPS`
- business-specific updates: `SET_MEDICAL_SERVICE_STATUS`, `SET_MEDICAL_SERVICE_FEES`
- payments and uploads: `PUT_PATIENT_PAYMENT`, `UPLOAD`
- calendar flows: `ENABLE_CALENDAR_SYNC`, `DISABLE_CALENDAR_SYNC`, `REGENERATE_CALENDAR_LINK`

In short:

- resources are schema/domain aligned
- actions are application/workflow aligned

This gives us a model that stays close to the API without losing business intent.

### 3. `RETRIEVE` and `READ` can both exist

This is also intentional.

- `RETRIEVE` is useful for "fetch a resource" semantics and pairs well with GraphQL-style access
- `READ` is useful when the operation is more like inspection, logs, or general viewing

We do not force the whole system into one verb when different parts of the product communicate better with different language.

### 4. Predefined operations map product behaviors to the shared vocabulary

`predefined.ts` is where concrete product actions are normalized into reusable operations.

Examples:

```ts
Operations.PATIENT_RETRIEVE;
Operations.MEDICAL_SERVICE_CHECK_IN;
Operations.MEDICAL_SERVICE_FEES_UPDATE;
Operations.CALENDAR_SYNC_ENABLE;
Operations.CALENDAR_TOKEN_REGENERATE;
```

These constants are the recommended entry point for feature code because they:

- avoid repeated string construction
- keep naming consistent across services
- make audit and permission logic easier to grep and review

## Main Types

### `Action`

Defined in `actions.ts`.

This enum contains the intent of the operation.

Examples:

```ts
Action.CREATE;
Action.RETRIEVE;
Action.CHECK_IN;
Action.SET_MEDICAL_SERVICE_FEES;
Action.ENABLE_CALENDAR_SYNC;
```

### `Resource`

Defined in `resources.ts`.

This enum contains the domain target of the operation.

Examples:

```ts
Resource.PATIENT;
Resource.MEDICAL_SERVICE;
Resource.MEDICAL_SERVICE_STATUS;
Resource.DOCUMENT_LAYOUT;
Resource.CALENDAR_SYNC;
```

### `Operation`

Defined in `operation.ts`.

This class combines a resource and an action.

```ts
import { Action, Operation, Resource } from '@doctorus/common';

const op = new Operation(Resource.PATIENT, Action.RETRIEVE);

op.toString(); // "PATIENT:RETRIEVE"
```

You can also parse from strings:

```ts
const parsed = Operation.fromString('MEDICAL_SERVICE_STATUS:CHECK_IN');
```

Helper utilities:

- `Operation.fromString(...)`
- `getResourceFromOperation(...)`
- `getActionFromOperation(...)`

## Resource Categories

Resources are split into two buckets:

- `MEDICAL_RESOURCES`
- `PUBLIC_RESOURCES`

Use helpers from `resources.ts`:

```ts
import {
  MEDICAL_RESOURCES,
  PUBLIC_RESOURCES,
  getAllResources,
  getResourceCategories,
  isMedicalResource,
  isPublicResource,
} from '@doctorus/common';
```

This is useful when policy differs for medical versus non-medical data.

Examples of medical resources:

- `PATIENT`
- `MEDICAL_HISTORY`
- `MEDICAL_SERVICE`
- `OBSERVATION`
- `PRESCRIPTION`

Examples of public resources:

- `ACCOUNT`
- `ACCOUNT_LOCATION`
- `DOCUMENT_LAYOUT`
- `MEMBERSHIP`
- `USER`

## Labels and i18n

`labels.ts` exposes user-facing labels for:

- actions
- resources
- full operations

Supported locales:

- `'us-EN'`
- `'fr-FR'`

Examples:

```ts
import {
  Action,
  Operation,
  Resource,
  getActionLabel,
  getOperationLabel,
  getResourceLabel,
} from '@doctorus/common';

getActionLabel(Action.CHECK_IN, 'us-EN'); // "Check In"
getResourceLabel(Resource.MEDICAL_SERVICE_STATUS, 'us-EN'); // "Medical Service Status"

const op = new Operation(Resource.MEDICAL_SERVICE_STATUS, Action.CHECK_IN);
getOperationLabel(op, 'us-EN'); // "Check In Medical Service Status"
```

English labels are mostly direct mappings.
French labels use explicit overrides where needed and humanized fallbacks for anything not customized.

## How to Choose a Resource

Use these rules:

1. Choose the business object, not the resolver name.
2. Prefer a stable domain noun over a temporary implementation detail.
3. If several mutations affect one concern, group them under one resource family.
4. Split into a subresource only when the concern is meaningfully distinct.

Good examples:

- `PATIENT_STATUS` for activation/deactivation flows
- `PATIENT_PAYMENT` for payment mutations
- `MEDICAL_SERVICE_STATUS` for status transitions
- `MEDICAL_SERVICE_TIMESTAMPS` for timestamp correction

## How to Choose an Action

Use these rules:

1. Use a generic action when business intent is obvious enough.
2. Use a workflow-specific action when the distinction matters for permissions, audit, or UI copy.
3. Prefer consistency with existing predefined operations over inventing a near-duplicate action.

Examples:

- use `RETRIEVE` for fetching a patient
- use `PUT_PATIENT_PAYMENT` instead of generic `UPDATE` when the payment workflow matters
- use `CHECK_IN` instead of `UPDATE` for medical-service arrival workflows
- use `ENABLE_CALENDAR_SYNC` instead of `UPDATE` for calendar lifecycle events

## Recommended Usage

Prefer predefined operations:

```ts
import { Operations } from '@doctorus/common';

const permission = Operations.MEDICAL_SERVICE_CHECK_IN;
```

If you need something custom:

```ts
import { Action, Operation, Resource } from '@doctorus/common';

const permission = new Operation(Resource.PATIENT_PROFILE, Action.UPDATE);
```

For permission checks:

```ts
function hasPermission(userOps: Operation[], required: Operation): boolean {
  return userOps.some((op) => op.equals(required));
}
```

For audit logs:

```ts
import { getOperationLabel } from '@doctorus/common';

const label = getOperationLabel(Operations.CALENDAR_SYNC_ENABLE, 'us-EN');
```

## Current Mental Model

If you only remember one thing, remember this:

- the schema helps shape the resource model
- the product workflow shapes the action model
- the operation string is the shared contract between authorization, audit, and UI labeling
