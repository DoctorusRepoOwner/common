# @doctorus/common

Common TypeScript utilities for Doctorus - A shared library for managing operations, SSM parameters, and access control across infrastructure stacks and frontend applications.

[![npm version](https://img.shields.io/npm/v/@doctorus/common.svg)](https://www.npmjs.com/package/@doctorus/common)
[![License](https://img.shields.io/npm/l/@doctorus/common.svg)](https://github.com/DoctorusRepoOwner/common/blob/main/LICENSE)

## Installation

```bash
npm install @doctorus/common
# or
pnpm add @doctorus/common
# or
yarn add @doctorus/common
```

## Features

- 🔐 **Operations Module** - Resource-Action pattern for access control and audit logging
- 🗄️ **SSM Parameters** - AWS SSM Parameter Store utilities with environment support
- 📋 **Type Safety** - Full TypeScript support with comprehensive type definitions
- 🏥 **Medical & Public Resources** - Separate categorization for HIPAA compliance
- ✅ **100% Test Coverage** - Thoroughly tested and production-ready

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
const parsed = Operation.fromString("MEDICAL_SERVICE:SCHEDULE");
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
Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.PUT, Action.LIST

// General actions
Action.MANAGE, Action.VIEW, Action.SEARCH

// Medical-specific actions
Action.PRESCRIBE, Action.DIAGNOSE, Action.SIGN, Action.VERIFY, 
Action.SCHEDULE, Action.CANCEL, Action.APPROVE, Action.REJECT

// Medical service actions
Action.SET_MEDICAL_SERVICE_STATUS, Action.SET_MEDICAL_SERVICE_FEES

// Patient-specific actions
Action.UPDATE_STATUS, Action.VIEW_PATIENTS, 
Action.PUT_PATIENT_PAYMENT, Action.DELETE_PATIENT_PAYMENT

// Data operations
Action.EXPORT, Action.IMPORT, Action.ARCHIVE, Action.RESTORE,
Action.SHARE, Action.DOWNLOAD, Action.UPLOAD

// System operations
Action.LOGIN, Action.LOGOUT, Action.CONFIGURE, Action.AUDIT
```

#### Helper Functions

```typescript
import { 
  isMedicalResource, 
  isPublicResource,
  getAllOperations,
  getOperationsByResource,
  getOperationsByAction
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
Operations.ACCOUNT_CREATE, Operations.ACCOUNT_READ, Operations.ACCOUNT_UPDATE, 
Operations.ACCOUNT_DELETE, Operations.ACCOUNT_MANAGE

// Patient operations
Operations.PATIENT_CREATE, Operations.PATIENT_READ, Operations.PATIENT_UPDATE, 
Operations.PATIENT_DELETE, Operations.PATIENT_LIST, Operations.PATIENT_VIEW,
Operations.PATIENT_UPDATE_STATUS

// Medical service operations
Operations.MEDICAL_SERVICE_CREATE, Operations.MEDICAL_SERVICE_READ,
Operations.MEDICAL_SERVICE_UPDATE, Operations.MEDICAL_SERVICE_DELETE,
Operations.MEDICAL_SERVICE_MANAGE, Operations.MEDICAL_SERVICE_SCHEDULE,
Operations.MEDICAL_SERVICE_CANCEL, Operations.MEDICAL_SERVICE_SET_STATUS,
Operations.MEDICAL_SERVICE_SET_FEES

// Prescription operations
Operations.PRESCRIPTION_CREATE, Operations.PRESCRIPTION_READ,
Operations.PRESCRIPTION_UPDATE, Operations.PRESCRIPTION_SIGN,
Operations.PRESCRIPTION_PRESCRIBE

// User operations
Operations.USER_CREATE, Operations.USER_READ, Operations.USER_UPDATE,
Operations.USER_DELETE, Operations.USER_LOGIN, Operations.USER_LOGOUT

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
  isEnvAgnostic
} from '@doctorus/common';

// Build environment-specific path
const path = buildSSMPath('prod', SSM_PARAM_KEY.COGNITO_USER_POOL_ID);
console.log(path); // "/prod/user-pool-id"

// Build environment-agnostic path (for shared/central account parameters)
const sharedPath = buildSSMPath(null, SSM_PARAM_KEY.DB_USER);
console.log(sharedPath); // "/db-user"

// Build path with custom prefix
const customPath = buildSSMPathWithPrefix(
  '/myapp/prod', 
  SSM_PARAM_KEY.GRAPHQL_API_ID
);
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
SSM_PARAM_KEY.COGNITO_USER_POOL_ID
SSM_PARAM_KEY.COGNITO_USER_POOL_WEB_CLIENT_ID
SSM_PARAM_KEY.COGNITO_OAUTH_DOMAIN
SSM_PARAM_KEY.RUM_GUEST_ROLE_ARN
SSM_PARAM_KEY.RUM_IDENTITY_POOL_ID
SSM_PARAM_KEY.RUM_APP_ID
SSM_PARAM_KEY.GRAPHQL_HTTP_URL
SSM_PARAM_KEY.GRAPHQL_WS_URL
SSM_PARAM_KEY.GRAPHQL_HOST
SSM_PARAM_KEY.GRAPHQL_API_ID
SSM_PARAM_KEY.MEDICAL_ASSETS_AWS_CLOUDFRONT_PRIVATE_KEY
SSM_PARAM_KEY.MEDICAL_ASSETS_AWS_CLOUDFRONT_KEY_ID
SSM_PARAM_KEY.MEDICAL_ASSETS_BUCKET_NAME
SSM_PARAM_KEY.PUBLIC_ASSETS_BUCKET_NAME
SSM_PARAM_KEY.DB_USER
SSM_PARAM_KEY.DB_PASSWORD
SSM_PARAM_KEY.MEDICAL_ASSETS_DISTRIBUTION_DOMAIN_NAME
SSM_PARAM_KEY.BASE_HOST
SSM_PARAM_KEY.EMAIL_FROM_ADDRESS
SSM_PARAM_KEY.EVENT_API_REAL_TIME_DNS
SSM_PARAM_KEY.EVENT_API_HTTP_DNS
SSM_PARAM_KEY.NOTIFIED_EVENT_ACTIONS
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
const canRead = checkPermission(
  userPermissions, 
  Operations.PATIENT_READ
);
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

function logAudit(
  userId: string, 
  operation: Operation, 
  resourceId: string,
  success: boolean
) {
  const log: AuditLog = {
    timestamp: new Date(),
    userId,
    operation: operation.toString(),
    resourceId,
    success
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

const userPoolId = StringParameter.valueFromLookup(
  this,
  buildSSMPath(env, SSM_PARAM_KEY.COGNITO_USER_POOL_ID)
);

const graphqlUrl = StringParameter.valueFromLookup(
  this,
  buildSSMPath(env, SSM_PARAM_KEY.GRAPHQL_HTTP_URL)
);
```

### 4. Frontend Configuration

```typescript
import { buildSSMPath, SSM_PARAM_KEY } from '@doctorus/common';
import { SSM } from '@aws-sdk/client-ssm';

async function loadConfig(environment: string) {
  const ssm = new SSM();
  
  const params = [
    SSM_PARAM_KEY.COGNITO_USER_POOL_ID,
    SSM_PARAM_KEY.GRAPHQL_HTTP_URL,
    SSM_PARAM_KEY.RUM_APP_ID
  ];
  
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