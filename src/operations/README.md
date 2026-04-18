# Operations Module

## Overview

The operations module defines a shared authorization and audit vocabulary:

- `Resource` (what is targeted)
- `Action` (what is done)
- `Operation` (`RESOURCE:ACTION`)

Example:

```ts
PATIENT: VIEW;
MEDICAL_SERVICE: CHECK_IN;
CALENDAR_SYNC: ENABLE;
```

## Main Types

### `Resource`

`Resource` is aligned to the schema taxonomy.

Examples:

```ts
Resource.PATIENT;
Resource.MEDICAL_SERVICE;
Resource.DOCUMENT_LAYOUT;
Resource.CALENDAR_TOKEN;
Resource.AVAILABLE_SLOTS;
```

### `Action`

`Action` contains generic and workflow verbs used across permission and audit flows.

Examples:

```ts
Action.CREATE;
Action.VIEW;
Action.UPDATE;
Action.DELETE;
Action.CHECK_IN;
Action.ROTATE_TOKEN;
```

### `Operation`

```ts
import { Action, Operation, Resource } from '@doctorus/common';

const op = new Operation(Resource.PATIENT, Action.VIEW);
op.toString(); // "PATIENT:VIEW"

const parsed = Operation.fromString('MEDICAL_SERVICE:CHECK_IN');
```

Helpers:

- `Operation.fromString(...)`
- `getResourceFromOperation(...)`
- `getActionFromOperation(...)`

## Resource Categories

The module exposes schema categories:

- `core`
- `clinical`
- `documents`
- `billing`
- `membership`
- `integration`
- `settings`
- `scheduling`
- `external`
- `system`

APIs:

```ts
import {
  ActionAccess,
  ResourceCategory,
  CORE_RESOURCES,
  CLINICAL_RESOURCES,
  DOCUMENT_RESOURCES,
  BILLING_RESOURCES,
  MEMBERSHIP_RESOURCES,
  INTEGRATION_RESOURCES,
  SETTINGS_RESOURCES,
  SCHEDULING_RESOURCES,
  EXTERNAL_RESOURCES,
  SYSTEM_RESOURCES,
  getResourceCategories,
  getResourcesByCategory,
  getResourcesByCategories,
  getActionsByAccess,
  getActionAccess,
  isReadAction,
  isWriteAction,
  getResourceActions,
  getAllResourceActions,
  getResourceActionsByAccess,
  getAllResourceActionsByAccess,
  generateOperationsForResources,
} from '@doctorus/common';

getResourcesByCategory(ResourceCategory.CLINICAL);
getResourcesByCategories([ResourceCategory.CORE, ResourceCategory.MEMBERSHIP]);
getResourceActions(Resource.MEDICAL_SERVICE);
getAllResourceActions();
getActionsByAccess(ActionAccess.READ);
getResourceActionsByAccess(Resource.MEDICAL_SERVICE, ActionAccess.WRITE);
getAllResourceActionsByAccess(ActionAccess.READ);
generateOperationsForResources([Resource.PATIENT, Resource.CALENDAR_TOKEN], [Action.VIEW, Action.UPDATE]);
getActionAccess(Action.VIEW); // READ
isReadAction(Action.VIEW); // true
isWriteAction(Action.UPDATE); // true
```

Legacy helpers remain available for compatibility:

- `MEDICAL_RESOURCES`
- `PUBLIC_RESOURCES`
- `isMedicalResource(...)`
- `isPublicResource(...)`

## Labels and i18n

`labels.ts` provides labels for:

- actions: `getActionLabel(...)`
- resources: `getResourceLabel(...)`
- categories: `getResourceCategoryLabel(...)`
- operations: `getOperationLabel(...)`

Locales:

- `'us-EN'`
- `'fr-FR'`

```ts
import {
  Action,
  Operation,
  Resource,
  ResourceCategory,
  getActionLabel,
  getResourceLabel,
  getResourceCategoryLabel,
  getOperationLabel,
} from '@doctorus/common';

getActionLabel(Action.CHECK_IN, 'us-EN'); // "Check In"
getResourceLabel(Resource.MEDICAL_SERVICE, 'us-EN'); // "Medical Service"
getResourceCategoryLabel(ResourceCategory.CLINICAL, 'fr-FR'); // "Clinique"
getOperationLabel(new Operation(Resource.MEDICAL_SERVICE, Action.CHECK_IN), 'us-EN');
```

## Recommended Usage

```ts
import { Action, Operation, Resource, getResourceActions } from '@doctorus/common';

const permission = new Operation(Resource.MEDICAL_SERVICE, Action.CHECK_IN);
const allowedActions = getResourceActions(Resource.MEDICAL_SERVICE);
```

For permission checks:

```ts
function hasPermission(userOps: Operation[], required: Operation): boolean {
  return userOps.some((op) => op.equals(required));
}
```
