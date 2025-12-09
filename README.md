# @doctorus/common

Common TypeScript utilities for Doctorus - A comprehensive shared library providing operations management, status handling, SSM parameters, audit logging, and internationalization across the platform.

[![npm version](https://img.shields.io/npm/v/@doctorus/common.svg)](https://www.npmjs.com/package/@doctorus/common)
[![License](https://img.shields.io/npm/l/@doctorus/common.svg)](https://github.com/DoctorusRepoOwner/common/blob/main/LICENSE)
[![Test Coverage](https://img.shields.io/badge/coverage-99%25-brightgreen.svg)](https://github.com/DoctorusRepoOwner/common)

## Installation

```bash
npm install @doctorus/common
# or
pnpm add @doctorus/common
# or
yarn add @doctorus/common
```

## Features

- 🎯 **Operations Module** - Type-safe resource-action patterns with i18n support (English/French)
- 📊 **Status Module** - Rich status management with icons, colors, and translations
- 🔐 **Audit Module** - Comprehensive audit logging and compliance tracking
- 🗄️ **SSM Module** - AWS SSM Parameter Store utilities with hierarchical keys
- 🌍 **Internationalization** - Full bilingual support (us-EN, fr-FR) for all user-facing text
- 🏥 **Medical Compliance** - Separate categorization for HIPAA-compliant resources
- ✅ **100% Test Coverage** - Production-ready with comprehensive testing

## Quick Start

```typescript
import {
  // Operations
  Operation,
  Action,
  Resource,
  getOperationLabel,

  // Status
  MedicalServiceStatus,
  getStatusLabel,
  getStatusIcon,

  // SSM
  buildSSMKey,
  SSM_CATEGORIES,

  // Audit
  AuditEvent,
} from '@doctorus/common';

// Create and label an operation
const op = new Operation(Action.CREATE, Resource.PRESCRIPTION);
console.log(getOperationLabel(op, 'us-EN')); // "Create Prescription"
console.log(getOperationLabel(op, 'fr-FR')); // "Créer Ordonnance"

// Get status information
const status = MedicalServiceStatus.IN_PROGRESS;
console.log(getStatusLabel(status, 'us-EN')); // "In Progress"
console.log(getStatusIcon(status)); // "medical_services"

// Build SSM key
const key = buildSSMKey({
  environment: 'production',
  application: 'doctorus',
  category: SSM_CATEGORIES.DATABASE,
  subcategory: 'postgres',
  name: 'connection-string',
});
// "/production/doctorus/database/postgres/connection-string"
```

## Modules Overview

### 🎯 [Operations Module](src/operations/README.md)

Resource-action based system for permissions, operations, and audit logging with full internationalization.

**Key Features:**

- 67 predefined actions (CRUD, medical-specific, system operations)
- 49 categorized resources (medical + public)
- Bilingual labels (English/French)
- Predefined operation combinations
- Resource categorization helpers

**Quick Example:**

```typescript
import { Action, Resource, getActionLabel, isMedicalResource } from '@doctorus/common';

const action = Action.PRESCRIBE;
console.log(getActionLabel(action, 'us-EN')); // "Prescribe"
console.log(getActionLabel(action, 'fr-FR')); // "Prescrire"

console.log(isMedicalResource(Resource.PATIENT)); // true
console.log(isMedicalResource(Resource.ACCOUNT)); // false
```

[📖 Full Operations Documentation](src/operations/README.md)

---

### 📊 [Status Module](src/status/README.md)

Comprehensive status management with rich metadata, visual elements, and validation.

**Key Features:**

- Type-safe status enums
- Material Design icons and color schemes
- Short and long labels in English/French
- Detailed descriptions
- Status transition validation
- Reusable pattern for multiple entity types

**Quick Example:**

```typescript
import {
  MedicalServiceStatus,
  getStatusLabel,
  getStatusColor,
  getStatusIcon,
  isValidTransition,
} from '@doctorus/common';

const status = MedicalServiceStatus.IN_PROGRESS;
console.log(getStatusLabel(status, 'us-EN', 'long')); // "Service In Progress"
console.log(getStatusColor(status)); // "#2196F3"
console.log(getStatusIcon(status)); // "medical_services"

// Validate transitions
isValidTransition(MedicalServiceStatus.PENDING, MedicalServiceStatus.IN_PROGRESS); // true
```

[📖 Full Status Documentation](src/status/README.md)

---

### 🔐 [Audit Module](src/audit/README.md)

Enterprise-grade audit logging for compliance, security, and debugging.

**Key Features:**

- Comprehensive event tracking
- User and system action logging
- Data change tracking (before/after states)
- Correlation and tracing support
- HIPAA/GDPR compliance ready
- Integration with Operations module

**Quick Example:**

```typescript
import { AuditEvent, Action, Resource } from '@doctorus/common';

const event: AuditEvent = {
  id: uuidv4(),
  timestamp: new Date(),
  userId: 'user-123',
  action: Action.CREATE,
  resource: Resource.PRESCRIPTION,
  resourceId: 'prescription-789',
  result: 'success',
  metadata: { medication: 'Amoxicillin' },
};

await auditLogger.log(event);
```

[📖 Full Audit Documentation](src/audit/README.md)

---

### 🗄️ [SSM Module](src/ssm/README.md)

Type-safe AWS Systems Manager Parameter Store key management.

**Key Features:**

- Hierarchical key structure
- Environment-aware configuration
- Key parsing and validation
- Predefined key categories
- Prefix building for batch operations

**Quick Example:**

```typescript
import { buildSSMKey, parseSSMKey, SSM_CATEGORIES } from '@doctorus/common';

// Build a key
const key = buildSSMKey({
  environment: 'production',
  application: 'doctorus',
  category: SSM_CATEGORIES.API,
  subcategory: 'stripe',
  name: 'secret-key',
});
// "/production/doctorus/api/stripe/secret-key"

// Parse a key
const parsed = parseSSMKey(key);
console.log(parsed.category); // "api"
console.log(parsed.subcategory); // "stripe"
```

[📖 Full SSM Documentation](src/ssm/README.md)

---

## Internationalization (i18n)

All user-facing text supports English (us-EN) and French (fr-FR):

```typescript
import { getActionLabel, getResourceLabel, getStatusLabel } from '@doctorus/common';

// Action labels
getActionLabel(Action.CREATE, 'us-EN'); // "Create"
getActionLabel(Action.CREATE, 'fr-FR'); // "Créer"

// Resource labels
getResourceLabel(Resource.PATIENT, 'us-EN'); // "Patient"
getResourceLabel(Resource.PATIENT, 'fr-FR'); // "Patient"

// Status labels
getStatusLabel(MedicalServiceStatus.COMPLETED, 'us-EN'); // "Completed"
getStatusLabel(MedicalServiceStatus.COMPLETED, 'fr-FR'); // "Terminé"
```

## Medical Service Status Actions

Special actions for medical service workflow management:

```typescript
import { Action } from '@doctorus/common';

// Status transition actions
Action.CHECK_IN; // Move patient to waiting room
Action.UNDO_CHECK_IN; // Revert check-in
Action.START_SERVICE; // Begin consultation
Action.UNSTART_SERVICE; // Undo service start
Action.COMPLETE_SERVICE; // Mark as completed
Action.REOPEN_COMPLETED_SERVICE; // Reopen completed service
Action.CANCEL_SERVICE; // Cancel the service
Action.UNDO_CANCEL_SERVICE; // Uncancel
Action.FORCE_RESET_STATUS; // Admin: reset all (dangerous)
Action.CORRECT_TIMESTAMPS; // Admin: modify timestamps
```

## Modules

### 1. Operations Module

Manage operations in `RESOURCE:ACTION` format for access control, audit logging, and permission management.

#### Basic Usage

```typescript
import { Operation, Operations, Resource, Action } from '@doctorus/common';

// Use predefined operations
const operation = Operations.PATIENT_READ;
console.log(operation.toString()); // "PATIENT:READ"

// Create custom operations
const customOp = new Operation(Resource.PRESCRIPTION, Action.PRESCRIBE);
console.log(customOp.toString()); // "PRESCRIPTION:PRESCRIBE"

// Parse from string
const parsed = Operation.fromString('MEDICAL_SERVICE:SCHEDULE');
if (parsed) {
  console.log(parsed.resource); // Resource.MEDICAL_SERVICE
  console.log(parsed.action); // Action.SCHEDULE
}

// Compare operations
const op1 = Operations.PATIENT_READ;
const op2 = Operations.PATIENT_READ;
console.log(op1.equals(op2)); // true

// Convert to JSON
const json = operation.toJSON();
// { resource: "PATIENT", action: "READ", operation: "PATIENT:READ" }
```

#### Resources

Resources are categorized as **Medical** (require special access control) or **Public** (standard access control):

**Medical Resources:**

- Patient: `PATIENT`, `PATIENT_MEDICAL_NOTES`, `PATIENT_MEDICAL_PROPERTIES`, `PATIENT_PAYMENT`
- Medical Services: `MEDICAL_SERVICE`, `MEDICAL_SERVICE_NOTE`, `MEDICAL_SERVICE_SCHEDULE`, `MEDICAL_SERVICE_FEES`, `MEDICAL_SERVICE_STATUS`
- Clinical: `MEDICAL_RECORD`, `MEDICAL_HISTORY`, `PRESCRIPTION`, `DIAGNOSIS`, `OBSERVATION`, `MEDICATION`, `ALLERGY`, `IMMUNIZATION`, `PROCEDURE`
- Measurements: `CLINICAL_NOTE`, `VITAL_SIGNS`, `MEASURE_MODEL`, `CALCULATED_MEASURE_MODEL`
- Diagnostics: `LAB_RESULT`, `IMAGING`

**Public Resources:**

- Account: `ACCOUNT`, `ACCOUNT_OWNERSHIP`, `ACCOUNT_PREFERENCES`
- User: `USER`, `CONTACT`
- Documents: `UPLOADED_DOCUMENT`, `DOCUMENT_LAYOUT`, `GENERATED_DOCUMENT`, `DOCUMENT_MODEL`, `SNIPPET`
- System: `NOTIFICATION`, `REPORT`, `AUDIT_LOG`, `SYSTEM`, `SETTINGS`, `MEMBERSHIP`, `LOCATION`, `TASK_TYPE`

#### Actions

```typescript
// CRUD operations
(Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.PUT, Action.LIST);

// General actions
(Action.MANAGE, Action.VIEW, Action.SEARCH);

// Medical-specific actions
(Action.PRESCRIBE,
  Action.DIAGNOSE,
  Action.SIGN,
  Action.VERIFY,
  Action.SCHEDULE,
  Action.CANCEL,
  Action.APPROVE,
  Action.REJECT);

// Medical service actions
(Action.SET_MEDICAL_SERVICE_STATUS, Action.SET_MEDICAL_SERVICE_FEES);

// Patient-specific actions
(Action.UPDATE_STATUS, Action.VIEW_PATIENTS, Action.PUT_PATIENT_PAYMENT, Action.DELETE_PATIENT_PAYMENT);

// Data operations
(Action.EXPORT, Action.IMPORT, Action.ARCHIVE, Action.RESTORE, Action.SHARE, Action.DOWNLOAD, Action.UPLOAD);

// System operations
(Action.LOGIN, Action.LOGOUT, Action.CONFIGURE, Action.AUDIT);
```

#### Helper Functions

```typescript
import {
  isMedicalResource,
  isPublicResource,
  getAllOperations,
  getOperationsByResource,
  getOperationsByAction,
} from '@doctorus/common';

// Check resource type
if (isMedicalResource(Resource.PATIENT)) {
  // Apply HIPAA-compliant access controls
}

if (isPublicResource(Resource.USER)) {
  // Apply standard access controls
}

// Get all predefined operations
const allOps = getAllOperations();

// Filter operations by resource
const patientOps = getOperationsByResource(Resource.PATIENT);
// [PATIENT_CREATE, PATIENT_READ, PATIENT_UPDATE, ...]

// Filter operations by action
const createOps = getOperationsByAction(Action.CREATE);
// [PATIENT_CREATE, USER_CREATE, MEDICAL_RECORD_CREATE, ...]
```

#### Predefined Operations

Commonly used operations are predefined for convenience:

```typescript
// Account operations
(Operations.ACCOUNT_CREATE,
  Operations.ACCOUNT_READ,
  Operations.ACCOUNT_UPDATE,
  Operations.ACCOUNT_DELETE,
  Operations.ACCOUNT_MANAGE);

// Patient operations
(Operations.PATIENT_CREATE,
  Operations.PATIENT_READ,
  Operations.PATIENT_UPDATE,
  Operations.PATIENT_DELETE,
  Operations.PATIENT_LIST,
  Operations.PATIENT_VIEW,
  Operations.PATIENT_UPDATE_STATUS);

// Medical service operations
(Operations.MEDICAL_SERVICE_CREATE,
  Operations.MEDICAL_SERVICE_READ,
  Operations.MEDICAL_SERVICE_UPDATE,
  Operations.MEDICAL_SERVICE_DELETE,
  Operations.MEDICAL_SERVICE_MANAGE,
  Operations.MEDICAL_SERVICE_SCHEDULE,
  Operations.MEDICAL_SERVICE_CANCEL,
  Operations.MEDICAL_SERVICE_SET_STATUS,
  Operations.MEDICAL_SERVICE_SET_FEES);

// Prescription operations
(Operations.PRESCRIPTION_CREATE,
  Operations.PRESCRIPTION_READ,
  Operations.PRESCRIPTION_UPDATE,
  Operations.PRESCRIPTION_SIGN,
  Operations.PRESCRIPTION_PRESCRIBE);

// User operations
(Operations.USER_CREATE,
  Operations.USER_READ,
  Operations.USER_UPDATE,
  Operations.USER_DELETE,
  Operations.USER_LOGIN,
  Operations.USER_LOGOUT);

// ... and many more
```

### 2. SSM Parameters Module

Utilities for managing AWS SSM Parameter Store keys with environment support.

#### Basic Usage

```typescript
import {
  SSM_PARAM_KEY,
  buildSSMPath,
  buildSSMPathWithPrefix,
  extractEnvFromPath,
  extractKeyFromPath,
  isEnvAgnostic,
} from '@doctorus/common';

// Build environment-specific path
const path = buildSSMPath('prod', SSM_PARAM_KEY.COGNITO_USER_POOL_ID);
console.log(path); // "/prod/user-pool-id"

// Build environment-agnostic path (for shared/central account parameters)
const sharedPath = buildSSMPath(null, SSM_PARAM_KEY.DB_USER);
console.log(sharedPath); // "/db-user"

// Build path with custom prefix
const customPath = buildSSMPathWithPrefix('/myapp/prod', SSM_PARAM_KEY.GRAPHQL_API_ID);
console.log(customPath); // "/myapp/prod/graphql-api-id"

// Extract environment from path
const env = extractEnvFromPath('/prod/user-pool-id');
console.log(env); // "prod"

// Extract key from path
const key = extractKeyFromPath('/prod/user-pool-id');
console.log(key); // SSM_PARAM_KEY.COGNITO_USER_POOL_ID

// Check if path is environment-agnostic
console.log(isEnvAgnostic('/db-user')); // true
console.log(isEnvAgnostic('/prod/user-pool-id')); // false
```

#### Available SSM Parameter Keys

```typescript
SSM_PARAM_KEY.COGNITO_USER_POOL_ID;
SSM_PARAM_KEY.COGNITO_USER_POOL_WEB_CLIENT_ID;
SSM_PARAM_KEY.COGNITO_OAUTH_DOMAIN;
SSM_PARAM_KEY.RUM_GUEST_ROLE_ARN;
SSM_PARAM_KEY.RUM_IDENTITY_POOL_ID;
SSM_PARAM_KEY.RUM_APP_ID;
SSM_PARAM_KEY.GRAPHQL_HTTP_URL;
SSM_PARAM_KEY.GRAPHQL_WS_URL;
SSM_PARAM_KEY.GRAPHQL_HOST;
SSM_PARAM_KEY.GRAPHQL_API_ID;
SSM_PARAM_KEY.MEDICAL_ASSETS_AWS_CLOUDFRONT_PRIVATE_KEY;
SSM_PARAM_KEY.MEDICAL_ASSETS_AWS_CLOUDFRONT_KEY_ID;
SSM_PARAM_KEY.MEDICAL_ASSETS_BUCKET_NAME;
SSM_PARAM_KEY.PUBLIC_ASSETS_BUCKET_NAME;
SSM_PARAM_KEY.DB_USER;
SSM_PARAM_KEY.DB_PASSWORD;
SSM_PARAM_KEY.MEDICAL_ASSETS_DISTRIBUTION_DOMAIN_NAME;
SSM_PARAM_KEY.BASE_HOST;
SSM_PARAM_KEY.EMAIL_FROM_ADDRESS;
SSM_PARAM_KEY.EVENT_API_REAL_TIME_DNS;
SSM_PARAM_KEY.EVENT_API_HTTP_DNS;
SSM_PARAM_KEY.NOTIFIED_EVENT_ACTIONS;
```

## Use Cases

### 1. Access Control

```typescript
import { Operation, isMedicalResource } from '@doctorus/common';

function checkPermission(userPermissions: string[], operation: Operation): boolean {
  // Check if user has permission for this operation
  const hasPermission = userPermissions.includes(operation.toString());

  // Apply additional checks for medical resources
  if (isMedicalResource(operation.resource)) {
    // Enforce HIPAA compliance, additional logging, etc.
    return hasPermission && user.hasHIPAAAccess;
  }

  return hasPermission;
}

// Usage
const canRead = checkPermission(userPermissions, Operations.PATIENT_READ);
```

### 2. Audit Logging

```typescript
import { Operation, Operations } from '@doctorus/common';

interface AuditLog {
  timestamp: Date;
  userId: string;
  operation: string;
  resourceId: string;
  success: boolean;
}

function logAudit(userId: string, operation: Operation, resourceId: string, success: boolean) {
  const log: AuditLog = {
    timestamp: new Date(),
    userId,
    operation: operation.toString(),
    resourceId,
    success,
  };

  // Store in audit log database
  auditLogService.create(log);
}

// Usage
logAudit('user123', Operations.PRESCRIPTION_PRESCRIBE, 'rx-456', true);
```

### 3. Infrastructure Configuration

```typescript
import { buildSSMPath, SSM_PARAM_KEY } from '@doctorus/common';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

// In your CDK stack
const env = 'prod';

const userPoolId = StringParameter.valueFromLookup(this, buildSSMPath(env, SSM_PARAM_KEY.COGNITO_USER_POOL_ID));

const graphqlUrl = StringParameter.valueFromLookup(this, buildSSMPath(env, SSM_PARAM_KEY.GRAPHQL_HTTP_URL));
```

### 4. Frontend Configuration

```typescript
import { buildSSMPath, SSM_PARAM_KEY } from '@doctorus/common';
import { SSM } from '@aws-sdk/client-ssm';

async function loadConfig(environment: string) {
  const ssm = new SSM();

  const params = [SSM_PARAM_KEY.COGNITO_USER_POOL_ID, SSM_PARAM_KEY.GRAPHQL_HTTP_URL, SSM_PARAM_KEY.RUM_APP_ID];

  const config: Record<string, string> = {};

  for (const param of params) {
    const path = buildSSMPath(environment, param);
    const response = await ssm.getParameter({ Name: path });
    config[param] = response.Parameter?.Value || '';
  }

  return config;
}
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build
pnpm build

# Run projen (regenerate configuration)
pnpm projen
```

## Testing

The library includes comprehensive tests with 100% coverage:

```bash
pnpm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Apache-2.0

## Related

- [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
- [AWS CDK](https://aws.amazon.com/cdk/)

---

Built with ❤️ for Doctorus
