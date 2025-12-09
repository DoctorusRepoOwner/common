# Operations Module

## Overview

The Operations module provides a comprehensive system for defining, categorizing, and labeling operations, actions, and resources across the Doctorus platform. It includes full internationalization (i18n) support for English and French.

## Key Components

### 1. **Action Enum** (`actions.ts`)

Defines all possible actions that can be performed in the system.

**Categories:**

- **CRUD Operations**: `CREATE`, `READ`, `UPDATE`, `DELETE`, `PUT`, `LIST`
- **General Actions**: `MANAGE`, `VIEW`, `SEARCH`
- **Access Control**: `GRANT`, `REVOKE`
- **Medical Specific**: `PRESCRIBE`, `DIAGNOSE`, `SCHEDULE`, `CANCEL`, `APPROVE`, `REJECT`, `SIGN`, `VERIFY`
- **Medical Service Status Actions**: `CHECK_IN`, `UNDO_CHECK_IN`, `START_SERVICE`, `UNSTART_SERVICE`, `COMPLETE_SERVICE`, `REOPEN_COMPLETED_SERVICE`, `CANCEL_SERVICE`, `UNDO_CANCEL_SERVICE`, `FORCE_RESET_STATUS`, `CORRECT_TIMESTAMPS`
- **Account Actions**: `RECOVER`, `DISABLE`
- **Data Operations**: `EXPORT`, `IMPORT`, `ARCHIVE`, `RESTORE`, `SHARE`, `DOWNLOAD`, `UPLOAD`
- **System Operations**: `LOGIN`, `LOGOUT`, `CONFIGURE`, `AUDIT`

**Usage Example:**

```typescript
import { Action } from '@doctorus/common';

const action = Action.CREATE;
const medicalAction = Action.PRESCRIBE;
const statusAction = Action.CHECK_IN;
```

### 2. **Resource Enum** (`resources.ts`)

Defines all resource types in the system with categorization into medical and public resources.

**Total Resources**: 49 resource types

**Medical Resources** (require special access control):

- Patient resources: `PATIENT`, `PATIENT_MEDICAL_NOTES`, `PATIENT_MEDICAL_PROPERTIES`, `PATIENT_PAYMENT`
- Medical service resources: `MEDICAL_SERVICE`, `MEDICAL_SERVICE_NOTE`, `MEDICAL_SERVICE_SCHEDULE`, `MEDICAL_SERVICE_FEES`, `MEDICAL_SERVICE_STATUS`
- Clinical resources: `MEDICAL_NOTE`, `MEDICAL_RECORD`, `MEDICAL_HISTORY`, `PRESCRIPTION`, `DIAGNOSIS`, `OBSERVATION`, `MEDICATION`, `ALLERGY`, `IMMUNIZATION`, `PROCEDURE`, `CLINICAL_NOTE`, `VITAL_SIGNS`
- Lab/Imaging: `LAB_RESULT`, `IMAGING`
- Models: `MEDICAL_HISTORY_MODEL`, `PRESCRIPTION_MODEL`, `MEASURE_MODEL`, `CALCULATED_MEASURE_MODEL`

**Public Resources** (standard access control):

- Account resources: `ACCOUNT`, `ACCOUNT_OWNERSHIP`, `ACCOUNT_PREFERENCES`, `USER`, `CONTACT`
- Document resources: `UPLOADED_DOCUMENT`, `DOCUMENT_LAYOUT`, `GENERATED_DOCUMENT`, `DOCUMENT_MODEL`
- System resources: `SETTINGS`, `NOTIFICATION`, `REPORT`, `AUDIT_LOG`, `SYSTEM`
- Other: `SNIPPET`, `LOCATION`, `TASK_TYPE`, `MEMBERSHIP`

**Helper Functions:**

```typescript
import {
  Resource,
  isMedicalResource,
  isPublicResource,
  getAllResources,
  getResourceCategories,
} from '@doctorus/common';

// Check resource type
if (isMedicalResource(Resource.PATIENT)) {
  // Apply special medical access control
}

// Get all resources
const allResources = getAllResources();

// Get categorized resources
const categories = getResourceCategories();
// Returns: { medical: Resource[], public: Resource[] }
```

### 3. **Operation Class** (`operation.ts`)

Combines Action and Resource to represent a complete operation.

**Usage Example:**

```typescript
import { Operation, Action, Resource } from '@doctorus/common';

// Create an operation
const op = new Operation(Action.CREATE, Resource.PRESCRIPTION);

// Access properties
console.log(op.action); // Action.CREATE
console.log(op.resource); // Resource.PRESCRIPTION
console.log(op.toString()); // "CREATE:PRESCRIPTION"

// Parse from string
const parsed = Operation.fromString('READ:PATIENT');
console.log(parsed.action); // Action.READ
console.log(parsed.resource); // Resource.PATIENT

// Check equality
const op1 = new Operation(Action.CREATE, Resource.PATIENT);
const op2 = new Operation(Action.CREATE, Resource.PATIENT);
console.log(op1.equals(op2)); // true
```

### 4. **Predefined Operations** (`predefined.ts`)

Common operation combinations for quick reference.

**Available Predefined Operations:**

```typescript
import { PredefinedOperations } from '@doctorus/common';

// Patient operations
PredefinedOperations.PATIENT_CREATE;
PredefinedOperations.PATIENT_READ;
PredefinedOperations.PATIENT_UPDATE;
PredefinedOperations.PATIENT_DELETE;
PredefinedOperations.PATIENT_VIEW;

// Medical service operations
PredefinedOperations.MEDICAL_SERVICE_CREATE;
PredefinedOperations.MEDICAL_SERVICE_READ;
PredefinedOperations.MEDICAL_SERVICE_UPDATE;
PredefinedOperations.MEDICAL_SERVICE_DELETE;
PredefinedOperations.MEDICAL_SERVICE_SCHEDULE;
PredefinedOperations.MEDICAL_SERVICE_CANCEL;

// Prescription operations
PredefinedOperations.PRESCRIPTION_CREATE;
PredefinedOperations.PRESCRIPTION_READ;
PredefinedOperations.PRESCRIPTION_UPDATE;
PredefinedOperations.PRESCRIPTION_DELETE;
PredefinedOperations.PRESCRIPTION_PRESCRIBE;
PredefinedOperations.PRESCRIPTION_SIGN;

// And many more...
```

### 5. **Internationalization (i18n) Labels** (`labels.ts`)

Provides human-readable labels for actions, resources, and operations in multiple languages.

**Supported Locales:**

- `'us-EN'` - United States English
- `'fr-FR'` - French (France)

**Usage Examples:**

#### Action Labels

```typescript
import { getActionLabel, Action } from '@doctorus/common';

// Get English label (default)
const label = getActionLabel(Action.CREATE); // "Create"

// Get French label
const labelFr = getActionLabel(Action.CREATE, 'fr-FR'); // "Créer"

// More examples
getActionLabel(Action.CHECK_IN, 'us-EN'); // "Check In"
getActionLabel(Action.CHECK_IN, 'fr-FR'); // "Enregistrement à l'arrivée"

getActionLabel(Action.PRESCRIBE, 'us-EN'); // "Prescribe"
getActionLabel(Action.PRESCRIBE, 'fr-FR'); // "Prescrire"
```

#### Resource Labels

```typescript
import { getResourceLabel, Resource } from '@doctorus/common';

// Get English label (default)
const label = getResourceLabel(Resource.PATIENT); // "Patient"

// Get French label
const labelFr = getResourceLabel(Resource.PATIENT, 'fr-FR'); // "Patient"

// More examples
getResourceLabel(Resource.PRESCRIPTION, 'us-EN'); // "Prescription"
getResourceLabel(Resource.PRESCRIPTION, 'fr-FR'); // "Ordonnance"

getResourceLabel(Resource.MEDICAL_SERVICE, 'us-EN'); // "Medical Service"
getResourceLabel(Resource.MEDICAL_SERVICE, 'fr-FR'); // "Service médical"
```

#### Operation Labels

```typescript
import { getOperationLabel, Operation, Action, Resource } from '@doctorus/common';

const op = new Operation(Action.CREATE, Resource.PRESCRIPTION);

// Get English label (default: "action resource")
const label = getOperationLabel(op); // "Create Prescription"

// Get French label
const labelFr = getOperationLabel(op, 'fr-FR'); // "Créer Ordonnance"

// Customize separator
getOperationLabel(op, 'us-EN', { separator: ' - ' }); // "Create - Prescription"

// Reverse order (resource first)
getOperationLabel(op, 'us-EN', { order: 'resource-action' }); // "Prescription Create"
```

**Fallback Behavior:**
If a specific translation is missing, the system will automatically humanize the enum key:

- `PATIENT_MEDICAL_NOTES` → "Patient Medical Notes"
- `CHECK_IN` → "Check In"

## Common Use Cases

### 1. Permission Checking

```typescript
import { Operation, Action, Resource, getOperationLabel } from '@doctorus/common';

function checkPermission(userPermissions: Operation[], requiredOp: Operation): boolean {
  return userPermissions.some((perm) => perm.equals(requiredOp));
}

const requiredOp = new Operation(Action.CREATE, Resource.PRESCRIPTION);
if (checkPermission(userPermissions, requiredOp)) {
  console.log(`User can ${getOperationLabel(requiredOp)}`);
}
```

### 2. Audit Logging

```typescript
import { Operation, Action, Resource, getOperationLabel } from '@doctorus/common';

function logAudit(userId: string, operation: Operation, locale: 'us-EN' | 'fr-FR' = 'us-EN') {
  const actionLabel = getOperationLabel(operation, locale);
  console.log(`User ${userId} performed: ${actionLabel}`);
}

const op = new Operation(Action.UPDATE, Resource.PATIENT);
logAudit('user123', op, 'fr-FR'); // "User user123 performed: Mettre à jour Patient"
```

### 3. UI Display

```typescript
import { getAllResources, getResourceLabel, isMedicalResource } from '@doctorus/common';

function buildResourceMenu(locale: 'us-EN' | 'fr-FR' = 'us-EN') {
  const resources = getAllResources();

  return resources.map((resource) => ({
    id: resource,
    label: getResourceLabel(resource, locale),
    category: isMedicalResource(resource) ? 'Medical' : 'Public',
  }));
}
```

### 4. Medical Service Status Management

```typescript
import { Action, Resource, Operation, getActionLabel } from '@doctorus/common';

// Available status actions
const statusActions = [
  Action.CHECK_IN,
  Action.UNDO_CHECK_IN,
  Action.START_SERVICE,
  Action.UNSTART_SERVICE,
  Action.COMPLETE_SERVICE,
  Action.REOPEN_COMPLETED_SERVICE,
  Action.CANCEL_SERVICE,
  Action.UNDO_CANCEL_SERVICE,
  Action.FORCE_RESET_STATUS,
  Action.CORRECT_TIMESTAMPS,
];

// Build status action buttons
statusActions.forEach((action) => {
  console.log({
    action,
    label: getActionLabel(action, 'us-EN'),
    labelFr: getActionLabel(action, 'fr-FR'),
  });
});
```

## Type Safety

All enums and operations are fully typed, providing excellent IntelliSense and compile-time checking:

```typescript
import { Action, Resource, Operation } from '@doctorus/common';

// TypeScript will autocomplete available actions
const action: Action = Action.CREATE;

// TypeScript will autocomplete available resources
const resource: Resource = Resource.PATIENT;

// Operation is type-safe
const op = new Operation(action, resource);
```

## Best Practices

1. **Always use enums** instead of string literals to benefit from type safety
2. **Use predefined operations** when available to maintain consistency
3. **Leverage i18n labels** for all user-facing text
4. **Check resource categories** (medical vs public) for proper access control
5. **Use Operation.equals()** for comparison instead of `===`
6. **Provide locale context** when displaying labels to users

## Testing

The operations module has comprehensive test coverage (99%+). See `test/operations.test.ts` and `test/operations.labels.test.ts` for examples.
